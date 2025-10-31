import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getTabs } from './Helper';
import CustomCategory from '../../Components/CustomCategory/CustomCategory';
import { styles } from './Styles';

import HeaderIcon from '../../Icons/aid-vector.svg';
import { CustomTabs } from '../../Components/CustomTabs/CustomTabs';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';

export default function AidScreen() {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState(t('aid.emergencyResponse'));

  const tabs = useMemo(() => getTabs(), [i18n.language]);

  useEffect(() => {
    setActiveTab(t('aid.emergencyResponse'));
  }, [i18n.language, t]);

  const handleTabPress = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

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
          <HeaderIcon />
        </View>
      </View>

      <View style={styles.secondContainer}>
        <CustomTabs tabs={tabs} activeTab={activeTab} onPressTab={handleTabPress} />
      </View>
      <ScrollView
        contentContainerStyle={styles.thirdContainer}
        showsVerticalScrollIndicator={false}
      >
        {tabs
          .find((tab) => tab.key === activeTab)
          ?.content.map((item) => (
            <CustomCategory
              label={item.label}
              icon={item.icon}
              key={item.label}
              onPress={() =>
                navigation.navigate('Protocol', {
                  protocolData: item.pageContent,
                  title: item.label,
                  icon: item.icon,
                })
              }
            />
          ))}
      </ScrollView>
    </MainLayout>
  );
}
