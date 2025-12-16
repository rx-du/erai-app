import { StyleSheet } from 'react-native';

export const TabStyle = StyleSheet.create({
  firstTab: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  lastTab: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  selectedTab: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height: 40,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
});
