import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
    width: '100%',
    borderRadius: BorderRadius.s,
    height: 64,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.9,
  },
  input: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19.5,
    padding: 0,
    margin: 0,
    width: '100%',
  },
  selectItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    gap: 4,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 19.5,
  },
  contactPhone: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.9,
  },
  contactList: {
    width: '100%',
    maxHeight: 400,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});

export const phoneInptuStyles = StyleSheet.create({
  input: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 73,
    borderRadius: BorderRadius.s,
    width: '100%',
  },
  text: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.9,
  },
  phone: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  prefixPhone: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },
  callingCodeText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});

export const emergencyButtonStyles = StyleSheet.create({
  emergencyTextOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  emergencyText: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
});
