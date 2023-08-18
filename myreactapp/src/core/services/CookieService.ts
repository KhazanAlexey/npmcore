import Cookies, { CookieAttributes } from 'js-cookie';
import {
  INIT_VALUES_FORM_KEY,
} from '@/core/constants';
import { WpKeys } from '@/core/models';

export const setCookie = (name: string, data: any, options?: CookieAttributes) => {
  Cookies.set(name, JSON.stringify(data), options);
};

export const getCookie = (name: string) => {
  const value = Cookies.get(name);

  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return value || null;
  }
};

export const removeCookie = (name: string) => Cookies.remove(name);

export const getCookies = (searchString?: string) => {
  return document.cookie.split(';').reduce((ac, cv) => {
    const arr = cv.split('=');
    const key = arr[0].trim();
    const value = arr[1];

    return !searchString
      ? {
        ...ac,
        [key]: value,
      }
      : key.includes(searchString)
        ? {
          ...ac,
          [key]: value,
        }
        : ac;
  }, {});
};

export const removeCookies = (searchString?: string) => {
  const cookies = getCookies(searchString);
  for (const key in cookies) {
    Cookies.remove(key);
  }
};

export const getAccessToken = () => getCookie(WpKeys.AccessToken);
export const setAccessToken = (token: string) => setCookie(WpKeys.AccessToken, token);
export const removeAccessToken = () => removeCookie(WpKeys.AccessToken);

export const getRefreshToken = () => getCookie(WpKeys.RefreshToken);
export const setRefreshToken = (token: string) => setCookie(WpKeys.RefreshToken, token);
export const removeRefreshToken = () => removeCookie(WpKeys.RefreshToken);

export const getI18language = () => getCookie(WpKeys.CurrentLanguage);

export const setInitStateForm = (formName: string, data: any) => {
  const initData = getCookie(INIT_VALUES_FORM_KEY);
  const currentData = {
    ...initData,
    [formName]: data,
  };
  setCookie(INIT_VALUES_FORM_KEY, currentData);
};

export const getInitStateForm = <T>(formName: string): T => {
  const initData = getCookie(INIT_VALUES_FORM_KEY) || {};
  return initData[formName] || {};
};

export const removeInitStateForm = () => removeCookies(INIT_VALUES_FORM_KEY);
