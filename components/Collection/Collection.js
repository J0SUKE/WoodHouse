import Image from 'next/image'
import {getStrapiMedia} from '../../lib/media'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Collection({name,image,products,collections}) {
    
    console.log(products);
    return (
    <div className='absolute w-[100%] top-[88px] bg-bg_primary'>
        <div className='relative aspect-[3/1.1] mt-[30px]'>
            <Image
                src={(typeof image === 'string' ? image : getStrapiMedia(image))}
                alt=''
                layout='fill'
                objectFit='cover'
            />
        </div>
        <LinksTab collections={collections} name={name}/>
    </div>
  )
}


function LinksTab({collections,name}) {
    
    const router = useRouter();
    
    return (
        <div className='absolute top-[30px]'>
            <ul className='flex py-[2rem]'>
                <Link 
                    href={`/collections/all`}
                >
                    <a className='flex items-center'>  
                        <li 
                            className={`uppercase text-[1.4rem] px-[1.5rem] font-[700] text-bg_primary hover:opacity-[1] transition-opacity duration-300 ${name=='all' ? 'opacity-[1] underline':'opacity-[0.6]'}`}
                        >shop all</li>
                        <span className='h-[50%] w-[2px] bg-bg_primary opacity-[0.7]'></span>                        
                    </a>
                </Link>
                {
                    collections.map((item,index)=>{
                        return (
                            <Link 
                                href={`/collections/${item.attributes.name}`}
                                key={item.id}
                            >
                                <a className='flex items-center'>  
                                    <li 
                                        className={`uppercase text-[1.4rem] px-[1.5rem] font-[700] text-bg_primary hover:opacity-[1] transition-opacity duration-300 ${item.attributes.name==name ? 'opacity-[1] underline':'opacity-[0.6]'}`}
                                    >{item.attributes.name}</li>
                                    {
                                        index!=collections.length-1 && <span className='h-[50%] w-[2px] bg-bg_primary opacity-[0.7]'></span>
                                    }
                                    
                                </a>
                            </Link>
                        )
                    })
                }                
            </ul>
        </div>
    )
}