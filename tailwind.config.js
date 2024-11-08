/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}" , "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        "primary":"#030104"
      },

      fontFamily: {
        uregular: ["Urbanist-Regular"],
        ubold: ["Urbanist-Bold"],
        pregular:["Poppins-Regular"],
        pbold:["Poppins-Bold"],
        psbold:["Poppins-SemiBold"]
      },
    },
  },
  plugins: [],
}