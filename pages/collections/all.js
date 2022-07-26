import Collection from "../../components/Collection/Collection";
import {fetchAPI} from '../../lib/api';

export default function AllPage({products,collections}) {
    return (
      <Collection name={'all'} image={'/images/all.jpg'} products={products} collections={collections}/>
    )
  }
  
      
    // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps() 
  {
      let collections = await fetchAPI(`/collections`,{
        populate:['image','products','products.images'],
        });
      
      collections=collections.data;
      
      let products = await fetchAPI(`/products`,{});
      
      products=products.data;
      
      return {
          // Passed to the page component as props
          props: { products,collections },
      }
  }