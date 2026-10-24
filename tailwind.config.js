/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fefbf3',
          100: '#fdf4e3',
          200: '#fbebcf',
          300: '#f7deaf',
          400: '#f2c882',
          500: '#eab308', // gold accent
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        turquoise: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          750: '#0b625b',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        mahana: {
          amber: '#92400e',      // Warm wood brown
          dark: '#1e1b4b',       // Deep beach night
          accent: '#b45309',     // Amber sunset
          light: '#fbfbf9',      // Oceanfoam off-white
        }
      },
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
