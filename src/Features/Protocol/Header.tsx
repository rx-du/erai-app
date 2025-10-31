import { Text, View } from 'react-native';
import { headerStyle } from './Styles';
import BackIcon from '../../Icons/back-24.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';

type HeaderProps = {
  title?: string;
  Icon?: FC<SvgProps>;
};

export default function Header({ title, Icon }: HeaderProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={headerStyle.container}>
      <BackIcon
        color={colors.Button.accent.primary}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={headerStyle.subContainer}>
        {Icon && <Icon color={colors.Text.neutral.primary} />}
        <Text style={[headerStyle.text, { color: colors.Text.neutral.primary }]}>{title}</Text>
      </View>
    </View>
  );
}
