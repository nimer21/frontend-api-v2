/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#41b883',
        success: '#2ecc71',
        warning: '#f1c40f',
        danger: '#e74c3c',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '3rem',
        },
      },

      gridTemplateColumns: {
        '100': 'repeat(100, minmax(0, 1fr))', //1fr means "take 1 fraction of the available space", and since there are no other element defined as fr, it also means "take all available space"
        '50': 'repeat(50, minmax(0, 1fr))',
        '25': 'repeat(25, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '100': 'repeat(100, minmax(0, 1fr))',
        '50': 'repeat(50, minmax(0, 1fr))',
        '25': 'repeat(25, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      
      
    },
  },
  plugins: [],
}