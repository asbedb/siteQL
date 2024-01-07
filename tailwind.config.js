/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./www/**/*.php",
    "./www/**/*.js",
    "./node_modules/flowbite/**/*.js"
    // Add more file paths if needed
  ],
  darkMode: 'class', // Enable the dark mode variant
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('flowbite/plugin')
  ],
}


