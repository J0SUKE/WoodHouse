import HouseLogo from "../SVG/HouseLogo";
import {titles_color,bg_primary} from '../../globals/colors.ts';
import Link from 'next/link';
import { useEffect, useState } from "react";
import {throttle} from 'lodash';
import React from "react";

export default function Header() {
    
    const [scroll,setScroll] = useState(false);
    
    useEffect(()=>{
        window.addEventListener('scroll',throttle(()=>
        {
            const {scrollTop} = document.documentElement;
            if (scrollTop>0) {
                setScroll(true)
            }
            else
            {
                setScroll(false);
            }
        }
        ,300))
    },[])
  
    return (
    <header 
        className={`fixed w-[100%] h-[88px] uppercase transition-[background-color] duration-500 
        ${scroll ? `bg-[${bg_primary}]`:`bg-[transparent]`} `}
    >
        <div className='flex items-center justify-between w-[90%] h-[100%] m-auto'>
            <button 
                className={`uppercase font-bold text-[.9rem] cursor-pointer 
                ${scroll ? `text-[${titles_color}]`:`text-[${bg_primary}]`}`}
            >Menu</button>
            <Link href={'/'}>
                <a className="flex gap-2 items-center cursor-pointer">
                    <HouseLogo fill={scroll ? titles_color :bg_primary}/>
                    <h1 
                        className={`text-[1.4rem] font-bold  
                        ${scroll ? `text-[${titles_color}]`:`text-[${bg_primary}]`}`}
                    >Woodhouse</h1>
                </a>
            </Link>
            <button 
                className={`${scroll ? `text-[${titles_color}]`:`text-[${bg_primary}]`} 
                uppercase font-bold flex flex-col items-center text-[.9rem]`}>
                <p>cart</p>
                <p>[0]</p>
            </button>
        </div>
    </header>
  )
}


