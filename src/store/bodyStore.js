import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_BODY_ENTRIES } from '../utils/defaults';

export const useBodyStore = create(
  persist(
    (set, get) => ({
      entries: DEFAULT_BODY_ENTRIES,
      addEntry: (entry) => {
        const d = new Date();
        const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        set((s) => ({ entries: [...s.entries, { ...entry, date }] }));
      },
      getLatest: () => {
        const e = get().entries;
        return e.length ? e[e.length - 1] : null;
      },
      getFirst: () => {
        const e = get().entries;
        return e.length ? e[0] : null;
      },
    }),
    { name: 'stronix-body' }
  )
);
