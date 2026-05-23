import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWorkoutStore = create(
  persist(
    (set, get) => ({
      completedSets: {},
      activeDay: 'push',
      setActiveDay: (day) => set({ activeDay: day }),
      markSet: (day, exId, setNum) => {
        const key = `${day}-${exId}`;
        const current = get().completedSets[key] || 0;
        set((s) => ({
          completedSets: { ...s.completedSets, [key]: Math.max(current, setNum) },
        }));
      },
      getCompleted: (day, exId) => {
        const key = `${day}-${exId}`;
        return get().completedSets[key] || 0;
      },
      resetDay: (day) => {
        const updated = { ...get().completedSets };
        Object.keys(updated).forEach((k) => { if (k.startsWith(day + '-')) delete updated[k]; });
        set({ completedSets: updated });
      },
    }),
    { name: 'stronix-workout' }
  )
);
