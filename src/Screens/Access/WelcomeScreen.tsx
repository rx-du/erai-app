import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <MainLayout>
      <View style={welcomeStyles.logo}>
        <HeaderIconFirst width="100%" />
        <View style={welcomeStyles.overlayIconContainer}>
          <HeaderIconSecond />
        </View>
      </View>

      <View style={welcomeStyles.textContainer}>
        <Text style={[welcomeStyles.title, { color: colors.Text.neutral.primary }]}>
          {t('welcome.title')}
        </Text>
        <Text style={welcomeStyles.subtitle}>{t('welcome.subtitle')}</Text>
      </View>

      <View style={welcomeStyles.buttonsContainer}>
        <CustomButton
          onPress={() => navigation.navigate('Login')}
          text={t('welcome.login')}
          type="primary"
          dimension="large"
          width={345}
        />

        <CustomButton
          onPress={() => navigation.navigate('SignUp')}
          text={t('welcome.signUp')}
          type="secondary"
          dimension="large"
          width={345}
        />

        <View style={welcomeStyles.dividerContainer}>
          <Text style={welcomeStyles.dividerText}>{t('welcome.or')}</Text>
        </View>

        <CustomButton
          onPress={() => signInWithGoogle(navigation)}
          text={t('welcome.continueWithGoogle')}
          Icon={GoogleIcon}
          type="social"
          dimension="large"
          width={345}
        />

        {Platform.OS === 'ios' && (
          <CustomButton
            onPress={() => signInWithApple(navigation)}
            text={t('welcome.continueWithApple')}
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
