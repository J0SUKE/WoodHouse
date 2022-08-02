import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {getStrapiMedia} from '../../lib/media';
import Link from 'next/link';
import {cartContext} from '../../context/CartContext';

export default function Home({hero,favorites,housegood}) {

    const [mobile,setMobile] = useState();
    const {addTocart} = useContext(cartContext)

    useEffect(()=>{
        if (window.innerWidth<=640) setMobile(true)
        else setMobile(false);

        window.addEventListener('resize',()=>{
            if (window.innerWidth<=640) setMobile(true)
            else setMobile(false);
        })
    },[])

  return (
    <div className='relative w-[100%] z-0 bg-bg_primary'>
        <TopCaroussel hero={hero}/>
        <div className='flex flex-col lg:flex-row bg-bg_primary'>
                 <div className='relative w-[100%] lg:w-[400px] border-r-[1px] border-solid border-border'>
                    <h1 className='relative z-[2] text-titles text-[3rem] p-[2rem] font-bold uppercase'>{hero[0].attributes.title}</h1>
                    <div className='absolute z-[1] w-[100%]  lg:relative h-[100%] top-0 lg:h-[500px] lg:mt-[3rem]'>
                        <Image
                            src="/images/drop_section_background_desktop.png" 
                            alt="" 
                            className='opacity-[0.4]'
                            layout='fill'
                        />
                    </div>
                    
                    <div className='relative z-[2] flex justify-end p-[1rem]'>
                        <p className='mt-[5rem] w-[50%] text-[.8rem]'>{hero[0].attributes.product.data.attributes.desc}</p>
                    </div>
                 </div>
                    <div className='relative lg:w-[calc(100%-400px)] w-[100%] h-[500px] lg:h-[auto]'>
                        <Link href={`/products/${hero[0].attributes.product.data.attributes.slug}`}>
                            <a>
                                <div 
                                className='inline-block w-[100px] absolute z-[2] top-0 left-0 right-0 h-[120px] uppercase text-[1.6rem] font-[700] text-titles tracking-[-0.1rem] rotate-90 origin-left translate-y-[-100px] px-[80px]'
                            >new!</div>
                            <Image
                                src={getStrapiMedia(hero[0].attributes.product.data.attributes.images.data[0])}
                                alt=''
                                layout='fill'
                                className='z-1'
                                objectFit='cover'
                            />
                            <Image
                                src={getStrapiMedia(hero[0].attributes.product.data.attributes.images.data[1])}
                                alt=''
                                layout='fill'
                                className='opacity-[0] hover:opacity-[1] transition-opacity duration-[400ms] z-2'
                                objectFit='cover'
                            />
                            </a>
                        </Link>
                        
                        <div className='w-[100%] h-[100px] absolute bottom-0 z-2 bg-bg_primary flex justify-between items-center px-[2rem]'>
                            <p className='text-[clamp(.9rem,2vw,1.2rem)]'>{hero[0].attributes.product.data.attributes.title}</p>
                            <button 
                                className='bg-titles text-bg_primary uppercase text-bold text-[clamp(.9rem,2vw,1.2rem)] py-[.7rem] px-[2rem] font-[500]'
                                onClick={()=>{addTocart(hero[0].attributes.product.data)}}
                            >
                                Add to cart - ${hero[0].attributes.product.data.attributes.price}
                            </button>
                        </div>
                    </div>
        </div>
        <Favorites favorites={favorites}/>
        <div className='relative h-[600px]'>
            <Image
                src={'/images/banner.jpg'}
                alt=''
                layout='fill'
                objectFit='cover'
            />
            <div className='absolute z-2 w-[100%] h-[100%] flex flex-col gap-[1rem] items-center justify-center'>
                <h1 className='text-[clamp(2rem,4vw,3rem)] px-[2rem] uppercase text-bg_primary font-[700] tracking-[-0.2rem] text-center'>The WoodHouse Favorite Finder</h1>
                <p className='text-bg_primary text-[clamp(1rem,2vw,1.2rem)] px-[2rem] font-[400] mb-[1rem] text-center'>Take a look at our best selection of design products</p>
                <Button target={'/collections/all'} text={'get started'} />
            </div>
        </div>
        <OurHouseGoods housegood={housegood}/>
        {
            mobile ?
            <BottomCaroussel/>
            :
            <BottomLinks/>
        }
        
        
        <div className='relative aspect-[3/1.5]'>
            <Image
                src={'/images/bottom.png'}
                alt=''
                layout='fill'
                objectFit='cover'
            />
        </div>
    </div>
  )
}

