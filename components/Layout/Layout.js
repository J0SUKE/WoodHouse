import { useContext, useState } from "react"
import Header from "../Header/Header"
import Menu from "../Menu/Menu"
import {menuContext} from '../../context/MenuContext';

export default function Layout({children}) {
  
  const {menu,setMenu} = useContext(menuContext);

  return (
    <main className="bg-bg_primary">
        <Header setMenu={setMenu}/>
        {
          menu && <Menu/>
        }        
        {children}
    </main>
  )
}
