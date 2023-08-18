import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

import { logOut } from '@/core/store/actions';
import { SETTINGS } from '@/core/settings';
import * as CookieService from '@/core/services/CookieService';

export interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  isRetryOnce?: boolean;
}

type OriginalAxiosError = AxiosError & {
  config: AxiosRequestConfigExtended;
}

export const $api = axios.create({
  ...SETTINGS.apiService.baseAxiosConfig,
  headers: {
    'Content-Type': 'application/json',
    ...SETTINGS.apiService.baseAxiosConfig?.headers,
  },
});

const requestInterceptorSuccess:any = async (config: AxiosRequestConfigExtended) => {
  const token = CookieService.getAccessToken();
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const responseInterceptorError = async (error: OriginalAxiosError) => {
  if (
    error.response?.status === 401 &&
    error.config &&
    !error.config.isRetryOnce &&
    SETTINGS.apiService.apiPathRefresh
  ) {
    error.config.isRetryOnce = true;

    try {
      const res = await axios.get(
        `${SETTINGS.apiService.apiPath}${SETTINGS.apiService.apiPathRefresh}`,
        {
          withCredentials: true,
        },
      );

      CookieService.setAccessToken(res.data.access_token);

      return $api.request(error.config);
    } catch (e) {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};

$api.interceptors.request.use(requestInterceptorSuccess);

$api.interceptors.response.use(null, responseInterceptorError);

export const $axios = <T>(config: AxiosRequestConfigExtended, dispatch: Dispatch): Promise<T> =>
  $api
    .request<T>(config)
    .then((res) => res.data)
    .catch((error) => {
      if (!error.response) return Promise.reject('error_not_found');

      const { errors } = error.response.data;

      if (error.response.status === 401) {
        dispatch(logOut(true));
      }

      return Promise.reject(errors);
    });
