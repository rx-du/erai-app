import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCountries, ICountry } from 'react-native-international-phone-number';

const STORAGE_KEY = 'selectedCountry';

export function useCountry(defaultCode: ICountry['cca2'] = 'US') {
  const [country, setCountry] = useState<ICountry | null>(null);
  const [countryCode, setCountryCode] = useState<ICountry['cca2']>(defaultCode);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setCountry(parsed);
        setCountryCode(parsed.cca2);
      } else {
        const all = getAllCountries();
        const defaultCountry = all.find((x) => x.cca2 === defaultCode);

        if (defaultCountry) {
          setCountry(defaultCountry);
          setCountryCode(defaultCountry.cca2);
        }
      }
    };

    load();
  }, []);

  const updateCountry = async (selected: ICountry) => {
    setCountry(selected);
    setCountryCode(selected.cca2);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
  };

  return {
    country,
    countryCode,
    setCountry: updateCountry,
  };
}
