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

    },
    screens: {
      'mn':'480px',
      // => @media (min-width: 480px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
  variants: {
    gridTemplateAreas: ['responsive']
  }
}
