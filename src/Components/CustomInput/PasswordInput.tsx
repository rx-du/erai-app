import { useCallback, useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { FieldError } from 'react-hook-form';
import { Styles } from './Styles';

import EyeIcon from '../../Icons/eye-24.svg';
import ClosedEyeIcon from '../../Icons/eye-closed-24.svg';
import { useTheme } from '../../Theme/ThemeContext';

type TextInputProps = {
  error: FieldError | string | undefined;
  value: string;
  name: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onInputClick: (fieldName: string) => void;
};

export default function PasswordInput({
  error,
  placeholder,
  onChangeText,
  value,
  name,
  onInputClick,
}: TextInputProps) {
  const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <View
      style={[
        Styles.input,
        {
          borderWidth: error ? 1 : 0,
          borderColor: error ? colors.Text.accent.primary : 'transparent',
          backgroundColor: colors.Button.neutral.secondary,
        },
      ]}
    >
      <TextInput
        secureTextEntry={!showPassword}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        onPressIn={() => onInputClick(name)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textContentType="password"
        autoComplete="password"
        placeholderTextColor={error ? colors.Text.accent.primary : colors.Text.neutral.secondary}
        style={[Styles.text, { color: colors.Text.neutral.primary }]}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        onPress={toggleShowPassword}
        style={{ padding: 12, marginRight: 16 }}
        activeOpacity={1}
      >
        {showPassword ? (
          <EyeIcon color={colors.Text.neutral.primary} />
        ) : (
          <ClosedEyeIcon color={colors.Text.neutral.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}
