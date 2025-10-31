import { Linking, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { noPermissionStyles } from './Styles';
import { CustomButton } from '../../Components/CustomButton';
import { useTheme } from '../../Theme/ThemeContext';
import { MainLayout } from '../Layout/MainLayout';

import NoLocationIcon from '../../Icons/no-location-48.svg';

export default function NoPermissionScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <MainLayout>
      <View style={noPermissionStyles.container}>
        <View style={noPermissionStyles.subContainer}>
          <NoLocationIcon color={colors.Text.neutral.primary} />
          <View style={noPermissionStyles.textContainer}>
            <Text style={[noPermissionStyles.title, { color: colors.Text.neutral.primary }]}>
              {t('location.turnOnPermission')}
            </Text>
            <Text style={[noPermissionStyles.subTitle, { color: colors.Text.neutral.secondary }]}>
              {t('location.allowLocation')}
            </Text>
          </View>
        </View>
        <CustomButton
          type="tertiary"
          text={t('location.openSettings')}
          onPress={() => Linking.openSettings()}
          width={200}
        />
      </View>
    </MainLayout>
  );
}
