import { Platform } from 'react-native';

// Subscription Product IDs
export const SUBSCRIPTION_SKUS = Platform.select({
  ios: ['com.annual.premium'],
  android: ['test3'],
  default: [],
});

// Trial Configuration
export const TRIAL_DURATION_DAYS = 7;

// Subscription Configuration
export const SUBSCRIPTION_DURATION_YEARS = 1;

// Storage Keys
export const STORAGE_KEYS = {
  FREE_TRIAL_UNTIL: 'freeTrialUntil',
  HAS_SEEN_ONBOARDING: 'hasSeenOnboarding',
} as const;

// Platform URLs
export const SUBSCRIPTION_MANAGEMENT_URLS = {
  ios: 'https://apps.apple.com/account/subscriptions',
  android: 'https://play.google.com/store/account/subscriptions?package=com.eraiapp&sku=test3',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INIT_CONNECTION_FAILED: 'Failed to initialize in-app purchases',
  SUBSCRIPTION_CHECK_FAILED: 'Failed to verify subscription status',
  PURCHASE_FAILED: 'Failed to complete purchase. Please contact support.',
  START_SUBSCRIPTION_FAILED: 'Failed to start subscription. Please try again.',
  CANCEL_SUBSCRIPTION_FAILED: 'Failed to open subscription management. Please try again.',
  UNABLE_TO_OPEN_URL: 'Unable to open subscription management',
} as const;
