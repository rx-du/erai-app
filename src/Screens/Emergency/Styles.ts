import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 48,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31.2,
    paddingHorizontal: 60,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
    paddingHorizontal: 80,
  },
});

export const contactStyles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    gap: 16,
    paddingTop: 48,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19.5,
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.9,
  },
  callButton: {
    paddingHorizontal: 20,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
