import React, { Fragment, useContext } from 'react'
import {collectionContext} from '../../context/CollectionsContext'
import Link from 'next/link';

export default function Menu() {

    const {collectionsValue} = useContext(collectionContext);

    return (
    <div className='fixed w-[100%] z-[1] bg-bg_primary h-[100vh] flex justify-center items-center'>
      <ul className='grid grid-cols-4 place-items-center'>        
        <CollectionLink value={'Shop all'} target={'all'}/>
        {
          collectionsValue?.map(item=>{
            return <Fragment key={item.id}>
              <CollectionLink value={item.attributes.name} target={item.attributes.name}/>
            </Fragment>
          })
        }
      </ul>
    </div>
  )
}


function CollectionLink({value,target}) 
{
  return (
      <Link href={`/collections/${target}`}>
        <a>
          <li className='text-[3rem] uppercase tracking-[-0.1rem] font-[700] my-[1rem]'>
          {value}
          </li>
        </a>
      </Link>
  )  
}