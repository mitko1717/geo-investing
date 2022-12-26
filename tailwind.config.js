/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: {
          white: "#ffffff",
          black: "#000000",
          grey: "#9AA0A6",
          blackish: "#202124",
          "soft-blue": "#8FD7F3",
        },
        secondary: "#878D9D",
      },
    },
  },
  plugins: [],
};
