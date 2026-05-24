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
          500: '#eab308', // gold accent
        },
        turquoise: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          400: '#2dd4bf',
          700: '#0f766e',
          900: '#115e59',
        },
        mahana: {
          amber: '#92400e',      // Warm wood brown
          dark: '#1e1b4b',       // Deep beach night
          accent: '#b45309',     // Amber sunset
          light: '#fbfbf9',      // Oceanfoam off-white
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Georgia', 'ui-serif', 'serif'],
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
