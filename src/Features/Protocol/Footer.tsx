import { Text, TouchableOpacity, View } from 'react-native';
import { footerStyle } from './Styles';

import NoHands from '../../Icons/no-hands-32.svg';
import Clock from '../../Icons/clock.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import { FC, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import { NoHandsModeModal } from '../Emergency/NoHandsModeModal';

type FooterProps = {
  protocolData: any;
  icon: FC<SvgProps>;
  onChooseProtocol?: () => void;
};

export default function Footer({ protocolData, icon, onChooseProtocol }: FooterProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showNoHandModeModal, setShowNoHandModeModal] = useState(false);

  const protocols = protocolData?.protocols || [];
  const hasMultipleProtocols = protocols.length > 1;

  return (
    <View style={footerStyle.container}>
      <TouchableOpacity
        style={[footerStyle.firstContainer, { backgroundColor: colors.Button.accent.secondary }]}
        onPress={() => setShowNoHandModeModal(true)}
      >
        <NoHands color={colors.Button.accent.primary} />
      </TouchableOpacity>
      {hasMultipleProtocols && onChooseProtocol ? (
        <TouchableOpacity
          style={[footerStyle.secondContainer, { backgroundColor: colors.Button.accent.primary }]}
          onPress={onChooseProtocol}
        >
          <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>
            Choose protocol
          </Text>
          <View style={footerStyle.badgeContainer}>
            <Text style={[footerStyle.badgeText, { color: colors.Text.neutral.white }]}>
              {protocols.length}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[footerStyle.secondContainer, { backgroundColor: colors.Button.accent.primary }]}
          onPress={() => {
            const singleProtocol = protocols.length === 1 ? protocols[0] : null;
            navigation.navigate('ProtocolStep', {
              protocolData: singleProtocol
                ? { ...protocolData, selectedProtocol: singleProtocol }
                : protocolData,
              icon: icon,
            });
          }}
        >
          <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>
            Start protocol
          </Text>
          <View style={footerStyle.timeContainer}>
            <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>15 min</Text>
            <Clock />
          </View>
        </TouchableOpacity>
      )}

      <NoHandsModeModal
        visible={showNoHandModeModal}
        onClose={() => setShowNoHandModeModal(false)}
      />
    </View>
  );
}
