
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import enTranslation from '../../public/locales/en/translation.json';
import noTranslation from '../../public/locales/no/translation.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    resources: {
      en: {
        translation: enTranslation
      },
      no: {
        translation: noTranslation
      }
    }
  });

export default i18n;
