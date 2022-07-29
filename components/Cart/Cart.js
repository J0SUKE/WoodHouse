import React, { useContext, useRef } from 'react'
import {cartContext} from '../../context/CartContext'
import Link from 'next/link';
import {collectionContext} from '../../context/CollectionsContext';
import Image from 'next/image';
import {getStrapiMedia}  from '../../lib/media'
import {max_item_number} from '../../globals/variables'

export default function Cart({closeCartMenu,cartMenuRef}) {
    
    const {cart} = useContext(cartContext);    

    return (
    <div 
        className={`absolute top-0 right-0 z-[101] w-[100%] lg:w-[600px] h-[100%] bg-bg_primary animate-cart`}
        ref={cartMenuRef}
    >
        <div className='absolute right-[3rem] top-[3rem]'>
            <button 
                className='uppercase font-[700] tracking-[-0.01rem] text-titles'
                onClick={closeCartMenu}
            >close</button>
        </div>
        {
            cart.length==0 ?
            <CartEmpty/>
            :
            <CartNotEmpty/>
        }
    </div>
  )
}


function CartEmpty() {
    
    const {collectionsValue} = useContext(collectionContext);
    
    return (
        <div className='flex justify-center items-center h-[100%] w-[100%] flex-col p-[3rem]'>
            <h1 className='uppercase text-[1.8rem] font-[700] tracking-[-0.1rem] text-titles text-center'>nothing to see here !</h1>
            <p className='my-[1rem] text-[1.1rem] text-titles'>Let&apos;s fix that</p>
            <ul className='w-[100%] flex flex-col items-center max-w-[300px]'>
                <button
                    className='block w-[100%] my-[.5rem] btnborder'
                >
                    <Link href={`/collections/all`}>
                        <a className=' block uppercase font-[700] tracking-[-0.05rem] py-[.7rem] text-titles'>
                            Shop all
                        </a>
                    </Link>
                </button>
                {
                    [collectionsValue[0],collectionsValue[1]].map(item=>{
                        return (
                            <button
                                key={item.id}
                                className='block py-[.7rem] w-[100%] my-[.5rem] btnborder'
                            >
                                <Link href={`/collections/${item.attributes.slug}`}>
                                    <a className='uppercase font-[700] tracking-[-0.05rem] text-titles'>
                                        {item.attributes.name}
                                    </a>
                                </Link>
                            </button>
                        )
                    })
                }                
            </ul>
        </div>
    )
}

function CartNotEmpty() {
    
    const {cart,total} = useContext(cartContext);    
    
    return <div className='py-[3rem] h-[100%]'>
        <h1 className='uppercase text-[clamp(1.4rem,3vw,2rem)] font-[700] text-titles tracking-[-0.1rem] text-center '>cart ({cart.length})</h1>
        <div className='flex flex-col h-[100%] justify-between'>
            <div className='mt-[2rem]  max-h-[50%] overflow-y-auto'>
            {
                cart.map(item=>{
                    return <CartItem key={item.id} item={item} />
                })
            }
            </div>
            <div className='p-[3rem]'>
                <div className='flex justify-between items-center'>
                    <p className='uppercase font-[700] text-titles text-[clamp(1.1rem,2.6vw,1.8rem)] tracking-[-0.1rem]'>subtotal</p>
                    <p className='uppercase font-[700] text-titles text-[clamp(1.1rem,2.6vw,1.8rem)] tracking-[-0.1rem]'>${Number.parseFloat(total).toFixed(2)}</p>
                </div>
                <div className='flex justify-between items-center mt-[.5rem]'>
                    <p className='text-titles'>Shipping</p>
                    <p className='text-titles'>calculated at checkout</p>
                </div>
                <div>
                    <button className='w-[100%] py-[.7rem] bg-titles text-bg_primary mt-[1rem] text-[1.2rem] uppercase font-[600] tracking-[-0.05rem]'>checkout</button>
                </div>
            </div>
        </div>
    </div>
}

function Counter({item,setQty}) {
    
    const {qty} = item;

    function add() {
        if (qty==max_item_number) return;
        setQty(item,qty+1);
    }

    function sub() {
        if (qty==1) return;
        setQty(item,qty-1);
    }

    return <div className='flex  px-[1rem] py-[.5rem] border justify-between items-center'>
        <button 
            className={`font-[500] pr-[1.5rem] ${qty==1 ? 'opacity-[0.5]' : 'opacity-[1]'}`} 
            disabled={qty==1 ? true : false} 
            onClick={sub}
        >-</button>
        <p className='font-[500] w-[1rem] max-w-[1rem]'>{qty}</p>
        <button 
            className={`font-[500] pl-[1.5rem] ${qty==max_item_number ? 'opacity-[0.5]' : 'opacity-[1]'}`} 
            disabled={qty==max_item_number ? true : false}
            onClick={add}
        >+</button>
    </div>
}

function CartItem({item}) {
    
    const {removeFromCart,setQty} = useContext(cartContext);

    return <div className='border-t last:border-b border-border flex py-[]'>
                <div className='relative min-w-[89px] w-[89px] lg:w-[142px] lg:min-w-[142px] aspect-[1/1] '>
                    <Image
                        src={getStrapiMedia(item.attributes.images.data[0])}
                        alt=''
                        layout='fill'
                    />
                </div>
                <div className='ml-[1rem] py-[1rem] flex justify-between grow pr-[3rem]'>
                    <div>
                        <p className='font-[500] text-[clamp(.8rem,2vw,1rem)]'>{item.attributes.title}</p>
                        <div className='flex mt-[1.5rem]'>
                            <Counter item={item} setQty={setQty}/>
                            <button 
                                className='ml-[1rem] text-[clamp(1rem,2.2vw,1.1rem)] font-[400] text-titles underline'
                                onClick={()=>{removeFromCart(item)}}
                            >Remove</button>
                        </div>
                    </div>
                    <div>
                        <p className='text-titles font-[700] text-[clamp(1rem,2.2vw,1.1rem)]'>${item.attributes.price}</p>
                    </div>
                </div>
            </div>
}
