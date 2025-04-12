/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3E8E41',
        accent: '#F9C74F',
        background: '#F8F8F8',
        text: '#333333',
        hover: '#2F6E30'
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
