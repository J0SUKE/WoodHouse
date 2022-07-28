import React, { useState } from 'react'

export const menuContext = React.createContext();

export default function MenuContext({children}) 
{
    const [menu,setMenu] = useState(false);
    const [menu_image,setMenu_image] = useState(null);

    return (
        <menuContext.Provider value={{menu,setMenu,menu_image,setMenu_image}}>
            {children}
        </menuContext.Provider>
  )
}
