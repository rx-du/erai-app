import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { SearchStyles } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

type SearchInputProps = {
  onSearch: (searchText: string) => void;
  onPress?: () => void;
  autoFocus?: boolean;
};

export function SearchInput({ onSearch, onPress, autoFocus = false }: SearchInputProps) {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={SearchStyles.searchContainer}>
      <View
        style={[
          SearchStyles.searchInputContainer,
          { backgroundColor: colors.Button.neutral.secondary },
        ]}
      >
        <TextInput
          ref={inputRef}
          style={SearchStyles.textInput}
          placeholder="Search"
          placeholderTextColor={colors.Text.neutral.secondary}
          value={searchText}
          onChangeText={handleTextChange}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
