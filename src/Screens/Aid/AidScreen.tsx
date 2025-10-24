import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { tabs } from './Helper';
import CustomCategory from '../../Components/CustomCategory/CustomCategory';
import { styles } from './Styles';

import HeaderIcon from '../../Icons/aid-vector.svg';
import { CustomTabs } from '../../Components/CustomTabs/CustomTabs';
import { MainLayout } from '../Layout/MainLayout';
import { Messages } from '../../Constants/Messages';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';

export default function AidScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState(Messages.emergencyRespone);

  const handleTabPress = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

  return (
    <MainLayout>
      <View style={styles.firstContainer}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={[styles.text, { color: colors.Text.neutral.primary }]}>
              Step-by-step guidance
            </Text>
            <Text style={[styles.subText, { color: colors.Text.neutral.secondary }]}>
              Choose your emergency
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
              onPress={() => navigation.navigate('Protocol')}
            />
          ))}
      </ScrollView>
    </MainLayout>
  );
}
