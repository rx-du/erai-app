import { Text, View } from 'react-native';
import { headerStyle } from './Styles';

import Icon from '../../Icons/anaphylaxis-24.svg';
import { useTheme } from '../../Theme/ThemeContext';

type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={headerStyle.container}>
      <Icon />
      <Text style={[headerStyle.text, { color: colors.Text.neutral.primary }]}>{title}</Text>
    </View>
  );
}
