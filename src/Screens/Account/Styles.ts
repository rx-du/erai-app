import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
    paddingBottom: 24,
  },
  bodyContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    paddingBottom: 120,
  },
  sectionBodyContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
    width: '100%',
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  settingItem: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowOpacity: 0.03,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  logout: {
    fontSize: 15,
    fontWeight: '600',
  },
  titleDrawer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19.5,
  },
  subscriptionSection: {
    paddingVertical: 20,
    gap: 8,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  subscriptionLabel: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  subscriptionValue: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19.5,
    textAlign: 'right',
  },
  subscriptionIncludes: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.9,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  subscriptionActions: {
    marginTop: 32,
    gap: 16,
    alignItems: 'center',
  },
  actionButton: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
  },
  subscriptionDisclaimer: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    textAlign: 'center',
  },
});
