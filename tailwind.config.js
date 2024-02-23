/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-button': "#696cff",
        'p-gray': "rgba(50, 71, 92, 0.6)",
      },
      boxShadow: {
        'right': '10px 0 20px -5px rgba(0, 0, 0, 0.1), 5px 0 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