function SlideContent({h1,p,btn,img,slug}) {
    return (
        <>
            <Image
                src={img}
                alt=''
                layout='fill'
                objectFit='cover'
            />
            <div className='absolute z-[2] pt-[7%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-[.5rem]'>
                <h1 className="tracking-[-0.2rem] text-bg_primary text-[3rem] uppercase font-bold">{h1}</h1>
                <p className='text-bg_primary text-[1.2rem] font-semibold mb-[1rem]'>{p}</p>
                <Link href={`/products/${slug}`}>
                    <a>
                        <button
                        className='border border-bg_primary py-[.8rem] px-[1.5rem] text-bg_primary uppercase text-[1.1rem] font-semibold bg-[rgba(50,30,30,0.7)] transition-[background-color] duration-300 hover:bg-titles'
                    >
                        {btn}
                    </button>
                    </a>
                </Link>
            </div>
        </>
    )
}


function Button({target,text}) {
    return (
        <Link href={target}>
            <a>
                <button
                className='border border-bg_primary py-[.8rem] px-[1.5rem] text-bg_primary uppercase text-[1.1rem] font-semibold bg-[rgba(50,30,30,0.7)] transition-[background-color] duration-300 hover:bg-titles'
            >
                {text}
            </button>
            </a>
        </Link>
    )
}

function HouseGood({item}) {
    
    const {slug,title,price,images} = item.attributes;
    const {addTocart} = useContext(cartContext)
    
    return (
        <div
            className={`aspect-[1/1.25] bg-bg_primary`}
        >
            <Link href={`/products/${slug}`}>
            <a className='relative block w-[100%] h-[88%]'>
                <Image
                    src={getStrapiMedia(images.data[0])}
                    alt=""
                    layout='fill'
                    objectFit='cover'
                />
                <Image
                    src={getStrapiMedia(images.data[1])}
                    alt=""
                    layout='fill'
                    objectFit='cover'
                    className='absolute z-2 opacity-0 hover:opacity-[1] transition-opacity duration-500'
                />
            </a>
            </Link>
            <div className='flex justify-between px-[1rem] pt-[3rem] pb-[1rem] gap-[2rem]'>
                <p className='text-[1.1rem]'>{title}</p>
                <button 
                    className='uppercase flex gap-[1rem]'
                    onClick={()=>{addTocart(item)}}
                >
                    <span className='block text-titles font-[700]'>${price}</span>
                    <span className='block underline font-[700] text-titles'>Add to cart</span>
                </button>
            </div>
        </div>
    )
}

function OurHouseGoods({housegood}) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-areas-slim sm:grid-areas-med md:grid-areas-wide place-items-stretch'>
                <div 
                    className='p-[1.4rem] border-r-[1px] border-b-[1px] border-solid border-border flex flex-col justify-between aspect-[1/1.25] grid-in-div1'>
                    <h1 className='text-[clamp(2rem,4vw,3rem)] font-[700] text-titles'>OUR HOUSEGOODS</h1>
                    <p>The intersection of form and function and stuff we like. Our Housegoods were designed for people who love things that are as beautiful as they are useful.</p> 
                </div>
                {
                    housegood[0] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div2`}>
                        <HouseGood item={housegood[0]}/>
                    </div>
                }                
                {
                    housegood[1] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div3`}>
                        <HouseGood item={housegood[1]}/>
                    </div>
                }
                {
                    housegood[2] && 
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div4`}>
                        <HouseGood item={housegood[2]}/>
                    </div>  

                } 
                {
                    housegood[3] && 
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div5`}>
                        <HouseGood item={housegood[3]}/>
                    </div>

                }             
                {
                    housegood[4] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div6`}>
                        <HouseGood item={housegood[4]}/>
                    </div>

                }    
                {
                    housegood[5] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div7`}>
                        <HouseGood item={housegood[5]}/>
                    </div>

                }    
                {
                    housegood[6] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div8`}>
                        <HouseGood item={housegood[6]}/>
                    </div>

                }    
                {
                    housegood[7] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div9`}>
                        <HouseGood item={housegood[7]}/>
                    </div>
                }                
                {
                    housegood[8] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div10`}>
                        <HouseGood item={housegood[8]}/>
                    </div>
                }               
                {
                    housegood[9] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div11`}>
                        <HouseGood item={housegood[9]}/>
                    </div>
                }                                                                                                   
                {
                    housegood[10] &&
                    <div className={`border-r-[1px] border-b-[1px] border-solid border-border grid-in-div12`}>
                        <HouseGood item={housegood[10]}/>
                    </div>
                }                                                                                                   
            </div>
    )       
}

