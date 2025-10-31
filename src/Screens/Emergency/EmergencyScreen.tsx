import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../Layout/MainLayout';
import { styles } from './Styles';

import EmergencyIcon from '../../Icons/emergency-button.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';

export default function EmergencyScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleCall = () => {
    Alert.alert(t('emergency.calling'), 'Pretend to dial emergency number');
    // Linking.openURL('tel:911')
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
          {t('emergency.whatIsEmergency')}
        </Text>

        <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
          {t('emergency.holdButton')}
        </Text>

        <EmergencyIcon />

        <CustomButton type="tertiary" text={t('emergency.showAllContacts')} onPress={() => {}} />
      </View>
    </MainLayout>
  );
}
