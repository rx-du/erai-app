import { useState, useCallback, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const useGetLocation = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [addressTitle, setAddressTitle] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [permission, setPermission] = useState<null | boolean>(null);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      setPermission(status === 'granted');
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      setPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    }
  }, []);

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const newRegion = { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 };
        setRegion(newRegion);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                'User-Agent': 'EraiApp',
              },
            }
          );
          const data = await response.json();

          if (data && data.display_name) {
            setAddressTitle(data.name || 'Current Location');
            setAddressDetails(data.display_name);
          } else {
            setAddressTitle('Current Location');
            setAddressDetails(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          }
        } catch (e) {
          setAddressTitle('Current Location');
          setAddressDetails(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        }
      },
      () => setPermission(false),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (permission) getLocation();
  }, [permission]);

  return { region, addressTitle, addressDetails, permission, getLocation };
};
