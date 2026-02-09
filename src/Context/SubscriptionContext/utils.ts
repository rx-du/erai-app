import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNIAP from 'react-native-iap';
import {
  TRIAL_DURATION_DAYS,
  STORAGE_KEYS,
  SUBSCRIPTION_SKUS,
  ANNUAL_SUBSCRIPTION_PRODUCT,
} from './constants';
import { isIos } from '../../Constants/Device';

export const formatDate = (date: Date): string => {
  return date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '');
};

export const calculateDaysRemaining = (expirationDate: Date): number => {
  const now = new Date();
  const diffTime = expirationDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateExpirationDate = (transactionDate: Date, productId: string): Date => {
  const expirationDate = new Date(transactionDate);
  if (productId === ANNUAL_SUBSCRIPTION_PRODUCT) {
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  } else {
    expirationDate.setMonth(expirationDate.getMonth() + 1);
  }

  return expirationDate;
};

export const calculateTrialBillingDate = (transactionDate: Date): Date => {
  const billingDate = new Date(transactionDate);
  billingDate.setDate(billingDate.getDate() + TRIAL_DURATION_DAYS);
  return billingDate;
};

export const checkIsTrialActive = async (): Promise<boolean> => {
  try {
    if (isIos) {
      const activePurchases = await RNIAP.getAvailablePurchases();
      const purchase = activePurchases.find((p) => SUBSCRIPTION_SKUS.includes(p.productId));

      return purchase?.offerIOS !== null;
    }

    const freeTrialUntil = await AsyncStorage.getItem(STORAGE_KEYS.FREE_TRIAL_UNTIL);
    if (!freeTrialUntil) {
      return false;
    }

    const trialEndDate = new Date(freeTrialUntil).getTime();
    const now = new Date().getTime();

    return trialEndDate > now;
  } catch (error) {
    return false;
  }
};

export const setTrialEndDate = async (): Promise<void> => {
  const now = new Date();
  const trialEnds = new Date(now.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);
  await AsyncStorage.setItem(STORAGE_KEYS.FREE_TRIAL_UNTIL, trialEnds.toISOString());
};

export const getEmptySubscriptionDetails = () => ({
  currentPlan: null,
  activatedOn: null,
  endsIn: null,
  billingStartingOn: null,
  isTrial: false,
  daysRemaining: null,
  isCanceled: false,
  purchaseToken: null,
  productId: null,
});
