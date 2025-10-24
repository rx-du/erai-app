import { Text, View } from 'react-native';
import { styles } from './Styles';

import LocationIcon from '../../Icons/location-filled-32.svg';
import { useTheme } from '../../Theme/ThemeContext';

type CurrentLocationCardProps = {
  addressTitle: string;
  addressDetails: string;
};

export default function CurrentLocationCard({
  addressTitle,
  addressDetails,
}: CurrentLocationCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.Bg.pure, borderColor: colors.Divider.primary },
      ]}
    >
      <LocationIcon color={colors.Text.accent.primary} />
      <View style={styles.subcontainer}>
        <Text style={[styles.title, { color: colors.Text.neutral.primary }]}>{addressTitle}</Text>
        <Text style={[styles.subTitle, { color: colors.Text.neutral.secondary }]}>
          {addressDetails}
        </Text>
      </View>
    </View>
  );
}
