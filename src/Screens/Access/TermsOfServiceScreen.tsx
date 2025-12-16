import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../Icons/back-24.svg';

const TermsOfServiceScreen = () => {
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
          <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>
            Terms of Service
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Last Updated: November 26, 2024
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            1. Eligibility
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            You must be at least 13 years old to use this application. By using the Service, you
            represent and warrant that you meet this age requirement.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            2. Eligibility
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            You must be at least 13 years old to use this application. By using the Service, you
            represent and warrant that you meet this age requirement.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            3. Eligibility
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            You must be at least 13 years old to use this application. By using the Service, you
            represent and warrant that you meet this age requirement.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            4. License to Use the App
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
            non-transferable, revocable license to access and use the application for personal,
            non-commercial purposes.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            5. Compliance Notice of the DMCA - Children's Online Privacy Protection Act (COPPA)
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We are committed to complying with the Children's Online Privacy Protection Act (COPPA)
            and do not knowingly collect personal information from children under 13 without
            verifiable parental consent. If we become aware that we have inadvertently collected
            such information, we will take steps to delete it as soon as possible.
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Parents or guardians who believe their child has provided us with personal information
            without consent may contact us to request deletion of such information.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            6. No Provision of Scholarship
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            This application does not provide medical advice, diagnosis, or treatment. The content
            is for educational purposes only and should not be used as a substitute for professional
            medical advice or emergency services.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            7. User Responsibilities
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            You agree to:
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Use the application only for lawful purposes
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Not attempt to gain unauthorized access to any part of the Service
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Not use the Service to transmit harmful code or malware
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Comply with all applicable laws and regulations
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            8. Prohibited Conduct
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            You may not:
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Reverse engineer, decompile, or disassemble the application
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Use the Service for any illegal or unauthorized purpose
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Interfere with or disrupt the Service or servers
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Impersonate any person or entity
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            9. Condition: Part II
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We reserve the right to modify, suspend, or discontinue the Service at any time without
            notice. We will not be liable to you or any third party for any modification,
            suspension, or discontinuation of the Service.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            10. Privacy
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Your use of the Service is also governed by our Privacy Policy, which describes how we
            collect, use, and protect your personal information. By using the Service, you consent
            to our collection and use of your information as described in the Privacy Policy.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            11. Third-Party Services
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            The Service may contain links to third-party websites or services that are not owned or
            controlled by us. We have no control over, and assume no responsibility for, the
            content, privacy policies, or practices of any third-party websites or services.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            12. Intellectual Property
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            All content, trademarks, and data on this application, including but not limited to
            software, databases, text, graphics, icons, and hyperlinks, are the property of or
            licensed to us and are protected by applicable intellectual property laws.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            13. Termination
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We may terminate or suspend your access to the Service immediately, without prior notice
            or liability, for any reason, including if you breach these Terms. Upon termination,
            your right to use the Service will cease immediately.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            14. Limitation of Liability
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            To the maximum extent permitted by law, we shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or
            revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            15. Indemnification
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            You agree to indemnify and hold harmless the Company and its affiliates, officers,
            agents, and employees from any claim or demand, including reasonable attorneys' fees,
            made by any third party due to or arising out of your breach of these Terms or your
            violation of any law or the rights of a third party.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            16. Governing Law
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            These Terms shall be governed by and construed in accordance with the laws of [Your
            Jurisdiction], without regard to its conflict of law provisions.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            17. Changes to the Terms of Service
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            We reserve the right to modify these Terms at any time. If we make material changes, we
            will notify you by updating the date at the top of these Terms and, in some cases, we
            may provide additional notice (such as adding a statement to our homepage or sending you
            a notification).
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            18. Contact Information
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            If you have any questions about these Terms, please contact us at:
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Email: support@emergencyapp.com
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Address: [Your Company Address]
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
    fontWeight: '800',
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

export default TermsOfServiceScreen;
