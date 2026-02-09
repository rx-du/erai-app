import { Text, TouchableOpacity, View } from 'react-native';
import { footerStyle } from './Styles';

import NoHands from '../../Icons/no-hands-32.svg';
import Clock from '../../Icons/clock.svg';
import Locker from '../../Icons/locked-24.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import { FC, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import { NoHandsModeModal } from '../Emergency/NoHandsModeModal';
import { useSubscription } from '../../Context/SubscriptionContext';
import UpgradeSubscriptionDrawer from '../Subscription/UpgradeSubscriptionDrawer';

type FooterProps = {
  protocolData: any;
  icon: FC<SvgProps>;
  onChooseProtocol?: () => void;
};

export default function Footer({ protocolData, icon, onChooseProtocol }: FooterProps) {
  const { colors } = useTheme();
  const { subscriptionDetails } = useSubscription();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showNoHandModeModal, setShowNoHandModeModal] = useState(false);
  const [showUpgradeSubscription, setShowUpgradeSubscription] = useState(false);

  const protocols = protocolData?.protocols || [];
  const hasMultipleProtocols = protocols.length > 1;

  const isFreeUser = subscriptionDetails.currentPlan === null;

  const handleStartProtocol = () => {
    if (isFreeUser) {
      setShowUpgradeSubscription(true);
      return;
    }

    const singleProtocol = protocols.length === 1 ? protocols[0] : null;
    navigation.navigate('ProtocolStep', {
      protocolData: singleProtocol
        ? { ...protocolData, selectedProtocol: singleProtocol }
        : protocolData,
      icon: icon,
    });
  };

  return (
    <View style={footerStyle.container}>
      {/* <TouchableOpacity
        style={[footerStyle.firstContainer, { backgroundColor: colors.Button.accent.secondary }]}
        onPress={() => setShowNoHandModeModal(true)}
      >
        <NoHands color={colors.Button.accent.primary} />
      </TouchableOpacity> */}
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
          onPress={handleStartProtocol}
        >
          <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>
            Start protocol
          </Text>
          <View style={footerStyle.timeContainer}>
            <Text style={[footerStyle.text, { color: colors.Text.neutral.white }]}>15 min</Text>
            {isFreeUser ? <Locker color={colors.Text.neutral.white} /> : <Clock />}
          </View>
        </TouchableOpacity>
      )}

      {/* <NoHandsModeModal
        visible={showNoHandModeModal}
        onClose={() => setShowNoHandModeModal(false)}
      /> */}

      <UpgradeSubscriptionDrawer
        isVisible={showUpgradeSubscription}
        onClose={() => setShowUpgradeSubscription(false)}
      />
    </View>
  );
}
