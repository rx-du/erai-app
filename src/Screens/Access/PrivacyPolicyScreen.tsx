import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../Icons/back-24.svg';

const PrivacyPolicyScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.Bg.primary }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackIcon color={colors.Text.accent.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>Privacy Policy</Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Last Updated: November 26, 2024
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Emergency Response Guide ("we", "us", or "our") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our mobile application (the "App"). Please read this privacy
            policy carefully. If you do not agree with the terms of this privacy policy, please do
            not access the App.
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We reserve the right to make changes to this Privacy Policy at any time and for any
            reason. We will alert you about any changes by updating the "Last Updated" date of this
            Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay
            informed of updates. You will be deemed to have been made aware of, will be subject to,
            and will be deemed to have accepted the changes in any revised Privacy Policy by your
            continued use of the App after the date such revised Privacy Policy is posted.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            1. Information We Collect
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We may collect information about you in a variety of ways. The information we may
            collect via the App includes:
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            Personal Data
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Personally identifiable information, such as your name, shipping address, email address,
            and telephone number, and demographic information, such as your age, gender, hometown,
            and interests, that you voluntarily give to us when you register with the App or when
            you choose to participate in various activities related to the App, such as online chat
            and message boards. You are under no obligation to provide us with personal information
            of any kind, however your refusal to do so may prevent you from using certain features
            of the App.
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            Derivative Data
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Information our servers automatically collect when you access the App, such as your IP
            address, your browser type, your operating system, your access times, and the pages you
            have viewed directly before and after accessing the App. If you are using our App, this
            information may also include your device name and type, your operating system, your
            phone number, your country, your likes and replies to a post, and other interactions
            with the App and other users via server log files, as well as any other information you
            choose to provide.
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            Financial Data
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Financial information, such as data related to your payment method (e.g., valid credit
            card number, card brand, expiration date) that we may collect when you purchase, order,
            return, exchange, or request information about our services from the App. We store only
            very limited, if any, financial information that we collect. Otherwise, all financial
            information is stored by our payment processor, and you are encouraged to review their
            privacy policy and contact them directly for responses to your questions.
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            Mobile Device Data
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Device information, such as your mobile device ID, model, and manufacturer, and
            information about the location of your device, if you access the App from a mobile
            device.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            2. How We Use Your Information
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Having accurate information about you permits us to provide you with a smooth,
            efficient, and customized experience. Specifically, we may use information collected
            about you via the App to:
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Create and manage your account
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Process your transactions and send you related information
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Email you regarding your account or order
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Enable user-to-user communications
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Generate a personal profile about you to make future visits to the App more
            personalized
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Increase the efficiency and operation of the App
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Monitor and analyze usage and trends to improve your experience with the App
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Notify you of updates to the App
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Offer new products, services, and/or recommendations to you
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Perform other business activities as needed
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Prevent fraudulent transactions, monitor against theft, and protect against criminal
            activity
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            3. When and Why We Share Your Information
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We may share information we have collected about you in certain situations. Your
            information may be disclosed as follows:
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            By Law or to Protect Rights
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            If we believe the release of information about you is necessary to respond to legal
            process, to investigate or remedy potential violations of our policies, or to protect
            the rights, property, and safety of others, we may share your information as permitted
            or required by any applicable law, rule, or regulation. This includes exchanging
            information with other entities for fraud protection and credit risk reduction.
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            Third-Party Service Providers
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We may share your information with third parties that perform services for us or on our
            behalf, including payment processing, data analysis, email delivery, hosting services,
            customer service, and marketing assistance.
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            Business Transfers
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We may share or transfer your information in connection with, or during negotiations of,
            any merger, sale of company assets, financing, or acquisition of all or a portion of our
            business to another company.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            4. Emergency Data
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            The App may collect and store emergency contact information that you provide. This
            information is stored securely and is only used for the purposes you specify within the
            App. We do not share this information with third parties except as necessary to provide
            emergency services or as required by law.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            5. Security
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We use administrative, technical, and physical security measures to help protect your
            personal information. While we have taken reasonable steps to secure the personal
            information you provide to us, please be aware that despite our efforts, no security
            measures are perfect or impenetrable, and no method of data transmission can be
            guaranteed against any interception or other type of misuse.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            6. Children's Privacy
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We do not knowingly solicit information from or market to children under the age of 13.
            If we learn that we have collected personal information from a child under age 13
            without verification of parental consent, we will delete that information as quickly as
            possible. If you believe we might have any information from or about a child under 13,
            please contact us.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            7. International Data Transfers
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Your information, including Personal Data, may be transferred to — and maintained on —
            computers located outside of your state, province, country or other governmental
            jurisdiction where the data protection laws may differ from those of your jurisdiction.
            If you are located outside United States and choose to provide information to us, please
            note that we transfer the data, including Personal Data, to United States and process it
            there.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            8. Your Rights and Choices
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Depending on your location, you may have the following rights regarding your personal
            information:
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • The right to access – You have the right to request copies of your personal data
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • The right to rectification – You have the right to request that we correct any
            information you believe is inaccurate or complete information you believe is incomplete
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • The right to erasure – You have the right to request that we erase your personal data,
            under certain conditions
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • The right to restrict processing – You have the right to request that we restrict the
            processing of your personal data, under certain conditions
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • The right to object to processing – You have the right to object to our processing of
            your personal data, under certain conditions
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • The right to data portability – You have the right to request that we transfer the
            data that we have collected to another organization, or directly to you, under certain
            conditions
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            9. Region-Specific Notices
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            California Residents
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            If you are a California resident, you have specific rights regarding access to your
            personal information under the California Consumer Privacy Act (CCPA). You may request
            information about the categories and specific pieces of personal information we have
            collected, as well as the categories of sources from which such information is
            collected.
          </Text>

          <Text style={[styles.subTitle, { color: colors.Text.neutral.primary }]}>
            European Union Residents
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            If you are a resident of the European Union, you have certain data protection rights
            under the General Data Protection Regulation (GDPR). You have the right to request
            access to, correction of, or deletion of your personal data, as well as the right to
            data portability and the right to object to processing.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            10. Changes to This Privacy Policy
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We may update this Privacy Policy from time to time in order to reflect, for example,
            changes to our practices or for other operational, legal, or regulatory reasons. We will
            notify you of any changes by posting the new Privacy Policy on this page and updating
            the "Last Updated" date.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            11. Contact Us
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Email: privacy@emergencyapp.com
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Address: [Your Company Address]
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Phone: [Your Contact Number]
          </Text>

          {/* Add extra padding at bottom for scroll space */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingBottom: 48,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Inter',
    marginTop: 24,
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
});

export default PrivacyPolicyScreen;
