import Image from 'next/image'
import {getStrapiMedia} from '../../lib/media'
import Link from 'next/link'


export default function Collection({name,image,desc,products,collections}) {
    
    return (
    <div className='absolute top-[88px] bg-bg_primary w-[100%]'>
        <div className='relative'>
            <div className='relative aspect-[3/1.1] mt-[30px]'>
                <Image
                    src={(typeof image === 'string' ? image : getStrapiMedia(image))}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <LinksTab collections={collections} name={name}/>
            <h1 
                className='absolute text-[3rem] top-[50%] font-[700] tracking-[-0.1rem] left-[50%] translate-x-[-50%] uppercase text-bg_primary md:top-[55%] translate-y-[-50%] md:translate-y-0'
            >{name}</h1>
        </div>
        <div>
            <ProductsGallery products={products} name={name} desc={desc}/>
        </div>
    </div>
  )
}


function LinksTab({collections,name}) {
        
    return (
        <div className='absolute top-0 hidden md:block'>
            <ul className='flex py-[2rem]'>
                <Link 
                    href={`/collections/all`}
                >
                    <a className='flex items-center'>  
                        <li 
                            className={`uppercase text-[clamp(1rem,2vw,1.4rem)] px-[clamp(1rem,2vw,1.4rem)] font-[700] text-bg_primary hover:opacity-[1] transition-opacity duration-300 ${name=='all' ? 'opacity-[1] underline':'opacity-[0.6]'}`}
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
                                        className={`uppercase text-[clamp(1rem,2vw,1.4rem)] px-[clamp(1rem,2vw,1.4rem)] font-[700] text-bg_primary hover:opacity-[1] transition-opacity duration-300 ${item.attributes.name==name ? 'opacity-[1] underline':'opacity-[0.6]'}`}
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

function ProductsGallery({products,name,desc}) {
    return (
        <div className='grid grid-cols-1 mn:grid-cols-2 md:grid-cols-3'>
            {
                desc &&
                <div 
                    className='mn:aspect-[1/1.25] bg-bg_primary border-b border-r border-border flex flex-col justify-between place-self-stretch'>
                    <h1 className='uppercase text-titles text-[clamp(1.8rem,4vw,3rem)] font-[700] px-[1.7rem] py-[1rem]'>{name}</h1>
                    <p className='px-[1rem] text-[clamp(.7rem,1.3vw,.9rem)] pb-[3rem]'>{desc}</p>
                </div>
            }
            
            {
                products.map(item=>{
                    return (
                        <div
                            key={item.id}
                            className='bg-bg_primary border-b border-r border-border'
                        >
                            <Link href={`/products/${item.attributes.slug}`}>
                                <a className='relative block w-[100%] aspect-[1/1.25]'>
                                    <Image
                                        src={getStrapiMedia(item.attributes.images.data[0])}
                                        alt=""
                                        layout='fill'
                                        objectFit='cover'
                                    />
                                    <Image
                                        src={getStrapiMedia(item.attributes.images.data[1])}
                                        alt=""
                                        layout='fill'
                                        objectFit='cover'
                                        className='absolute z-2 opacity-0 hover:opacity-[1] transition-opacity duration-500'
                                    />
                                </a>
                            </Link>
                            <div className='flex justify-between px-[1rem] pt-[3rem] pb-[1rem] gap-[2rem]'>
                                <p className='text-[1.1rem]'>{item.attributes.title}</p>
                                <button className='uppercase flex gap-[1rem]'>
                                    <span className='block text-titles font-[700]'>${item.attributes.price}</span>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )   
}