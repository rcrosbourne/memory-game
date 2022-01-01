module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#FDA214",
      "primary-hover": "#FFB84A",
      secondary: "#BCCED9",
      tertiary: "#304859",
      quaternary: "#152938",
      "primary-shade": "#F2F2F2",
      "secondary-shade": "#7191A5",
      "tertiary-shade": "#6395B8",
      "quaternary-shade": "#FCFCFC",
      "quinary-shade": "#DFE7EC",
      black: "#000000",
    },
    fontFamily: {
      "atkinson-hyperlegible": ["Atkinson Hyperlegible", "sans-serif"],
    },
  },
  plugins: [],
};
