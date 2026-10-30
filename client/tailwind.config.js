/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#101010',
          dark: '#161616',
          card: '#1F1E1C',
        },
        ivory: {
          DEFAULT: '#FAF7F0',
          light: '#FDFBF7',
          muted: '#F3EFE6',
        },
        gold: {
          champagne: '#C8A45D',
          dark: '#94753E',
          light: '#E6CF9B',
          soft: '#EEDCBA',
          border: 'rgba(200, 164, 93, 0.25)',
        },
        brand: {
          text: '#202020',
          muted: '#777777',
          border: '#E8E1D5',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'luxury': '0 10px 30px -10px rgba(16, 16, 16, 0.1)',
        'gold-glow': '0 0 25px rgba(200, 164, 93, 0.15)',
      },
    },
  },
  plugins: [],
}

