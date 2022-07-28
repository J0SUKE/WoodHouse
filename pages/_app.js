import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import CollectionsContext from '../context/CollectionsContext'
import MenuContext from '../context/MenuContext'
import CartContext from '../context/CartContext'

function MyApp({ Component, pageProps }) {
  return( 
          <CollectionsContext>
            <MenuContext>
              <CartContext>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CartContext>              
            </MenuContext>            
          </CollectionsContext>          
      )
        
  
}

export default MyApp
