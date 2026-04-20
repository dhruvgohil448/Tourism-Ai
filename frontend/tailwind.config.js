/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7D9982",
        dark: '#252525'
      },
      fontFamily: {
        primary: ['Chillax', 'sans'],
        body: ['Jakarta', 'sans']
      }
    },
  },
  plugins: [],
}
