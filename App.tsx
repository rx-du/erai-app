import React from 'react';
import Navigation from './src/Navigations/Navigations';
import { ThemeProvider } from './src/Theme/ThemeContext';
import { LoadingProvider } from './src/Context/LoadingContext';
import { ProtocolProvider } from './src/Context/ProtocolContext';
import { LogBox } from 'react-native';
import './src/i18n';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

export default function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <ProtocolProvider>
          <Navigation />
        </ProtocolProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
