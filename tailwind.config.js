/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a1128",
        secondary: "#1a2747",
        accent: "#0089ff",
        "accent-hover": "#33a1ff",
        navy: {
          50: "#e6edf7",
          100: "#c2d4ed",
          200: "#8eadd9",
          300: "#5a86c6",
          400: "#3366b3",
          500: "#1a2747",
          600: "#152038",
          700: "#101a2e",
          800: "#0a1128",
          900: "#060c1a",
        },
      },
    },
  },
  plugins: [],
};
