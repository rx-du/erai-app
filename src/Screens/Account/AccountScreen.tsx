import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Theme/ThemeContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MainLayout } from '../Layout/MainLayout';
import ChevronDownIcon from '../../Icons/chevron-down-16.svg';
import { styles } from './Styles';

export default function AccountScreen({ navigation }: any) {
  const { colors, theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState('United States');
  const [selectedTheme, setSelectedTheme] = React.useState('Light');

  const languageMap: { [key: string]: string } = {
    en: 'English',
    ro: 'Română',
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await GoogleSignin.getCurrentUser();
        if (user?.user?.email) {
          setEmail(user.user.email);
        }
      } catch (e) {
        console.log('Not logged in');
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    setSelectedTheme(theme === 'dark' ? t('account.theme.dark') : t('account.theme.light'));
  }, [theme, t]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ro' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    navigation.replace('Welcome');
  };

  return (
    <MainLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
          {t('account.title')}
        </Text>

        <Text style={[styles.subtitle, { color: colors.Text.neutral.secondary }]}>
          {t('account.loggedInAs')}
          {'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logout}>{t('account.logout')}</Text>
        </TouchableOpacity>

        {/* Subscription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account.subscription.title')}</Text>
          <View style={[styles.subscriptionCard, { backgroundColor: colors.Bg.pure }]}>
            <View style={styles.subscriptionContent}>
              <Text style={[styles.subscriptionLabel, { color: colors.Text.neutral.secondary }]}>
                {t('account.subscription.free')}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.upgradeText}>{t('account.subscription.upgrade')}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.Bg.pure }]}>
            <Text style={[styles.menuItemText, { color: colors.Text.neutral.secondary }]}>
              {t('account.subscription.paymentsHistory')}
            </Text>
            <ChevronDownIcon width={16} height={16} style={styles.chevronRight} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account.settings.title')}</Text>

          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
            onPress={toggleLanguage}
          >
            <Text style={[styles.settingLabel, { color: colors.Text.neutral.secondary }]}>
              {t('account.language')}
            </Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>{languageMap[i18n.language]}</Text>
              <ChevronDownIcon width={16} height={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}>
            <Text style={[styles.settingLabel, { color: colors.Text.neutral.secondary }]}>
              {t('account.country')}
            </Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>{selectedCountry}</Text>
              <ChevronDownIcon width={16} height={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: colors.Bg.pure }]}
            onPress={toggleTheme}
          >
            <Text style={[styles.settingLabel, { color: colors.Text.neutral.secondary }]}>
              {t('account.theme.title')}
            </Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>{selectedTheme}</Text>
              <ChevronDownIcon width={16} height={16} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MainLayout>
  );
}
