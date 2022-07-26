import Collection from "../../components/Collection/Collection";
import {fetchAPI} from '../../lib/api';

export default function CollectionPage({collection,collections}) {
  return (
    <Collection 
      name={collection.attributes.name} 
      image={collection.attributes.image} 
      products={collection.attributes.products.data} 
      collections={collections}
    />
  )
}


export async function getStaticPaths() 
{
    let paths = await fetchAPI('/collections',{
        populate:['image','products','products.images'],
      });
    

    paths = paths.data.map((item)=>{
        return ({
            params:{
                name:item.attributes.name,
            }
        })
    })
    
    return {
      paths,
      fallback: false,
    };
}
  
  // `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params}) 
{
    let collection = await fetchAPI(`/collections`,{
      populate:['image','products','products.images'],
        filters:{
          name:{
              $eq: params.name
          }
        }
      });
    
    collection=collection.data[0];
    
    let collections = await fetchAPI(`/collections`,{});
    
    collections=collections.data;
    
    return {
        // Passed to the page component as props
        props: { collection,collections },
    }
}