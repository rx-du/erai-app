import React from 'react';
import { View, Text, Alert } from 'react-native';
import { MainLayout } from '../Layout/MainLayout';
import { styles } from './Styles';

import HomeIcon from '../../Icons/home-button.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';

export default function EmergencyScreen({ navigation }: any) {
  const { colors } = useTheme();

  const handleCall = () => {
    Alert.alert('Calling 911...', 'Pretend to dial emergency number');
    // Linking.openURL('tel:911')
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
          What is your emergency?
        </Text>

        <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
          Hold the button bellow and help will reach you soon
        </Text>

        <HomeIcon />

        <CustomButton type="tertiary" text="Show all emergency contacts" onPress={() => {}} />
      </View>
    </MainLayout>
  );
}
