/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/screens/HomeScreen.jsx",
    "./src/screens/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'LarkenBlod': ['Larken-ExtraBold', ],
        'Larken': ['Larken-Medium', ],
        'LarkenLight': ['Larken-Light', ],
        'basicsanssf': ['basicsanssf', ],
        'basicsanssfbold':['basicsanssfbold',],
        'basicsanssfitalic':['basicsanssfitalic',],
        'OpenSans-SemiBold':['OpenSans-SemiBold',],
        'OpenSans_Condensed-Medium':['OpenSans_Condensed-Medium',],
        'WorkSans-Bold':['WorkSans-Bold',]
      },
      textColor: {
        'orange-theme': '#FF9950', // Custom text color
      },
      backgroundColor: {
        'orange-theme': '#FF9950', // Custom background color
      }
    },
  },
  plugins: [],
}

