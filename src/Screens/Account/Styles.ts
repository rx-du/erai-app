import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  email: {
    color: '#000000',
    fontWeight: '400',
  },
  logoutButton: {
    marginBottom: 32,
  },
  logout: {
    color: '#FF4E48',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#7C7C83',
    marginBottom: 12,
    fontWeight: '400',
  },
  subscriptionCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  subscriptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subscriptionLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  upgradeText: {
    color: '#FF4E48',
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  chevronRight: {
    transform: [{ rotate: '-90deg' }],
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 16,
    color: '#FF4E48',
    fontWeight: '400',
  },
});
