/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        status: {
          up: '#16a34a',
          warning: '#d97706',
          down: '#dc2626',
        },
      },
    },
  },
  plugins: [],
};
