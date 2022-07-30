import React, { useContext } from 'react'
import Input from './Input';
import Link from 'next/link';
import {checkoutContenxt} from '../../context/CheckoutContext';
import { useRouter } from 'next/router';
import {checkoutStepsNames} from '../../globals/variables'

export default function ContactInfo({error}) {
    
    const {checkoutStep,setCheckoutStep} = useContext(checkoutContenxt);
    const router = useRouter();

    const submitContactInfo = (e)=>{
        e.preventDefault();

        // verifications...
        
        // si c'est la premiere fois que le user submit le form
        if (checkoutStep==1){
            setCheckoutStep(2);
        }
        // si le form etait déja valide et que apres resubmit il l'est toujours
        router.push(`/checkout?step=${checkoutStepsNames[1]}`)

    }

    return (
    <div className='lg:pr-[10%]'>
        <div className='flex justify-between items-center mt-[2rem] border-t border-border pt-[2rem]'>
            <p className='text-[1.2rem] text-[#31302d] font-[400]'>Contact information</p>
            <p className='text-[#51504a] text-[.9rem]'>Already have an account?<button className='text-[#31302d] ml-[5px]'>Log in</button></p>
        </div>
        <Input type={'email'} label={'Email'} placeholder={''} name={'email'}/>
        
        <form onSubmit={submitContactInfo}>
            <div className='mt-[2rem]'>
                <div>
                    <p className='text-[1.2rem] text-[#31302d] font-[400]'>Shipping address</p>
                </div>
                <div className='flex flex-col md:flex-row gap-[1rem]'>
                    <Input type={'text'} label={'First name'} placeholder={''} name={'firtname'}/>
                    <Input type={'text'} label={'Last name'} placeholder={''} name={'lastname'}/>
                </div>
                <div>
                    <Input type={'text'} label={'Address'} placeholder={''} name={'address'}/>
                </div>
                <div>
                    <Input type={'text'} label={'Apartment, suite, etc. (optional)'} placeholder={''} name={'details'}/>
                </div>
                <div className='flex gap-[1rem] flex-col md:flex-row'>
                    <Input type={'text'} label={'City'} placeholder={''} name={'city'}/>
                    <Input type={'text'} label={'State'} placeholder={''} name={'state'}/>
                    <Input type={'text'} label={'ZIP code'} placeholder={''} name={'zip'}/>
                </div>
                <div>
                    <Input type={'text'} label={'Phone'} placeholder={''} name={'phone'}/>
                </div>
            </div>
            <div className='mt-[3rem] flex flex-col sm:flex-row justify-between sm:items-center pb-[4rem]'>
                <Link href={'/#cartRedirect'}>
                    <a>
                        <button type='button' className='flex items-center gap-2 text-titles'>
                            <span className='block w-[.5rem] h-[.5rem] border-b-2 border-titles border-l-2 rotate-45 translate-y-[.08rem]'></span>
                            Return to cart
                        </button>
                    </a>
                </Link>
                <button type='submit' className='bg-titles py-[1.3rem] px-[2rem] text-[white] font-[500] rounded-[.2rem] trnasition-[background] duration-300 hover:bg-[black] mt-[2rem] sm:mt-0'>Continue to shipping</button>
            </div>
        </form>
        
    </div>
  )
}
