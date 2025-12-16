import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Theme/ThemeContext';
import { MainLayout } from '../Layout/MainLayout';
import * as RNIap from 'react-native-iap';

// Mock products for now
const mockProducts = [{ productId: 'premium_yearly', title: 'Annual', localizedPrice: '$99/Year' }];

export default function SubscriptionScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    async function setupIAP() {
      try {
        // In the future: await RNIap.initConnection();
        // const items = await RNIap.getSubscriptions(productIds);
        // setProducts(items);
        setProducts(mockProducts);
      } catch (e) {
        console.warn(e);
      }
    }
    setupIAP();

    return () => {
      // await RNIap.endConnection();
    };
  }, []);

  function buySubscription(productId: string) {
    // In the future:
    // const purchase = await RNIap.requestSubscription(productId);
    Alert.alert('Purchase Simulation', `You purchased ${productId}`);
  }

  return (
    <MainLayout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.Bg.pure }]}>
          {/* Header */}
          <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>Get premium</Text>

          <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
            Unlock all the power of this mobile tool and get access to all the guides.
          </Text>

          {/* Subscription Option */}
          <View
            style={[styles.subscriptionCard, { backgroundColor: colors.Button.neutral.secondary }]}
          >
            <Text style={[styles.planLabel, { color: colors.Text.neutral.secondary }]}>Annual</Text>
            <Text style={[styles.planPrice, { color: colors.Text.neutral.primary }]}>$99/Year</Text>
          </View>

          {/* Upgrade Button */}
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => buySubscription('premium_yearly')}
            activeOpacity={0.8}
          >
            <Text style={styles.upgradeButtonText}>Upgrade now</Text>
          </TouchableOpacity>

          {/* Terms Text */}
          <Text style={[styles.termsText, { color: colors.Text.neutral.secondary }]}>
            By placing this order, you agree to the{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>. Subscription automatically renews
            unless auto-renew is turned off before the end of the current period.
          </Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  card: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  subscriptionCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  planLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: '#E85D5D',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 50,
    marginBottom: 40,
    shadowColor: '#E85D5D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  termsLink: {
    color: '#E85D5D',
    fontWeight: '600',
  },
});
