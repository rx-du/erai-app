import React from 'react';
import EditIcon from '../../Icons/edit-profile-48.svg';
import { CustomModal } from '../../Components/CustomModal';

type Props = {
  visible: boolean;
  onCancel: () => void;
};

export default function InformEditContactModal({ visible, onCancel }: Props) {
  return (
    <CustomModal
      visible={visible}
      title="Editing an emergency contact"
      subtitle="Tap on an emergency contact from the list to update its name and phone number."
      onCancel={onCancel}
      icon={EditIcon}
    />
  );
}
