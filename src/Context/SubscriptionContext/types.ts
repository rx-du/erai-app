import type { Purchase, PurchaseError } from 'react-native-iap';

export type SubscriptionDetails = {
  currentPlan: string | null;
  activatedOn: string | null;
  endsIn: string | null;
  billingStartingOn: string | null;
  payment: string | null;
  isTrial: boolean;
  isCanceled: boolean;
};

export type SubscriptionContextType = {
  loading: boolean;
  error: string | null;
  subscriptionDetails: SubscriptionDetails;
  checkSubscription: () => Promise<void>;
  startSubscription: () => Promise<void>;
  openSubscriptionManagement: () => Promise<void>;
  initializeIAP: (onPurchaseComplete?: () => void) => void;
};

export type PurchaseUpdateHandler = (purchase: Purchase) => Promise<void>;
export type PurchaseErrorHandler = (error: PurchaseError) => void;

export type SubscriptionState = {
  loading: boolean;
  error: string | null;
  subscriptionDetails: SubscriptionDetails;
};
