/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app_bg: "#121212",
        app_light_bg: "#242424",
        inActive_genre: "#484848",
        active_genre: "#F0283C",
      },
      fontFamily: {
        ArchivoSemiBold: ["ArchivoSemiBold"],
        SairaSemiBold: ["SairaSemiBold"],
      },
    },
  },
  plugins: [],
};
