import { View, Text, TouchableOpacity } from 'react-native';
import { CustomButton } from '../../Components/CustomButton';
import { CustomDrawer } from '../../Components/CustomDrawer';
import { BorderRadius } from '../../Constants/BorderRadius';
import { useTheme } from '../../Theme/ThemeContext';
import { useSubscription } from '../../Context/SubscriptionContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigations/Navigations';
import { useState } from 'react';
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

export default function UpgradeSubscriptionDrawer({
  isVisible,
  onClose,
}: UpgradeSubscriptionDrawerProps) {
  const { colors } = useTheme();
  const { startSubscription } = useSubscription();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [monthlySubscritpion, setMonthlySubscription] = useState(false);
  const [annualSubscription, setAnnualSubscription] = useState(false);

  return (
    <CustomDrawer isVisible={isVisible} onClose={onClose}>
      <View style={{ flexDirection: 'column', paddingHorizontal: 24, paddingTop: 48, gap: 48 }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700', lineHeight: 31.2 }}>Get premium</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              lineHeight: 22.5,
              textAlign: 'center',
              color: colors.Text.neutral.secondary,
            }}
          >
            Unlock all the power of this mobile tool and get access to all the guides and protocols.
          </Text>
        </View>
        <View style={{ gap: 16, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              lineHeight: 22.5,
              textAlign: 'center',
              color: colors.Text.accent.secondary,
            }}
          >
            Choose payment
          </Text>
          <View style={{ gap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                setMonthlySubscription(!monthlySubscritpion);
                setAnnualSubscription(false);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: monthlySubscritpion
                  ? colors.Button.accent.secondary
                  : colors.Button.neutral.secondary,
                borderRadius: BorderRadius.s,
                height: 50,
                borderWidth: monthlySubscritpion ? 1 : 0,
                borderColor: monthlySubscritpion ? colors.Button.accent.primary : '',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  lineHeight: 22.5,
                  textAlign: 'center',
                  color: monthlySubscritpion
                    ? colors.Button.accent.primary
                    : colors.Text.neutral.secondary,
                }}
              >
                Monthly
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  lineHeight: 22.5,
                  textAlign: 'center',
                  color: monthlySubscritpion
                    ? colors.Button.accent.primary
                    : colors.Text.neutral.primary,
                }}
              >
                {MONTHLY_SUBSCRIPTION_PRICE}/Month
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setAnnualSubscription(!annualSubscription);
                setMonthlySubscription(false);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: annualSubscription
                  ? colors.Button.accent.secondary
                  : colors.Button.neutral.secondary,
                borderRadius: BorderRadius.s,
                height: 50,
                borderWidth: annualSubscription ? 1 : 0,
                borderColor: annualSubscription ? colors.Button.accent.primary : '',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  lineHeight: 22.5,
                  textAlign: 'center',
                  color: annualSubscription
                    ? colors.Button.accent.primary
                    : colors.Text.neutral.secondary,
                }}
              >
                Annual
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  lineHeight: 22.5,
                  textAlign: 'center',
                  color: annualSubscription
                    ? colors.Button.accent.primary
                    : colors.Text.neutral.primary,
                }}
              >
                {ANNUAL_SUBSCRIPTION_PRICE}/Year
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            onPress={() => {
              onClose();
              startSubscription(
                monthlySubscritpion ? MONTHLY_SUBSCRIPTION_PRODUCT : ANNUAL_SUBSCRIPTION_PRODUCT
              );
            }}
            text="Upgrade now"
            disabled={!monthlySubscritpion && !annualSubscription}
            type={monthlySubscritpion || annualSubscription ? 'primary' : 'disabled'}
            dimension="large"
            width={145}
          />
        </View>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '400',
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
