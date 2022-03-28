import Head from "next/head";
import Title from "../components/Title";
import { GetStaticProps } from 'next';
//getSerberSideProps라는 것도 있는데 이는 새로고침 할대마다 서버사이드로 데이터를 업데이트한다
//리로드하면 항상 새로운 데이터를 반영한다는 장점이 있지만, 페이지가 런타임에 생성되어 응답이 느려진다는 단점이 있다
import { getProducts, Product } from '../lib/product';
import Link from 'next/link'

interface HomePageProps {
  products: Product[];
}

//서버사이드로 데이터 가져오기
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), //시간을 지정해서 업데이트한다, 그러나 변경된 사항이 없어도 업데이트 한다는 단점이 있다
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
            <Link href={`/products/${product.id}`}>
              <a>
                {product.title}
              </a>
            </Link>           
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
