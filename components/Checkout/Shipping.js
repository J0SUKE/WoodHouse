import React, { useContext } from 'react'
import Link from 'next/link'
import {checkoutStepsNames} from '../../globals/variables'
import {checkoutContenxt} from '../../context/CheckoutContext'
import { useRouter } from 'next/router'
import { shippingPrices } from '../../globals/variables'

export default function Shipping() {
  
  const {shippingMethod,setShippingMethod,checkoutStep,setCheckoutStep,email,address} = useContext(checkoutContenxt);
  const router = useRouter();

  const submitShippingInfo = ()=>{
    
    if (checkoutStep==2) {
      setCheckoutStep(3);
    }

    router.push(`/checkout?step=${checkoutStepsNames[2]}`)

  }
  
  return (
    <div className='sm:pr-[10%]'>
        <div className='border border-border rounded-md px-[1rem] mt-[2rem]'>
          <div className='flex gap-[2rem] py-[1rem]'>
            <div className='text-[#6e6c65] text-[.9rem]'>Contact</div>
            <div className='flex justify-between grow'>
              <div className='text-[.9rem] text-[#31302d]'>{email}</div>
              <Link href={`/checkout?step=${checkoutStepsNames[0]}&focus=email`}>
                <button className='text-[.9rem]'>change</button>
              </Link>              
            </div>            
          </div>
          <div className='last:border-t border-border flex gap-[2rem] py-[1rem]'>
            <div className='text-[#6e6c65] text-[.9rem] whitespace-nowrap'>Ship to</div>
            <div className='flex justify-between grow'>
              <div className='text-[.9rem] text-[#31302d]'>{address}</div>
              <Link href={`/checkout?step=${checkoutStepsNames[0]}&focus=address`}>
                <button className='text-[.9rem]'>change</button>
              </Link>              
            </div>            
          </div>
        </div>
        <div className='mt-[2rem]'>
            <p className='text-[1.2rem] text-[#31302d] font-[400]'>Shipping method</p>
        </div>        
        <div className='mt-[2rem] border border-border rounded-md text-[#51504a]'>
            <div className='border-b border-border p-[1rem]'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-[1rem] items-center'>
                  <button 
                    className={`w-[1.2rem] h-[1.2rem] rounded-full border border-border transition-[box-shadow] duration-300 
                    ${shippingMethod==1 ? 'shadow-[0px_0px_0px_0.4rem_#321e1e_inset] border-[transparent]' : ''}`}
                    onClick={()=>{setShippingMethod(1)}}
                  ></button>
                  <div>
                    <div className='text-[.9rem]'>FedEx Ground® Home Delivery</div>
                    <div className='text-[.8rem] opacity-[0.6]'>business days</div>
                  </div>
                </div>      
                <div className='font-[500] text-[#31302d]'>
                  ${shippingPrices[0].toFixed(2)}
                </div>          
              </div>
            </div>
            <div className='border-b border-border p-[1rem]'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-[1rem] items-center'>
                  <button 
                    className={`w-[1.2rem] h-[1.2rem] rounded-full border border-border transition-[box-shadow] duration-300 
                    ${shippingMethod==2 ? 'shadow-[0px_0px_0px_0.4rem_#321e1e_inset] border-[transparent]' : ''}`}
                    onClick={()=>{setShippingMethod(2)}}
                  ></button>
                  <div className='text-[.9rem]'>Flat Rate</div>
                </div>    
                <div>
                  <div className='font-[500] text-[#31302d]'>
                    ${shippingPrices[1].toFixed(2)}
                  </div>          
                </div>            
              </div>
            </div>
            <div className='p-[1rem]'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-[1rem] items-center'>
                  <button 
                    className={`w-[1.2rem] h-[1.2rem] rounded-full border border-border transition-[box-shadow] duration-300 
                    ${shippingMethod==3 ? 'shadow-[0px_0px_0px_0.4rem_#321e1e_inset] border-[transparent]' : ''}`}
                    onClick={()=>{setShippingMethod(3)}}
                  ></button>
                  <div>
                    <div className='text-[.9rem]'>FedEx 2Day®</div>
                    <div className='text-[.8rem] opacity-[0.6]'>1 business day</div>
                  </div>
                </div>             
                <div>
                  <div className='font-[500] text-[#31302d]'>
                    ${shippingPrices[2].toFixed(2)}
                  </div>          
                </div>             
              </div>
            </div>
        </div>
        <div className='mt-[3rem] flex justify-between sm:items-center pb-[4rem] flex-col sm:flex-row'>
              <Link href={`/checkout?step=${checkoutStepsNames[0]}`}>
                  <a>
                      <button type='button' className='flex items-center gap-2 text-titles'>
                          <span className='block w-[.5rem] h-[.5rem] border-b-2 border-titles border-l-2 rotate-45 translate-y-[.08rem]'></span>
                          Return to information
                      </button>
                  </a>
              </Link>
              <button 
                type='button' 
                className='bg-titles py-[1.3rem] px-[2rem] text-[white] font-[500] rounded-[.2rem] trnasition-[background] duration-300 hover:bg-[black] mt-[2rem] sm:mt-[0]'
                onClick={submitShippingInfo}
              >Continue to payment</button>
          </div>
    </div>
  )
}
