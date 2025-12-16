import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const Styles = StyleSheet.create({
  modal: {
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    gap: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  text: {
    fontSize: 15,
    lineHeight: 19.5,
    textAlign: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 31.2,
    textAlign: 'center',
    paddingHorizontal: 15,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 22.5,
    textAlign: 'center',
    paddingHorizontal: 15,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
});
