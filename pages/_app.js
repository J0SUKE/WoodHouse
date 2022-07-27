import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import CollectionsContext from '../context/CollectionsContext'
import MenuContext from '../context/MenuContext'

function MyApp({ Component, pageProps }) {
  return( 
          <CollectionsContext>
            <MenuContext>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MenuContext>            
          </CollectionsContext>          
      )
        
  
}

export default MyApp
