export const calcBMI = (weight, height) => +(weight / ((height / 100) ** 2)).toFixed(1);

export const stepsToKm = (steps) => +(steps * 0.000762).toFixed(2);

export const stepsToCalories = (steps, weight = 72) => Math.round(steps * 0.04 * (weight / 70));

export const macroCalories = (protein, carbs, fat) =>
  protein * 4 + carbs * 4 + fat * 9;

export const progressPct = (current, goal) => Math.min(100, Math.round((current / goal) * 100));

export const getMeasurementChange = (entries, key) => {
  if (entries.length < 2) return null;
  const first = entries[0][key];
  const last = entries[entries.length - 1][key];
  const diff = +(last - first).toFixed(1);
  return { diff, positive: diff > 0 };
};

export const getWeightTrend = (entries) => {
  if (entries.length < 2) return 0;
  return +(entries[entries.length - 1].weight - entries[0].weight).toFixed(1);
};
