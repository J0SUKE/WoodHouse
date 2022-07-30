import '../styles/globals.css'
import CollectionsContext from '../context/CollectionsContext'
import MenuContext from '../context/MenuContext'
import CartContext from '../context/CartContext'
import CheckoutContext from '../context/CheckoutContext'

function MyApp({ Component, pageProps }) {
  return( 
          <CollectionsContext>
            <MenuContext>
              <CartContext>
                <CheckoutContext>
                  <Component {...pageProps} />
                </CheckoutContext>                
              </CartContext>              
            </MenuContext>            
          </CollectionsContext>          
      )
        
  
}

export default MyApp
