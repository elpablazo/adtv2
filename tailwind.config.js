/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#F8A174",
        "secondary-dark": "#F57A3A",
        primary: "#98D1EA",
        "primary-dark": "#43abd9",
        light: "#EFEFEF",
        decorator: "#F49CC2",
        "decorator-dark": "#ef6ea6",
        dark: "#1B4332",
        normal: "#213A2F",
      },
      boxShadow: {
        regular: "0px 6px 0px 0px",
        pressed: "0px 2px 0px 0px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
