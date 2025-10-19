'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';

export default function GeolocationChecker() {
  useEffect(() => {
    const fetchCurrencyFromLocation = async (latitude: number, longitude: number) => {
      try {
        const data = await getUserInfo({ latitude, longitude });
        const currency = data?.results?.[0]?.annotations?.currency?.iso_code;

        if (currency) {
          localStorage.setItem('userCurrency', currency);
          window.dispatchEvent(new CustomEvent('userCurrencyChanged', { detail: currency }));
          console.log('Detected currency:', currency);
        } else {
          console.warn('Currency not found in OpenCage response', data);
        }
      } catch (err) {
        console.error('OpenCage request failed', err);
      }
    };

    const handleSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      fetchCurrencyFromLocation(latitude, longitude);
    };

    const handleError = (err: GeolocationPositionError) => {
      console.error('Geolocation error', err);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000, // ⏱️ збільшено таймаут
      maximumAge: 0,
    });
  }, []);

  return null;
}
