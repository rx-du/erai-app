import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRIAL_DURATION_DAYS, SUBSCRIPTION_DURATION_YEARS, STORAGE_KEYS } from './constants';

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

export const calculateExpirationDate = (transactionDate: Date): Date => {
  const expirationDate = new Date(transactionDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + SUBSCRIPTION_DURATION_YEARS);
  return expirationDate;
};

export const calculateTrialBillingDate = (transactionDate: Date): Date => {
  const billingDate = new Date(transactionDate);
  billingDate.setDate(billingDate.getDate() + TRIAL_DURATION_DAYS);
  return billingDate;
};

export const checkIsTrialActive = async (): Promise<boolean> => {
  try {
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
  //const trialEnds = new Date(now.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);
  const trialEnds = new Date(now.getTime() + 5 * 60 * 1000);
  await AsyncStorage.setItem(STORAGE_KEYS.FREE_TRIAL_UNTIL, trialEnds.toISOString());
};

export const markOnboardingComplete = async (): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING, 'true');
};

export const getEmptySubscriptionDetails = () => ({
  currentPlan: null,
  activatedOn: null,
  endsIn: null,
  billingStartingOn: null,
  payment: null,
  isTrial: false,
  daysRemaining: null,
  isCanceled: false,
});
