import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },

  content: {
    borderTopLeftRadius: 26,
    paddingVertical: 24,
    gap: 24,
  },

  headerTitleContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonContainer: {
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
