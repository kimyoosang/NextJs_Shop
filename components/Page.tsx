import Head from 'next/head';
import React from 'react';
import Title from './Title';

interface PageProps {
  title: string;
}
const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
};

export default Page;
