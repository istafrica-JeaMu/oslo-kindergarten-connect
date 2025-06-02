
import React, { createContext, useContext, useState } from 'react';

type Language = 'nb' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  nb: {
    'nav.dashboard': 'Oversikt',
    'nav.newApplication': 'Ny søknad',
    'nav.applicationStatus': 'Søknadsstatus',
    'nav.messages': 'Meldinger',
    'nav.payments': 'Betalinger',
    'nav.reviewQueue': 'Behandlingskø',
    'nav.placementManagement': 'Plasshåndtering',
    'nav.reports': 'Rapporter',
    'nav.settings': 'Innstillinger',
    'auth.login': 'Logg inn',
    'auth.email': 'E-post',
    'auth.password': 'Passord',
    'auth.loginButton': 'Logg inn',
    'auth.logout': 'Logg ut',
    'guardian.dashboard.title': 'Min side',
    'guardian.dashboard.welcome': 'Velkommen',
    'guardian.newApplication.title': 'Ny barnehagesøknad',
    'caseworker.dashboard.title': 'Saksbehandler oversikt',
    'admin.dashboard.title': 'Administrator oversikt',
    'common.loading': 'Laster...',
    'common.error': 'En feil oppstod',
    'common.save': 'Lagre',
    'common.cancel': 'Avbryt',
    'common.next': 'Neste',
    'common.previous': 'Forrige',
    'common.submit': 'Send inn'
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.newApplication': 'New Application',
    'nav.applicationStatus': 'Application Status',
    'nav.messages': 'Messages',
    'nav.payments': 'Payments',
    'nav.reviewQueue': 'Review Queue',
    'nav.placementManagement': 'Placement Management',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'auth.login': 'Login',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loginButton': 'Login',
    'auth.logout': 'Logout',
    'guardian.dashboard.title': 'My Page',
    'guardian.dashboard.welcome': 'Welcome',
    'guardian.newApplication.title': 'New Kindergarten Application',
    'caseworker.dashboard.title': 'Case Worker Overview',
    'admin.dashboard.title': 'Administrator Overview',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nb');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['nb']] || key;
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
