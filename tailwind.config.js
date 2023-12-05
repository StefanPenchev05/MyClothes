/** @type {import('tailwindcss').Config} */
module.exports = {
  //darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-button': "#696cff",
        'p-gray': "rgba(50, 71, 92, 0.6)",
      },
    },
  },
  plugins: [],
}
