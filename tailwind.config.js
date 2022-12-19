/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'dark': '#020302',
      'dark-2': '#323232',
      'light': '#FEFEFE',
      'light-2': '#F8F8F8',
      'sky': '#83D2F2',
      'yellow': '#F8E34F',
    },
  },
  plugins: [],
};
