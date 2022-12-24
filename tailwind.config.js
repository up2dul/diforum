/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
    },
    colors: {
      como: {
        50: '#f5f8f6',
        100: '#dfe8e3',
        200: '#bfd0c8',
        300: '#97b1a5',
        400: '#719083',
        500: '#577569',
        600: '#445d54',
        700: '#394c44',
        800: '#303f3a',
        900: '#2b3632',
      },
      green: {
        50: '#effef3',
        100: '#dafee3',
        200: '#b8faca',
        300: '#80f5a1',
        400: '#42e671',
        500: '#19ce4d',
        600: '#0eab3b',
        700: '#0f8632',
        800: '#12692c',
        900: '#115626',
      },
      danger: '#d2001a',
    },
  },
  plugins: [],
};
