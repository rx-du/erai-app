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
import { setTrialEndDate, markOnboardingComplete, getEmptySubscriptionDetails } from './utils';
import { STORAGE_KEYS, ERROR_MESSAGES } from './constants';
import type { SubscriptionContextType, SubscriptionDetails } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails>(
    getEmptySubscriptionDetails()
  );

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
        console.log('existingTrial', existingTrial);
        if (!existingTrial) {
          await setTrialEndDate();
        }

        await checkSubscription();
        await markOnboardingComplete();

        setError(null);

        if (onPurchaseCompleteRef.current) {
          onPurchaseCompleteRef.current();
        }
      } catch (err) {
        setError(ERROR_MESSAGES.PURCHASE_FAILED);
      }
    },
    [checkSubscription]
  );

  const handlePurchaseError = useCallback((purchaseError: PurchaseError) => {
    const errorMessage = purchaseError.message || 'An error occurred during purchase';
    setError(errorMessage);
  }, []);

  const startSubscription = useCallback(async () => {
    try {
      setError(null);
      await SubscriptionService.purchaseSubscription();
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.START_SUBSCRIPTION_FAILED);
    }
  }, []);

  // const upgradeSubscription = useCallback(async () => {
  //   try {
  //     setError(null);
  //     await SubscriptionService.upgradeSubscription('test2', 'charge-full-price');
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : ERROR_MESSAGES.START_SUBSCRIPTION_FAILED);
  //   }
  // }, []);

  const openSubscriptionManagement = useCallback(async () => {
    try {
      setError(null);
      await SubscriptionService.openSubscriptionManagement();
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.CANCEL_SUBSCRIPTION_FAILED);
    }
  }, []);

  const initializeIAP = useCallback((onPurchaseComplete?: () => void) => {
    onPurchaseCompleteRef.current = onPurchaseComplete;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('e activ baaaa!!!!!!!!!!');
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

    const initIAP = async () => {
      try {
        if (!isMounted) return;

        setLoading(true);
        setError(null);

        await SubscriptionService.initializeConnection();

        if (!isMounted) return;

        await checkSubscription();

        if (!isMounted) return;

        purchaseUpdateSubscription = RNIAP.purchaseUpdatedListener(handlePurchaseUpdate);
        purchaseErrorSubscription = RNIAP.purchaseErrorListener(handlePurchaseError);
      } catch (err) {
        if (!isMounted) return;

        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.INIT_CONNECTION_FAILED;
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initIAP();

    return () => {
      isMounted = false;
      purchaseUpdateSubscription?.remove();
      purchaseErrorSubscription?.remove();
      SubscriptionService.endConnection();
    };
  }, [checkSubscription, handlePurchaseUpdate, handlePurchaseError]);

  const value: SubscriptionContextType = {
    loading,
    error,
    subscriptionDetails,
    checkSubscription,
    startSubscription,
    openSubscriptionManagement,
    initializeIAP,
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
