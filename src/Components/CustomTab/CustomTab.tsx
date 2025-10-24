import { TouchableOpacity, Text } from 'react-native';

import { TabStyle } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

type TabProps = {
  onPress: () => void;
  selected: boolean;
  title: string;
  isFirstTab: boolean;
  isLastTab: boolean;
  width?: string | number;
};

export function CustomTab({ onPress, selected, title, isFirstTab, isLastTab, width }: TabProps) {
  const { colors } = useTheme();

  const tabStyle = [
    {
      ...TabStyle.tab,
      backgroundColor: selected ? colors.Bg.pure : undefined,
      minWidth: typeof width === 'number' ? width : undefined,
    },
    isFirstTab && TabStyle.firstTab,
    selected && TabStyle.selectedTab,
    isLastTab && TabStyle.lastTab,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={tabStyle} activeOpacity={1}>
      <Text
        style={{ color: selected ? colors.Text.accent.primary : colors.Text.neutral.secondary }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
