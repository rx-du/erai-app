import { Linking, Text, View } from 'react-native';
import { noPermissionStyles } from './Styles';
import { CustomButton } from '../../Components/CustomButton';
import { Messages } from '../../Constants/Messages';
import { useTheme } from '../../Theme/ThemeContext';
import { MainLayout } from '../Layout/MainLayout';

import NoLocationIcon from '../../Icons/no-location-48.svg';

export default function NoPermissionScreen() {
  const { colors } = useTheme();

  return (
    <MainLayout>
      <View style={noPermissionStyles.container}>
        <View style={noPermissionStyles.subContainer}>
          <NoLocationIcon color={colors.Text.neutral.primary} />
          <View style={noPermissionStyles.textContainer}>
            <Text style={[noPermissionStyles.title, { color: colors.Text.neutral.primary }]}>
              {Messages.turnOnPermission}
            </Text>
            <Text style={[noPermissionStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {Messages.allowLocation}
            </Text>
          </View>
        </View>
        <CustomButton
          type="tertiary"
          text="Open phone's settings"
          onPress={() => Linking.openSettings()}
          width={200}
        />
      </View>
    </MainLayout>
  );
}
