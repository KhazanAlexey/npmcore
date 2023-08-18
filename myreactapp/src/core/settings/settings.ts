import { CreateAxiosDefaults } from 'axios';

export interface SettingsApiService {
  apiPath?: string;
  apiPathWp?: string;
  apiPathRefresh?: string;
  baseAxiosConfig: CreateAxiosDefaults;
}

export interface SettingsCore {
  appVersion: string;
  environment: 'development' | 'production' | 'test';
  isDevelop: boolean;
  isDevelopStage: boolean;
  isProduction: boolean;
  sentryDsn?: string;
  gtmId?: string;
  defaultLanguage: string;
  apiService: SettingsApiService;
  dateFormat: string;
}

const ENVIRONMENT = import.meta.env.NODE_ENV;
const API_PATH = import.meta.env.REACT_APP_API_PATH;
const IS_DEVELOP = ENVIRONMENT === 'development';
const IS_PRODUCTION = ENVIRONMENT === 'production';
const IS_DEV_STAGE = !!window.location.origin.match(/(localhost|avgr.it)/);
const API_PATH_WP = IS_DEV_STAGE ? import.meta.env.REACT_APP_API_PATH_WP : window.location.origin;

export const SETTINGS: SettingsCore = {
  appVersion: import.meta.env.REACT_APP_VERSION || 'initial',
  environment: ENVIRONMENT,
  isDevelop: IS_DEVELOP,
  isDevelopStage: IS_DEV_STAGE,
  isProduction: IS_PRODUCTION,
  sentryDsn: import.meta.env.REACT_APP_SENTRY_DSN,
  gtmId: import.meta.env.REACT_APP_GTM_ID,
  defaultLanguage: import.meta.env.REACT_APP_DEFAULT_LANGUAGE || 'en',
  dateFormat: import.meta.env.REACT_APP_DATE_FORMAT || 'dd.MM.yyyy',
  apiService: {
    apiPath: API_PATH,
    apiPathWp: API_PATH_WP,
    apiPathRefresh: import.meta.env.REACT_APP_API_PATH_REFRESH, // example => /refresh,
    baseAxiosConfig: {
      baseURL: API_PATH,
    },
  },
};
