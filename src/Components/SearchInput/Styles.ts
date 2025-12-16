import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const SearchStyles = StyleSheet.create({
  searchContainer: {
    width: '100%',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: BorderRadius.s,
    paddingHorizontal: 12,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16.9,
    fontWeight: '400',
  },
});
