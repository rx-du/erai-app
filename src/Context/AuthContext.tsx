import React, { createContext, useContext, useEffect, useState } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth';
import { Platform, NativeModules } from 'react-native';

const { YahooAuthModule } = NativeModules;

type AuthContextType = {
  isAuthenticated: boolean | null;
  hasSeenOnboarding: boolean | null;
  completeOnboarding: () => Promise<void>;
  replayOnboarding: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithYahoo: () => Promise<void>;
  logout: () => Promise<void>;
};

const AUTH_PROVIDER_KEY = 'authProvider';
const ONBOARDING_KEY = 'hasSeenOnboarding';

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  hasSeenOnboarding: null,
  completeOnboarding: async () => {},
  replayOnboarding: async () => {},
  loginWithGoogle: async () => {},
  loginWithApple: async () => {},
  loginWithYahoo: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  const refreshAuth = async () => {
    const provider = await AsyncStorage.getItem(AUTH_PROVIDER_KEY);

    if (!provider) {
      setIsAuthenticated(false);
      return;
    }

    if (provider === 'apple' || provider === 'yahoo') {
      setIsAuthenticated(true);
      return;
    }

    if (provider === 'google') {
      try {
        await GoogleSignin.signInSilently();
        setIsAuthenticated(true);
        return;
      } catch (error) {
        console.log('Google restore failed', error);
      }
    }

    setIsAuthenticated(false);
  };

  const loadOnboardingStatus = async () => {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    setHasSeenOnboarding(value === 'true');
  };

  useEffect(() => {
    refreshAuth();
    loadOnboardingStatus();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setHasSeenOnboarding(true);
  };

  const replayOnboarding = async () => {
    setHasSeenOnboarding(false);
  };

  const loginWithGoogle = async () => {
    const signInResponse = await GoogleSignin.signIn();

    if (signInResponse.type === 'success') {
      await AsyncStorage.setItem(AUTH_PROVIDER_KEY, 'google');
      setIsAuthenticated(true);
    }
  };

  const loginWithApple = async () => {
    try {
      const signInResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (signInResponse.user) {
        await AsyncStorage.setItem(AUTH_PROVIDER_KEY, 'apple');
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      return;
    }
  };

  const loginWithYahoo = async () => {
    const clientId =
      'dj0yJmk9UnVNMFpBYWFXdmV6JmQ9WVdrOU1XZHNNRWhHYW1JbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWUy';

    const redirectUri = 'com.eraiapp://auth';

    try {
      if (Platform.OS === 'ios') {
        const result = await YahooAuthModule.authorize(clientId, redirectUri);

        const { callbackUrl, codeVerifier } = result;

        const code = callbackUrl.match(/code=([^&]+)/)?.[1];

        if (!code) throw new Error('No auth code received');

        const response = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            redirect_uri: redirectUri,
            code,
            code_verifier: codeVerifier,
          }).toString(),
        });

        if (!response.ok) throw new Error('Token request failed');

        await AsyncStorage.setItem(AUTH_PROVIDER_KEY, 'yahoo');
        setIsAuthenticated(true);
      } else {
        const config = {
          clientId,
          redirectUrl: redirectUri,
          scopes: ['openid', 'email'],
          additionalParameters: {
            prompt: 'login' as const,
          },
          serviceConfiguration: {
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            tokenEndpoint: 'https://api.login.yahoo.com/oauth2/get_token',
          },
          usePKCE: true,
        };

        const authState = await authorize(config);

        if (authState.accessToken) {
          await AsyncStorage.setItem(AUTH_PROVIDER_KEY, 'yahoo');
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.log('Yahoo login error:', error);
    }
  };

  const logout = async () => {
    const provider = await AsyncStorage.getItem(AUTH_PROVIDER_KEY);

    if (provider === 'google') {
      try {
        await GoogleSignin.signOut();
      } catch {}
    }

    await AsyncStorage.removeItem(AUTH_PROVIDER_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasSeenOnboarding,
        completeOnboarding,
        replayOnboarding,
        loginWithGoogle,
        loginWithApple,
        loginWithYahoo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
