import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { AppState } from 'react-native';
import * as RNIAP from 'react-native-iap';
import type { Purchase, PurchaseError } from 'react-native-iap';
import { SubscriptionService } from './subscriptionService';
import { setTrialEndDate, getEmptySubscriptionDetails } from './utils';
import { STORAGE_KEYS, ERROR_MESSAGES } from './constants';
import type { SubscriptionContextType, SubscriptionDetails } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../AuthContext';
import { useLoading } from '../LoadingContext';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails>(
    getEmptySubscriptionDetails()
  );
  const { completeOnboarding } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  const onPurchaseCompleteRef = useRef<(() => void) | undefined>(undefined);

  const checkSubscription = useCallback(async () => {
    try {
      setError(null);
      const details = await SubscriptionService.getSubscriptionDetails();
      setSubscriptionDetails(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.SUBSCRIPTION_CHECK_FAILED);
      setSubscriptionDetails(getEmptySubscriptionDetails());
    }
  }, []);

  const handlePurchaseUpdate = useCallback(
    async (purchase: Purchase) => {
      try {
        await SubscriptionService.finishTransaction(purchase);

        const existingTrial = await AsyncStorage.getItem(STORAGE_KEYS.FREE_TRIAL_UNTIL);

        if (!existingTrial) {
          await setTrialEndDate();
        }

        await checkSubscription();
        await completeOnboarding();

        setError(null);
        hideLoading();

        if (onPurchaseCompleteRef.current) {
          onPurchaseCompleteRef.current();
        }
      } catch (err) {
        hideLoading();
        setError(ERROR_MESSAGES.PURCHASE_FAILED);
      }
    },
    [checkSubscription, completeOnboarding, hideLoading]
  );

  const handlePurchaseError = useCallback(
    (purchaseError: PurchaseError) => {
      hideLoading();
      const errorMessage = purchaseError.message || 'An error occurred during purchase';
      setError(errorMessage);
    },
    [hideLoading]
  );

  const startSubscription = useCallback(
    async (sku: string) => {
      try {
        setError(null);
        showLoading('Loading...');
        await SubscriptionService.purchaseSubscription(sku);
      } catch (err) {
        hideLoading();
        setError(err instanceof Error ? err.message : ERROR_MESSAGES.START_SUBSCRIPTION_FAILED);
      }
    },
    [showLoading, hideLoading]
  );

  const changePlan = useCallback(
    async (newSku: string, mode: string) => {
      try {
        showLoading('Loading...');

        if (subscriptionDetails.purchaseToken) {
          if (mode == 'upgrade') {
            await SubscriptionService.upgradeSubscription(
              newSku,
              subscriptionDetails.purchaseToken
            );
          } else {
            await SubscriptionService.downgradeSubscription(
              newSku,
              subscriptionDetails.purchaseToken
            );
          }
        }
      } catch (err) {
        hideLoading();
      }
    },
    [subscriptionDetails, showLoading, hideLoading]
  );

  const openSubscriptionManagement = useCallback(async (productId: string) => {
    try {
      setError(null);
      await SubscriptionService.openSubscriptionManagement(productId || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.CANCEL_SUBSCRIPTION_FAILED);
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkSubscription();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [checkSubscription]);

  useEffect(() => {
    let purchaseUpdateSubscription: any;
    let purchaseErrorSubscription: any;
    let isMounted = true;

    const setupIAP = async () => {
      try {
        if (!isMounted) return;

        setLoading(true);
        setError(null);

        await checkSubscription();

        if (!isMounted) return;

        purchaseUpdateSubscription = RNIAP.purchaseUpdatedListener(handlePurchaseUpdate);
        purchaseErrorSubscription = RNIAP.purchaseErrorListener(handlePurchaseError);
      } catch (err) {
        if (!isMounted) return;

        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.SUBSCRIPTION_CHECK_FAILED;
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setupIAP();

    return () => {
      isMounted = false;
      purchaseUpdateSubscription?.remove();
      purchaseErrorSubscription?.remove();
    };
  }, [checkSubscription, handlePurchaseUpdate, handlePurchaseError]);

  const value: SubscriptionContextType = {
    loading,
    error,
    subscriptionDetails,
    checkSubscription,
    startSubscription,
    changePlan,
    openSubscriptionManagement,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);

  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }

  return context;
};
