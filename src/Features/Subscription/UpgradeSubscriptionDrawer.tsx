import { View, Text } from 'react-native';
import { CustomButton } from '../../Components/CustomButton';
import { CustomDrawer } from '../../Components/CustomDrawer';
import { BorderRadius } from '../../Constants/BorderRadius';
import { useTheme } from '../../Theme/ThemeContext';
import { useSubscription } from '../../Context/SubscriptionContext';

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

  return (
    <CustomDrawer isVisible={isVisible} isSmallDrawer onClose={onClose}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: colors.Button.neutral.secondary,
              borderRadius: BorderRadius.s,
              height: 50,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                lineHeight: 22.5,
                textAlign: 'center',
                color: colors.Text.neutral.secondary,
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
                color: colors.Text.neutral.primary,
              }}
            >
              $29.99/Year
            </Text>
          </View>
          <CustomButton
            onPress={() => {
              onClose();
              startSubscription();
            }}
            text="Upgrade now"
            type="primary"
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
          Your subscription renews annually. Cancel anytime. By placing this order, you agree to the
          Terms of Service and Privacy Policy.
        </Text>
      </View>
    </CustomDrawer>
  );
}
