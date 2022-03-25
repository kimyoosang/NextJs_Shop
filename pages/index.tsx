import Head from "next/head";
import Title from "../components/Title";
import { GetStaticProps } from 'next';
import { getProducts, Product } from '../lib/product';

interface HomePageProps {
  products: Product[];
}

//서버사이드로 데이터 가져오기
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products },
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log('[HomePage] render: ', products)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
      </main>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
