
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
        translation: require('../../public/locales/en/translation.json')
      },
      no: {
        translation: require('../../public/locales/no/translation.json')
      }
    }
  });

export default i18n;
