import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: BorderRadius.m,
    borderWidth: 3,
  },
  subcontainer: {
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 4,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 600,
  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 16.9,
    fontWeight: 400,
  },
});
