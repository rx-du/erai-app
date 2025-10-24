import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { styles } from './Styles';

type Props = {
  label: string;
  icon: React.FC<SvgProps>;
  onPress?: () => void;
  style?: ViewStyle | (ViewStyle & SvgProps);
  width?: number;
};

export default function CustomVerticalButton({
  label,
  icon: Icon,
  onPress,
  style,
  width = 64,
}: Props) {
  return (
    <TouchableOpacity style={[styles.container, { width }]} onPress={onPress} activeOpacity={0.7}>
      <Icon {...(style as object)} />
      <Text style={[styles.text, style]}>{label}</Text>
    </TouchableOpacity>
  );
}
