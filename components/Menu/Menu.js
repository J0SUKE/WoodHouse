import React, { Fragment, useContext, useState } from 'react'
import {collectionContext} from '../../context/CollectionsContext'
import Link from 'next/link';
import {getStrapiMedia} from '../../lib/media'
import Image from 'next/image';
import {menuContext} from '../../context/MenuContext';

export default function Menu() {

    const {collectionsValue} = useContext(collectionContext);
    const {img,setImg} = useContext(menuContext);

    return (
    <div className='fixed w-[100%] z-[1] bg-bg_primary h-[100vh] flex justify-center items-center'>
      <ul className='z-[1] flex flex-col items-center lg:grid lg:grid-cols-4 place-items-center'>        
        <CollectionLink 
          value={'Shop all'} 
          target={'all'}
          setImg={setImg}
          img={img}
          image={'/images/menu/all_rollover_1920x.jpg'}          
        />        
        {
          collectionsValue?.map((item,index)=>{
            return <Fragment key={item.id}>
              <CollectionLink 
                value={item.attributes.name} 
                target={item.attributes.name} 
                setImg={setImg}
                image={getStrapiMedia(item.attributes.menu)}
                img={(img)}
              />
            </Fragment>
          })
        }
      </ul>
    </div>
  )
}


function CollectionLink({value,target,img,image,setImg}) 
{
  
  return (
    <>
        <Link href={`/collections/${target}`}>
        <a
          className='relative z-[2]'
        >
          <li 
            className={`text-[clamp(2rem,3.8vw,3rem)] uppercase tracking-[-0.1rem] font-[700] my-[clamp(.5rem,.7vw,1rem)] animate-slide transition-opacity duration-300
            ${img==value ? 'text-bg_primary opacity-[1]' : (img==null ? 'text-titles  opacity-[1]' : 'text-bg_primary opacity-[0.5] hover:opacity-[1]')}`}
            
            onMouseEnter={()=>{setImg(value)}}
            >
          {value}
          </li>
        </a>
      </Link>
      <div className={`absolute top-[0] transition-opacity duration-300 left-0 z-[0] h-[100%] w-[100%] ${img == value ? 'opacity-[1]' : 'opacity-0'}`}>
          <Image
            src={image}
            alt={''}
            layout='fill'
            objectFit='cover'
            className='opacity-[0] animate-appear'
            priority={true}
          />               
      </div>
    </>
  )  
}