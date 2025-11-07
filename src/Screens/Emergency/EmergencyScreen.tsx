import React from 'react';
import { View, Text, Alert, Linking, TouchableOpacity } from 'react-native';
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
    Linking.openURL('tel:123');
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
        <TouchableOpacity onPress={handleCall} style={styles.emergencyButtonContainer}>
          <EmergencyIcon />
          <View style={styles.emergencyTextOverlay}>
            <Text style={styles.emergencyText}>SOS</Text>
          </View>
        </TouchableOpacity>

        <CustomButton
          type="tertiary"
          text={t('emergency.showAllContacts')}
          onPress={() => navigation.navigate('EmergencyContact')}
        />
      </View>
    </MainLayout>
  );
}
