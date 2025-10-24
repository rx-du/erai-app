import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
});

export const noPermissionStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
    paddingHorizontal: 48,
  },
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 24,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 31.2,
  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
});
