/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,css}",
    "./src/App.jsx",
    "./src/main.jsx",
    "./src/components/**/*.{jsx,tsx}",
    "./src/assets/**/*.{jsx,tsx}",
  ],
  darkMode: "class", // ✅ use "class" instead of "media" for full control
  theme: {
    extend: {
      colors: {
        primary: "#5ec768", // Bright green
        secondary: "#e3be77", // Soft gold
        dark: "#101411", // Dark background
        surface: "#132a15", // Slightly lighter surface tone
        "background-dark": "#101411",
        "background-dark-secondary": "#000000",
        "background-light": "#f6f8f6",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
