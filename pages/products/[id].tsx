import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Title from '../../components/Title'
import { getProducts, Product, getProduct } from '../../lib/product'
import { ParsedUrlQuery } from 'querystring';

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: {id: product.id.toString()},
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({params:{id}}) => {
  const product = await getProduct(id)
  return {
    props: {product},
  }
}

const ProductPage: React.FC<ProductPageProps> = ({product}) => {
  return (
    <>
    <Head>
      <title>Next Shop</title>
    </Head>
      <main className='px-6 py-4'>
        <Title>
          {product.title}
        </Title>
        <p>
          {[product.description]}
        </p>
    </main>
    </>
    
  ) 
}

export default ProductPage