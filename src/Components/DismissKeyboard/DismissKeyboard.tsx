import { useCallback } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type DismissKeyboardProps = {
  children: React.ReactNode;
};

export function DismissKeyboard({ children }: DismissKeyboardProps) {
  const onPressHandler = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  return <TouchableWithoutFeedback onPress={onPressHandler}>{children}</TouchableWithoutFeedback>;
}
