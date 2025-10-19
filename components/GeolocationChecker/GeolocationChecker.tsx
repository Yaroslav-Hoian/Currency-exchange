'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { hasHydrated, baseCurrency, setBaseCurrency } = useCurrencyStore();

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    const fetchCurrencyFromLocation = async (latitude: number, longitude: number) => {
      try {
        const data = await getUserInfo({ latitude, longitude });
        const currency = data?.results?.[0]?.annotations?.currency?.iso_code;

        if (currency) {
          setBaseCurrency(currency);
          localStorage.setItem('userCurrency', currency);
          window.dispatchEvent(new CustomEvent('userCurrencyChanged', { detail: currency }));
          console.log('Detected currency:', currency);
        } else {
          console.warn('Currency not found in OpenCage response', data);
          setBaseCurrency('USD');
        }
      } catch (err) {
        console.error('OpenCage request failed', err);
        setBaseCurrency('USD');
      }
    };

    const handleSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      fetchCurrencyFromLocation(latitude, longitude);
    };

    const handleError = (err: GeolocationPositionError) => {
      console.error('Geolocation error', err);
      setBaseCurrency('USD');
      localStorage.setItem('userCurrency', 'USD');
      window.dispatchEvent(new CustomEvent('userCurrencyChanged', { detail: 'USD' }));
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, [hasHydrated, baseCurrency, setBaseCurrency]);

  return null;
}
