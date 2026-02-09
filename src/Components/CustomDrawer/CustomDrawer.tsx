import Modal from 'react-native-modal';
import { Keyboard, Platform, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { Styles } from './Styles';
import { DrawerHeader } from './DrawerHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../Theme/ThemeContext';

type CustomDrawerProps = {
  isVisible: boolean;
  title?: string;
  header?: React.ReactNode;
  onClose?: () => void;
  isSmallDrawer?: boolean;
  children: React.ReactNode;
};

export function CustomDrawer({
  isVisible = false,
  title,
  header,
  onClose,
  isSmallDrawer = false,
  children,
}: CustomDrawerProps) {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const differenceHeight = Platform.OS === 'ios' || !keyboardStatus ? height / 1.5 : height;

  const animationIn = 'slideInUp';
  const animationOut = 'slideOutDown';
  const heightCustomDrawer = isSmallDrawer ? null : differenceHeight;

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.6}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={Styles.drawer}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      statusBarTranslucent
      animationIn={animationIn}
      animationOut={animationOut}
      avoidKeyboard
    >
      <SafeAreaView
        style={{
          ...Styles.content,
          backgroundColor: colors.Background,
          alignSelf: 'center',
          borderTopRightRadius: 26,
          borderBottomLeftRadius: 0,
          height: heightCustomDrawer,
          width: width,
        }}
      >
        {(title || header) && <DrawerHeader title={title} header={header} onClose={onClose} />}
        {children}
      </SafeAreaView>
    </Modal>
  );
}
