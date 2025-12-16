import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';
import XIcon from '../../Icons/x-icon.svg';
import { MainLayout } from '../Layout/MainLayout';
import FreeTrialArrow from '../../Icons/free-trial-arrow.svg';

export function TrialScreen({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <MainLayout>
      <View style={trialStyles.container}>
        <View style={trialStyles.closeButton}>
          <XIcon
            color={colors.Text.neutral.primary}
            onPress={() => navigation.navigate('MainTabs')}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={trialStyles.section}>
            <Text style={[trialStyles.title, { color: colors.Text.neutral.primary }]}>
              How your trial works
            </Text>

            <Text style={[trialStyles.subtitle, { color: colors.Text.neutral.secondary }]}>
              First 14 days free,{'\n'}then $ 99.00/year
            </Text>
          </View>

          <View style={trialStyles.section}>
            <View style={{ gap: 4, alignItems: 'center' }}>
              <Text style={[trialStyles.todayTitle, { color: colors.Text.accent.primary }]}>
                Today
              </Text>
              <Text style={[trialStyles.todaySubtitle, { color: colors.Text.accent.secondary }]}>
                Unlock all features and emergency{'\n'}protocols.
              </Text>
            </View>

            <FreeTrialArrow />

            <View style={{ gap: 4, alignItems: 'center' }}>
              <Text style={[trialStyles.todayTitle, { color: colors.Text.neutral.primary }]}>
                In 14 days
              </Text>
              <Text style={[trialStyles.todaySubtitle, { color: colors.Text.neutral.secondary }]}>
                You’ll be charged $ 99.00, cancel{'\n'}anytime before.
              </Text>
            </View>
          </View>

          <CustomButton
            text="Start my free trial"
            type="primary"
            width={180}
            onPress={() => navigation.navigate('MainTabs')}
          />
        </View>

        <View style={trialStyles.footer}>
          <Text style={[trialStyles.todaySubtitle, { color: colors.Text.neutral.secondary }]}>
            Your subscription renews annually. Cancel anytime. By placing this order, you agree to
            the{' '}
            <Text
              style={{ color: colors.Button.accent.primary }}
              onPress={() => navigation.navigate('TermsOfService')}
            >
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={{ color: colors.Button.accent.primary }}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </MainLayout>
  );
}

export const trialStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 32,
    paddingVertical: 48,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 48,
  },

  closeButton: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
  },

  section: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },

  todayTitle: {
    fontSize: 15,
    fontWeight: '600',
  },

  todaySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 24,
  },
});
