import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  firstContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  searchHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 16,
    paddingTop: 45,
  },
  headerText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
    maxWidth: 120,
  },
  secondContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  thirdContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31.2,
  },
  subText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22.5,
  },
});
