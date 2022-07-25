import React from 'react'
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {getStrapiMedia} from '../../lib/media';
import Link from 'next/link';

export default function Home({hero,favorites}) {

  return (
    <div className='absolute w-[100%] z-0 bg-bg_primary'>
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
                                src={getStrapiMedia(hero[0].attributes.product.data.attributes.images.data[3])}
                                alt=''
                                layout='fill'
                                className='opacity-[0] hover:opacity-[1] transition-opacity duration-[400ms] z-2'
                                objectFit='cover'
                            />
                            </a>
                        </Link>
                        
                        <div className='w-[100%] h-[100px] absolute bottom-0 z-2 bg-bg_primary flex justify-between items-center px-[2rem]'>
                            <p className='text-[clamp(.9rem,2vw,1.2rem)]'>{hero[0].attributes.product.data.attributes.title}</p>
                            <button className='bg-titles text-bg_primary uppercase text-bold text-[clamp(.9rem,2vw,1.2rem)] py-[.7rem] px-[2rem] font-[500]'>
                                Add to cart - ${hero[0].attributes.product.data.attributes.price}
                            </button>
                        </div>
                    </div>
        </div>
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
                                <button className='uppercase flex flex-col justify-start'>
                                    <span className='block text-titles font-[700]'>${attributes.price}</span>
                                    <span className='block underline font-[700] text-titles whitespace-nowrap'>Add to cart</span>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
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
                <Button target={'/collection/all'} text={'get started'} />
            </div>
        </div>
        <OurHouseGoods favorites={favorites}/>
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

function HouseGood({slug,title,price,images}) {
    return (
        <>
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
            <div className='flex justify-between px-[1rem] py-[.8rem] gap-[2rem]'>
                <p className='text-[1.1rem]'>{title}</p>
                <button className='uppercase flex gap-[1rem]'>
                    <span className='block text-titles font-[700]'>${price}</span>
                    <span className='block underline font-[700] text-titles'>Add to cart</span>
                </button>
            </div>
        </>
    )
}

function OurHouseGoods({favorites}) {
    return (
        <div className='grid grid-cols-[repeat(6, 1fr)] grid-rows-[repeat(9, 1fr)]'>
            <div 
                className='p-[1.4rem] border-r-[1px] border-b-[1px] border-solid border-border flex flex-col justify-between min-h-[250px] good1'>
                <h1 className='text-[clamp(2rem,4vw,3rem)] font-[700] text-titles'>OUR HOUSEGOODS</h1>
                <p>The intersection of form and function and stuff we like. Our Housegoods were designed for people who love things that are as beautiful as they are useful.</p> 
            </div>
            <div className={`border-r-[1px] border-b-[1px] h-[75vh] border-solid border-border bg-bg_primary good2`}>
                <HouseGood 
                    slug={favorites[0].attributes.slug} 
                    title={favorites[0].attributes.title} 
                    images={favorites[0].attributes.images}
                />
            </div>
            <div className={`border-r-[1px] border-b-[1px] h-[75vh] border-solid border-border bg-bg_primary good3`}>
                <HouseGood 
                    slug={favorites[1].attributes.slug} 
                    title={favorites[1].attributes.title} 
                    images={favorites[1].attributes.images}
                />
            </div>            
            <div className={`border-r-[1px] border-b-[1px] h-[75vh] border-solid border-border bg-bg_primary good4`}>
                <HouseGood 
                    slug={favorites[2].attributes.slug} 
                    title={favorites[2].attributes.title} 
                    images={favorites[2].attributes.images}
                />
            </div>            
            <div className={`border-r-[1px] border-b-[1px] h-[75vh] border-solid border-border bg-bg_primary good5`}>
                <HouseGood 
                    slug={favorites[0].attributes.slug} 
                    title={favorites[0].attributes.title} 
                    images={favorites[0].attributes.images}
                />
            </div>            
            <div className={`border-r-[1px] border-b-[1px] h-[105vh] border-solid border-border bg-bg_primary good6`}>
                <HouseGood 
                    slug={favorites[1].attributes.slug} 
                    title={favorites[1].attributes.title} 
                    images={favorites[1].attributes.images}
                />
            </div>            
        </div>
    )   
}