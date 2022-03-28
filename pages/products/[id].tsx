import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Title from '../../components/Title';
import { getProducts, Product, getProduct } from '../../lib/product';
import { ParsedUrlQuery } from 'querystring';
import { ApiError } from '../../lib/api';

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking',
    //요청한 페이지가 존재하지 않을 경우 클라이언트 응답을 블로킹(차단)한 후, 새 데이터를 요청해서 받아온다 / false일 경우 404 페이지로 이동하게된다
    //만약 서버가 끊기면 원래 서버에러가 떠야하는데 블로킹을 하면 404페이지가 보이게 할 수 있다
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }) => {
  const product = await getProduct(id);
  try {
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      //404일때만 notFound 에러
      return { notFound: true };
    }
    throw err;
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{[product.description]}</p>
      </main>
    </>
  );
};

export default ProductPage;
