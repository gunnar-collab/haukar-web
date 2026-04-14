/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "haukar-red": "#C8102E",
            "asvellir-blue": "#1E3A8A",
            "anniversary-gold": "#D4AF37",
            "surface": "#ffffff",
            "surface-alt": "#f8f9fa",
        },
        fontFamily: {
            "headline": ["Lexend", "sans-serif"],
            "body": ["Inter", "sans-serif"],
            "label": ["Lexend", "sans-serif"]
        }
    },
  },
  plugins: [],
}