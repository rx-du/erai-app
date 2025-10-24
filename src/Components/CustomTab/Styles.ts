import { StyleSheet } from 'react-native';

export const TabStyle = StyleSheet.create({
  firstTab: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  lastTab: {
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  selectedTab: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
});
