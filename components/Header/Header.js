import HouseLogo from "../SVG/HouseLogo";
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from "react";
import {throttle} from 'lodash';
import React from "react";
import { useRouter } from 'next/router'
import {menuContext} from '../../context/MenuContext';

export default function Header() {
    
    const router = useRouter();
    const {menu,setMenu} = useContext(menuContext);
    const path = useRef(router.asPath);
    const menuval = useRef(menu);
    const [scroll,setScroll] = useState(router.asPath == '/' ? false : true);
    //console.log(router);

    function handleScroll() {
        if (path.current != '/') return;
        const {scrollTop} = document.documentElement;
        if (scrollTop>0) {
            setScroll(true)
        }
        else if(scrollTop<=0 && !menuval.current)
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
        if (router.asPath != '/') 
        {
            setScroll(true);
        }
        else handleScroll();        
    
    },[router.asPath])

    useEffect(()=>{
        menuval.current=menu;
        if (menu) setScroll(true);
        else handleScroll();
    },[menu])
  
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
                uppercase font-bold flex flex-col items-center text-[.9rem]`}>
                <p>cart</p>
                <p>[0]</p>
            </button>
        </div>
    </header>
  )
}


