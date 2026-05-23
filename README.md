# Stronix 💪

A full-featured fitness tracking web app for gym-goers — built with React, Vite, Tailwind CSS, Zustand, Recharts, and the Claude AI API.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss) ![Zustand](https://img.shields.io/badge/Zustand-State-orange)

## Features

- **Dashboard** — Overview of steps, calories, streak, weekly activity chart, body progress & nutrition summary
- **Workout Plan** — PPL split with set-by-set tracking, progress bars, completion badges and day reset
- **Step Tracker** — SVG ring chart, 7-day bar chart, distance/calories/active minutes, simulate steps
- **Diet Plan** — Calorie & macro tracking, meal log with Indian meal defaults, log/undo per meal
- **Body Tracker** — Log weight, body fat %, 6 measurements, history chart, measurement change summary
- **Progress Photos** — Upload real photos per slot (Front/Side/Back), side-by-side before/after comparison
- **AI Coach** — Live chat powered by Claude API with user context injected, multi-turn conversation
- **Profile** — Stats, BMI, achievements, editable goals, notification toggles

## Setup

```bash
# 1. Clone and install
git clone https://github.com/your-username/stronix.git
cd stronix
npm install

# 2. Add your Anthropic API key
cp .env.example .env
# Edit .env and set VITE_ANTHROPIC_API_KEY=your_key

# 3. Run
npm run dev
```

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Frontend framework & build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Zustand + persist | Global state + localStorage sync |
| Recharts | Bar charts & data visualization |
| @tabler/icons-react | Icon library |
| Claude API (Anthropic) | AI Coach intelligence |

## Deploy to Vercel

```bash
npm run build
# Push to GitHub, then import on vercel.com — zero config needed
```

## Project Structure

```
src/
  components/   Layout, Sidebar, UI primitives
  pages/        8 feature pages
  store/        5 Zustand stores
  utils/        defaults data + calculations
```
