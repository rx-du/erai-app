import React, { createContext, useContext, useEffect, useState } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean | null;
  hasSeenOnboarding: boolean | null;
  completeOnboarding: () => Promise<void>;
  replayOnboarding: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
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

    if (provider === 'apple') {
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
