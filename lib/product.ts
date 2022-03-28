import { fetchJson } from "./api";

const { CMS_URL } = process.env;

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  pictureUrl: string;
}

export async function getProduct(id: string): Promise<Product> {
  const product = await fetchJson(`http://localhost:1337/products/${id}`)
  return stripProduct(product)
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`http://localhost:1337/products`)
  const products = await res.json()
  return products.map(stripProduct);
}

function stripProduct(product: any): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2),
    pictureUrl: 'http://localhost:1337' + product.picture.url,
  };
}

