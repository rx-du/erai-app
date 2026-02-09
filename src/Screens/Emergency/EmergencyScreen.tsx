import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainLayout } from '../Layout/MainLayout';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';
import { EmergencyButton } from '../../Features/Emergency/EmergencyButton';
import { useLoading } from '../../Context/LoadingContext';
import { EMERGENCY_NUMBERS } from './Helper';

export default function EmergencyScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const [emergencyNumber, setEmergencyNumber] = useState('911');

  useFocusEffect(
    useCallback(() => {
      const loadCountryAndUpdateNumber = async () => {
        try {
          const saved = await AsyncStorage.getItem('selectedCountry');
          let countryCode = 'US';

          if (saved) {
            const parsed = JSON.parse(saved);
            countryCode = parsed.cca2;
          }

          const emergency = EMERGENCY_NUMBERS[countryCode] || EMERGENCY_NUMBERS['US'];
          setEmergencyNumber(emergency.police);
        } catch (error) {
          console.error('Error loading country:', error);
          setEmergencyNumber('911');
        }

        const timer = setTimeout(() => {
          hideLoading();
        }, 500);

        return () => clearTimeout(timer);
      };

      loadCountryAndUpdateNumber();

      return () => {};
    }, [])
  );

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
