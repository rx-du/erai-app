import { Text, View } from 'react-native';
import { Styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

type DrawerHeaderProps = {
  title?: string;
  header?: React.ReactNode;
  onClose?: () => void;
};

export function DrawerHeader({ title, header, onClose }: DrawerHeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={Styles.headerTitleContainer}>
      {title && !header && <Text style={{ color: colors.Text.neutral.secondary }}>{title}</Text>}
      {header}
    </View>
  );
}
