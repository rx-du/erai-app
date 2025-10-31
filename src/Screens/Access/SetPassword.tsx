import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../Layout/MainLayout';
import { CustomButton } from '../../Components/CustomButton';
import { CustomInput } from '../../Components/CustomInput';
import { loginStyles, registerStyles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

export default function SetPasswordScreen({ route, navigation }: any) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [serverError, setServerError] = useState('');
  const [shouldDisplayError, setShouldDisplayError] = useState(false);
  const messageError = serverError || t('signUp.passwordNotMatch');

  const handleSetPassword = async () => {
    if (password !== confirm) {
      setShouldDisplayError(true);
      return;
    }
    // TODO replace supabase

    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: 'aidapp://auth/callback',
    //   },
    // });

    // if (data?.user?.identities?.length == 0) {
    //   setServerError('An account with this email already exists.');
    //   setShouldDisplayError(true);
    //   return;
    // }

    // if (error) {
    //   setServerError(error.message);
    //   return;
    // }

    Alert.alert('Confirm your email', 'We sent a confirmation link to your email.');
    navigation.navigate('Welcome');
  };

  return (
    <MainLayout>
      <View style={registerStyles.layout}>
        <View style={registerStyles.firstSection}>
          <View style={registerStyles.firstSubsection}>
            <Text style={[registerStyles.title, { color: colors.Text.neutral.primary }]}>
              {t('signUp.setPassword')}
            </Text>
            <Text style={[registerStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {t('signUp.setPasswordCriteria')}
            </Text>
            <Text style={[registerStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {t('signUp.setPasswordAdvice')}
            </Text>
            {shouldDisplayError && (
              <Text style={[loginStyles.errorText, { color: colors.Text.accent.primary }]}>
                {messageError}
              </Text>
            )}
          </View>
          <View style={[registerStyles.secondSubsection, { gap: 0 }]}>
            <CustomInput
              error={undefined}
              onChangeText={setPassword}
              value={password}
              name={'password'}
              placeholder={t('signUp.password')}
              onInputClick={() => {}}
              secureTextEntry={false}
            />
            <CustomInput
              error={undefined}
              onChangeText={setConfirm}
              value={confirm}
              name={'password'}
              placeholder={t('signUp.confirmPassword')}
              onInputClick={() => {}}
              secureTextEntry={false}
            />
            <CustomButton
              onPress={handleSetPassword}
              text={t('signUp.continue')}
              type="primary"
              dimension="large"
              width={123}
            />
          </View>
        </View>
        <View style={registerStyles.secondSection}>
          <CustomButton
            onPress={() => navigation.navigate('Welcome')}
            text={t('common.cancel')}
            type="tertiary"
            dimension="large"
            width={116}
          />
        </View>
      </View>
    </MainLayout>
  );
}
