import React from 'react';
import { View, Text, Platform } from 'react-native';
import { CustomButton } from '../../Components/CustomButton';
import { MainLayout } from '../Layout/MainLayout';

import HeaderIconFirst from '../../Icons/hello-vector.svg';
import HeaderIconSecond from '../../Icons/hello-vector-4.svg';
import AppleIcon from '../../Icons/apple-24.svg';
import GoogleIcon from '../../Icons/google-24.svg';
import { welcomeStyles } from './Styles';
import { signInWithGoogle } from '../../Features/Auth/Services/GoogleLogin';
import { signInWithApple } from '../../Features/Auth/Services/AppleLogin';
import { useTheme } from '../../Theme/ThemeContext';

export default function WelcomeScreen({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <MainLayout>
      <View style={welcomeStyles.logo}>
        <HeaderIconFirst width="100%" />
        <View style={welcomeStyles.overlayIconContainer}>
          <HeaderIconSecond />
        </View>
      </View>

      <View style={welcomeStyles.textContainer}>
        <Text style={[welcomeStyles.title, { color: colors.Text.neutral.primary }]}>Hello,</Text>
        <Text style={welcomeStyles.subtitle}>
          An app designed to guide anyone through emergencies, with quick first responder protocols
          and first aid steps.
        </Text>
      </View>

      <View style={welcomeStyles.buttonsContainer}>
        <CustomButton
          onPress={() => navigation.navigate('Login')}
          text="Login"
          type="primary"
          dimension="large"
          width={345}
        />

        <CustomButton
          onPress={() => navigation.navigate('SignUp')}
          text="Sign up"
          type="secondary"
          dimension="large"
          width={345}
        />

        <View style={welcomeStyles.dividerContainer}>
          <Text style={welcomeStyles.dividerText}>or</Text>
        </View>

        <CustomButton
          onPress={() => signInWithGoogle(navigation)}
          text="Continue with Google"
          Icon={GoogleIcon}
          type="social"
          dimension="large"
          width={345}
        />

        {Platform.OS === 'ios' && (
          <CustomButton
            onPress={() => signInWithApple(navigation)}
            text="Continue with Apple"
            Icon={AppleIcon}
            type="social"
            dimension="large"
            width={345}
          />
        )}
      </View>
    </MainLayout>
  );
}
