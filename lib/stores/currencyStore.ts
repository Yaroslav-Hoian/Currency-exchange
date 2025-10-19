import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExchangeInfo {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
}

export interface CurrencyState {
  baseCurrency: string;
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: string | null;
  rates: [string, number][];
  filter: string;
  hasHydrated: boolean;
  setBaseCurrency: (currency: string) => void;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsError: (error: string | null) => void;
  setRates: (rates: [string, number][]) => void;
  setFilter: (filter: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      exchangeInfo: null,
      isLoading: false,
      isError: null,
      rates: [],
      filter: '',
      hasHydrated: false,
      setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),
      setExchangeInfo: (info: ExchangeInfo | null) => set({ exchangeInfo: info }),
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      setIsError: (error: string | null) => set({ isError: error }),
      setRates: (rates: [string, number][]) => set({ rates }),
      setFilter: (filter: string) => set({ filter }),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
