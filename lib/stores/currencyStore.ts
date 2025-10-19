// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserInfo as fetchCurrencyInfo } from '../service/opencagedataApi';

type CurrencyState = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  fetchAndSetCurrency: (latitude: number, longitud: number) => Promise<void>;

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: 'USD',

      setBaseCurrency: (currency) => set({ baseCurrency: currency }),

      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      fetchAndSetCurrency: async (latitude, longitude) => {
        try {
          const currency = await fetchCurrencyInfo({ latitude, longitude });
          set({ baseCurrency: currency });
        } catch (error) {
          console.error('Failed to fetch user currency:', error);
        }
      },
    }),
    { name: 'currency-storage' }
  )
);

// const { baseCurrency, fetchAndSetCurrency } = useCurrencyStore(); для використання стану валюти
