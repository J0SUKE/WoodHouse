import React, { useContext, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import Confetti from 'react-confetti'
import Link from 'next/link';
import {cartContext} from '../../context/CartContext';
import {checkoutContenxt} from '../../context/CheckoutContext';
import { useRouter } from 'next/router';

export default function SuccesPayment() {
  
    const { width, height } = useWindowSize();
    const {setCart} = useContext(cartContext);
    const router = useRouter();
    const {secrentIntent} = useContext(checkoutContenxt);

    useEffect(()=>{
        //setCart([]);
        console.log(secrentIntent);
        console.log(router?.query?.payment_intent_client_secret);
    },[])

    return (
    <div className='bg-bg_primary min-h-screen'>
            {
                width &&
                <Confetti
                width={width}
                height={height}            
                recycle={false}
                numberOfPieces={1000}
                tweenDuration={10000}
                />
            }
            <div className='absoute w-[100%] min-h-[100vh] flex justify-center items-center flex-col'>
                <div className='max-w-[450px] w-[90%] flex flex-col items-center'>
                    <h1 className='text-[clamp(1.6rem,3vw,2.3rem)] uppercase whitespace-nowrap font-[700] text-titles'>Thank you for your order !</h1>
                    <div className='w-[100%] flex justify-between items-center mt-[1.3rem]'>
                        <p className='text-[#31302d] font-[500] text-[1.1rem]'>A confirmation email has been sent to</p>
                        <p className='text-[#5e5d59]'>test@email.com</p>
                    </div>
                    <div className='mt-[2rem]'>
                        <Link href={'/'}>
                            <button 
                            className='bg-titles py-[1.3rem] px-[2rem] text-[white] font-[500] rounded-[.2rem] trnasition-[background] duration-300 hover:bg-[black]'>Continue shopping</button>
                        </Link>                        
                    </div>
                </div>
            </div>
    </div>
  )
}
