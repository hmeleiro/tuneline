/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        team0: "#319795",
        team1: "#d93636",
        team2: "#f5b400",
        team3: "#45a4f2",
        team4: "#5e5b5a",
        team5: "#a2d4f1",
        team6: "#28af60",
        correct: "#59cd90",
        incorrect: "#ee6352",
      },
      fontSize: {
        "2xs": "0.64rem",
      },
    },
  },
  plugins: [],
};
