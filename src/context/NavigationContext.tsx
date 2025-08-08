import React, { createContext, useContext } from 'react';
import { GAME_MENU_ITEMS } from '@/constants';
import { capitalize } from '@/utils/string.utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

interface NavigationContextType {
  currentNav: string | undefined;
  setCurrentNav: (nav: string | undefined) => void;
}

// NavigationContext is decided using URI in the following format
// /[nav]
// Where nav should be one of MAIN_MENU.
// Refer to /main.tsx for all possible URI mappings
const NavigationContext = createContext<NavigationContextType>({
  currentNav: undefined,
  setCurrentNav: () => { },
});

// Create a provider component
export const NavigationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentNav, setCurrentNav] = useState<string>();
  const location = useLocation();
  const { i18n } = useTranslation();

  // Update navigation state based on URL
  useEffect(() => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);

    if (segments.length >= 1) {
      const nav = segments[0];
      if (nav !== currentNav) {
        setCurrentNav(nav);
      }
    } else {
      setCurrentNav(undefined);
    }



  }, [location.pathname]);

  // Update current game name when currentGame changes
  useEffect(() => {
    if (currentNav && i18n.language === 'en') {
      setCurrentNav(capitalize(currentNav));
    } else if (currentNav) {
      setCurrentNav(t(`constants.mainMenu.${currentNav}`));
    }
  }, [currentNav, i18n.language]);



  const value = {
    currentNav,
    setCurrentNav,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Create a custom hook for using the navigation context
export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export default NavigationContext;