/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f8f5f2',
        transparent: 'transparent',
        current: 'currentColor',
        black: '#45484c',
        team0: '#d3cd9d',
        team1: '#76c3b7',
        team2: '#c24a4f',
        team3: '#d4bc40',
        team4: '#14b249',
        team5: '#f58e49',
        correct: '#27da69',
        incorrect: '#d32529',
      },
      fontSize: {
        '2xs': '0.64rem',
      },
    },
  },
  plugins: [],
};
