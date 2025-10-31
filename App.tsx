import React from 'react';
import Navigation from './src/Navigations/Navigations';
import { ThemeProvider } from './src/Theme/ThemeContext';
import './src/i18n';

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
