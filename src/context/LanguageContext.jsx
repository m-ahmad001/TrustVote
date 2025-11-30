import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  // Initialize language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      setDirection(storedLanguage === 'ur' ? 'rtl' : 'ltr');
    }
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  // Switch language
  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ur' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLanguage);
  };

  // Toggle between English and Urdu
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ur' : 'en';
    switchLanguage(newLanguage);
  };

  const value = {
    language,
    direction,
    switchLanguage,
    toggleLanguage,
    isRTL: direction === 'rtl',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageContext;
