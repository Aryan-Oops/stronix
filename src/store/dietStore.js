import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_MEALS } from '../utils/defaults';

const calcTotals = (meals) => {
  const logged = meals.filter((m) => m.logged);
  return {
    totalCal: logged.reduce((a, m) => a + m.cal, 0),
    totalProtein: logged.reduce((a, m) => a + m.protein, 0),
    totalCarbs: logged.reduce((a, m) => a + m.carbs, 0),
    totalFat: logged.reduce((a, m) => a + m.fat, 0),
  };
};

export const useDietStore = create(
  persist(
    (set, get) => ({
      meals: DEFAULT_MEALS,
      ...calcTotals(DEFAULT_MEALS),
      logMeal: (id) => {
        const meals = get().meals.map((m) =>
          m.id === id ? { ...m, logged: !m.logged } : m
        );
        set({ meals, ...calcTotals(meals) });
      },
      addMeal: (meal) => {
        const meals = [...get().meals, { ...meal, id: Date.now().toString() }];
        set({ meals, ...calcTotals(meals) });
      },
    }),
    { name: 'stronix-diet' }
  )
);