function TopCaroussel({hero}) {
    return (
        <div className='relative h-[80vh]'>
            <Carousel 
                emulateTouch={true}
                infiniteLoop={true}                
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                renderIndicator={(onClickHandler, isSelected, index, label)=>{
                    return (
                        <div 
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`}    
                            className={`h-[12px] w-[12px] bg-bg_primary rounded-[50%] ${isSelected ? 'opacity-[1]' :' opacity-[.4]'} outline-none`}
                        >                            
                        </div>
                    )
                }}
            >
                {
                    hero.map(item=>{
                        
                        const {attributes:{title,desc,button,image,slug}} = item;
                        const {attributes:{product}} = item;

                        return (
                            <div 
                                className='relative h-[80vh] each-slide-effect'
                                key={item.id}
                            >
                                <SlideContent 
                                    h1={title} 
                                    p={desc} 
                                    btn={button}
                                    img={getStrapiMedia(image)}
                                    slug={product.data.attributes.slug}
                                />
                            </div>   
                        )
                    })
                }                
            </Carousel>
        </div>
    )
}

function Favorites({favorites}) {
    const {addTocart} = useContext(cartContext)
    return (
        <div className='border-t-[1px] border-solid border-border grid grid-cols-1 sm:grid-cols-[repeat(2,1fr)]  lg:grid-cols-[repeat(4,1fr)]'>
            <div className='p-[1.4rem] border-r-[1px] border-b-[1px] border-solid border-[darkgray] flex flex-col justify-between min-h-[250px]'>
                <h1 className='text-[clamp(2rem,4vw,3rem)] font-[700] text-titles'>OUR FAVORITES</h1>
                <p>Remember that shelf at the video store with “Employee Favorites”? This is like that, but for Houseplant’s best sellers.</p> 
            </div>
            {
                favorites.map(item=>{
                    const {id,attributes} = item;
                    return (
                        <div
                            key={id}
                            className='border-r-[1px] border-b-[1px] border-solid border-border bg-bg_primary'
                        >
                            <Link href={`/products/${attributes.slug}`}>
                            <a className='relative block w-[100%] h-[350px]'>
                                <Image
                                    src={getStrapiMedia(attributes.images.data[0])}
                                    alt=""
                                    layout='fill'
                                    objectFit='cover'
                                />
                                <Image
                                    src={getStrapiMedia(attributes.images.data[1])}
                                    alt=""
                                    layout='fill'
                                    objectFit='cover'
                                    className='absolute z-2 opacity-0 hover:opacity-[1] transition-opacity duration-500'
                                />
                            </a>
                            </Link>
                            <div className='flex justify-between px-[1rem] py-[.8rem] gap-[2rem]'>
                                <p className='text-[1.1rem]'>{attributes.title}</p>
                                <button 
                                    className='uppercase flex flex-col justify-start'
                                    onClick={()=>{addTocart(item)}}
                                >
                                    <span className='block text-titles font-[700]'>${attributes.price}</span>
                                    <span className='block underline font-[700] text-titles whitespace-nowrap'>Add to cart</span>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function BottomCaroussel() {
    return (
        <Carousel 
                emulateTouch={true}    
                infiniteLoop={true}                
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                renderIndicator={false}
            >
                <div className='relative aspect-[1/1.24] each-slide-effect'>
                <Image
                    src={'/images/d_three_up_one.jpg'}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                />
                <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-center gap-[1rem]'>
                    <h1 className='text-bg_primary text-[clamp(1.2rem,4.5vw,3.5rem)] font-[700] uppercase text-center tracking-[-0.2rem]'>Shop<br/> lifestyle</h1>
                    <Link href={'/collections/lifestyle'}>
                        <a className='border-[3px] border-solid border-bg_primary rounded-[50%] h-[60px] w-[60px]'>
                            <button className='h-[100%] w-[100%] p-2 flex items-center justify-center'>
                                <span className='arrow'></span>
                            </button>
                        </a>
                    </Link>
                </div>
                </div>
                <div className='relative aspect-[1/1.24] each-slide-effect'>
                    <Image
                        src={'/images/d_three_up_two.jpg'}
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-center gap-[1rem]'>
                        <h1 className='text-bg_primary text-[clamp(1.2rem,4.5vw,3.5rem)] font-[700] uppercase text-center tracking-[-0.2rem]'>Shop<br/> ASHTRAYS</h1>
                        <Link href={'/collections/ashtrays'}>
                            <a className='border-[3px] border-solid border-bg_primary rounded-[50%] h-[60px] w-[60px]'>
                                <button className='h-[100%] w-[100%] p-2 flex items-center justify-center'>
                                    <span className='arrow'></span>
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='relative aspect-[1/1.24] each-slide-effect'>
                    <Image
                        src={'/images/d_three_up_three.jpg'}
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-center gap-[1rem]'>
                        <h1 className='text-bg_primary text-[clamp(1.2rem,4.5vw,3.5rem)] font-[700] uppercase text-center tracking-[-0.2rem]'>Shop<br/> LIGHTERS</h1>
                        <Link href={'/collections/lighters'}>
                            <a className='border-[3px] border-solid border-bg_primary rounded-[50%] h-[60px] w-[60px]'>
                                <button className='h-[100%] w-[100%] p-2 flex items-center justify-center'>
                                    <span className='arrow'></span>
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
            </Carousel>
    )
}

function BottomLinks() {
    return (
        <div className='grid grid-cols-3'>
            <div className='relative aspect-[1/1.24]'>
                <Image
                    src={'/images/d_three_up_one.jpg'}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                />
                <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-center gap-[1rem]'>
                    <h1 className='text-bg_primary text-[clamp(1.2rem,4.5vw,3rem)] font-[700] uppercase text-center tracking-[-0.2rem]'>Shop<br/> lifestyle</h1>
                    <Link href={'/collections/lifestyle'}>
                        <a className='border-[3px] border-solid border-bg_primary rounded-[50%] h-[60px] w-[60px]'>
                            <button className='h-[100%] w-[100%] p-2 flex items-center justify-center'>
                                <span className='arrow'></span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className='relative aspect-[1/1.24]'>
                <Image
                    src={'/images/d_three_up_two.jpg'}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                />
                <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-center gap-[1rem]'>
                    <h1 className='text-bg_primary text-[clamp(1.2rem,4.5vw,3rem)] font-[700] uppercase text-center tracking-[-0.2rem]'>Shop<br/> ASHTRAYS</h1>
                    <Link href={'/collections/ashtrays'}>
                        <a className='border-[3px] border-solid border-bg_primary rounded-[50%] h-[60px] w-[60px]'>
                            <button className='h-[100%] w-[100%] p-2 flex items-center justify-center'>
                                <span className='arrow'></span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className='relative aspect-[1/1.24]'>
                <Image
                    src={'/images/d_three_up_three.jpg'}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                />
                <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-center gap-[1rem]'>
                    <h1 className='text-bg_primary text-[clamp(1.2rem,4.5vw,3rem)] font-[700] uppercase text-center tracking-[-0.2rem]'>Shop<br/> LIGHTERS</h1>
                    <Link href={'/collections/lighting'}>
                        <a className='border-[3px] border-solid border-bg_primary rounded-[50%] h-[60px] w-[60px]'>
                            <button className='h-[100%] w-[100%] p-2 flex items-center justify-center'>
                                <span className='arrow'></span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}