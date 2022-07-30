import HouseLogo from "../SVG/HouseLogo";
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from "react";
import {throttle} from 'lodash';
import React from "react";
import { useRouter } from 'next/router'
import {menuContext} from '../../context/MenuContext';
import {cartContext} from "../../context/CartContext";

export default function Header() {
    
    const router = useRouter();
    const {menu,setMenu,menu_image,setMenu_image} = useContext(menuContext);
    const {setCartMenu,cart} = useContext(cartContext);
    const path = useRef(router.asPath);
    const menuval = useRef(menu);
    const [scroll,setScroll] = useState(router.asPath == '/' ? false : true);


    function handleScroll() {
        const {scrollTop} = document.documentElement;
        if (scrollTop>0 && !menuval.current) {
            setScroll(true);
        }
        else if(scrollTop<=0 && !menuval.current && (path.current == '/' || router.asPath=='/#cartRedirect'))
        {
            setScroll(false);
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll',throttle(handleScroll,300))        
    },[])

    useEffect(()=>{
        path.current = router.asPath;
        setMenu(false);
        if (router.asPath != '/' && router.asPath!='/#cartRedirect') 
        {
            setScroll(true);
        }
        else setScroll(false);        
    
    },[router.asPath])

    useEffect(()=>{
        menuval.current=menu;
        const {scrollTop} = document.documentElement;
        setMenu_image(null);
        if (menu) setScroll(true);
        else if((path.current!='/' && router.asPath!='/#cartRedirect') || scrollTop>0) setScroll(true)
        else setScroll(false);
    },[menu])

    useEffect(()=>{
        if (menu_image!=null) setScroll(false);        
    },[menu_image])
  
    return (
    <header 
        className={`fixed w-[100%] h-[88px] z-[2] uppercase transition-[background-color] duration-500 
        ${scroll ? `bg-bg_primary`:`bg-[transparent]`}
        ${menu ? `bg-[transparent]`:``}
         `}
    >
        <div className='flex items-center justify-between w-[90%] h-[100%] m-auto'>
            <button 
                className={`tracking-[-0.02rem] uppercase font-bold text-[.9rem] cursor-pointer 
                ${scroll ? `text-titles`:`text-bg_primary`}`}
                onClick={()=>{setMenu(menu=>!menu)}}
            >Menu</button>
            <Link href={'/'}>
                <a className="flex gap-2 items-center cursor-pointer">
                    <HouseLogo fill={scroll ? '#321e1e' :'#F4F1E0'}/>
                    <h1 
                        className={`text-[1.4rem] font-bold tracking-[-0.1rem]
                        ${scroll ? `text-titles`:`text-bg_primary`}`}
                    >Woodhouse</h1>
                </a>
            </Link>
            <button 
                className={`${scroll ? `text-titles`:`text-bg_primary`} 
                uppercase font-bold flex flex-col items-center text-[.9rem]`}
                onClick={()=>setCartMenu(true)}
            >
                <p>cart</p>
                <p>[{cart.length}]</p>
            </button>
        </div>
    </header>
  )
}


