import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId: '611672989625-o7tdu6o5ibnkndkn4q34b0d1v2f4lide.apps.googleusercontent.com',
});

export async function signInWithGoogle(navigation: any) {
  const userInfo = await GoogleSignin.signIn();

  if (userInfo?.data?.user?.id) {
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

    if (!hasSeenOnboarding) {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Onboarding');
    } else {
      navigation.replace('MainTabs');
    }
  }
}
