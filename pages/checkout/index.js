import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Head from 'next/head';
import {cartContext} from "../../context/CartContext";
import { useRouter } from "next/router";
import {appearance} from '../../stripe/apparence';
import Checkout from "../../components/Checkout/Checkout";
import {checkoutContenxt} from "../../context/CheckoutContext";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function CheckoutPage() {
    
    const [clientSecret, setClientSecret] = useState('');
    const {cart} = useContext(cartContext); 
    const router = useRouter();

    useEffect(()=>{
        if (cart.length==0) router.push('/');
    },[])

    useEffect(() => 
    {
        // Create PaymentIntent as soon as the page loads
        
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({items:cart,email:'chakib3500@gmail.com'}),
        })
        .then((res) =>res.json())
        .then((data) =>{
            setClientSecret(data.clientSecret);
        })
        .catch(error=>{
            console.log(error);
        })
    }, [cart]);
    
    const options = {
        clientSecret,
        appearance,
    };
    
  
    return (
        <div>
          <Head>
            <title>Checkout | WoodHouse</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="./favicon.png" />
          </Head>
          <Checkout options={options} stripe={stripePromise} clientSecret={clientSecret}/>
        </div>
      );
}
