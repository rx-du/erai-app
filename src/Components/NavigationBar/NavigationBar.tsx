import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './Styles';
import CustomVerticalButton from '../CustomVerticalButton/CustomVerticalButton';
import { RootTabParamList } from '../../Navigations/Navigations';

import PhoneIcon from '../../Icons/phone-filled-32.svg';
import LocationIcon from '../../Icons/location-filled-32.svg';
import AidIcon from '../../Icons/aid-filled-32.svg';
import AccountIcon from '../../Icons/account-filled-32.svg';
import NoHandsIcon from '../../Icons/no-hands-32.svg';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CustomButton } from '../CustomButton';
import { useTheme } from '../../Theme/ThemeContext';

export default function NavigationBar({ navigation, state }: BottomTabBarProps) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('Emergency');

  const handlePress = (tab: keyof RootTabParamList) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.Background, borderColor: colors.Divider.primary },
      ]}
    >
      <CustomVerticalButton
        label="Emergency"
        icon={PhoneIcon}
        onPress={() => handlePress('Emergency')}
        style={{
          color:
            activeTab === 'Emergency'
              ? colors.Button.accent.primary
              : colors.Button.neutral.quaternary,
        }}
      />
      <CustomVerticalButton
        label="Location"
        icon={LocationIcon}
        onPress={() => handlePress('Location')}
        style={{
          color:
            activeTab === 'Location'
              ? colors.Button.accent.primary
              : colors.Button.neutral.quaternary,
        }}
      />
      <CustomButton
        type="tertiary"
        onPress={() => {}}
        Icon={(props) => <NoHandsIcon {...props} color={colors.Text.neutral.white} />}
        width={48}
        style={{ backgroundColor: colors.Button.accent.primary }}
      />
      <CustomVerticalButton
        label="Aid"
        icon={AidIcon}
        onPress={() => handlePress('Aid')}
        style={{
          color:
            activeTab === 'Aid' ? colors.Button.accent.primary : colors.Button.neutral.quaternary,
        }}
      />
      <CustomVerticalButton
        label="Account"
        icon={AccountIcon}
        onPress={() => handlePress('Account')}
        style={{
          color:
            activeTab === 'Account'
              ? colors.Button.accent.primary
              : colors.Button.neutral.quaternary,
        }}
      />
    </View>
  );
}
