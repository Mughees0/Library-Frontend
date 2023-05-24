/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        full: '0px 0px 5000px 5000px rgba(0, 0, 0, 0.2)'
      },
      colors: {
        'custom-blue': '#076CB5',
        'custom-orange': '#EB7F38',
        'custom-greenish': '#51b6af'
      },
      fontFamily: {
        heading: ['Alegreya'],
        nav: ['Alkatra'],
        mediumHead: ['gt-super', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        bookHead: ['sohne', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        bookDesc: ['source-serif-pro', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
