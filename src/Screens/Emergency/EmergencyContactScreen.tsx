import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, Linking, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contactStyles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import { CustomButton } from '../../Components/CustomButton';
import ManualAddContactModal from '../../Features/Emergency/ManualAddContactModal';
import DeviceAddContactModal from '../../Features/Emergency/DeviceAddContactModal';
import { MainLayout } from '../Layout/MainLayout';
import { useCountry } from '../../Hooks/useCountry';
import InformEditContactModal from '../../Features/Emergency/InformEditContactModal';
import { NoServiceModal } from '../../Features/Emergency/NoServiceModal';
import { EmergencyContact, getDefaultEmergencyContactsByCountry } from './Helper';
import {
  EMERGENCY_CONTACTS_KEY,
  SHOWN_MANUAL_CONTACT_INFO_MODAL,
} from '../../Constants/StorageKeys';
import PhoneIcon from '../../Icons/phone-filled-24.svg';
import AddIcon from '../../Icons/add-24.svg';
import BackIcon from '../../Icons/back-24.svg';
import DeleteIcon from '../../Icons/delete-24.svg';
import { CustomModal } from '../../Components/CustomModal';
import { isAndroid } from '../../Constants/Device';

export default function EmergencyContactsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [deviceContacts, setDeviceContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isManualAddContactModalVisible, setIsManualAddContactModalVisible] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [nextAction, setNextAction] = useState<'manual' | 'contacts' | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<EmergencyContact | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [contactToEdit, setContactToEdit] = useState<EmergencyContact | null>(null);
  const [nextInfoAction, setNextInfoAction] = useState(false);
  const { countryCode } = useCountry('US');
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showNoServiceModal, setShowNoServiceModal] = useState(false);

  useEffect(() => {
    (async () => {
      const emergencyContacts = await AsyncStorage.getItem(EMERGENCY_CONTACTS_KEY);
      if (emergencyContacts) setContacts(JSON.parse(emergencyContacts));
    })();
  }, []);

  const defaultEmergencyContacts = useMemo(
    () => getDefaultEmergencyContactsByCountry(countryCode),
    [countryCode]
  );

  const saveContacts = async (newContacts: EmergencyContact[]) => {
    setContacts(newContacts);
    await AsyncStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(newContacts));
  };

  const requestContactsPermission = async () => {
    if (isAndroid) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    const perm = await Contacts.requestPermission();
    return perm === 'authorized';
  };

  const loadDeviceContacts = async () => {
    const allowed = await requestContactsPermission();

    if (!allowed) return;

    const all = await Contacts.getAll();
    const filtered = all.filter((c) => c.phoneNumbers?.length > 0);

    setDeviceContacts(filtered);
    setIsSelectVisible(true);
  };

  const handleManualAdd = async (name: string, phone: string) => {
    if (modalMode === 'edit' && contactToEdit) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === contactToEdit.id ? { ...contact, name, phone } : contact
      );

      await saveContacts(updatedContacts);
    } else {
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        name,
        phone,
        fromDevice: false,
      };
      await saveContacts([...contacts, newContact]);

      const shown = await AsyncStorage.getItem(SHOWN_MANUAL_CONTACT_INFO_MODAL);
      if (!shown) {
        setNextInfoAction(true);
      }
    }
    setIsManualAddContactModalVisible(false);
    setContactToEdit(null);
    setModalMode('add');
  };

  const handleEditClick = (contact: EmergencyContact) => {
    setContactToEdit(contact);
    setModalMode('edit');
    setIsManualAddContactModalVisible(true);
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
        id: `device_${c.recordID}_${Date.now()}`,
        name: `${c.givenName ?? ''} ${c.familyName ?? ''}`.trim() || 'Unknown',
        phone: c.phoneNumbers?.[0]?.number ?? '',
        fromDevice: true,
      }));

    await saveContacts([...contacts, ...selectedContacts]);
    setSelected(new Set());
    setIsSelectVisible(false);
  };

  const callNumber = async (num: string) => {
    try {
      const canOpen = await Linking.canOpenURL(`tel:${num}`);
      if (canOpen) {
        await Linking.openURL(`tel:${num}`);
      } else {
        setShowNoServiceModal(true);
      }
    } catch (error) {
      setShowNoServiceModal(true);
    }
  };

  const handleDeleteClick = (contact: EmergencyContact) => {
    setContactToDelete(contact);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDeleteModal = async () => {
    if (contactToDelete) {
      const updatedContacts = contacts.filter((contact) => contact.id !== contactToDelete.id);
      await saveContacts(updatedContacts);
    }
    setIsDeleteModalVisible(false);
    setContactToDelete(null);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setContactToDelete(null);
  };

  const handleInfoCancel = () => {
    setShowInfoPopup(false);
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
            onPress={() => setIsOptionsVisible(true)}
            Icon={AddIcon}
            type="tertiary"
            dimension="large"
            width={24}
          />
        </View>

        <Text style={[contactStyles.headerText, { color: colors.Text.neutral.primary }]}>
          All emergency contacts
        </Text>
      </View>

      <FlatList
        contentContainerStyle={contactStyles.content}
        data={[...defaultEmergencyContacts, ...contacts]}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => {
          const isSystem = item.id === 'police' || item.id === 'ambulance' || item.id === 'fire';

          return (
            <View style={[contactStyles.row, { borderBottomColor: colors.Divider.primary }]}>
              <TouchableOpacity
                style={{ flex: 1, gap: 4 }}
                onPress={() => !isSystem && handleEditClick(item)}
              >
                <Text
                  style={[
                    contactStyles.deviceName,
                    { color: isSystem ? colors.Text.accent.primary : colors.Text.neutral.primary },
                  ]}
                >
                  {item.name}
                </Text>

                <Text
                  style={[
                    contactStyles.phoneText,
                    {
                      color: isSystem ? colors.Text.accent.primary : colors.Text.neutral.secondary,
                    },
                  ]}
                >
                  {item.phone}
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', gap: 16 }}>
                {!isSystem && (
                  <CustomButton
                    type="social"
                    Icon={(props) => <DeleteIcon {...props} color={colors.Text.neutral.primary} />}
                    onPress={() => handleDeleteClick(item)}
                    width={42}
                    style={{ backgroundColor: colors.Button.neutral.secondary }}
                    dimension="medium"
                  />
                )}

                <CustomButton
                  type="social"
                  Icon={(props) => (
                    <PhoneIcon
                      {...props}
                      color={isSystem ? colors.Text.accent.primary : colors.Text.neutral.primary}
                    />
                  )}
                  onPress={() => callNumber(item.phone)}
                  width={42}
                  style={{ backgroundColor: colors.Button.neutral.secondary }}
                  dimension="medium"
                />
              </View>
            </View>
          );
        }}
      />

      <CustomModal
        visible={isOptionsVisible}
        title="Add new emergency contact"
        children={
          <View style={{ gap: 8 }}>
            <CustomButton
              type="social"
              text="Manually"
              width={250}
              onPress={() => {
                setNextAction('manual');
                setIsOptionsVisible(false);
              }}
            />
            <CustomButton
              type="social"
              text="Import from contacts"
              width={250}
              onPress={() => {
                setNextAction('contacts');
                setIsOptionsVisible(false);
              }}
            />
          </View>
        }
        onModalHide={() => {
          if (nextAction === 'manual') {
            setModalMode('add');
            setContactToEdit(null);
            setIsManualAddContactModalVisible(true);
          } else if (nextAction === 'contacts') {
            loadDeviceContacts();
          }
          setNextAction(null);
        }}
      />

      <DeviceAddContactModal
        visible={isSelectVisible}
        contacts={deviceContacts}
        selected={selected}
        onToggle={toggle}
        onCancel={() => {
          setSelected(new Set());
          setIsSelectVisible(false);
        }}
        onConfirm={confirmSelection}
      />

      <ManualAddContactModal
        visible={isManualAddContactModalVisible}
        onCancel={() => {
          setIsManualAddContactModalVisible(false);
          setContactToEdit(null);
          setModalMode('add');
        }}
        onModalHide={async () => {
          if (nextInfoAction) {
            setShowInfoPopup(true);
            await AsyncStorage.setItem(SHOWN_MANUAL_CONTACT_INFO_MODAL, 'true');
            setNextInfoAction(false);
          }
        }}
        onAdd={handleManualAdd}
        mode={modalMode}
        initialName={contactToEdit?.name ?? ''}
        initialPhone={contactToEdit?.phone ?? ''}
      />

      <CustomModal
        visible={isDeleteModalVisible}
        title="Delete emergency contact"
        firstText={contactToDelete?.name}
        secondText={contactToDelete?.phone}
        actionName="Delete"
        onCancel={handleCancelDeleteModal}
        onAction={handleConfirmDeleteModal}
      />

      <InformEditContactModal visible={showInfoPopup} onCancel={handleInfoCancel} />

      <NoServiceModal visible={showNoServiceModal} onClose={() => setShowNoServiceModal(false)} />
    </MainLayout>
  );
}
