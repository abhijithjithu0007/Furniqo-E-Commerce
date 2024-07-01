/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenColor: '#fec36a',
        whiteColor:'#f1facf',
        btnColor:'#f08080',
      },
    },
  },
  plugins: [],
}