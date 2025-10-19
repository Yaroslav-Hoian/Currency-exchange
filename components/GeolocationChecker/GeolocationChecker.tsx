'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { hasHydrated, baseCurrency, setBaseCurrency } = useCurrencyStore();
  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      try {
        const data = await getUserInfo(coords);
        const currencyCode = data?.results?.[0]?.annotations?.currency?.iso_code || 'USD';
        setBaseCurrency(currencyCode);
      } catch {
        setBaseCurrency('USD');
      }
    };

    const error = () => {
      setBaseCurrency('USD');
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [hasHydrated, baseCurrency, setBaseCurrency]);

  return null;
}
