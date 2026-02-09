import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Theme/ThemeContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MainLayout } from '../Layout/MainLayout';
import { styles } from './Styles';
import { useLoading } from '../../Context/LoadingContext';
import { useCountry } from '../../Hooks/useCountry';
import ArrowDown from '../../Icons/arrow-down-2.svg';
import ArrowRight from '../../Icons/arrow-right.svg';
import CheckIcon from '../../Icons/check-24.svg';
import { CustomDrawer } from '../../Components/CustomDrawer';
import { getAllCountries } from 'react-native-international-phone-number';
import { Languages, Themes } from './Helper';
import { CustomModal } from '../../Components/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSubscription } from '../../Context/SubscriptionContext';
import { useAuth } from '../../Context/AuthContext';
import UpgradeSubscriptionDrawer from '../../Features/Subscription/UpgradeSubscriptionDrawer';
import AndroidManageSubscriptionDrawer from '../../Features/Subscription/AndroidManageSubscriptionDrawer';
import { isAndroid } from '../../Constants/Device';
import {
  ANNUAL_SUBSCRIPTION_PRICE,
  ANNUAL_SUBSCRIPTION_PRODUCT,
  MONTHLY_SUBSCRIPTION_PRICE,
} from '../../Context/SubscriptionContext/constants';

