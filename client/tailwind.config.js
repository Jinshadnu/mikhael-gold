/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Brand Color Palette
        burgundy: {
          DEFAULT: '#780817', // Royal Burgundy
          dark: '#530510',    // Dark Burgundy
          wine: '#40030B',    // Deep Wine
          light: '#9E1B2D',
        },
        gold: {
          DEFAULT: '#D4AF37', // Royal Gold
          royal: '#D4AF37',
          champagne: '#E8D39A', // Champagne Gold
          soft: '#F1E4BD',      // Soft Gold
          dark: '#A6841E',
        },
        ivory: {
          DEFAULT: '#FAF8F2', // Warm Ivory (Main background)
          warm: '#FAF8F2',
          cream: '#F3EDE1',   // Soft Cream (Alternate sections)
          pure: '#FFFFFF',    // Pure White
          beige: '#EDE5D7',   // Light Beige
        },
        charcoal: {
          DEFAULT: '#292323', // Primary Text
          secondary: '#70665C', // Secondary Text
          muted: '#A89A83',     // Muted Text
        },
        // Semantic aliases
        ink: {
          DEFAULT: '#FAF8F2',
          2: '#F3EDE1',
          3: '#EDE5D7',
        },
        sand: '#70665C',
        beige: '#A89A83',
        cream: '#F3EDE1',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Times New Roman', 'serif'],
        serif: ['"Cormorant Garamond"', 'Times New Roman', 'serif'],
        sans: ['"Manrope"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.125em',
        'luxury-wide': '0.22em',
      },
      animation: {
        sheen: 'sheen 7s linear infinite',
        rise: 'rise 1s cubic-bezier(.2,.7,.2,1) both',
        fadeInDown: 'fadeInDown 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        sheen: {
          to: { backgroundPosition: '-200%' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
