import React from 'react'
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export default function Home() {


  return (
    <div className='absolute w-[100%] z-0'>
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
                <div className='relative h-[80vh] each-slide-effect'>
                    <Image
                        src="/images/home_hero1.png"
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <SlideContent h1={'The Ridge Ashtray'} p={'Ridged for your pleasure.'} btn={'Available Now'}/>
                </div>
                <div className='relative h-[80vh] each-slide-effect'>
                    <Image
                        src="/images/home_hero2.png"
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <SlideContent h1={'OIL LAMP'} p={''} btn={'SHOP NOW'}/>
                </div>
                <div className='relative h-[80vh] each-slide-effect'>
                    <Image
                        src="/images/home_hero3.jpg"
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <SlideContent h1={'Vinyl Box Set Vol.1'} p={'103 minutes of listening enjoyment'} btn={'SHOP NOW'}/>
                </div>
            </Carousel>
        </div>
    </div>
  )
}

function SlideContent({h1,p,btn}) {
    return (
        <div className='absolute z-[2] pt-[7%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-[.5rem]'>
            <h1 className="tracking-[-0.2rem] text-bg_primary text-[3rem] uppercase font-bold">{h1}</h1>
            <p className='text-bg_primary text-[1.2rem] font-semibold mb-[1rem]'>{p}</p>
            <button
                className='border border-bg_primary py-[.8rem] px-[1.5rem] text-bg_primary uppercase text-[1.1rem] font-semibold bg-[rgba(50,30,30,0.7)] transition-[background-color] duration-300 hover:bg-titles'
            >
                {btn}
            </button>
        </div>
    )
}