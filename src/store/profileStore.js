import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_PROFILE } from '../utils/defaults';

export const useProfileStore = create(
  persist(
    (set) => ({
      ...DEFAULT_PROFILE,
      updateProfile: (data) => set((s) => ({ ...s, ...data })),
    }),
    { name: 'stronix-profile' }
  )
);
