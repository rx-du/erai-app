import { Share, Platform } from 'react-native';

export const useShareLocation = (region: { latitude: number; longitude: number } | null) => {
  const shareLocation = () => {
    if (!region) return;
    const { latitude, longitude } = region;

    const link =
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?ll=${latitude},${longitude}`
        : `https://maps.google.com/?q=${latitude},${longitude}`;

    Share.share({ message: `My location: ${link}` });
  };

  return { shareLocation };
};
