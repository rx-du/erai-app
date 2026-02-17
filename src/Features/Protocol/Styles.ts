import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    paddingTop: 45,
    paddingHorizontal: 24,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 31.2,
    fontFamily: 'Inter',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
});

export const footerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    width: 56,
    height: 56,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    paddingRight: 24,
    paddingLeft: 18,
    flex: 1,
    height: 56,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    height: 56,
  },
  text: {
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
  badgeContainer: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 16,
    fontFamily: 'Inter',
  },
});

export const contentStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
  },
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  titleSection: {
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 22.5,
    fontFamily: 'Inter',
  },
  contentSection: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
});

export const stepFlowStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
    gap: 24,
  },
  stepCounter: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  contentContainer: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstSubContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
  },
  secondSubContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCounterText: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
  timeframeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    marginBottom: 16,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 18,
    fontFamily: 'Inter',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 31.2,
    fontFamily: 'Inter',
    marginBottom: 8,
    marginTop: 16,
  },
  stepSubtitle: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 27,
    fontFamily: 'Inter',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  navButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: 600,
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.full,
    height: 56,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 120,
  },
  dropdownMenu: {
    width: '90%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  dropdownOptionText: {
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    fontFamily: 'Inter',
  },
  dropdownOptionIcon: {
    fontSize: 24,
    fontWeight: 600,
  },

  minimizedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
  },

  minimizedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    pointerEvents: 'auto',
  },

  minimizedTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
  },

  minimizedSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16.9,
  },

  minimizedIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },

  minimizedExpandIcon: {
    position: 'absolute',
    right: 16,
    top: 32,
  },
  endProtocolModalHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
