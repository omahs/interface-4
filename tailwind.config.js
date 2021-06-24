const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: [
    "./pages/**/*.tsx",
    "./pages/**/*.js",
    "./components/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.css",
    "./components/**/*.scss",
    "./styles/**/*.scss",
  ],

  theme: {
    nightwind: {
      colorClasses: "gradient",
      typography: true,
      colors: {
        white: "#141618",
        black: "gray.50",
      },
    },
    extend: {
      screens: {},
      colors: {
        gray: colors.trueGray,
      },
      zIndex: {
        "-10": "-10",
      },
    },
  },
  variants: {
    nightwind: ["group-hover"],
  },

  plugins: [require("@tailwindcss/typography"), require("nightwind")],
}
