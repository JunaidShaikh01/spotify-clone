/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1db954",
        buttonGreen: "#49f585"
      },
      height:{
        "20vh" : "20vh",
      }
    },
  },
  plugins: [],
};