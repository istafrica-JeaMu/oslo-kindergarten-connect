
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import enTranslation from '../../public/locales/en/translation.json';
import noTranslation from '../../public/locales/no/translation.json';
import enGuardian from '../../public/locales/en/guardian.json';
import noGuardian from '../../public/locales/no/guardian.json';

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
        translation: {
          ...enTranslation,
          guardian: enGuardian
        }
      },
      no: {
        translation: {
          ...noTranslation,
          guardian: noGuardian
        }
      }
    }
  });

export default i18n;
