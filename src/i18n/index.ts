
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import enTranslation from '../../public/locales/en/translation.json';
import noTranslation from '../../public/locales/no/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  no: {
    translation: noTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    }
  });

export default i18n;
