import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
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
import { useLoading } from '../../Context/LoadingContext';
import { isAndroid } from '../../Constants/Device';
import { darkMapStyle } from './Helper';

export default function LocationScreen() {
  const { theme, colors } = useTheme();
  const { t } = useTranslation();
  const { region, addressTitle, addressDetails, permission } = useGetLocation();
  const { shareLocation } = useShareLocation(region);
  const { showLoading, hideLoading } = useLoading();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!region) {
      showLoading('Loading...');

      return () => {
        hideLoading();
      };
    }

    hideLoading();
  }, [region, showLoading, hideLoading]);

  if (permission === false) return <NoPermissionScreen />;

  return (
    <MainLayout>
      {region && (
        <View style={styles.container}>
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={region}
            showsUserLocation
            userInterfaceStyle={theme}
            mapType="mutedStandard"
            showsMyLocationButton={false}
            customMapStyle={isAndroid && theme === 'dark' ? darkMapStyle : []}
            ref={mapRef}
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
              onPress={() => mapRef.current?.animateToRegion(region, 500)}
              width={48}
              style={{ backgroundColor: colors.Bg.pure }}
            />
          </View>
        </View>
      )}
    </MainLayout>
  );
}
