import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean | null;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  loginWithGoogle: async () => {},
  loginWithApple: async () => {},
  logout: async () => {},
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const refreshAuth = async () => {
    try {
      const appleUserId = await AsyncStorage.getItem('appleUserId');

      if (appleUserId) {
        setIsAuthenticated(true);
        return;
      }

      const googleTokens = await GoogleSignin.getTokens();

      if (googleTokens?.accessToken) {
        setIsAuthenticated(true);
        return;
      }
    } catch (error) {
      console.log('Google auth check failed:', error);
    }

    // If no valid Google authentication, set to false
    setIsAuthenticated(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const loginWithGoogle = async () => {
    await GoogleSignin.signIn();
    await refreshAuth();
  };

  const loginWithApple = async () => {
    const appleResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('appleResponse', appleResponse);
    if (!appleResponse.user) throw new Error('No Apple user');

    await AsyncStorage.setItem('appleUserId', appleResponse.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch {}

    await AsyncStorage.removeItem('appleUserId');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginWithGoogle,
        loginWithApple,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
