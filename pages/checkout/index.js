import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {cartContext} from "../../context/CartContext";
import { useRouter } from "next/router";
import {appearance} from '../../stripe/apparence';
import Checkout from "../../components/Checkout/Checkout";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function CheckoutPage() {
    
    const [clientSecret, setClientSecret] = useState('');
    const {cart} = useContext(cartContext); 
    const router = useRouter();


    useEffect(() => 
    {
        // Create PaymentIntent as soon as the page loads
        if (cart.length==0) router.push('/');
        
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({items:cart,email:'chakib3500@gmail.com'}),
        })
        .then((res) =>res.json())
        .then((data) =>{
            console.log(data);
            setClientSecret(data.clientSecret)
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
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <Checkout/>
            </Elements>
          )}
        </div>
      );
}
