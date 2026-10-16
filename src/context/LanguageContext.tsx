import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cada idioma tiene su propia URL prerenderizada (/ y /en/), así que el idioma
// inicial lo decide la página y no el navegador: el HTML del servidor y la
// hidratación siempre coinciden.
export const LANGUAGE_PATHS: Record<Language, string> = { es: '/', en: '/en/' };

const TITLES: Record<Language, string> = {
  es: 'TerosTec | Software Boutique & Soluciones Digitales',
  en: 'TerosTec | Boutique Software & Digital Solutions',
};

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage = 'es',
}) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Cambia el idioma en el lugar (sin recargar, conservando animaciones y scroll)
  // y deja la URL apuntando a la versión indexable de ese idioma.
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      const target = LANGUAGE_PATHS[lang] + window.location.hash;
      if (window.location.pathname !== LANGUAGE_PATHS[lang]) {
        window.history.replaceState(null, '', target);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = TITLES[language];
  }, [language]);

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    if (dict && key in dict) {
      return dict[key];
    }
    // Fallback to Spanish
    const fallbackDict = translations.es as Record<string, string>;
    return fallbackDict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
