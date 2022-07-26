import React, { useContext, useEffect } from 'react'
import Product from '../../components/Product/Product'
import {fetchAPI} from '../../lib/api';
import Head from 'next/head';
import {collectionContext} from '../../context/CollectionsContext';
import Layout from '../../components/Layout/Layout'

export default function ProductPage({product,other,collections}) {
  
  const {setCollections} = useContext(collectionContext);

  useEffect(()=>{
    setCollections(collections);
  },[])
  

  return <>
      <Head>
        <title>{product.attributes.title} – WoodHouse</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../../favicon.png" />
      </Head>
      <Layout>
        <Product product={product} other={other}/>
      </Layout>
      
    </>
}

export async function getStaticPaths() 
{
    let paths = await fetchAPI('/products',{
        populate:'*'
      });
    

    paths = paths.data.map((item)=>{
        return ({
            params:{
                slug:item.attributes.slug,
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
    let product = await fetchAPI(`/products`,{
        populate:'*',
        filters:{
          slug:{
              $eq: params.slug
          }
        }
      });
    
    product=product.data[0];
    
    let other = await fetchAPI(`/products`,{
        populate:'*',
        filters:{
          slug:{
            $ne: params.slug
          }
        },
        sort:['id:desc']
      });
    
    other=other.data;

    let collections = await fetchAPI(`/collections`,{
      populate:'*',
      sort:['id:asc']
    });
    
    collections=collections.data;
    
    
    return {
        // Passed to the page component as props
        props: { product,other,collections },revalidate: 10
    }
}