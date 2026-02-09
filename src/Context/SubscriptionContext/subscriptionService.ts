import { Platform, Linking } from 'react-native';
import * as RNIAP from 'react-native-iap';
import type { ActiveSubscription } from 'react-native-iap';
import { SUBSCRIPTION_SKUS, SUBSCRIPTION_MANAGEMENT_URLS, ERROR_MESSAGES } from './constants';
import {
  formatDate,
  calculateDaysRemaining,
  calculateExpirationDate,
  calculateTrialBillingDate,
  checkIsTrialActive,
  getEmptySubscriptionDetails,
} from './utils';
import type { ChangeSubscriptionParams, SubscriptionDetails } from './types';

export class SubscriptionService {
  static async initializeConnection(): Promise<boolean> {
    try {
      const connected = await RNIAP.initConnection();

      if (!connected) {
        throw new Error(ERROR_MESSAGES.INIT_CONNECTION_FAILED);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async endConnection(): Promise<void> {
    await RNIAP.endConnection();
  }

  static async getSubscriptionDetails(): Promise<SubscriptionDetails> {
    try {
      const isTrial = await checkIsTrialActive();
      const activeSubs = await RNIAP.getActiveSubscriptions();

      if (!activeSubs || activeSubs.length === 0) {
        return getEmptySubscriptionDetails();
      }

      const subscription = activeSubs.find((sub) => SUBSCRIPTION_SKUS.includes(sub.productId));

      if (!subscription) {
        return getEmptySubscriptionDetails();
      }

      return this.processSubscriptionDetails(subscription, isTrial);
    } catch (error) {
      console.log('[RN-IAP]', 'Failed to get active subscriptions:', error);
      throw new Error(ERROR_MESSAGES.SUBSCRIPTION_CHECK_FAILED);
    }
  }

  private static async processSubscriptionDetails(
    subscription: ActiveSubscription,
    isTrial: boolean
  ): Promise<SubscriptionDetails> {
    const transactionDate = subscription.transactionDate
      ? new Date(subscription.transactionDate)
      : null;

    if (!transactionDate) {
      return getEmptySubscriptionDetails();
    }

    const isCanceled =
      subscription.autoRenewingAndroid === false ||
      subscription.renewalInfoIOS?.willAutoRenew === false;

    const targetDate = this.getTargetDate(subscription, transactionDate, isTrial);

    const daysRemaining = subscription.daysUntilExpirationIOS ?? calculateDaysRemaining(targetDate);

    return {
      currentPlan: isTrial ? 'Free trial' : 'Premium',
      activatedOn: formatDate(transactionDate),
      endsIn: `${daysRemaining} days`,
      billingStartingOn: formatDate(targetDate),
      isTrial,
      isCanceled,
      purchaseToken: subscription.purchaseToken || null,
      productId: subscription.productId || null,
    };
  }

  private static getTargetDate(
    subscription: ActiveSubscription,
    transactionDate: Date,
    isTrial: boolean
  ): Date {
    const renewalDate = subscription.renewalInfoIOS?.renewalDate
      ? new Date(subscription.renewalInfoIOS.renewalDate)
      : null;

    if (renewalDate) {
      return renewalDate;
    }

    return isTrial
      ? calculateTrialBillingDate(transactionDate)
      : calculateExpirationDate(transactionDate, subscription.productId);
  }

  static async purchaseSubscription(sku: string): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await RNIAP.requestPurchase({
          type: 'subs',
          request: {
            apple: {
              sku: sku,
            },
          },
        });
      } else if (Platform.OS === 'android') {
        await RNIAP.requestPurchase({
          type: 'subs',
          request: {
            android: {
              skus: [sku],
            },
          },
        });
      }
    } catch (error) {
      throw new Error(ERROR_MESSAGES.START_SUBSCRIPTION_FAILED);
    }
  }

  static async changeSubscription({
    newSku,
    oldPurchaseToken,
    mode,
  }: ChangeSubscriptionParams): Promise<void> {
    if (Platform.OS !== 'android') {
      throw new Error('Subscription change only supported on Android');
    }

    await RNIAP.requestPurchase({
      type: 'subs',
      request: {
        android: {
          skus: [newSku],
          purchaseTokenAndroid: oldPurchaseToken,
          replacementModeAndroid: 6,
        },
      },
    });
  }

  static async upgradeSubscription(newSku: string, oldPurchaseToken: string): Promise<void> {
    return this.changeSubscription({
      newSku,
      oldPurchaseToken,
      mode: 'upgrade',
    });
  }

  static async downgradeSubscription(newSku: string, oldPurchaseToken: string): Promise<void> {
    return this.changeSubscription({
      newSku,
      oldPurchaseToken,
      mode: 'downgrade',
    });
  }

  static async openSubscriptionManagement(productId: string): Promise<void> {
    try {
      const url =
        Platform.OS === 'ios'
          ? SUBSCRIPTION_MANAGEMENT_URLS.ios
          : SUBSCRIPTION_MANAGEMENT_URLS.android + `&sku=${productId}`;

      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        throw new Error(ERROR_MESSAGES.UNABLE_TO_OPEN_URL);
      }

      await Linking.openURL(url);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.CANCEL_SUBSCRIPTION_FAILED);
    }
  }

  static async finishTransaction(purchase: RNIAP.Purchase): Promise<void> {
    await RNIAP.finishTransaction({ purchase, isConsumable: false });
  }
}
