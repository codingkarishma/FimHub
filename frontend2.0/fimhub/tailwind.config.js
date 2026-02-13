/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d9ff',
          300: '#a4bbff',
          400: '#7c93ff',
          500: '#5568ff',
          600: '#3d3ffd',
          700: '#2d2ae8',
          800: '#252196',
          900: '#1f1b6b',
        },
        accent: {
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        mutant: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#991b1b',
        },
        om3: '#fb923c',
        om6: '#3b82f6',
        bg: '#f5f7fa',
        neutral: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
