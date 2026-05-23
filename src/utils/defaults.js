export const DEFAULT_PROFILE = {
  name: 'Aryan',
  location: 'Bhopal, India',
  height: 175,
  weight: 72,
  goalWeight: 78,
  bodyFat: 14,
  level: 'Intermediate',
  goal: 'Muscle Gain',
  split: 'PPL Split',
  stepGoal: 10000,
  calorieTarget: 2800,
  workoutReminders: true,
  mealReminders: true,
};

export const WORKOUT_PLANS = {
  push: {
    title: 'Push Day',
    sub: 'Chest · Shoulders · Triceps',
    duration: '~55 min',
    exercises: [
      { id: 'bp', icon: '🏋️', name: 'Bench Press', sets: 4, reps: 8, weight: '80kg' },
      { id: 'idp', icon: '💪', name: 'Incline DB Press', sets: 3, reps: 10, weight: '30kg' },
      { id: 'ohp', icon: '🔄', name: 'Overhead Press', sets: 3, reps: 8, weight: '50kg' },
      { id: 'lr', icon: '📐', name: 'Lateral Raises', sets: 4, reps: 15, weight: '12kg' },
      { id: 'tp', icon: '💫', name: 'Tricep Pushdowns', sets: 3, reps: 12, weight: 'Cable' },
      { id: 'cgb', icon: '⬇️', name: 'Close-Grip Bench', sets: 3, reps: 10, weight: '60kg' },
    ],
  },
  pull: {
    title: 'Pull Day',
    sub: 'Back · Biceps · Rear Delts',
    duration: '~55 min',
    exercises: [
      { id: 'dl', icon: '🤸', name: 'Deadlift', sets: 4, reps: 5, weight: '100kg' },
      { id: 'br', icon: '🔙', name: 'Barbell Rows', sets: 4, reps: 8, weight: '70kg' },
      { id: 'pu', icon: '⬆️', name: 'Pull-Ups', sets: 3, reps: 'max', weight: 'BW' },
      { id: 'hc', icon: '🦾', name: 'Hammer Curls', sets: 3, reps: 12, weight: '18kg' },
      { id: 'fp', icon: '🔀', name: 'Face Pulls', sets: 3, reps: 15, weight: 'Cable' },
    ],
  },
  legs: {
    title: 'Legs Day',
    sub: 'Quads · Hamstrings · Calves',
    duration: '~65 min',
    exercises: [
      { id: 'sq', icon: '🦵', name: 'Squats', sets: 4, reps: 8, weight: '90kg' },
      { id: 'lp', icon: '🔼', name: 'Leg Press', sets: 4, reps: 12, weight: '140kg' },
      { id: 'rdl', icon: '📉', name: 'Romanian Deadlift', sets: 3, reps: 10, weight: '70kg' },
      { id: 'le', icon: '🦿', name: 'Leg Extension', sets: 3, reps: 15, weight: 'Machine' },
      { id: 'cr', icon: '🦶', name: 'Calf Raises', sets: 4, reps: 20, weight: '80kg' },
    ],
  },
  rest: {
    title: 'Rest Day',
    sub: 'Active Recovery · Mobility',
    duration: '~20 min',
    exercises: [
      { id: 'fr', icon: '🧘', name: 'Foam Rolling', sets: 1, reps: '15 min', weight: 'Full body' },
      { id: 'st', icon: '🤸', name: 'Hip Flexor Stretch', sets: 3, reps: '60s', weight: 'Each side' },
      { id: 'lw', icon: '🚶', name: 'Light Walk', sets: 1, reps: '20-30 min', weight: 'Easy pace' },
    ],
  },
};

export const DEFAULT_MEALS = [
  { id: 'breakfast', icon: '🥚', name: 'Breakfast', desc: 'Eggs 3 · Oats 80g · Banana', cal: 480, protein: 32, carbs: 55, fat: 12, logged: true },
  { id: 'lunch', icon: '🍛', name: 'Lunch', desc: 'Rice 200g · Chicken 200g · Veggies', cal: 620, protein: 52, carbs: 74, fat: 10, logged: true },
  { id: 'snack', icon: '🥤', name: 'Pre-workout Snack', desc: 'Whey 30g · Milk 300ml', cal: 260, protein: 34, carbs: 22, fat: 6, logged: true },
  { id: 'dinner', icon: '🍽️', name: 'Dinner', desc: 'Dal 200g · Roti 3 · Curd', cal: 480, protein: 30, carbs: 62, fat: 14, logged: false },
];

export const DEFAULT_STEPS_HISTORY = [
  { day: 'Sa', steps: 9800 }, { day: 'Su', steps: 6100 },
  { day: 'Mo', steps: 11200 }, { day: 'Tu', steps: 8400 },
  { day: 'We', steps: 10500 }, { day: 'Th', steps: 7900 },
  { day: 'Fr', steps: 7240 },
];

export const DEFAULT_BODY_ENTRIES = [
  { date: 'Apr 30', weight: 71.6, bf: 15.1, chest: 93, waist: 82, hips: 93, bicep: 35, thigh: 54, calf: 35 },
  { date: 'May 7', weight: 71.2, bf: 14.8, chest: 94, waist: 81, hips: 93, bicep: 35.5, thigh: 54.5, calf: 35.5 },
  { date: 'May 14', weight: 70.8, bf: 14.5, chest: 95, waist: 81, hips: 92, bicep: 36, thigh: 55, calf: 36 },
];

export const ACHIEVEMENTS = [
  { id: 'streak', icon: '🔥', name: '10-Day Streak', desc: 'Worked out 10 days in a row', earned: true },
  { id: 'steps', icon: '💯', name: 'Step Master', desc: 'Hit 10k steps 5 days this week', earned: true },
  { id: 'protein', icon: '🥩', name: 'Protein Pro', desc: 'Hit protein goal 7 days straight', earned: false },
  { id: 'lifter', icon: '🏆', name: 'Heavy Lifter', desc: 'Bench press your body weight', earned: false },
];
