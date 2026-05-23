/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        surface2: '#181818',
        surface3: '#222222',
        border: '#2a2a2a',
        accent: '#e8ff3b',
        accent2: '#ff5c3a',
        success: '#4dff91',
        muted: '#666666',
        text: '#f0f0f0',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: { card: '14px' },
    },
  },
  plugins: [],
}
