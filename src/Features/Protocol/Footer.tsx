import { Text, View } from 'react-native';
import { footerStyle } from './Styles';

import NoHands from '../../Icons/no-hands-32.svg';
import Clock from '../../Icons/clock.svg';
import { useTheme } from '../../Theme/ThemeContext';

export default function Footer() {
  const { colors } = useTheme();
  return (
    <View style={footerStyle.container}>
      <View
        style={[footerStyle.firstContainer, { backgroundColor: colors.Button.accent.secondary }]}
      >
        <NoHands color={colors.Button.accent.primary} />
      </View>
      <View
        style={[footerStyle.secondContainer, { backgroundColor: colors.Button.accent.primary }]}
      >
        <Text>Start protocol</Text>
        <View style={footerStyle.timeContainer}>
          <Text>15 min</Text>
          <Clock />
        </View>
      </View>
    </View>
  );
}
