/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Poppins", "sans-serif"],
        secondary: ["Monoglyceride", "sans-serif"],
      },
      colors: {
        primary: "#267F53",
        secondary: "#99B7F5",
        tertiary: "#EFFAF5",
      },
    },
  },
  plugins: [],
};
