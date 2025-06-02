
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'nb' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();

  const setLanguage = (lang: Language) => {
    const langCode = lang === 'nb' ? 'no' : 'en';
    i18n.changeLanguage(langCode);
  };

  const language: Language = i18n.language === 'no' ? 'nb' : 'en';

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
