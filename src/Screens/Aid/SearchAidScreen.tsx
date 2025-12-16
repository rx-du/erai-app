import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getTabs } from './Helper';
import CustomCategory from '../../Components/CustomCategory/CustomCategory';
import { styles } from './Styles';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import MinimizedProtocolOverlay from '../../Features/Protocol/MinimizedProtocolOverlay';
import { SearchInput } from '../../Components/SearchInput';
import BackIcon from '../../Icons/back-24.svg';

export default function SearchAidScreen() {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = useMemo(() => getTabs(), [i18n.language]);
  const allProtocols = useMemo(() => {
    return tabs.flatMap((tab) => tab.content);
  }, [tabs]);

  const filteredProtocols = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProtocols;
    }

    const query = searchQuery.toLowerCase();
    return allProtocols.filter((protocol) => protocol.label.toLowerCase().includes(query));
  }, [allProtocols, searchQuery]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSelectProtocol = (item: any) => {
    const parentTab = tabs.find((tab) =>
      tab.content.some((protocol) => protocol.label === item.label)
    );

    if (!parentTab) return;

    const isFirstAid = parentTab.key === t('aid.firstAid');

    if (isFirstAid) {
      const protocolData = item.pageContent;
      const firstProtocol = protocolData?.steps?.[0];

      navigation.navigate('ProtocolStep', {
        protocolData: {
          ...protocolData,
          selectedProtocol: firstProtocol,
        },
        icon: item.icon,
      });
    } else {
      navigation.navigate('Protocol', {
        protocolData: item.pageContent,
        title: item.label,
        icon: item.icon,
      });
    }
  };

  return (
    <MainLayout>
      <View style={styles.searchHeader}>
        <BackIcon
          color={colors.Button.accent.primary}
          onPress={() => {
            navigation.navigate('MainTabs', { screen: 'Aid' });
          }}
        />
        <Text style={[styles.text, { color: colors.Text.neutral.primary, paddingTop: 4 }]}>
          Search
        </Text>
        <SearchInput onSearch={handleSearch} autoFocus={true} />
      </View>
      <ScrollView
        contentContainerStyle={styles.thirdContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredProtocols.map((item) => (
          <CustomCategory
            label={item.label}
            icon={item.icon}
            key={item.label}
            onPress={() => handleSelectProtocol(item)}
          />
        ))}
      </ScrollView>
      <MinimizedProtocolOverlay />
    </MainLayout>
  );
}
