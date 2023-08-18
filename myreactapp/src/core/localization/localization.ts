import i18next, { InitOptions, Resource, TFunction } from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import {getI18language} from "../services";
import {SETTINGS} from "@/core/settings";
import {WpKeys} from "@/core/models";



interface InitialLocalizationOptions extends InitOptions {
  resources: Resource;
}

type InitialLocalizationHandler = (data: InitialLocalizationOptions) => Promise<TFunction>;

export const initialLocalization: InitialLocalizationHandler = (data) =>
  i18next
    .use(backend)
    .use(languageDetector)
    .use(initReactI18next)
    .use(ICU)
    .init({
      ns: ['translations'],
      defaultNS: 'translations',
      react: {
        useSuspense: false,
      },
      lng: getI18language() || SETTINGS.defaultLanguage,
      detection: {
        caches: ['cookie'],
        lookupCookie: WpKeys.CurrentLanguage,
      },
      ...data,
    });
