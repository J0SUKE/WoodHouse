import React, { useState } from 'react'

export const collectionContext = React.createContext();

export default function CollectionsContext({children}) {
  
    const [collectionsValue,setCollections] = useState();

    return (
    <collectionContext.Provider value={{collectionsValue,setCollections}}>
        {children}
    </collectionContext.Provider>
  )
}
