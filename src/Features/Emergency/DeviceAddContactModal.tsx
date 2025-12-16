import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Contact } from 'react-native-contacts';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomModal } from '../../Components/CustomModal';

type Props = {
  visible: boolean;
  contacts: Contact[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeviceAddContactModal({
  visible,
  contacts,
  selected,
  onToggle,
  onCancel,
  onConfirm,
}: Props) {
  const { colors } = useTheme();

  return (
    <CustomModal
      title="Select contacts"
      visible={visible}
      onAction={onConfirm}
      onCancel={onCancel}
      actionName={`Add (${selected.size})`}
    >
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => {
          const phone = item.phoneNumbers?.[0]?.number || 'N/A';
          const isSelected = selected.has(item.recordID);
          return (
            <TouchableOpacity
              onPress={() => onToggle(item.recordID)}
              style={[
                styles.selectItem,
                {
                  backgroundColor: isSelected ? colors.Button.accent.secondary : 'transparent',
                  borderBottomColor: colors.Divider.primary,
                },
              ]}
            >
              <Text style={[styles.contactName, { color: colors.Text.neutral.primary }]}>
                {item.givenName} {item.familyName}
              </Text>
              <Text style={[styles.contactPhone, { color: colors.Text.neutral.secondary }]}>
                {phone}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={styles.contactList}
      />
    </CustomModal>
  );
}
