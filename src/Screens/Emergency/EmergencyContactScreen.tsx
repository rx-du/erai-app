import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import Modal from 'react-native-modal';
import Contacts, { Contact } from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneIcon from '../../Icons/phone-filled-24.svg';
import AddIcon from '../../Icons/add-24.svg';
import BackIcon from '../../Icons/back-24.svg';
import DeleteIcon from '../../Icons/delete-24.svg';

import { contactStyles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import { CustomButton } from '../../Components/CustomButton';
import AddEmergencyContactModal from '../../Features/Emergency/AddEmergencyContactModal';
import { MainLayout } from '../Layout/MainLayout';

const EMERGENCY_CONTACTS_KEY = '@emergency_contacts';

type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  fromDevice: boolean;
};

export default function EmergencyContactsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [deviceContacts, setDeviceContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isManualVisible, setIsManualVisible] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(EMERGENCY_CONTACTS_KEY);
      if (saved) setContacts(JSON.parse(saved));
    })();
  }, []);

  const saveContacts = async (newContacts: EmergencyContact[]) => {
    setContacts(newContacts);
    await AsyncStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(newContacts));
  };

  const loadDeviceContacts = async () => {
    const perm = await Contacts.requestPermission();
    if (perm !== 'authorized') return;

    const all = await Contacts.getAll();
    const filtered = all.filter((c) => c.phoneNumbers?.length > 0);

    setDeviceContacts(filtered);
    setIsSelectVisible(true);
  };

  const handleManualAdd = async (name: string, phone: string) => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name,
      phone,
      fromDevice: false,
    };
    console.log(newContact);
    await saveContacts([...contacts, newContact]);
    setIsManualVisible(false);
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const confirmSelection = async () => {
    const selectedContacts = deviceContacts
      .filter((c) => selected.has(c.recordID))
      .map((c) => ({
        id: c.recordID,
        name: `${c.givenName ?? ''} ${c.familyName ?? ''}`.trim() || 'Unknown',
        phone: c.phoneNumbers?.[0]?.number ?? '',
        fromDevice: true,
      }));

    await saveContacts([...contacts, ...selectedContacts]);
    setSelected(new Set());
    setIsSelectVisible(false);
  };

  const callNumber = (num: string) => Linking.openURL(`tel:${num}`);

  const handleDelete = async (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    await saveContacts(updatedContacts);
  };

  return (
    <MainLayout>
      <View style={contactStyles.header}>
        <View style={contactStyles.headerActions}>
          <CustomButton
            onPress={() => navigation.goBack()}
            Icon={BackIcon}
            type="tertiary"
            dimension="large"
            width={24}
          />

          <CustomButton
            onPress={() => setIsDropdownVisible((v) => !v)}
            Icon={AddIcon}
            type="tertiary"
            dimension="large"
            width={24}
          />
        </View>

        {isDropdownVisible && (
          <View pointerEvents="auto" style={contactStyles.dropdown}>
            <TouchableOpacity
              style={contactStyles.dropdownItem}
              onPress={() => {
                setIsDropdownVisible(false);
                setIsManualVisible(true);
              }}
            >
              <Text>Add manually</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={contactStyles.dropdownItem}
              onPress={() => {
                setIsDropdownVisible(false);
                loadDeviceContacts();
              }}
            >
              <Text>Import from phone</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={[contactStyles.headerText, { color: colors.Text.neutral.primary }]}>
          All emergency contacts
        </Text>
      </View>

      {contacts.length > 0 && (
        <FlatList
          contentContainerStyle={contactStyles.content}
          data={contacts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={[contactStyles.row, { borderBottomColor: colors.Divider.primary }]}>
              <View style={{ flex: 1 }}>
                <Text style={[contactStyles.deviceName, { color: colors.Text.neutral.primary }]}>
                  {item.name}
                </Text>
                <Text style={[contactStyles.phoneText, { color: colors.Text.neutral.secondary }]}>
                  {item.phone} {item.fromDevice ? '(from device)' : ''}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <CustomButton
                  type="social"
                  Icon={(props) => <PhoneIcon {...props} color={colors.Text.accent.primary} />}
                  onPress={() => callNumber(item.phone)}
                  width={42}
                  style={{ backgroundColor: colors.Button.accent.secondary }}
                  dimension="medium"
                />

                <CustomButton
                  type="social"
                  Icon={(props) => <DeleteIcon {...props} color={colors.Text.accent.primary} />}
                  onPress={() => handleDelete(item.id)}
                  width={42}
                  style={{ backgroundColor: colors.Button.accent.secondary }}
                  dimension="medium"
                />
              </View>
            </View>
          )}
        />
      )}

      <AddEmergencyContactModal
        visible={isManualVisible}
        onCancel={() => setIsManualVisible(false)}
        onAdd={handleManualAdd}
      />

      <Modal isVisible={isSelectVisible} useNativeDriver={false}>
        <View style={[contactStyles.modal, { maxHeight: '80%' }]}>
          <View style={contactStyles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setSelected(new Set());
                setIsSelectVisible(false);
              }}
              style={contactStyles.backButton}
            >
              <Text style={contactStyles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={contactStyles.modalTitle}>Select contacts</Text>
            <View style={{ width: 60 }} />
          </View>

          <Text style={contactStyles.selectionCount}>{selected.size} selected</Text>

          <FlatList
            data={deviceContacts}
            keyExtractor={(i) => i.recordID}
            renderItem={({ item }) => {
              const phone = item.phoneNumbers?.[0]?.number || 'N/A';
              const isSelected = selected.has(item.recordID);
              return (
                <TouchableOpacity
                  onPress={() => toggle(item.recordID)}
                  style={[
                    contactStyles.selectItem,
                    { backgroundColor: isSelected ? '#E53E3E22' : 'transparent' },
                  ]}
                >
                  <Text style={contactStyles.deviceName}>
                    {item.givenName} {item.familyName}
                  </Text>
                  <Text style={contactStyles.phoneText}>{phone}</Text>
                </TouchableOpacity>
              );
            }}
            style={{ maxHeight: 400 }}
          />

          <TouchableOpacity
            style={[contactStyles.confirmBtn, { opacity: selected.size === 0 ? 0.4 : 1 }]}
            disabled={selected.size === 0}
            onPress={confirmSelection}
          >
            <Text style={contactStyles.confirmText}>
              Add {selected.size > 0 ? `(${selected.size})` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </MainLayout>
  );
}
