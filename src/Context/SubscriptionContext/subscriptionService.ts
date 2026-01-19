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
import type { SubscriptionDetails } from './types';

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

      const price = await this.fetchSubscriptionPrice(subscription);

      if (!subscription) {
        return getEmptySubscriptionDetails();
      }

      return this.processSubscriptionDetails(subscription, isTrial, price);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SUBSCRIPTION_CHECK_FAILED);
    }
  }

  private static fetchSubscriptionPrice = async (subscription?: ActiveSubscription) => {
    if (subscription?.productId) {
      try {
        const products = await RNIAP.fetchProducts({
          skus: [subscription.productId],
          type: 'subs',
        });

        console.log('products', products);
        console.log('purchases', await RNIAP.getAvailablePurchases());
        console.log('subs', await RNIAP.getActiveSubscriptions());

        if (products && products.length > 0) {
          return products[0].displayPrice;
        }

        return 'N/A';
      } catch (error) {
        console.error('Eroare la preluarea prețului:', error);
        return 'N/A';
      }
    }
    return 'N/A';
  };

  private static processSubscriptionDetails(
    subscription: ActiveSubscription,
    isTrial: boolean,
    price: string
  ): SubscriptionDetails {
    const transactionDate = subscription.transactionDate
      ? new Date(subscription.transactionDate)
      : null;

    if (!transactionDate) {
      return getEmptySubscriptionDetails();
    }

    const isCanceled =
      subscription.autoRenewingAndroid === false ||
      subscription.renewalInfoIOS?.willAutoRenew === false;

    let daysRemaining: number;
    let endsIn: string;
    let billingStartingOn: string | null = null;

    if (isTrial) {
      const billingDate = calculateTrialBillingDate(transactionDate);
      daysRemaining = calculateDaysRemaining(billingDate);
      endsIn = `${daysRemaining} days`;
      billingStartingOn = formatDate(billingDate);
    } else {
      const expirationDate = calculateExpirationDate(transactionDate);
      billingStartingOn = formatDate(expirationDate);
      daysRemaining = calculateDaysRemaining(expirationDate);
      endsIn = `${daysRemaining} days`;
    }

    return {
      currentPlan: isTrial ? 'Free trial' : 'Premium',
      activatedOn: formatDate(transactionDate),
      endsIn,
      billingStartingOn,
      payment: price,
      isTrial,
      isCanceled,
    };
  }

  static async purchaseSubscription(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await RNIAP.requestPurchase({
          type: 'subs',
          request: {
            apple: {
              sku: 'com.annual.premium',
            },
          },
        });
      } else if (Platform.OS === 'android') {
        await RNIAP.requestPurchase({
          type: 'subs',
          request: {
            android: {
              skus: ['test3'],
            },
          },
        });
      }
    } catch (error) {
      throw new Error(ERROR_MESSAGES.START_SUBSCRIPTION_FAILED);
    }
  }

  // static async upgradeSubscription(
  //   newSku: string,
  //   replacementMode?:
  //     | 'with-time-proration'
  //     | 'charge-prorated-price'
  //     | 'charge-full-price'
  //     | 'without-proration'
  //     | 'deferred'
  // ): Promise<void> {
  //   try {
  //     if (Platform.OS !== 'android') {
  //       throw new Error('Upgrade subscription is only available on Android');
  //     }

  //     const activeSubs = await RNIAP.getActiveSubscriptions();

  //     if (!activeSubs || activeSubs.length === 0) {
  //       throw new Error('No active subscription found to upgrade');
  //     }

  //     const currentSubscription = activeSubs.find((sub) =>
  //       SUBSCRIPTION_SKUS.includes(sub.productId)
  //     );

  //     if (!currentSubscription) {
  //       throw new Error('No valid subscription found to upgrade');
  //     }

  //     const purchaseToken = currentSubscription.purchaseToken;
  //     const oldProductId = currentSubscription.productId;

  //     if (!purchaseToken) {
  //       throw new Error('Purchase token not found for current subscription');
  //     }

  //     const selectedReplacementMode = replacementMode ?? 'charge-full-price';

  //     await RNIAP.requestPurchase({
  //       type: 'subs',
  //       request: {
  //         android: {
  //           skus: [newSku],
  //           purchaseTokenAndroid: purchaseToken,
  //           subscriptionProductReplacementParams: {
  //             oldProductId,
  //             replacementMode: selectedReplacementMode,
  //           },
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw error;
  //     }
  //     throw new Error('Failed to upgrade subscription. Please try again.');
  //   }
  // }

  static async openSubscriptionManagement(): Promise<void> {
    try {
      const url =
        Platform.OS === 'ios'
          ? SUBSCRIPTION_MANAGEMENT_URLS.ios
          : SUBSCRIPTION_MANAGEMENT_URLS.android;

      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        throw new Error(ERROR_MESSAGES.UNABLE_TO_OPEN_URL);
      }
      console.log('url', url);
      await Linking.openURL(url);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.CANCEL_SUBSCRIPTION_FAILED);
    }
  }

  static async finishTransaction(purchase: RNIAP.Purchase): Promise<void> {
    await RNIAP.finishTransaction({ purchase, isConsumable: false });
  }
}
