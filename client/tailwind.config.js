/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-primary": "#267F53",
        "accent-blue": "#99B7F5",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
