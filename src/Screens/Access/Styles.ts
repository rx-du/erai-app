import { StyleSheet } from 'react-native';

export const welcomeStyles = StyleSheet.create({
  logo: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  overlayIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },

  textContainer: {
    width: 342,
    height: 126,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
    alignSelf: 'center',
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 41.6,
    letterSpacing: -0.64,
  },
  subtitle: {
    color: '#727272',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },

  buttonsContainer: {
    width: 345,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'center',
    marginTop: 48,
  },

  dividerContainer: {
    width: '100%',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerText: {
    color: '#888',
    textAlign: 'center',
  },
});

export const loginStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  firstContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 160,
  },
  secondContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  formContainer: {
    alignItems: 'center',
  },
  errorText: {
    fontSize: 15,
    fontFamily: 'Inter',
    lineHeight: 24,
    fontWeight: 400,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter',
    lineHeight: 41.6,
    fontWeight: 800,
    textAlign: 'center',
  },
});

export const registerStyles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 160,
    paddingBottom: 48,
    paddingHorizontal: 32,
    gap: 48,
  },
  firstSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
  },
  secondSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  firstSubsection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
  },
  secondSubsection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 24,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 32,
    lineHeight: 41.6,
    fontWeight: 800,
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 400,
  },
  chekbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
