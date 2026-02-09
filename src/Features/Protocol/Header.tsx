import { Text, View, TouchableOpacity } from 'react-native';
import { headerStyle } from './Styles';
import BackIcon from '../../Icons/back-24.svg';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { useProtocol } from '../../Context/ProtocolContext';

type HeaderProps = {
  title?: string;
  Icon?: FC<SvgProps>;
  categories?: string[];
  selectedCategoryIndex?: number;
  onCategorySelect?: (index: number) => void;
  onBack: () => void;
};

export default function Header({
  title,
  Icon,
  categories,
  selectedCategoryIndex = 0,
  onCategorySelect,
  onBack,
}: HeaderProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={headerStyle.container}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <BackIcon color={colors.Button.accent.primary} />
      </TouchableOpacity>
      <View style={headerStyle.subContainer}>
        {Icon && <Icon color={colors.Text.neutral.primary} />}
        <Text style={[headerStyle.text, { color: colors.Text.neutral.primary }]}>{title}</Text>
      </View>
      {categories && categories.length > 0 && (
        <View style={headerStyle.categoriesContainer}>
          {categories.map((category, index) => {
            const isSelected = index === selectedCategoryIndex;
            return (
              <TouchableOpacity
                key={`${category}-${index}`}
                onPress={() => onCategorySelect?.(index)}
                activeOpacity={0.7}
                style={[
                  headerStyle.categoryPill,
                  {
                    backgroundColor: isSelected ? colors.Bg.pure : colors.Button.neutral.disabled,
                  },
                ]}
              >
                <Text
                  style={[
                    headerStyle.categoryText,
                    {
                      color: isSelected
                        ? colors.Text.neutral.primary
                        : colors.Text.neutral.secondary,
                    },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
