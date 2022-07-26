/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateAreas: 
      {
        'wide': 
        [
          'div1 div2 div3',
          'div4 div6 div6',
          'div5 div6 div6',
          'div7 div9 div9',
          'div8 div9 div9',
          'div10 div12 div12',
          'div11 div12 div12',
        ],
        'med':[
          'div1 div2',
          'div3 div4',
          'div6 div6',
          'div6 div6',
          'div5 div7',
          'div9 div9',
          'div9 div9',
          'div8 div10',
          'div12 div12',
          'div12 div12',
          'div11 div11',
        ],
        'slim': 
        [
          'div1',
          'div2',
          'div3',
          'div4',
          'div5',
          'div6',
          'div7',
          'div8',
          'div9',
          'div10',
          'div11',
          'div12',
        ],
      },
    },
    colors:{
      // Using modern `rgb`
      bg_primary: 'rgb(var(--color-bg_primary) / <alpha-value>)',
      titles: 'rgb(var(--color-titles) / <alpha-value>)',
      border: 'rgb(var(--color-border) / <alpha-value>)',

    }
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
  variants: {
    gridTemplateAreas: ['responsive']
  }
}
