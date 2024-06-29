/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenColor: '#b1f2bc',
        whiteColor:'#f1facf',
        btnColor:'#f08080',
      },
    },
  },
  plugins: [],
}