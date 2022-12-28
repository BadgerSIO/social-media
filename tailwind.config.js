/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1A8CD8",

          secondary: "#202327",

          accent: "#ce5348",

          neutral: "#141320",

          "base-100": "#000000",
          borderColor: "202327",

          info: "#488CCB",

          success: "#15B77E",

          warning: "#F59A38",

          error: "#EE4744",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
