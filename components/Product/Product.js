import React, { useContext, useEffect, useRef, useState } from 'react'
import {getStrapiMedia} from '../../lib/media';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {menuContext} from '../../context/MenuContext';
import {cartContext} from '../../context/CartContext';

export default function Product({product,other}) {

    const {title,desc,price,details,material,dimensions} = product.attributes;

    const [menu,setMenu] = useState(null);
    const [mobile,setMobile] = useState(false);
    const {addTocart} = useContext(cartContext)

    useEffect(()=>{
        
        if (window.innerWidth<=1024) setMobile(true)
        else setMobile(false);
        
        window.addEventListener('resize',()=>{
            if (window.innerWidth<=1024) setMobile(true)
            else setMobile(false);
        })
    },[])

    return (
    <div className='relatiev w-[100%] bg-bg_primary pt-[88px]'>
        <div className='flex flex-col lg:flex-row justify-start items-start'>
            {
                mobile ?
                <Carossel product={product}/>
                :
                <ImagesGallery product={product}/>
            }               
            <div className='sticky top-[88px] w-[100%] lg:w-[45%]  p-[3rem] bg-bg_primary text-titles'>
                {
                    product.attributes.collection.data &&
                    <div className='flex items-center'>
                        <Link href={'/collections/all'}>
                            <a>
                                <p className='uppercase text-[.8rem]'>All</p>
                            </a>
                        </Link>
                        <span className='block h-[.7rem] rotate-[30deg] mx-[1rem] w-[1px] bg-titles'></span>
                        <Link href={`/collections/${product.attributes.collection.data?.attributes.name}`}>
                            <a>
                                <p className='uppercase text-[.8rem]'>{product.attributes.collection.data?.attributes.name}</p>
                            </a>
                        </Link>      
                        <span className='block h-[.7rem] rotate-[30deg] mx-[1rem] w-[1px] bg-titles'></span>
                        <p className='uppercase text-[.8rem] font-[600]'>{title}</p>
                    </div>
                }
                <h1 className='text-[3rem] tracking-[-0.1rem] mt-[2rem] uppercase text-titles font-[700]'>{title}</h1>
                <p className='mt-[1rem] font-[400] text-titles'>{desc}</p>
                <p className='text-[2rem] font-[500] mt-[1.5rem]'>$ {price}</p>
                <button 
                    className='uppercase bg-titles w-[100%] lg:w-[auto] py-[.8rem] px-[20%] text-bg_primary text-[1.1em] font-[600] mt-[2rem]'
                    onClick={()=>{addTocart(product)}}
                >
                    add to cart
                </button>
                <p className='text-[.8rem] mt-[2rem]'>Typically ships in 3-5 business days</p>
                <div className='mt-[3rem]'>
                    <Infopanel content={details} value={'details'} menu={menu} setMenu={setMenu}/>
                    <Infopanel content={material} value={'materials'} menu={menu} setMenu={setMenu}/>
                    <Infopanel content={dimensions} value={'dimensions'} menu={menu} setMenu={setMenu}/>
                </div>                
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-[6rem] border-t border-b border-border border-solid place-items-stretch'> 
            <div className='p-[1rem] border-r border-border border-solid'>
                <h1 className='text-[clamp(1.5rem,5vw,3rem)] font-[700] uppercase text-titles'>You May Also Like</h1>
            </div>
            {
                
                (other.length<=3 ?  other : [other[0],other[1],other[2]]).map(item=>{
                    return (
                        <div 
                            className='border-r border-border border-solid'
                            key={item.id}
                        >
                            <Link href={`/products/${item.attributes.slug}`}>
                                <a>
                                    <div className='relative aspect-[1/1.25]'>
                                        <Image
                                            src={getStrapiMedia(item.attributes.images.data[0])}
                                            alt=''
                                            layout='fill'
                                            objectFit='cover'
                                            priority={true}
                                        />
                                        <Image
                                            src={getStrapiMedia(item.attributes.images.data[1])}
                                            alt=''
                                            layout='fill'
                                            objectFit='cover'
                                            className='absolute z-2 opacity-0 hover:opacity-[1] transition-opacity duration-500'
                                            priority={true}
                                        />
                                    </div>
                                </a>
                            </Link>
                            <div className='flex justify-between items-center p-[1rem]'>
                                <p className='text-[1.2rem]'>{item.attributes.title}</p>
                                <p className='text-[1.2rem] font-[700]'>${item.attributes.price}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}


function Infopanel({content,value,menu,setMenu}) {
    
    return (
        <div 
            className='relative border-b border-solid border-border bg-bg_primary overflow-hidden'
        >
            <button 
                className='uppercase text-[1.1rem] tracking-[0.1rem] py-[1rem] font-[500]'
                onClick={()=>{setMenu(menu=>menu != `${value}` ?`${value}` : null)}}
            >{value} {menu==`${value}` ? '-' : '+'}</button>
            <div 
                className={`text-[.9rem] ${menu==`${value}` ? `pb-[2rem] max-h-[1050px]` :'pb-[0] max-h-[0]'} overflow-hidden transition-[all] duration-500`}
            >
                <ReactMarkdown skipHtml={false} rehypePlugins={[rehypeRaw]} >
                    {content}
                </ReactMarkdown>             
            </div>
        </div>                    
    )
}

function ImagesGallery({product}) {
    return (
        <div className='w-[55%]'>
                {
                    product.attributes.images.data.map(item=>{
                        return (
                            <div 
                                key={item.id}
                                className='relative aspect-[1/1]'
                            >                            
                                <Image
                                    src={getStrapiMedia(item)}
                                    alt=''
                                    layout='fill'
                                    objectFit='cover'
                                    priority={true}
                                />
                            </div>
                        )
                    })
                }            
            </div>
    )
}

function Carossel({product}) {
    const {menu} = useContext(menuContext) 
    return (
        <div className='w-[100%] relative'>
            <Carousel 
                emulateTouch={true}
                infiniteLoop={true}                
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                renderIndicator={(onClickHandler, isSelected, index, label)=>{
                    return (
                        <>
                            {
                                !menu &&
                                <div 
                                    onClick={onClickHandler}
                                    onKeyDown={onClickHandler}
                                    value={index}
                                    key={index}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${label} ${index + 1}`}    
                                    className={`relative h-[8px] w-[8px] z-[0] bg-titles rounded-[50%] ${isSelected ? 'opacity-[1]' :' opacity-[.4]'} outline-none`}
                                >                            
                                </div>
                            }
                        </>
                        
                    )
                }}
            >
                {
                    product.attributes.images.data.map(item=>{                    

                        return (
                            <div 
                                className='relative aspect-[1/1] w-[100%] each-slide-effect'
                                key={item.id}
                            >
                                <Image
                                    src={getStrapiMedia(item)}
                                    alt=''
                                    layout='fill'
                                    objectFit='cover'
                                    priority={true}
                                />
                            </div>   
                        )
                    })
                }                
            </Carousel>
        </div>
    )   
}