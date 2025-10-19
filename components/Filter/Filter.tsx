//components/Filter/Filter.tsx
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './Filter.module.css';

export default function Filter() {
  const filter = useCurrencyStore((state) => state.filter);
  const setFilter = useCurrencyStore((state) => state.setFilter);
  const hasHydrated = useCurrencyStore((state) => state.hasHydrated);

  if (!hasHydrated) return null;

  return (
    <input
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={(e) => setFilter(e.target.value.toLowerCase())}
    />
  );
}
