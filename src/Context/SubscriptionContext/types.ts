import type { Purchase, PurchaseError } from 'react-native-iap';

export type SubscriptionDetails = {
  currentPlan: string | null;
  activatedOn: string | null;
  endsIn: string | null;
  billingStartingOn: string | null;
  isTrial: boolean;
  isCanceled: boolean;
  purchaseToken: string | null;
  productId: string | null;
};

export type ChangeSubscriptionParams = {
  newSku: string;
  oldPurchaseToken: string;
  mode: SubscriptionChangeMode;
};

export type SubscriptionChangeMode = 'upgrade' | 'downgrade';

export type SubscriptionContextType = {
  loading: boolean;
  error: string | null;
  subscriptionDetails: SubscriptionDetails;
  checkSubscription: () => Promise<void>;
  startSubscription: (sku: string) => Promise<void>;
  changePlan: (newSku: string, mode: string) => Promise<void>;
  openSubscriptionManagement: (productId: string) => Promise<void>;
};

export type PurchaseUpdateHandler = (purchase: Purchase) => Promise<void>;
export type PurchaseErrorHandler = (error: PurchaseError) => void;

export type SubscriptionState = {
  loading: boolean;
  error: string | null;
  subscriptionDetails: SubscriptionDetails;
};
