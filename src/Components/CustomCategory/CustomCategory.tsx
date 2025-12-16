import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { SvgProps } from 'react-native-svg';
import { ReactNode } from 'react';

type CustomCategoryProps = {
  label?: string | ReactNode;
  icon?: React.FC<SvgProps>;
  onPress?: () => void;
  children?: React.ReactNode;
};

export default function CustomCategory({
  label,
  icon: Icon,
  children,
  onPress,
}: CustomCategoryProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors.Bg.primary, borderColor: colors.Divider.primary },
      ]}
    >
      {Icon && <Icon color={colors.Button.accent.primary} />}
      {label && <Text>{label}</Text>}
      {children}
    </TouchableOpacity>
  );
}
