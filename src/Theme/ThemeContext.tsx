import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme } from './LightTheme';
import { DarkTheme } from './DarkTheme';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colors: typeof LightTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: DarkTheme,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    AsyncStorage.getItem('APP_THEME').then((saved) => {
      if (saved === 'dark' || saved === 'light') setThemeState(saved);
    });
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    AsyncStorage.setItem('APP_THEME', newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev: Theme) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('APP_THEME', next);
      return next;
    });
  };

  const colors = theme === 'light' ? LightTheme : DarkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
