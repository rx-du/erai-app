import { Text, View } from 'react-native';
import { contentStyle } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneIcon from '../../Icons/phone-filled-24.svg';

type ProtocolSection = {
  title: string;
  type: string;
  items?: string[];
  content?: string;
};

type ProtocolDataType = {
  id: string;
  severity: string;
  title: string;
  description: string;
  sections: ProtocolSection[];
};

type ProtocolDataProps = {
  protocolData?: ProtocolDataType | null;
};

export default function ProtocolData({ protocolData }: ProtocolDataProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        contentStyle.container,
        { backgroundColor: protocolData?.sections ? colors.Bg.pure : colors.Background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {protocolData?.sections.map((section, index) => (
        <View key={`${section.title}-${index}`} style={contentStyle.subContainer}>
          <Text style={[contentStyle.titleSection, { color: colors.Text.neutral.primary }]}>
            {section.title}
          </Text>

          {section.type === 'list' && section.items && (
            <View style={{ gap: 8 }}>
              {section.items.map((item) => (
                <Text
                  key={`${section.title}-${item}}`}
                  style={[contentStyle.contentSection, { color: colors.Text.neutral.secondary }]}
                >
                  • {item}
                </Text>
              ))}
            </View>
          )}

          {section.type === 'text' && section.content && (
            <Text style={[contentStyle.contentSection, { color: colors.Text.neutral.secondary }]}>
              {section.content}
            </Text>
          )}

          {section.type === 'contacts' && section.items && (
            <View style={{ marginTop: 8, gap: 12 }}>
              {section.items.map((item) => (
                <View
                  key={`${section.title}-contact-${item}`}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <PhoneIcon width={15} height={15} color={colors.Text.accent.primary} />

                  <Text
                    style={[
                      contentStyle.contentSection,
                      { color: colors.Text.accent.primary, fontWeight: '600' },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
