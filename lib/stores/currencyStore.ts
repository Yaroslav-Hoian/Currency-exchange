// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface CurrencyState {
  baseCurrency: string | null;
  setBaseCurrency: (currency: string) => void;

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: null,
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),

      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
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
