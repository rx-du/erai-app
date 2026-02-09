import React from 'react';
import { View, Text } from 'react-native';
import { CustomDrawer } from '../../Components/CustomDrawer';
import CustomCategory from '../../Components/CustomCategory/CustomCategory';
import { contentStyle, stepFlowStyle } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import NoHandsIcon from '../../Icons/no-hands.svg';
import XIcon from '../../Icons/x-icon.svg';

type ProtocolMenuProps = {
  isVisible: boolean;
  onClose: () => void;
  onNoHandsMode: () => void;
  onEndProtocol: () => void;
  protocolTitle: string;
  icon: any;
};

export default function ProtocolMenu({
  isVisible,
  onClose,
  onNoHandsMode,
  onEndProtocol,
  protocolTitle,
  icon: Icon,
}: ProtocolMenuProps) {
  const { colors } = useTheme();

  return (
    <CustomDrawer
      isVisible={isVisible}
      header={
        <View style={stepFlowStyle.endProtocolModalHeader}>
          <Icon color={colors.Text.accent.primary} />
          <Text style={[contentStyle.contentSection, { color: colors.Text.neutral.secondary }]}>
            {protocolTitle}
          </Text>
        </View>
      }
      onClose={onClose}
      isSmallDrawer
    >
      <View
        style={{
          paddingHorizontal: 24,
          gap: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
      >
        {/* <CustomCategory
          children={
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.Text.neutral.secondary }}>No hands mode</Text>
              <NoHandsIcon color={colors.Text.accent.primary} />
            </View>
          }
          onPress={onNoHandsMode}
        /> */}

        <CustomCategory
          children={
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.Text.neutral.secondary }}>End protocol</Text>
              <XIcon color={colors.Text.accent.primary} />
            </View>
          }
          onPress={onEndProtocol}
        />
      </View>
    </CustomDrawer>
  );
}
