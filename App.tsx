import React, { useEffect, useState } from 'react';
import Navigation from './src/Navigations/Navigations';
import { ThemeProvider } from './src/Theme/ThemeContext';
import { LoadingProvider } from './src/Context/LoadingContext';
import { ProtocolProvider } from './src/Context/ProtocolContext';
import { LogBox, ActivityIndicator, View } from 'react-native';
import './src/i18n';
import { SubscriptionProvider } from './src/Context/SubscriptionContext';
import { AuthProvider } from './src/Context/AuthContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as RNIAP from 'react-native-iap';

LogBox.ignoreAllLogs();

GoogleSignin.configure({
  iosClientId: '633749270164-54ca6dquao2qtiomo87g4d0u0495fmck.apps.googleusercontent.com',
});

export default function App() {
  const [iapReady, setIapReady] = useState(false);

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIAP.initConnection();
        setIapReady(true);
      } catch (error) {
        setIapReady(true);
      }
    };

    initIAP();

    return () => {
      RNIAP.endConnection();
      console.log('[RN-IAP]', 'Connection ended');
    };
  }, []);

  if (!iapReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
