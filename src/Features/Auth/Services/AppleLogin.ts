import appleAuth from '@invertase/react-native-apple-authentication';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithApple = async (navigation: any) => {
  try {
    const appleResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleResponse.user) {
      throw new Error('No Apple user ID');
    }

    const userData = {
      appleUserId: appleResponse.user,
      email: appleResponse.email ?? null,
      fullName: appleResponse.fullName ?? null,
    };

    await AsyncStorage.setItem('appleUser', JSON.stringify(userData));

    navigation.replace('MainTabs');
  } catch (error: any) {
    if (error.code === appleAuth.Error.CANCELED) {
      return;
    }

    console.log('Apple Sign-In error', error);

    Alert.alert('Login failed', 'Autentificarea cu Apple a eșuat.');
  }
};
