import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { CustomButton } from '../../Components/CustomButton';
import XIcon from '../../Icons/x-icon.svg';
import { MainLayout } from '../Layout/MainLayout';
import FreeTrialArrow from '../../Icons/free-trial-arrow.svg';
import { useSubscription } from '../../Context/SubscriptionContext';
import { useAuth } from '../../Context/AuthContext';
import { BorderRadius } from '../../Constants/BorderRadius';
import { MONTHLY_SUBSCRIPTION_PRICE } from '../../Context/SubscriptionContext/constants';
import UpgradeSubscriptionDrawer from '../../Features/Subscription/UpgradeSubscriptionDrawer';

export function TrialScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { completeOnboarding } = useAuth();
  const [showUpgradeSubscription, setShowUpgradeSubscription] = useState(false);

  return (
    <MainLayout>
      <View style={trialStyles.container}>
        <View style={trialStyles.closeButton}>
          <TouchableOpacity
            onPress={async () => {
              await completeOnboarding();
            }}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <XIcon color={colors.Text.neutral.primary} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={trialStyles.section}>
            <Text style={[trialStyles.title, { color: colors.Text.neutral.secondary }]}>
              Premium subscription
            </Text>

            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: BorderRadius.full,
                borderColor: colors.Text.accent.primary,
                borderWidth: 1,
                backgroundColor: colors.Button.accent.secondary,
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: '800', color: colors.Button.accent.primary }}
              >
                {' '}
                From {MONTHLY_SUBSCRIPTION_PRICE}/month{' '}
              </Text>
            </View>

            <Text style={[trialStyles.subtitle, { color: colors.Text.neutral.primary }]}>
              First 7 days free
            </Text>
          </View>

          <View style={trialStyles.section}>
            <View style={{ gap: 4, alignItems: 'center' }}>
              <Text style={[trialStyles.todayTitle, { color: colors.Text.accent.primary }]}>
                Today
              </Text>
              <Text style={[trialStyles.todaySubtitle, { color: colors.Text.accent.secondary }]}>
                Unlock all protocols.
              </Text>
            </View>

            <FreeTrialArrow />

            <View style={{ gap: 4, alignItems: 'center' }}>
              <Text style={[trialStyles.todayTitle, { color: colors.Text.neutral.primary }]}>
                In 7 days
              </Text>
              <Text style={[trialStyles.todaySubtitle, { color: colors.Text.neutral.secondary }]}>
                Your will be charged and your subscription{'\n'}becomes active. Cancel anytime.
              </Text>
            </View>
          </View>

          <CustomButton
            text="Start my free trial"
            type="primary"
            width={180}
            onPress={() => {
              setShowUpgradeSubscription(true);
            }}
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

      <UpgradeSubscriptionDrawer
        isVisible={showUpgradeSubscription}
        onClose={() => setShowUpgradeSubscription(false)}
      />
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
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
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
