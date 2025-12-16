import React, { useState } from 'react';
import { View, Text, Linking, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { NoServiceModal } from './NoServiceModal';
import { emergencyButtonStyles } from './Styles';

type EmergencyButtonProps = {
  emergencyNumber: string;
};

export function EmergencyButton({ emergencyNumber }: EmergencyButtonProps) {
  const { colors } = useTheme();
  const [showNoServiceModal, setShowNoServiceModal] = useState(false);

  const makeEmergencyCall = async () => {
    try {
      const canOpen = await Linking.canOpenURL(`tel:${emergencyNumber}`);
      if (canOpen) {
        await Linking.openURL(`tel:${emergencyNumber}`);
      } else {
        setShowNoServiceModal(true);
      }
    } catch (error) {
      setShowNoServiceModal(true);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={makeEmergencyCall}>
        <View style={{ position: 'relative' }}>
          <Image source={require('../../Icons/emergency-button.png')} />
          <View style={emergencyButtonStyles.emergencyTextOverlay}>
            <Text style={[emergencyButtonStyles.emergencyText, { color: colors.Bg.pure }]}>
              {emergencyNumber}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <NoServiceModal visible={showNoServiceModal} onClose={() => setShowNoServiceModal(false)} />
    </>
  );
}
