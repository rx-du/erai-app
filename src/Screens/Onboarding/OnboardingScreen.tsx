import React, { useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { styles } from './Styles';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';
import { TrialScreen } from '../Access/TrialScreen';

export function OnboardingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: 'AI-Powered Emergency Protocols',
      subtitle:
        'Get real-time, step-by-step guidance for CPR and other critical actions — designed to help you save lives with confidence.',
      Icon: require('../../Icons/onboarding1.png'),
    },
    {
      title: 'Easy-to-Follow Guides',
      subtitle:
        'Learn with short videos and clear instructions that make complex protocols simple and actionable in any emergency.',
      Icon: require('../../Icons/onboarding2.png'),
    },
    {
      title: 'Hands-Free Assistance',
      subtitle:
        'Use voice commands to follow protocols without touching your phone, so you can stay fully focused.',
      Icon: require('../../Icons/onboarding3.png'),
    },
    {
      type: 'trial',
    },
  ];

  const handleContinue = () => {
    if (page < pages.length - 1) {
      pagerRef.current?.setPage(page + 1);
    } else {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <MainLayout>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {pages.map((item, index) => {
          if (item.type === 'trial') {
            return <TrialScreen key={index} navigation={navigation} />;
          }

          return (
            <View key={index} style={styles.container}>
              <Image source={item.Icon} />
              <View style={styles.subcontainer}>
                <View style={styles.textcontainer}>
                  <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                    {item.subtitle}
                  </Text>
                </View>

                <CustomButton
                  onPress={handleContinue}
                  text={'Continue'}
                  type="primary"
                  dimension="large"
                  width={123}
                />
              </View>
            </View>
          );
        })}
      </PagerView>
    </MainLayout>
  );
}
