
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'nb' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t: i18nT } = useTranslation();

  const setLanguage = (lang: Language) => {
    const langCode = lang === 'nb' ? 'no' : 'en';
    i18n.changeLanguage(langCode);
  };

  const language: Language = i18n.language === 'no' ? 'nb' : 'en';

  // Enhanced t function with fallback support
  const t = (key: string, fallback?: string) => {
    try {
      const translation = i18nT(key);
      // If translation equals the key, it means no translation was found
      if (translation === key && fallback) {
        return fallback;
      }
      return translation;
    } catch (error) {
      console.warn('Translation error for key:', key, error);
      return fallback || key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
