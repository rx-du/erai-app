import React from 'react';
import { useTheme } from '../../Theme/ThemeContext';
import NoHandsModeIcon from '../../Icons/no-hands-40.svg';
import { CustomModal } from '../../Components/CustomModal';
import { Text } from 'react-native';

type NoServiceModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function NoHandsModeModal({ visible, onClose }: NoServiceModalProps) {
  const { colors } = useTheme();

  return (
    <CustomModal
      icon={NoHandsModeIcon}
      title="No hands mode"
      subtitle="Increase the volume to hear the app’s guidance, then speak to navigate."
      firstText={
        <Text style={{ color: colors.Text.accent.secondary }}>Upcoming feature, stay tuned!</Text>
      }
      visible={visible}
      onCancel={onClose}
    />
  );
}
