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
        btnColor:'#cd4632',
        homeBg:'#f7f7f7',
        'custom-dark': '#1E1E1E'
      },
    },
  },
  plugins: [],
}