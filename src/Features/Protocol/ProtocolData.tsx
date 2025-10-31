import { Text, View } from 'react-native';
import { contentStyle } from './Styles';
import { useTheme } from '../../Theme/ThemeContext';

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
    <View style={[contentStyle.container, { backgroundColor: colors.Bg.pure }]}>
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
        </View>
      ))}
    </View>
  );
}
