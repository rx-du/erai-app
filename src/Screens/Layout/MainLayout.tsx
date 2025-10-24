import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { DismissKeyboard } from '../../Components/DismissKeyboard';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();

  return (
    <DismissKeyboard>
      <View style={[styles.container, { backgroundColor: colors.Background }]}>{children}</View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
