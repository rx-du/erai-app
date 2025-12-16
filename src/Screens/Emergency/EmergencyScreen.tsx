import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../Layout/MainLayout';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';
import { EmergencyButton } from '../../Features/Emergency/EmergencyButton';
import { useLoading } from '../../Context/LoadingContext';
import { useCountry } from '../../Hooks/useCountry';
import { EMERGENCY_NUMBERS } from './Helper';

export default function EmergencyScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const { countryCode } = useCountry('US');
  const [emergencyNumber, setEmergencyNumber] = useState(EMERGENCY_NUMBERS[countryCode]?.police);

  useEffect(() => {
    showLoading('Loading...');

    const emergency = EMERGENCY_NUMBERS[countryCode];
    if (emergency) {
      setEmergencyNumber(emergency.police);
    }

    const timer = setTimeout(() => {
      hideLoading();
    }, 500);

    return () => {
      clearTimeout(timer);
      hideLoading();
    };
  }, []);

  const handleShowAllContacts = () => {
    showLoading('Loading...');

    setTimeout(() => {
      navigation.navigate('EmergencyContact');
      hideLoading();
    }, 300);
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
            {t('emergency.whatIsEmergency')}
          </Text>

          <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
            {t('emergency.holdButton')}
          </Text>
        </View>

        <EmergencyButton emergencyNumber={emergencyNumber} />

        <CustomButton
          type="tertiary"
          text={t('emergency.showAllContacts')}
          onPress={handleShowAllContacts}
        />
      </View>
    </MainLayout>
  );
}
