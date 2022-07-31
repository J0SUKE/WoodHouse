import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

export const checkoutContenxt = React.createContext();

export default function CheckoutContext({children}) {
  
    const [checkoutStep,setCheckoutStep] = useLocalStorage('checkoutStep',1);
    const [shippingMethod,setShippingMethod] = useLocalStorage('shipping_method',1);
    const [email,setEmail] = useLocalStorage('email','');
    const [firstName,setFirstName] = useLocalStorage('firstname','');
    const [lastName,setlastName] = useLocalStorage('lastname','');
    const [address,setAddress] = useLocalStorage('address','');
    const [appartment,setAppartement] = useLocalStorage('appartment','');
    const [city,setCity] = useLocalStorage('city','');
    const [state,setState] = useLocalStorage('state','');
    const [zip,setZip] = useLocalStorage('zip','');
    const [phone,setPhone] = useLocalStorage('phone','');



    return (
    <checkoutContenxt.Provider value={
      {
        checkoutStep,setCheckoutStep,
        shippingMethod,setShippingMethod,
        email,setEmail,
        address,setAddress,
        firstName,setFirstName,
        lastName,setlastName,
        appartment,setAppartement,
        city,setCity,
        state,setState,
        zip,setZip,
        phone,setPhone
      }}>
        {children}
    </checkoutContenxt.Provider>
  )
}
