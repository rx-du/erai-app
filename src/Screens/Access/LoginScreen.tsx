import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Messages } from '../../Constants/Messages';
import { loginStyles } from './Styles';
import { LoginForm } from '../../Features/Auth/LoginForm';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';

export default function LoginScreen({ navigation }: any) {
  const { colors } = useTheme();
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [serverError, setServerError] = useState('');
  const errorValidation =
    form.formState.errors.username || form.formState.errors.password || serverError;
  const displayError = serverError || Messages.completeFields;
  const displayAccountLocked =
    serverError === Messages.tooManyFailedLoginAttempts
      ? Messages.accountLocked
      : Messages.tryAgain;

  const loginHandler = useCallback(
    async (data: any) => {
      setServerError('');

      let hasError = false;

      if (!data.username) {
        form.setError('username', { type: 'required', message: 'Email is required' });
        hasError = true;
      }

      if (!data.password) {
        form.setError('password', { type: 'required', message: 'Password is required' });
        hasError = true;
      }

      if (hasError) return;

      try {
        // TODO replace supabase
        // const { data: signInData, error } = await supabase.auth.signInWithPassword({
        //   email: data.username,
        //   password: data.password,
        // });
        // if (error) {
        //   console.error('Supabase login error:', error.message);
        //   setServerError(error.message);
        //   return;
        // }
        // if (signInData?.user) {
        //   navigation.replace('MainTabs');
        // } else {
        //   setServerError(Messages.tryAgain);
        // }
      } catch (err: any) {
        console.error(err);
        setServerError(err.message || Messages.tryAgain);
      }
    },
    [form, navigation]
  );

  return (
    <MainLayout>
      <View style={loginStyles.loginContainer}>
        <View style={loginStyles.firstContainer}>
          <Text style={[loginStyles.title, { color: colors.Text.neutral.primary }]}>
            {errorValidation ? displayAccountLocked : Messages.welcomeBack}
          </Text>
          {errorValidation && (
            <Text style={[loginStyles.errorText, { color: colors.Text.accent.primary }]}>
              {displayError}
            </Text>
          )}
        </View>

        <View style={loginStyles.formContainer}>
          <LoginForm form={form} onSubmit={loginHandler} />
        </View>

        <View style={loginStyles.secondContainer}>
          <CustomButton type="tertiary" text="Forgot password" onPress={() => {}} />
          <CustomButton type="tertiary" text="Go back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </MainLayout>
  );
}