export default function AccountScreen({ navigation }: any) {
  const { colors, theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { country, setCountry } = useCountry('US');
  const [email, setEmail] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);
  const [showUpgradeSubscription, setShowUpgradeSubscription] = useState(false);
  const [showAndroidManageSubscriptionDrawer, setShowAndroidManageSubscriptionDrawer] =
    useState(false);
  const { subscriptionDetails, openSubscriptionManagement } = useSubscription();

  const { logout, replayOnboarding } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      showLoading('Loading...');

      try {
        const user = GoogleSignin.getCurrentUser();
        if (isMounted && user?.user?.email) {
          setEmail(user.user.email);
        }
      } catch (e) {
        console.log('Not logged in');
      } finally {
        setTimeout(() => {
          if (isMounted) hideLoading();
        }, 300);
      }
    };

    init();

    return () => {
      isMounted = false;
      hideLoading();
    };
  }, []);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleThemeChange = (selectedTheme: string) => {
    if (
      (selectedTheme === 'dark' && theme === 'light') ||
      (selectedTheme === 'light' && theme === 'dark')
    ) {
      toggleTheme();
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async () => {
    await AsyncStorage.clear();
    await logout();
  };

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const countries = useMemo(() => {
    const all = getAllCountries();

    const us = all.find((c) => c.cca2 === 'US');
    const others = all.filter((c) => c.cca2 !== 'US');

    return us ? [us, ...others] : all;
  }, []);

  return (
    <MainLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
            {t('account.title')}
          </Text>

          {email && (
            <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
              {t('account.loggedInAs')}
              {'\n'}
              {email}
            </Text>
          )}

          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.logout, { color: colors.Text.accent.primary }]}>
              {t('account.logout')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.sectionBodyContainer}>
            <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
              {t('account.settings.title')}
            </Text>

            <View style={styles.card}>
              <TouchableOpacity
                style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
                onPress={() =>
                  subscriptionDetails.currentPlan
                    ? setShowSubscriptionDetails(true)
                    : setShowUpgradeSubscription(true)
                }
              >
                {!subscriptionDetails.isCanceled && (
                  <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                    Subscription
                  </Text>
                )}

                {subscriptionDetails.isCanceled && (
                  <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                    Subscription (canceled)
                  </Text>
                )}
                <View style={styles.selector}>
                  <Text
                    style={[
                      styles.subtitle,
                      { color: colors.Text.accent.primary, fontWeight: 500 },
                    ]}
                  >
                    {subscriptionDetails.currentPlan ?? 'Free'}
                  </Text>
                  <ArrowDown width={12} height={7} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
                onPress={() => setShowLanguageDropdown(true)}
              >
                <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                  Language
                </Text>
                <View style={styles.selector}>
                  <Text
                    style={[
                      styles.subtitle,
                      { color: colors.Text.accent.primary, fontWeight: 500 },
                    ]}
                  >
                    {Languages.find((lang) => lang.code === i18n.language)?.option ?? 'English'}
                  </Text>
                  <ArrowDown width={12} height={7} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
                onPress={() => setShowCountryDropdown(true)}
              >
                <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                  Country
                </Text>
                <View style={styles.selector}>
                  <Text
                    style={[
                      styles.subtitle,
                      { color: colors.Text.accent.primary, fontWeight: 500 },
                    ]}
                  >
                    {country?.name.common ?? 'United States'}
                  </Text>
                  <ArrowDown />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
                onPress={() => setShowThemeDropdown(true)}
              >
                <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                  Theme
                </Text>
                <View style={styles.selector}>
                  <Text
                    style={[
                      styles.subtitle,
                      { color: colors.Text.accent.primary, fontWeight: 500 },
                    ]}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </Text>
                  <ArrowDown />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionBodyContainer}>
            <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
              Permissions
            </Text>

            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
              onPress={() => openAppSettings()}
            >
              <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                Location
              </Text>
              <ArrowRight color={colors.Text.accent.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionBodyContainer}>
            <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>Help</Text>
            <View></View>

            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
              onPress={async () => {
                await replayOnboarding();
                navigation.navigate('Onboarding', { goToAccount: true });
              }}
            >
              <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                Onboarding
              </Text>
              <ArrowRight color={colors.Text.accent.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
              onPress={() => {
                navigation.navigate('EducationalPurposes');
              }}
            >
              <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                Educational Purpose disclaimer
              </Text>
              <ArrowRight color={colors.Text.accent.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
              onPress={() => {
                navigation.navigate('TermsOfService');
              }}
            >
              <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                Terms of Services
              </Text>
              <ArrowRight color={colors.Text.accent.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}
            >
              <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
                Privacy Policy
              </Text>
              <ArrowRight color={colors.Text.accent.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.settingItem,
                {
                  backgroundColor: colors.Button.accent.secondary,
                  borderColor: colors.Button.accent.primary,
                  borderWidth: 1,
                },
              ]}
              onPress={() => {
                setShowDeleteModal(true);
              }}
            >
              <Text style={[styles.subtitle, { color: colors.Text.accent.primary }]}>
                Delete account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CustomDrawer
        isVisible={showCountryDropdown}
        title="Choose country"
        onClose={() => {
          setShowCountryDropdown(false);
        }}
      >
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {countries.map((countryItem, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setCountry(countryItem);
                setShowCountryDropdown(false);
              }}
              style={[
                styles.item,
                i === 0 ? { borderBottomWidth: 0 } : { borderBottomColor: colors.Divider.primary },
              ]}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Text style={styles.itemText}>{countryItem.flag}</Text>

                <Text style={[styles.itemText, { color: colors.Text.neutral.primary }]}>
                  {countryItem.name.common}
                </Text>
              </View>
              {countryItem.cca2 === country?.cca2 && <CheckIcon />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomDrawer>

      <CustomDrawer
        isVisible={showLanguageDropdown}
        title="Choose langugae"
        isSmallDrawer
        onClose={() => {
          setShowLanguageDropdown(false);
        }}
      >
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {Languages.map((language, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                handleLanguageChange(language.code);
                setShowLanguageDropdown(false);
              }}
              style={[styles.item, { borderBottomColor: colors.Divider.primary }]}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Text style={[styles.itemText, { color: colors.Text.neutral.primary }]}>
                  {language.option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomDrawer>

      <CustomDrawer
        isVisible={showThemeDropdown}
        title="Choose theme"
        isSmallDrawer
        onClose={() => {
          setShowThemeDropdown(false);
        }}
      >
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {Themes.map((themeItem, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                handleThemeChange(themeItem.code);
                setShowThemeDropdown(false);
              }}
              style={[styles.item, { borderBottomColor: colors.Divider.primary }]}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Text style={[styles.itemText, { color: colors.Text.neutral.primary }]}>
                  {themeItem.option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomDrawer>

      <CustomModal
        visible={showDeleteModal}
        title="Delete account"
        subtitle="This action is irreversible. Deleting your account will remove all your personal data from our systems."
        onCancel={() => setShowDeleteModal(false)}
        onAction={handleDeleteAccount}
        actionName="Delete"
      />

      <CustomDrawer
        isVisible={showSubscriptionDetails}
        title="Subscription details"
        isSmallDrawer
        onClose={() => {
          setShowSubscriptionDetails(false);
        }}
      >
        <View>
          {subscriptionDetails.isCanceled && (
            <View
              style={{
                flexDirection: 'column',
                paddingBottom: 32,
              }}
            >
              <View style={{ flexDirection: 'column', paddingHorizontal: 24, paddingBottom: 24 }}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingVertical: 16,
                    gap: 16,
                  }}
                >
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                  >
                    <Text
                      style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                    >
                      Current plan canceled
                    </Text>
                    <Text
                      style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}
                    >
                      {subscriptionDetails.currentPlan || 'N/A'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={[styles.subscriptionIncludes, { color: colors.Text.neutral.tertiary }]}
                    >
                      Includes
                    </Text>
                    <Text
                      style={[
                        styles.subscriptionIncludes,
                        { color: colors.Text.neutral.secondary },
                      ]}
                    >
                      Access to all the guides and protocols.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderTopWidth: 1,
                    borderTopColor: colors.Divider.primary,
                  }}
                >
                  <Text
                    style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                  >
                    Started on
                  </Text>
                  <Text style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}>
                    {subscriptionDetails.activatedOn || 'N/A'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderTopWidth: 1,
                    borderTopColor: colors.Divider.primary,
                  }}
                >
                  <Text
                    style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                  >
                    Ends on
                  </Text>
                  <Text style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}>
                    {subscriptionDetails.billingStartingOn || 'N/A'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 32,
                  paddingHorizontal: 24,
                }}
              >
                <View style={{ flexDirection: 'column', gap: 24 }}>
                  <TouchableOpacity>
                    <Text style={[styles.actionButton, { color: colors.Text.accent.primary }]}>
                      Get help
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      openSubscriptionManagement(subscriptionDetails.productId || '');
                    }}
                  >
                    <Text style={[styles.actionButton, { color: colors.Text.accent.primary }]}>
                      Re-activate the Premium plan
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.subscriptionDisclaimer, { color: colors.Text.neutral.secondary }]}
                >
                  If you re-activate the Premium plan, you will be charged{' '}
                  {subscriptionDetails.productId === ANNUAL_SUBSCRIPTION_PRODUCT
                    ? `${ANNUAL_SUBSCRIPTION_PRICE}`
                    : `${MONTHLY_SUBSCRIPTION_PRICE}`}{' '}
                  on the expiration date to keep the Premium plan.
                </Text>
              </View>
            </View>
          )}
          {!subscriptionDetails.isCanceled && (
            <View
              style={{
                flexDirection: 'column',
                paddingBottom: 32,
              }}
            >
              <View style={{ flexDirection: 'column', paddingHorizontal: 24, paddingBottom: 24 }}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingVertical: 16,
                    gap: 16,
                  }}
                >
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                  >
                    <Text
                      style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                    >
                      Current plan
                    </Text>
                    <Text
                      style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}
                    >
                      {subscriptionDetails.currentPlan || 'N/A'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={[styles.subscriptionIncludes, { color: colors.Text.neutral.tertiary }]}
                    >
                      Includes
                    </Text>
                    <Text
                      style={[
                        styles.subscriptionIncludes,
                        { color: colors.Text.neutral.secondary },
                      ]}
                    >
                      {subscriptionDetails.isTrial
                        ? 'Access to CPR protocol for adults.'
                        : 'Access to all the guides and protocols.'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderTopWidth: 1,
                    borderTopColor: colors.Divider.primary,
                  }}
                >
                  <Text
                    style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                  >
                    Activated on
                  </Text>
                  <Text style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}>
                    {subscriptionDetails.activatedOn || 'N/A'}
                  </Text>
                </View>
                {subscriptionDetails.isTrial && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 16,
                      borderTopWidth: 1,
                      borderTopColor: colors.Divider.primary,
                    }}
                  >
                    <Text
                      style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                    >
                      Ends in
                    </Text>
                    <Text
                      style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}
                    >
                      {subscriptionDetails.endsIn || 'N/A'}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderTopWidth: 1,
                    borderTopColor: colors.Divider.primary,
                  }}
                >
                  <Text
                    style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                  >
                    {subscriptionDetails.isTrial ? 'Billing starting on' : 'Renews on'}
                  </Text>
                  <Text style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}>
                    {subscriptionDetails.billingStartingOn || 'N/A'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderTopWidth: 1,
                    borderTopColor: colors.Divider.primary,
                  }}
                >
                  <Text
                    style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}
                  >
                    Payment
                  </Text>
                  <Text style={[styles.subscriptionValue, { color: colors.Text.neutral.primary }]}>
                    {subscriptionDetails.productId === ANNUAL_SUBSCRIPTION_PRODUCT
                      ? `${ANNUAL_SUBSCRIPTION_PRICE}/Year`
                      : `${MONTHLY_SUBSCRIPTION_PRICE}/Month`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 32,
                  paddingHorizontal: 24,
                }}
              >
                <View style={{ flexDirection: 'column', gap: 24 }}>
                  <TouchableOpacity>
                    <Text style={[styles.actionButton, { color: colors.Text.accent.primary }]}>
                      Get help
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (isAndroid) {
                        setShowSubscriptionDetails(false);
                        setShowAndroidManageSubscriptionDrawer(true);
                      } else {
                        openSubscriptionManagement(subscriptionDetails.productId || '');
                      }
                    }}
                  >
                    <Text style={[styles.actionButton, { color: colors.Text.accent.primary }]}>
                      Manage my subscription
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.subscriptionDisclaimer, { color: colors.Text.neutral.secondary }]}
                >
                  If you cancel your subscription, your{' '}
                  {subscriptionDetails.isTrial ? 'Free trial' : 'Premium plan'} will remain active
                  until its expiration. After that, you'll be switched to the Free plan.
                </Text>
              </View>
            </View>
          )}
        </View>
      </CustomDrawer>

      <UpgradeSubscriptionDrawer
        isVisible={showUpgradeSubscription}
        onClose={() => setShowUpgradeSubscription(false)}
      />

      <AndroidManageSubscriptionDrawer
        isVisible={showAndroidManageSubscriptionDrawer}
        onClose={() => setShowAndroidManageSubscriptionDrawer(false)}
      />
    </MainLayout>
  );
}
