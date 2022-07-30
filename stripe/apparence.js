export const appearance = {
    theme: 'stripe',
    variables: {
      colorBackground: '#F5F2E3',
      colorText:'#31302d'
      // See all possible variables below
    },
    rules:{
      '.Input,.Tab' :{
        boxShadow:'unset',
        borderColor:'#cfcdbe',
        padding:'1rem'
      },
      '.Input:focus':{
        border:'1px solid transparent',
        boxShadow: '0px 1px 0px black, 0px 1px 0px black, 0 0 0 2px black',
      },
      '.Tab--selected,.Tab:active':{
        border:'1px solid transparent',
        boxShadow: '0px 1px 0px black, 0px 1px 0px black, 0 0 0 2px black',
        color: 'black',
      },
      '.TabIcon--selected':
      {
          color:'black',
          colorBackground:'black'
      }
    }
  };