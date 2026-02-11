/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#646cff",
        accent: "#535bf2",
        dark: "#242424",
      },
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
        slideIn: "slideIn 0.5s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
