import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { Styles } from './Styles';
import { CustomTab } from '../CustomTab/CustomTab';
import { useTheme } from '../../Theme/ThemeContext';

export type TabInfo<T> = {
  key: T;
  title: string;
};

type TabsProps<T> = {
  tabs: TabInfo<T>[];
  activeTab: T;
  onPressTab: (tabKey: T) => void;
};

export function CustomTabs<T>({ tabs, activeTab, onPressTab }: TabsProps<T>) {
  const { width } = useWindowDimensions();
  const scrollable = tabs.length > 4;
  const tabsWidth = scrollable ? width / 4 : undefined;
  const Wrapper = useMemo(() => (scrollable ? ScrollView : View), [scrollable]);

  const { colors } = useTheme();

  return (
    <Wrapper
      contentContainerStyle={Styles.tabsContainer}
      style={[Styles.tabsContainer, { backgroundColor: colors.Button.neutral.secondary }]}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tabs.map((tab, index) => (
        <CustomTab
          key={`${tab.key}`}
          onPress={() => onPressTab(tab.key)}
          selected={activeTab === tab.key}
          title={tab.title}
          isFirstTab={index === 0}
          isLastTab={index === tabs.length - 1}
          width={tabsWidth}
        />
      ))}
    </Wrapper>
  );
}
