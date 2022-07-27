import React, { useState } from 'react'

export const menuContext = React.createContext();

export default function MenuContext({children}) 
{
    const [menu,setMenu] = useState(false);
    const [img,setImg] = useState(null);

    return (
        <menuContext.Provider value={{menu,setMenu,img,setImg}}>
            {children}
        </menuContext.Provider>
  )
}
