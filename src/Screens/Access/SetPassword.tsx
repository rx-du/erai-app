import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { MainLayout } from '../Layout/MainLayout';
import { CustomButton } from '../../Components/CustomButton';
import { CustomInput } from '../../Components/CustomInput';
import { Messages } from '../../Constants/Messages';
import { loginStyles, registerStyles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

export default function SetPasswordScreen({ route, navigation }: any) {
  const { colors } = useTheme();

  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [serverError, setServerError] = useState('');
  const [shouldDisplayError, setShouldDisplayError] = useState(false);
  const messageError = serverError || Messages.passwordNotMatch;

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
              {Messages.setPassword}
            </Text>
            <Text style={[registerStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {Messages.setPasswordCriteria}
            </Text>
            <Text style={[registerStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {Messages.setPasswordAdvice}
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
              placeholder={Messages.enterPassword}
              onInputClick={() => {}}
              secureTextEntry={false}
            />
            <CustomInput
              error={undefined}
              onChangeText={setConfirm}
              value={confirm}
              name={'password'}
              placeholder={Messages.confirmPassword}
              onInputClick={() => {}}
              secureTextEntry={false}
            />
            <CustomButton
              onPress={handleSetPassword}
              text="Continue"
              type="primary"
              dimension="large"
              width={123}
            />
          </View>
        </View>
        <View style={registerStyles.secondSection}>
          <CustomButton
            onPress={() => navigation.navigate('Welcome')}
            text="Cancel"
            type="tertiary"
            dimension="large"
            width={116}
          />
        </View>
      </View>
    </MainLayout>
  );
}
