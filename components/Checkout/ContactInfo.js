import React, { useContext, useEffect, useRef, useState } from 'react'
import Input from './Input';
import Link from 'next/link';
import {checkoutContenxt} from '../../context/CheckoutContext';
import { useRouter } from 'next/router';
import {checkoutStepsNames} from '../../globals/variables'

export default function ContactInfo({error}) {
    
    const {
        checkoutStep,setCheckoutStep,
        setEmail,email,
        setAddress,address,
        firstName,setFirstName,
        lastName,setlastName,
        appartment,setAppartement,
        city,setCity,
        state,setState,
        zip,setZip,
        phone,setPhone
    } = useContext(checkoutContenxt);
    
    const router = useRouter();

    const [errorEmail,setErrorEmail] = useState();
    const emailRef = useRef();
    const [errorAddress,setErrorAddress] = useState();
    const addressRef = useRef();
    const [lastNameError,setLastNameError] = useState();
    const [cityError,setCityError] = useState();
    const [stateError,setStateError] = useState();
    const [zipError,setZipError] = useState();
    const [phoneError,setPhoneError] = useState();

    const submitContactInfo = (e)=>{
        e.preventDefault();

        // verifications...
        if (!InputsValidation()) return;

        // si c'est la premiere fois que le user submit le form
        if (checkoutStep==1){
            setCheckoutStep(2);
        }
        // si le form etait déja valide et que apres resubmit il l'est toujours
        router.push(`/checkout?step=${checkoutStepsNames[1]}`)

    }

    function InputsValidation() {
        
        let ok = true;
        
        if (email.length==0) {
            setErrorEmail('Enter a valid email');
            ok=false;
        }
        else
        {
            setErrorEmail(null);
        }
        if (lastName.length==0) {
            setLastNameError('Enter a last name');
            ok=false;
        }
        else
        {
            setLastNameError(null);
        }
        if (address.length==0) {
            setErrorAddress('Enter an address');
            ok=false;
        } 
        else
        {
            setErrorAddress(null);
        }  
        if (city.length==0) {
            setCityError('Enter a city');
            ok=false;
        }
        else
        {
            setCityError(null);   
        }
        if(state.length==0)
        {
            setStateError('Enter a state')
            ok=false;
        }
        else
        {
            setStateError(null);
        }
        if(zip.length==0)
        {
            setZipError('Enter a ZIP code')
            ok=false;
        }
        else
        {
            setZipError(null);
        }
        if(phone.length==0)
        {
            setPhoneError('Enter a phone number')
            ok=false;
        }
        else
        {
            setPhoneError(null);
        }

        return ok;
    }

    useEffect(()=>{
        if (router.query.focus=='email') {
            emailRef.current.focus();   
        }
        if (router.query.focus=='address') {
            addressRef.current.focus();   
        }
    },[router])

    return (
    <div className='lg:pr-[10%]'>
        <div className='flex justify-between items-center mt-[2rem] border-t border-border pt-[2rem]'>
            <p className='text-[1.2rem] text-[#31302d] font-[400]'>Contact information</p>
            <p className='text-[#51504a] text-[.9rem]'>Already have an account?<button className='text-[#31302d] ml-[5px]'>Log in</button></p>
        </div>        
        <form onSubmit={submitContactInfo}>
            <Input 
                type={'email'} 
                label={'Email'} 
                placeholder={''} 
                name={'email'}  
                error={errorEmail}
                inputVal={email}
                setValue={setEmail}
                node={emailRef}
            />
            <div className='mt-[2rem]'>
                <div>
                    <p className='text-[1.2rem] text-[#31302d] font-[400]'>Shipping address</p>
                </div>
                <div className='flex flex-col md:flex-row gap-[1rem]'>
                    <Input 
                        type={'text'} 
                        label={'First name (optional)'} 
                        placeholder={''} 
                        name={'firtname'}
                        inputVal={firstName}
                        setValue={setFirstName}
                    />
                    <Input 
                        type={'text'} 
                        label={'Last name'} 
                        placeholder={''} 
                        name={'lastname'}
                        inputVal={lastName}
                        setValue={setlastName}
                        error={lastNameError}
                    />
                </div>
                <div>
                    <Input 
                        type={'text'} 
                        label={'Address'} 
                        placeholder={''} 
                        name={'address'} 
                        error={errorAddress}
                        inputVal={address}
                        setValue={setAddress}
                        node={addressRef}
                    />
                </div>
                <div>
                    <Input 
                        type={'text'} 
                        label={'Apartment, suite, etc. (optional)'} 
                        placeholder={''} 
                        name={'details'}
                        inputVal={appartment}
                        setValue={setAppartement}
                    />
                </div>
                <div className='flex gap-[1rem] flex-col md:flex-row'>
                    <Input 
                        type={'text'} 
                        label={'City'} 
                        placeholder={''} 
                        name={'city'}
                        inputVal={city}
                        setValue={setCity}
                        error={cityError}
                    />
                    <Input 
                        type={'text'} 
                        label={'State'} 
                        placeholder={''} 
                        name={'state'}
                        inputVal={state}
                        setValue={setState}
                        error={stateError}
                    />
                    <Input 
                        type={'text'} 
                        label={'ZIP code'} 
                        placeholder={''} 
                        name={'zip'}
                        inputVal={zip}
                        setValue={setZip}
                        error={zipError}
                    />
                </div>
                <div>
                    <Input 
                        type={'text'} 
                        label={'Phone'} 
                        placeholder={''} 
                        name={'phone'}
                        inputVal={phone}
                        setValue={setPhone}
                        error={phoneError}
                    />
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
