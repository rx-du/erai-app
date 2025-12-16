import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../Components/CustomButton';
import { MainLayout } from '../Layout/MainLayout';

import HeaderIconFirst from '../../Icons/hello-vector.svg';
import AppleIcon from '../../Icons/apple-24.svg';
import GoogleIcon from '../../Icons/google-24.svg';
import { welcomeStyles } from './Styles';
import { signInWithGoogle } from '../../Features/Auth/Services/GoogleLogin';
import { signInWithApple } from '../../Features/Auth/Services/AppleLogin';
import { useTheme } from '../../Theme/ThemeContext';
import { isAndroid } from '../../Constants/Device';

export default function WelcomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { height } = Dimensions.get('window');

  const translateValue = isAndroid ? -height * 0.2 : -height * 0.1;

  return (
    <MainLayout>
      <View style={[welcomeStyles.mainContainer, { transform: [{ translateY: translateValue }] }]}>
        <HeaderIconFirst />

        <View style={welcomeStyles.container}>
          <View style={welcomeStyles.textContainer}>
            <Text style={[welcomeStyles.title, { color: colors.Text.neutral.primary }]}>
              {t('welcome.title')}
            </Text>
            <Text style={[welcomeStyles.subtitle, { color: colors.Text.neutral.secondary }]}>
              {t('welcome.subtitle')}
            </Text>
          </View>

          <View style={welcomeStyles.buttonsContainer}>
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
          <View style={welcomeStyles.textContainer}>
            <Text style={[welcomeStyles.servicesText, { color: colors.Text.neutral.secondary }]}>
              By continuing, you agree to the{' '}
              <Text
                style={{ color: colors.Button.accent.primary }}
                onPress={() => navigation.navigate('TermsOfService')}
              >
                Terms of Service
              </Text>{' '}
              and aknowledge the{' '}
              <Text
                style={{ color: colors.Button.accent.primary }}
                onPress={() => navigation.navigate('PrivacyPolicy')}
              >
                Privacy Policy
              </Text>
              .
            </Text>

            <Text style={[welcomeStyles.servicesText, { color: colors.Text.neutral.secondary }]}>
              I understand that this app is designed for{' '}
              <Text
                style={{ color: colors.Button.accent.primary }}
                onPress={() => navigation.navigate('EducationalPurposes')}
              >
                Educational Purposes Only
              </Text>
              .
            </Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
