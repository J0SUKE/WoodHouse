import React, { useState } from 'react'

export const checkoutContenxt = React.createContext();

export default function CheckoutContext({children}) {
  
    const [checkoutStep,setCheckoutStep] = useState(1);
    const [shippingMethod,setShippingMethod] = useState(1);

    return (
    <checkoutContenxt.Provider value={
      {
        checkoutStep,
        setCheckoutStep,
        shippingMethod,
        setShippingMethod
      }}>
        {children}
    </checkoutContenxt.Provider>
  )
}
