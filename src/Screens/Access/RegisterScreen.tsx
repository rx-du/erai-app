import { useState } from 'react';
import { Text, View } from 'react-native';
import { Messages } from '../../Constants/Messages';
import { registerStyles } from './Styles';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';
import { CustomInput } from '../../Components/CustomInput';

export default function RegisterScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    navigation.navigate('SetPassword', { email });
  };

  return (
    <MainLayout>
      <View style={registerStyles.layout}>
        <View style={registerStyles.firstSection}>
          <View style={registerStyles.firstSubsection}>
            <Text style={[registerStyles.title, { color: colors.Text.neutral.primary }]}>
              {Messages.createNewAccount}
            </Text>
            <Text style={[registerStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {Messages.terms}
            </Text>
          </View>
          <View style={registerStyles.secondSubsection}>
            <CustomInput
              error={undefined}
              onChangeText={setEmail}
              value={email}
              name={'email'}
              placeholder={Messages.enterEmailAddress}
              onInputClick={() => {}}
              secureTextEntry={false}
            />
            <View style={registerStyles.chekbox}>
              {/* checkbox */}
              <Text style={[registerStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
                {Messages.educationalPurposes}
              </Text>
            </View>
            <CustomButton
              onPress={handleContinue}
              text="Continue"
              type="primary"
              dimension="large"
              width={123}
            />
          </View>
        </View>
        <View style={registerStyles.secondSection}>
          <CustomButton
            onPress={() => navigation.goBack()}
            text="Go back"
            type="tertiary"
            dimension="large"
            width={116}
          />
        </View>
      </View>
    </MainLayout>
  );
}
