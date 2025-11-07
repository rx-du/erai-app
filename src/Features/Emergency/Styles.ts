import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    padding: 22,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 18,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    height: 48,
  },
  phoneContainer: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 20,
    height: 48,
  },
  phoneTextContainer: {
    borderRadius: 12,
    paddingVertical: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
