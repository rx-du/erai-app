import React from 'react';
import { useTheme } from '../../Theme/ThemeContext';
import NoServiceIcon from '../../Icons/no-service-48.svg';
import { CustomModal } from '../../Components/CustomModal';
import { Text } from 'react-native';

type NoServiceModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function NoServiceModal({ visible, onClose }: NoServiceModalProps) {
  const { colors } = useTheme();

  return (
    <CustomModal
      icon={NoServiceIcon}
      title="There's no service"
      subtitle="You are not able to make phone calls right now"
      visible={visible}
      onCancel={onClose}
    />
  );
}
