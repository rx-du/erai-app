import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (name: string, phone: string) => void;
};

export default function AddEmergencyContactModal({ visible, onCancel, onAdd }: Props) {
  const { colors } = useTheme();
  const phoneInputRef = useRef<PhoneInput>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = () => {
    if (!name || !phone) return;
    onAdd(name.trim(), phone.trim());
    setName('');
    setPhone('');
  };

  return (
    <Modal isVisible={visible} useNativeDriver backdropOpacity={0.4} onBackdropPress={onCancel}>
      <View style={[styles.container, { backgroundColor: colors.Bg.primary }]}>
        <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
          Add new emergency contact
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.Button.neutral.secondary }]}
          placeholder="Contact name"
          placeholderTextColor={colors.Text.neutral.secondary}
          value={name}
          onChangeText={setName}
        />

        <PhoneInput
          ref={phoneInputRef}
          defaultCode="US"
          layout="second"
          containerStyle={[
            styles.phoneContainer,
            { backgroundColor: colors.Button.neutral.secondary },
          ]}
          textContainerStyle={[
            styles.phoneTextContainer,
            { backgroundColor: colors.Button.neutral.secondary },
          ]}
          textInputProps={{
            placeholder: 'Contact phone number',
            placeholderTextColor: colors.Text.neutral.secondary,
          }}
          onChangeFormattedText={(v) => setPhone(v)}
        />

        <View style={styles.buttons}>
          <CustomButton onPress={onCancel} text={'Cancel'} type="primary" width={120} />
          <CustomButton
            onPress={() => onAdd(name, phone)}
            text={'Add'}
            type="primary"
            width={120}
          />
        </View>
      </View>
    </Modal>
  );
}
