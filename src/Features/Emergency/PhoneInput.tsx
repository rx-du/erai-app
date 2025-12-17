import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { phoneInptuStyles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { useCountry } from '../../Hooks/useCountry';
import { ICountry } from 'react-native-international-phone-number';

type Props = {
  onPressCountry: () => void;
  phone: string;
  country: ICountry | null;
  onChangePhone: (v: string) => void;
};

export const PhoneInput = ({ onPressCountry, phone, onChangePhone, country }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[phoneInptuStyles.input, { backgroundColor: colors.Button.neutral.secondary }]}>
      <Text style={[phoneInptuStyles.text, { color: colors.Text.neutral.secondary }]}>
        Contact phone number
      </Text>

      <View style={phoneInptuStyles.phone}>
        <TouchableOpacity onPress={onPressCountry} style={phoneInptuStyles.prefixPhone}>
          <Text style={{ fontSize: 15 }}>{country?.flag}</Text>
          <Text style={[phoneInptuStyles.callingCodeText, { color: colors.Text.neutral.primary }]}>
            {country?.idd.root}
          </Text>
        </TouchableOpacity>

        <TextInput
          value={phone}
          onChangeText={onChangePhone}
          placeholder="000-000-0000"
          placeholderTextColor={colors.Text.neutral.tertiary}
          keyboardType="phone-pad"
          style={phoneInptuStyles.callingCodeText}
        />
      </View>
    </View>
  );
};
