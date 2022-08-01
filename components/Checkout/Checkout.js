import React, { useContext } from 'react'
import CheckoutForm from './CheckoutForm';
import {checkoutContenxt} from '../../context/CheckoutContext';
import {cartContext} from '../../context/CartContext';
import Image from 'next/image';
import { getStrapiMedia } from '../../lib/media';
import Link from 'next/link';
import ContactInfo from './ContactInfo';
import Shipping from './Shipping';
import { useRouter } from 'next/router';
import {checkoutStepsNames,shippingPrices} from '../../globals/variables';
import { Elements } from '@stripe/react-stripe-js';

export default function Checkout({options,stripe,clientSecret}) 
{    
    const {checkoutStep,shippingMethod} = useContext(checkoutContenxt)
    const {cart,total,subtotal} = useContext(cartContext);
    const router = useRouter();

    return (
    <div className='min-h-[100vh] bg-bg_primary flex px-[5%] flex-col lg:flex-row'>
        <div className='w-[100%] min-h-[auto] lg:w-[55%] lg:min-h-[100%]'>
            <div className='mt-[3rem] flex flex-col items-center'>
                <Link href={'/'}>
                    <a>
                        <div className='relative aspect-[1/1]'>
                            <Image src={'/images/logo.png'} alt='' width={89} height={80} />
                        </div>
                    </a>
                </Link>
                <div>
                    <ProgressionLinks/>
                </div>
            </div>
            <div>
                {
                    clientSecret ?
                    <Elements options={options} stripe={stripe}>
                        {
                            router?.asPath.startsWith(`/checkout?step=${checkoutStepsNames[0]}`) ?
                            <ContactInfo/>
                            :
                            router?.asPath.startsWith('/checkout?step=shipping_method') ?
                            <Shipping/>
                            :
                            <CheckoutForm/>
                        }                        
                    </Elements>      
                    :  
                    <div 
                        className='border-2 rounded-md mr-[0] lg:mr-[10%] px-[1rem] mt-[2rem] flex flex-col items-center py-[1rem]'
                    >
                        <p className='mt-[1rem]'>Loading Checkout data</p>
                        <div className='my-[1rem]'>
                            <div className="lds-dual-ring black-loader"></div>
                        </div>                    
                    </div>            
                }                
            </div>
        </div>
        <div className='w-[100%] lg:w-[45%] min-h-[100%] lg:border-l border-solid border-border pb-[6rem] lg:pb-0 lg:px-[3rem]'>
            <div className='mt-[3rem] max-h-[50%] overflow-y-auto border-b border-border'>
                {
                    cart.map(item=>{
                        return (
                        <div key={item.id} className='flex items-center gap-[1rem] my-[1rem]'>
                            <div className='relative h-[64px] w-[64px] '>
                                <div className='relative w-[100%] h-[100%] overflow-hidden border border-border rounded-[6px]'>
                                    <Image
                                        src={getStrapiMedia(item.attributes.images.data[0])}
                                        alt=''
                                        layout='fill'
                                    />
                                </div>
                                <div className='absolute right-[-8px] top-[-8px] text-[white] font-[500] bg-[#808080] text-[12px] w-[20px] h-[20px] flex items-center justify-center rounded-full'>
                                    {item.qty}
                                </div>                                
                            </div>
                            <div className='font-[600] flex justify-between items-center grow'>
                                <p>{item.attributes.title}</p>
                                <p>${(item.attributes.price*item.qty).toFixed(2)}</p>
                            </div>
                        </div>)
                    })
                }
            </div>
            <div className='pt-[.5rem]'>
                <div className='flex justify-between mt-[1rem]'>
                    <p className='text-[#51504a]'>Subtotal</p>
                    <p className='font-[500] text-titles'>${total.toFixed(2)}</p>
                </div>
                <div className='flex justify-between mt-[.5rem]'>
                    <p className='text-[#51504a]'>Shipping</p>
                    <p className={checkoutStep==1 ? `text-[#51504a] text-[.8rem]` : 'font-[500] text-titles'}>
                        {checkoutStep==1 ? 'Calculated at next step' : `$${shippingPrices[shippingMethod-1].toFixed(2)}`}
                    </p>
                </div>
            </div>
            <div className='flex justify-between border-t border-border mt-[1.5rem] pt-[1rem] items-center'>
                <div className='text-[#31302d]'>Total</div>
                <div className='text-[1.4rem] font-[600] text-[#31302d]'>
                    {
                        checkoutStep==1 ?
                        `$${total.toFixed(2)}`
                        :
                        `$${(total+shippingPrices[shippingMethod-1]).toFixed(2)}`
                    }
                </div>
            </div>
        </div>
    </div>
  )
}



function ProgressionLinks() {    

    return (
        <ul className='flex gap-[1rem] items-center mt-[.7rem]'>
            <Link href={'/#cartRedirect'}><a><li className='text-[.8rem]'>Cart</li></a></Link>
            <span className='h-[.5rem] w-[.5rem] border-b-2 border-r-2 border-[#585858] rotate-[-45deg]'></span>
            
            <CheckoutStepLink 
                step={1} 
                url={`/checkout?step=${checkoutStepsNames[0]}`} 
                name={'Information'}
            />                                                
            <span className='h-[.5rem] w-[.5rem] border-b-2 border-r-2 border-[#585858] rotate-[-45deg]'></span>
            
            <CheckoutStepLink 
                step={2} 
                url={`/checkout?step=${checkoutStepsNames[1]}`} 
                name={'Shipping'}
            />
            <span className='h-[.5rem] w-[.5rem] border-b-2 border-r-2 border-[#585858] rotate-[-45deg]'></span>
            
            <CheckoutStepLink 
                step={3} 
                url={`/checkout?step=${checkoutStepsNames[2]}`} 
                name={'Payment'}/>
        </ul>
    )
}

function CheckoutStepLink({step,url,name}) 
{    
    const {checkoutStep} = useContext(checkoutContenxt)
    const router = useRouter();
    return <>
        {
            router?.asPath.startsWith(url) ?
            <li className='text-[.8rem] font-[500] text-[#31302d]'>{name}</li>
            :
            checkoutStep<step ?
            <li className='text-[.8rem] opacity-[0.7] text-[#31302d]'>{name}</li>
            :
            <Link href={url}>
                <button><li className='text-[.8rem]'>{name}</li></button>
            </Link>            
        }
    </>   
}