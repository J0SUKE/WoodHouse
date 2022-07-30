import React, { useState } from 'react'

export const checkoutContenxt = React.createContext();

export default function CheckoutContext({children}) {
  
    const [checkoutStep,setCheckoutStep] = useState(1);
    const [shippingMethod,setShippingMethod] = useState(1);
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');



    return (
    <checkoutContenxt.Provider value={
      {
        checkoutStep,
        setCheckoutStep,
        shippingMethod,
        setShippingMethod,
        email,
        setEmail,
        address,
        setAddress,
      }}>
        {children}
    </checkoutContenxt.Provider>
  )
}
