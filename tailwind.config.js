/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      epilogue: ['Epilogue', 'sans-serif'],
    },
    screens: {
      sm: '394px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [],
}

