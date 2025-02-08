/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#EC4899",
        accent: "#0EA5E9",
        neutral: "#1F2937"
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#7C3AED",
          secondary: "#EC4899",
          accent: "#0EA5E9",
          neutral: "#1F2937",
        },
      },
    ],
    rtl: true,
    darkTheme: false,
  },
}
