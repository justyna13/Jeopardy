import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enJson from './locales/en.json';
import plJson from './locales/pl.json';

const resources = {
  en: {
    ...enJson
  },
  pl: {
    ...plJson
  }
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'pl'
});

export default i18n;
