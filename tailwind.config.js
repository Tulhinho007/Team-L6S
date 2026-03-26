/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F06523",
        dark: {
          bg: "#1A1A1A",
          card: "#242424",
          border: "#2e2e2e",
          input: "#1e1e1e",
          text: "#555",
        }
      },
      fontFamily: {
        barlow: ["'Barlow', sans-serif"],
        "barlow-condensed": ["'Barlow Condensed', sans-serif"],
      }
    },
  },
  plugins: [],
}
