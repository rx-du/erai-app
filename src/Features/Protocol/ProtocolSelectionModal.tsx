import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomDrawer } from '../../Components/CustomDrawer';
import ArrowIcon from '../../Icons/arrow-protocol.svg';

type Protocol = {
  id: string;
  title: string;
  ageRange: string;
  steps: any[];
};

type ProtocolSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  protocols: Protocol[];
  onSelectProtocol: (protocol: Protocol) => void;
  protocolTitle?: any;
};

export default function ProtocolSelectionModal({
  visible,
  onClose,
  protocols,
  onSelectProtocol,
  protocolTitle,
}: ProtocolSelectionModalProps) {
  const { colors } = useTheme();

  const handleSelectProtocol = (protocol: Protocol) => {
    onSelectProtocol(protocol);
    onClose();
  };

  return (
    <CustomDrawer isVisible={visible} onClose={onClose} title={protocolTitle} isSmallDrawer>
      <ScrollView style={styles.protocolList} showsVerticalScrollIndicator={false}>
        {protocols.map((protocol) => (
          <TouchableOpacity
            key={protocol.id}
            style={[
              styles.protocolItem,
              {
                backgroundColor: colors.Bg.pure,
              },
            ]}
            onPress={() => handleSelectProtocol(protocol)}
          >
            <View style={styles.protocolInfo}>
              <Text style={[styles.protocolTitle, { color: colors.Text.neutral.primary }]}>
                {protocol.title}
              </Text>
              {protocol.ageRange && (
                <Text style={[styles.protocolAge, { color: colors.Text.neutral.secondary }]}>
                  {protocol.ageRange}
                </Text>
              )}
            </View>
            <ArrowIcon />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CustomDrawer>
  );
}

const styles = StyleSheet.create({
  protocolList: {
    paddingHorizontal: 24,
  },
  protocolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingRight: 24,
    paddingLeft: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  protocolInfo: {
    gap: 8,
  },
  protocolTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
  protocolAge: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
});
