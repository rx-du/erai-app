import { GoogleSignin } from '@react-native-google-signin/google-signin';

// these api keys are just for test
GoogleSignin.configure({
  webClientId: '611672989625-bbblgjq01o1p6gc5f580ksp1n3nmg86l.apps.googleusercontent.com',
  iosClientId: '611672989625-o7tdu6o5ibnkndkn4q34b0d1v2f4lide.apps.googleusercontent.com',
});

export async function signInWithGoogle(navigation: any) {
  try {
    const userInfo = await GoogleSignin.signIn();

    if (userInfo?.data?.user?.id) {
      navigation.navigate('MainTabs');
    }
  } catch (err) {
    console.log('Google Sign-In error', err);
  }
}
