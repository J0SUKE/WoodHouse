import React, { useEffect, useState } from 'react'

export const cartContext = React.createContext();

export default function CartContext({children}) {
  
    const [cartMenu,setCartMenu] = useState(false);
    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0);

    function addTocart(newitem) {
        setCart(items=>{
            if (items.filter(item=>item.id==newitem.id).length!=0)
            {
                // item is already in the cart
                return items.map(item=>{
                    if (item.id!=newitem.id) return item
                    else
                    {
                        return {
                            ...item,
                            qty:item.qty+1,
                        }
                    }
                })
            }
            else
            {
                // item is not in the cart
                return [{
                    ...newitem,
                    qty:1,
                },...items]
            }
        });
        setCartMenu(true);
    }

    function removeFromCart(elementToRemove) {
        setCart(items=>items.filter(item=>item.id!=elementToRemove.id));
    }

    function setQty(elementTomodify,newQty) {
        setCart(items=>items.map(item=>{
            if (item.id!=elementTomodify.id) return item
            else
            {
                return ({
                    ...item,
                    qty:newQty
                })
            }
        }))
    }

    useEffect(()=>{
        let t = 0;
        cart.forEach(element => {
            t+=element.attributes.price*element.qty;
        });
        setTotal(t);
    },[cart])

    
    return <cartContext.Provider value={{cartMenu,setCartMenu,cart,setCart,addTocart,removeFromCart,setQty,total}}>
    {children}
    </cartContext.Provider>
}
