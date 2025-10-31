import { Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { SvgProps } from 'react-native-svg';

type CustomCategoryProps = {
  label: string;
  icon: React.FC<SvgProps>;
  onPress?: () => void;
};

export default function CustomCategory({ label, icon: Icon, onPress }: CustomCategoryProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors.Bg.primary, borderColor: colors.Divider.primary },
      ]}
    >
      <Icon color={colors.Button.accent.primary} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
