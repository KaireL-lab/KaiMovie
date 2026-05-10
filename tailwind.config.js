/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f0f",
        secondary: "#1a1a2e",
        accent: "#e50914",
        "accent-hover": "#ff1a25",
      },
    },
  },
  plugins: [],
};
