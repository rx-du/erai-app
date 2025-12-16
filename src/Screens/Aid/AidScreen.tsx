import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getTabs } from './Helper';
import CustomCategory from '../../Components/CustomCategory/CustomCategory';
import { styles } from './Styles';
import { CustomTabs } from '../../Components/CustomTabs/CustomTabs';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import { useLoading } from '../../Context/LoadingContext';
import MinimizedProtocolOverlay from '../../Features/Protocol/MinimizedProtocolOverlay';
import { SearchInput } from '../../Components/SearchInput';

export default function AidScreen() {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState(t('aid.emergencyResponse'));

  const { showLoading, hideLoading } = useLoading();

  const tabs = useMemo(() => getTabs(), [i18n.language]);

  useEffect(() => {
    showLoading('Loading...');

    const timer = setTimeout(() => {
      hideLoading();
    }, 500);

    return () => {
      clearTimeout(timer);
      hideLoading();
    };
  }, []);

  useEffect(() => {
    setActiveTab(t('aid.emergencyResponse'));
  }, [i18n.language, t]);

  const handleTabPress = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

  const handleSelectProtocol = (item: any) => {
    const currentTab = tabs.find((t) => t.key === activeTab);

    if (!currentTab) return;

    const isFirstAid = currentTab.key === t('aid.firstAid');

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
      <View style={styles.firstContainer}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={[styles.text, { color: colors.Text.neutral.primary }]}>
              {t('aid.stepByStep')}
            </Text>
            <Text style={[styles.subText, { color: colors.Text.neutral.secondary }]}>
              {t('aid.chooseEmergency')}
            </Text>
          </View>
          {activeTab == t('aid.emergencyResponse') && (
            <Image source={require('../../Icons/emergency-response-icon.png')} />
          )}
          {activeTab == t('aid.firstAid') && (
            <Image source={require('../../Icons/first-aid-icon.png')} />
          )}
        </View>
      </View>

      <View style={styles.secondContainer}>
        <SearchInput onPress={() => navigation.navigate('SearchAid')} onSearch={() => {}} />
        <CustomTabs tabs={tabs} activeTab={activeTab} onPressTab={handleTabPress} />
      </View>
      <ScrollView
        contentContainerStyle={styles.thirdContainer}
        showsVerticalScrollIndicator={false}
      >
        {tabs
          .find((tab) => tab.key === activeTab)
          ?.content.map((item, index) => (
            <CustomCategory
              label={
                <Text
                  style={{
                    color:
                      index === 0 && activeTab !== i18n.t('aid.firstAid')
                        ? colors.Text.accent.primary
                        : undefined,
                  }}
                >
                  {item.label}
                </Text>
              }
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
