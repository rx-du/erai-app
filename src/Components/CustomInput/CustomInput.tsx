import { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { TextInput } from 'react-native';
import { Styles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

type TextInputProps = {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  value: string;
  name: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onInputClick: (fieldName: string) => void;
  secureTextEntry: boolean;
};

export function CustomInput({
  error,
  value,
  name,
  placeholder,
  onChangeText,
  onInputClick,
  secureTextEntry,
}: TextInputProps) {
  const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const keyboardType = placeholder.toLowerCase().includes('email') ? 'email-address' : 'default';

  const inputStyle = {
    ...Styles.input,
    backgroundColor: colors.Button.neutral.secondary,
    color: colors.Text.neutral.primary,
    borderColor: error ? colors.Text.accent.primary : 'transparent',
    borderWidth: error ? 1 : 0,
  };

  return (
    <TextInput
      style={inputStyle}
      placeholder={placeholder}
      placeholderTextColor={error ? colors.Text.accent.primary : colors.Text.neutral.secondary}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={onChangeText}
      value={value}
      onPressIn={() => onInputClick(name)}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType={keyboardType}
      textContentType="username" // iOS only
      autoComplete="username" // Android only
    />
  );
}
