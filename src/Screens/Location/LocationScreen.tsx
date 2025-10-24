import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { MainLayout } from '../Layout/MainLayout';
import { useTheme } from '../../Theme/ThemeContext';
import { styles } from './Styles';
import CurrentLocationCard from '../../Features/Location/CurrentLocationCard';
import NoPermissionScreen from './NoPermissionScreen';
import { CustomButton } from '../../Components/CustomButton';
import { useShareLocation } from '../../Hooks/useShareLocation';
import { useGetLocation } from '../../Hooks/useGetLocation';

import ShareIcon from '../../Icons/share-32.svg';
import GpsIcon from '../../Icons/gps-32.svg';

export default function LocationScreen() {
  const { theme, colors } = useTheme();
  const { region, addressTitle, addressDetails, permission, getLocation } = useGetLocation();
  const { shareLocation } = useShareLocation(region);

  if (permission === false) return <NoPermissionScreen />;
  if (!region) return <Text>Se încarcă locația...</Text>;

  return (
    <MainLayout>
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={region}
          showsUserLocation
          userInterfaceStyle={theme}
          mapType="mutedStandard"
        />

        <CurrentLocationCard addressTitle={addressTitle} addressDetails={addressDetails} />

        <View style={styles.buttonsContainer}>
          <CustomButton
            type="primary"
            Icon={(props) => <ShareIcon {...props} color={colors.Text.accent.primary} />}
            onPress={shareLocation}
            width={48}
            style={{ backgroundColor: colors.Bg.pure }}
          />
          <CustomButton
            type="primary"
            Icon={(props) => <GpsIcon {...props} color={colors.Text.accent.primary} />}
            onPress={getLocation}
            width={48}
            style={{ backgroundColor: colors.Bg.pure }}
          />
        </View>
      </View>
    </MainLayout>
  );
}
