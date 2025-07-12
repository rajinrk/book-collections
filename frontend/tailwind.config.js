/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        abril: ['Abril', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
      },
      colors: {
        primary: '#FFC4C4',
        secondary: '#FF6F61',
        primaryText: '#1F222A',
      },
    },
  },
  plugins: [],
};
