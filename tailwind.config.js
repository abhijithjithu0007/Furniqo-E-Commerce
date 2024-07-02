/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenColor: '#e40443',
        whiteColor:'#f1facf',
        btnColor:'#e40443',
        homeBg:'#f7f7f7',
      },
    },
  },
  plugins: [],
}