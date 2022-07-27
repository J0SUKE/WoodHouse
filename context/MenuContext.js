import React, { useState } from 'react'

export const menuContext = React.createContext();

export default function MenuContext({children}) 
{
    const [menu,setMenu] = useState(false);
    return (
        <menuContext.Provider value={{menu,setMenu}}>
            {children}
        </menuContext.Provider>
  )
}
