import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../Theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../Icons/back-24.svg';

const EducationalPurposesScreen = () => {
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
          <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>Disclaimer</Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            This application is designed solely for educational and training purposes.
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            In case of a real emergency, immediately call your local emergency services (911 in the
            US, 112 in Europe, or your local emergency number).
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            Educational purpose statement
          </Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            This application provides educational content and training simulations for emergency
            response procedures. It is intended to supplement, not replace, formal medical training
            and certification programs.
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Content is for educational reference only.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Not a substitute for professional medical training.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Does not replace certified first aid or CPR courses.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Should not be used as primary guidance during real emergencies.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            Liability limitations
          </Text>

          <Text style={[styles.subTitle, { color: '#FF3B30' }]}>No Medical Advice</Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            This application does not provide medical advice, diagnosis, or treatment. Always
            consult with qualified healthcare professionals for medical guidance.
          </Text>

          <Text style={[styles.subTitle, { color: '#FF3B30' }]}>Use at Your Own Risk</Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            Users assume full responsibility for any use of the information provided. The
            developers, contributors, and distributors of this application disclaim all liability
            for any injury, damage, or loss that may result from use of this application.
          </Text>

          <Text style={[styles.subTitle, { color: '#FF3B30' }]}>No Warranty</Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            This application is provided "as is" without any warranty of any kind, either express or
            implied, including but not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </Text>

          <Text style={[styles.subTitle, { color: '#FF3B30' }]}>Certification Requirements</Text>

          <Text style={[styles.paragraph, { color: colors.Text.neutral.secondary }]}>
            For official certification in CPR, first aid, or other emergency response procedures,
            users must complete courses through accredited organizations such as the American Heart
            Association, American Red Cross, or equivalent organizations in their region.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.Text.neutral.primary }]}>
            User responsibilities
          </Text>

          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Verify all information with authoritative medical sources.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Seek proper training and certification for emergency response.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Understand local emergency protocols and procedures.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Maintain current knowledge through continuing education.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Practice skills in controlled, supervised environments.
          </Text>
          <Text style={[styles.bulletPoint, { color: colors.Text.neutral.secondary }]}>
            • Never rely solely on this app during real emergencies.
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
  subTitle: {
    fontSize: 15,
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
  highlightedText: {
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 20,
  },
});

export default EducationalPurposesScreen;
