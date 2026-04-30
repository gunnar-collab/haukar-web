/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        haukar: {
          red: '#c8102e',
          darkRed: '#9b0c23',    // Used for hover states and footer bottom
          blue: '#1c2c6c',
          darkBlue: '#1c3074',   // Used for the past matches background
          lightBlue: '#a0acdc',  // Used for muted text
        }
      },
      fontFamily: {
        // We use a heavy, condensed font for headlines to give it that aggressive sports feel
        headline: ['"Barlow Condensed"', 'Oswald', 'sans-serif'],
        // Clean, highly readable font for general text and UI elements
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        label: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '0.8', transform: 'scale(1) rotate(90deg)' },
        },
        'wave-grow': {
          '0%, 100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
          '50%': { transform: 'scale(1.2) translateY(-8px)', opacity: '0.9' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'gradient-y': 'gradient-y 6s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'wave-grow': 'wave-grow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}