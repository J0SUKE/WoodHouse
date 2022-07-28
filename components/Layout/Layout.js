import { useContext, useEffect, useRef, useState } from "react"
import Header from "../Header/Header"
import Menu from "../Menu/Menu"
import Cart from "../Cart/Cart";
import {menuContext} from '../../context/MenuContext';
import {cartContext} from "../../context/CartContext";
import {useRouter} from 'next/router'

export default function Layout({children}) {
  
  const {menu,setMenu} = useContext(menuContext);
  const {cartMenu,setCartMenu} = useContext(cartContext);
  const wrapper = useRef();
  const router = useRouter();

  useEffect(()=>{
    setCartMenu(false);
  },[router])

  return (
    <main className="bg-bg_primary" ref={wrapper}>
        <Header setMenu={setMenu} wrapper={wrapper}/>
        {
          menu && <Menu/>
        }        
        {children}
        {
          cartMenu &&
          <div 
            className="fixed z-[100] top-0 left-0 right-0 bottom-0 overflow-x-hidden"     
            >
              <div
                className="bg-[rgba(0,0,0,.5)] absolute top-0 left-0 right-0 bottom-0"
                onClick={(e)=>{
                  e.stopPropagation();
                  setCartMenu(false)
                }}     
              ></div>
              <Cart/>
          </div>   
        }        
    </main>
  )
}
