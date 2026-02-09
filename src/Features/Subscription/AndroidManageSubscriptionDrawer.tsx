import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CustomButton } from '../../Components/CustomButton';
import { CustomDrawer } from '../../Components/CustomDrawer';
import { BorderRadius } from '../../Constants/BorderRadius';
import { useTheme } from '../../Theme/ThemeContext';
import { useSubscription } from '../../Context/SubscriptionContext';
import { RootStackParamList } from '../../Navigations/Navigations';
import {
  ANNUAL_SUBSCRIPTION_PRICE,
  ANNUAL_SUBSCRIPTION_PRODUCT,
  MONTHLY_SUBSCRIPTION_PRICE,
  MONTHLY_SUBSCRIPTION_PRODUCT,
} from '../../Context/SubscriptionContext/constants';

type UpgradeSubscriptionDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
};

type PlanType = 'monthly' | 'annual';

export default function AndroidManageSubscriptionDrawer({
  isVisible,
  onClose,
}: UpgradeSubscriptionDrawerProps) {
  const { colors } = useTheme();
  const { subscriptionDetails, changePlan, openSubscriptionManagement } = useSubscription();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentPlan: PlanType =
    subscriptionDetails.productId === ANNUAL_SUBSCRIPTION_PRODUCT ? 'annual' : 'monthly';

  const [selectedPlan, setSelectedPlan] = useState<PlanType>(currentPlan);

  useEffect(() => {
    setSelectedPlan(currentPlan);
  }, [currentPlan]);

  const isSamePlan = selectedPlan === currentPlan;

  return (
    <CustomDrawer isVisible={isVisible} isSmallDrawer onClose={onClose}>
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 48,
          gap: 48,
        }}
      >
        <View style={{ alignItems: 'center', gap: 12 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              lineHeight: 31.2,
            }}
          >
            Premium subscription
          </Text>

          <Text
            style={{
              fontSize: 15,
              lineHeight: 22.5,
              textAlign: 'center',
              color: colors.Text.neutral.secondary,
            }}
          >
            You have access to all the guides and protocols.{'\n'}
            {currentPlan === 'monthly' ? 'Paid monthly.' : 'Paid annually.'}
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <TouchableOpacity
            onPress={() => setSelectedPlan('monthly')}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: BorderRadius.s,
              backgroundColor:
                selectedPlan === 'monthly'
                  ? colors.Button.accent.secondary
                  : colors.Button.neutral.secondary,
              borderWidth: selectedPlan === 'monthly' ? 1 : 0,
              borderColor:
                selectedPlan === 'monthly' ? colors.Button.accent.primary : 'transparent',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color:
                    selectedPlan === 'monthly'
                      ? colors.Button.accent.primary
                      : colors.Text.neutral.secondary,
                }}
              >
                {currentPlan === 'monthly' ? 'Monthly (current)' : 'Monthly'}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color:
                    selectedPlan === 'monthly'
                      ? colors.Button.accent.primary
                      : colors.Text.neutral.primary,
                }}
              >
                {MONTHLY_SUBSCRIPTION_PRICE}/Month
              </Text>
            </View>

            {currentPlan !== 'monthly' && (
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: colors.Text.neutral.secondary,
                }}
              >
                You will be charged starting with {subscriptionDetails.billingStartingOn}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPlan('annual')}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: BorderRadius.s,
              backgroundColor:
                selectedPlan === 'annual'
                  ? colors.Button.accent.secondary
                  : colors.Button.neutral.secondary,
              borderWidth: selectedPlan === 'annual' ? 1 : 0,
              borderColor: selectedPlan === 'annual' ? colors.Button.accent.primary : 'transparent',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color:
                    selectedPlan === 'annual'
                      ? colors.Button.accent.primary
                      : colors.Text.neutral.secondary,
                }}
              >
                {currentPlan === 'annual' ? 'Annual (current)' : 'Annual'}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color:
                    selectedPlan === 'annual'
                      ? colors.Button.accent.primary
                      : colors.Text.neutral.primary,
                }}
              >
                {ANNUAL_SUBSCRIPTION_PRICE}/Year
              </Text>
            </View>

            {currentPlan !== 'annual' && (
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color:
                    selectedPlan === 'annual'
                      ? colors.Button.accent.primary
                      : colors.Text.neutral.secondary,
                }}
              >
                You will be charged starting with {subscriptionDetails.billingStartingOn}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', gap: 16 }}>
          <CustomButton
            text="Change subscription"
            dimension="large"
            width={200}
            disabled={isSamePlan}
            type={isSamePlan ? 'disabled' : 'primary'}
            onPress={() => {
              if (selectedPlan === 'annual') {
                onClose();
                setSelectedPlan('annual');
                changePlan(ANNUAL_SUBSCRIPTION_PRODUCT, 'upgrade');
              } else {
                onClose();
                setSelectedPlan('monthly');
                changePlan(MONTHLY_SUBSCRIPTION_PRODUCT, 'downgrade');
              }
            }}
          />

          <CustomButton
            text="Cancel my subscription"
            dimension="large"
            width={200}
            type="tertiary"
            onPress={() => {
              onClose();
              openSubscriptionManagement(subscriptionDetails.productId || '');
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 13,
            lineHeight: 19.5,
            textAlign: 'center',
            color: colors.Text.neutral.secondary,
          }}
        >
          Your subscription renews annually. Cancel anytime. By placing this order, you agree to the{' '}
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
    </CustomDrawer>
  );
}
