import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProtocol } from '../../Context/ProtocolContext';
import { useTheme } from '../../Theme/ThemeContext';
import { stepFlowStyle } from './Styles';
import { RootStackParamList } from '../../Navigations/Navigations';
import UpArrow from '../../Icons/arrow-up.svg';
import PointsIcon from '../../Icons/points.svg';
import ProtocolMenu from './ProtocolMenu';
import { NoHandsModeModal } from '../Emergency/NoHandsModeModal';

export default function MinimizedProtocolOverlay() {
  const { protocolState, setProtocolMinimized, clearProtocol } = useProtocol();
  const { colors } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNoHandModeModal, setShowNoHandModeModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!protocolState.protocolId || !protocolState.isMinimized) {
    return null;
  }

  const handleExpand = () => {
    setProtocolMinimized(false);
    navigation.navigate('ProtocolStep', {
      protocolData: protocolState.protocolData,
      icon: protocolState.icon,
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNoHandsMode = () => {
    setIsDropdownOpen(false);

    setTimeout(() => {
      setShowNoHandModeModal(true);
    }, 500);
  };

  const handleEndProtocol = () => {
    setIsDropdownOpen(false);
    clearProtocol();
    navigation.navigate('MainTabs', { screen: 'Aid' });
  };

  return (
    <View style={stepFlowStyle.minimizedContainer}>
      <View style={[stepFlowStyle.minimizedCard, { backgroundColor: colors.Bg.pure }]}>
        <View style={{ gap: 4, flex: 1 }}>
          <Text style={[stepFlowStyle.minimizedTitle, { color: colors.Text.accent.primary }]}>
            {protocolState.protocolData?.title || protocolState.protocolId}
          </Text>

          <Text style={[stepFlowStyle.minimizedSubtitle, { color: colors.Text.accent.secondary }]}>
            In progress
          </Text>
        </View>

        <View style={stepFlowStyle.minimizedIconsContainer}>
          <TouchableOpacity onPress={handleDropdownToggle} activeOpacity={0.7}>
            <PointsIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExpand}>
            <UpArrow />
          </TouchableOpacity>
        </View>
      </View>

      <ProtocolMenu
        isVisible={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onNoHandsMode={handleNoHandsMode}
        onEndProtocol={handleEndProtocol}
        protocolTitle={protocolState.protocolData?.title || protocolState.protocolId}
        icon={protocolState.icon}
      />

      <NoHandsModeModal
        visible={showNoHandModeModal}
        onClose={() => setShowNoHandModeModal(false)}
      />
    </View>
  );
}
