/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 5000px 5000px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
}
