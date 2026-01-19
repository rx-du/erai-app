import React from 'react';
import Navigation from './src/Navigations/Navigations';
import { ThemeProvider } from './src/Theme/ThemeContext';
import { LoadingProvider } from './src/Context/LoadingContext';
import { ProtocolProvider } from './src/Context/ProtocolContext';
import { LogBox } from 'react-native';
import './src/i18n';
import { SubscriptionProvider } from './src/Context/SubscriptionContext';
import { AuthProvider } from './src/Context/AuthContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

GoogleSignin.configure({
  iosClientId: '611672989625-o7tdu6o5ibnkndkn4q34b0d1v2f4lide.apps.googleusercontent.com',
  webClientId: '611672989625-ckpktv3tdij8jb7vvo2oklkhc5qka9qh.apps.googleusercontent.com',
  offlineAccess: true,
});

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <SubscriptionProvider>
            <ProtocolProvider>
              <Navigation />
            </ProtocolProvider>
          </SubscriptionProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
