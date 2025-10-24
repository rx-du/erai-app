import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const Styles = StyleSheet.create({
  input: {
    width: 349,
    height: 48,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
  text: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 19.5,
    fontFamily: 'Inter',
    alignSelf: 'center',
    width: '100%',
    paddingLeft: 32,
  },
});
