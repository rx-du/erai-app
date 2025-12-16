import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { PhoneInput } from './PhoneInput';
import { useCountry } from '../../Hooks/useCountry';
import { getAllCountries, ICountry } from 'react-native-international-phone-number';
import { CustomDrawer } from '../../Components/CustomDrawer';
import { CustomModal } from '../../Components/CustomModal';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onAdd: (name: string, phone: string) => void;
  initialName?: string;
  initialPhone?: string;
  mode?: 'add' | 'edit';
  onModalHide?: () => void;
};

export default function ManualAddContactModal({
  visible,
  onCancel,
  onAdd,
  initialName = '',
  initialPhone = '',
  mode = 'add',
  onModalHide,
}: Props) {
  const { colors } = useTheme();

  const { country: defaultCountry } = useCountry('US');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<ICountry | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (defaultCountry) {
      setCountry(defaultCountry);
    }

    if (visible) {
      setName(initialName);
      setPhone(initialPhone.replace(/^\+\d+\s*/, ''));
    }
  }, [defaultCountry, visible, initialName, initialPhone]);

  const isFormValid = name.trim().length > 0 && phone.trim().length > 0;

  const handleAdd = () => {
    onAdd(name, country?.idd.root + ' ' + phone);
    setName('');
    setPhone('');
  };

  const handleCancel = () => {
    onCancel();
    setName('');
    setPhone('');
  };

  return (
    <CustomModal
      visible={visible}
      title={mode === 'edit' ? 'Edit emergency contact' : 'Add new emergency contact'}
      actionName={mode === 'edit' ? 'Edit' : 'Add'}
      onCancel={handleCancel}
      onAction={handleAdd}
      onModalHide={onModalHide}
      isFormValid={isFormValid}
    >
      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, { backgroundColor: colors.Button.neutral.secondary }]}>
          <Text style={[styles.label, { color: colors.Text.neutral.secondary }]}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor={colors.Text.neutral.tertiary}
            value={name}
            onChangeText={setName}
          />
        </View>

        <PhoneInput
          onPressCountry={() => setShowPicker(true)}
          phone={phone}
          country={country}
          onChangePhone={setPhone}
        />

        <CustomDrawer
          isVisible={showPicker}
          title="Choose country"
          onClose={() => {
            setShowPicker(false);
          }}
        >
          <ScrollView style={{ paddingHorizontal: 16 }}>
            {getAllCountries().map((countryItem, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setCountry(countryItem);
                  setShowPicker(false);
                }}
                style={[styles.item, { borderBottomColor: colors.Divider.primary }]}
              >
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Text style={styles.itemText}>{countryItem.flag}</Text>

                  <Text style={[styles.itemText, { color: colors.Text.neutral.primary }]}>
                    {countryItem.name.common}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </CustomDrawer>
      </View>
    </CustomModal>
  );
}
