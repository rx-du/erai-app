import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    justifyContent: 'space-around',
    paddingBottom: 32,
    paddingHorizontal: 12,
  },

  title: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31.2,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
  },
  emergencyButtonContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export const contactStyles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    gap: 16,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 31.2,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  addButton: {
    fontSize: 30,
    color: '#E53E3E',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  phoneText: {
    fontSize: 14,
    marginTop: 2,
  },
  fromDevice: {
    fontSize: 12,
    marginTop: 2,
  },

  /* Call button */
  callButton: {
    paddingHorizontal: 20,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 18,
    color: '#E53E3E',
  },

  /* Modal Base */
  modal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#111',
  },

  /* Option Modal Buttons */
  modalButton: {
    paddingVertical: 14,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginVertical: 6,
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#111',
  },

  /* Manual Input */
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: '#111',
  },

  /* Confirm */
  confirmBtn: {
    marginTop: 10,
    backgroundColor: '#E53E3E',
    paddingVertical: 14,
    borderRadius: 8,
  },
  confirmText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  /* Device Contact Select List */
  selectItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    borderRadius: 6,
  },

  /* Modal Header with Back Button */
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
  },

  /* Selection Counter */
  selectionCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    zIndex: 999,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  dropdownItemText: {
    fontSize: 15,
    color: '#111',
  },
});
