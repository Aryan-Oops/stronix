import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_STEPS_HISTORY } from '../utils/defaults';

export const useStepStore = create(
  persist(
    (set, get) => ({
      todaySteps: 7240,
      history: DEFAULT_STEPS_HISTORY,
      stepGoal: 10000,
      addSteps: (n) => {
        const next = get().todaySteps + n;
        const history = get().history.map((h, i) =>
          i === get().history.length - 1 ? { ...h, steps: next } : h
        );
        set({ todaySteps: next, history });
      },
      setGoal: (n) => set({ stepGoal: n }),
      resetToday: () => set({ todaySteps: 0 }),
    }),
    { name: 'stronix-steps' }
  )
);
