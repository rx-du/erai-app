import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { DismissKeyboard } from '../../Components/DismissKeyboard';
import { useLoading } from '../../Context/LoadingContext';
import { Loading } from '../../Components/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  const { isLoading, loadingMessage } = useLoading();

  return (
    <GestureHandlerRootView>
      <DismissKeyboard>
        <View style={[styles.container, { backgroundColor: colors.Background }]}>
          {children}
          {isLoading && <Loading message={loadingMessage} fullScreen />}
        </View>
      </DismissKeyboard>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
