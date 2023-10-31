/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.jsx",
    "./pages/**/*.jsx",
    "./index.html",
    "./**/*.jsx",
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "639px" },
      },
    },
  },

  plugins: [],
};
