import { Text, TouchableOpacity, View } from 'react-native';
import { footerStyle } from './Styles';

import NoHands from '../../Icons/no-hands-32.svg';
import Clock from '../../Icons/clock.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';

type FooterProps = {
  protocolData: string;
};

export default function Footer({ protocolData }: FooterProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={footerStyle.container}>
      <View
        style={[footerStyle.firstContainer, { backgroundColor: colors.Button.accent.secondary }]}
      >
        <NoHands color={colors.Button.accent.primary} />
      </View>
      <TouchableOpacity
        style={[footerStyle.secondContainer, { backgroundColor: colors.Button.accent.primary }]}
        onPress={() =>
          navigation.navigate('ProtocolStep', {
            protocolData: protocolData,
          })
        }
      >
        <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>Start protocol</Text>
        <View style={footerStyle.timeContainer}>
          <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>15 min</Text>
          <Clock />
        </View>
      </TouchableOpacity>
    </View>
  );
}
