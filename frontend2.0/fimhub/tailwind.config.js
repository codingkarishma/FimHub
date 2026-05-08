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
          50: '#effcf9',
          100: '#d6f7f1',
          200: '#b0efe4',
          300: '#7ddfd1',
          400: '#42c9ba',
          500: '#1cae9f',
          600: '#0f766e',
          700: '#115e59',
          800: '#124b48',
          900: '#123f3c',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffefc7',
          200: '#ffdf8a',
          300: '#ffc84d',
          400: '#fcb11f',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
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
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'ui-serif', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
