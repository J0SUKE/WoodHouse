/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      // Using modern `rgb`
      bg_primary: 'rgb(var(--color-bg_primary) / <alpha-value>)',
      titles: 'rgb(var(--color-titles) / <alpha-value>)',
      border: 'rgb(var(--color-border) / <alpha-value>)',

    }
  },
  plugins: [],
}
