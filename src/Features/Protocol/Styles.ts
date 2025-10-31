import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../Constants/BorderRadius';

export const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    paddingVertical: 48,
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
});

export const footerStyle = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 270,
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
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 19.5,
    fontFamily: 'Inter',
  },
});
