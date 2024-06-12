/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1db954",
        buttonGreen: "#49f585",
        "custom-scrollbar-thumb": "rgba(255, 255, 255, 0.6)",
      },
      height: {
        "20vh": "20vh",
      },
      boxShadow: {
        costom: "rgba(0 , 0 , 0 , 0.25) 0px 25px 50px -12px",
      },
      
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
