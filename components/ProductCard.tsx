import Link from 'next/link';
import React from 'react';
import { Product } from '../lib/product';

interface ProductCardPage {
  product: Product;
}

const ProductCard: React.FC<ProductCardPage> = ({ product }) => {
  return (
    <div className="border my-4 w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          <img src="https://dummyimage.com/320x240" alt="dummyimage" />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <span>{product.price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
