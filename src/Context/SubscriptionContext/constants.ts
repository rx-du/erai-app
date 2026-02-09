import { Platform } from 'react-native';

export const SUBSCRIPTION_SKUS = Platform.select({
  ios: ['com.annual.premium', 'com.monthly.premium'],
  android: ['com.annual.premium', 'com.monthly.premium'],
  default: [],
});

export const TRIAL_DURATION_DAYS = 7;

export const ANNUAL_SUBSCRIPTION_PRICE = '$24.99';

export const MONTHLY_SUBSCRIPTION_PRICE = '$2.99';

export const ANNUAL_SUBSCRIPTION_PRODUCT = 'com.annual.premium';

export const MONTHLY_SUBSCRIPTION_PRODUCT = 'com.monthly.premium';

export const STORAGE_KEYS = {
  FREE_TRIAL_UNTIL: 'freeTrialUntil',
  HAS_SEEN_ONBOARDING: 'hasSeenOnboarding',
} as const;

export const SUBSCRIPTION_MANAGEMENT_URLS = {
  ios: 'https://apps.apple.com/account/subscriptions',
  android: 'https://play.google.com/store/account/subscriptions?package=com.eraiapp',
} as const;

export const ERROR_MESSAGES = {
  INIT_CONNECTION_FAILED: 'Failed to initialize in-app purchases',
  SUBSCRIPTION_CHECK_FAILED: 'Failed to verify subscription status',
  PURCHASE_FAILED: 'Failed to complete purchase. Please contact support.',
  START_SUBSCRIPTION_FAILED: 'Failed to start subscription. Please try again.',
  CANCEL_SUBSCRIPTION_FAILED: 'Failed to open subscription management. Please try again.',
  UNABLE_TO_OPEN_URL: 'Unable to open subscription management',
} as const;
