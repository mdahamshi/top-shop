import React from 'react';
import Grid from '../components/Grid';
import { fetchProducts } from '../api/fakeProducts';
import { useLoaderData } from 'react-router-dom';
export async function loader({ request }) {
  const products = await fetchProducts({ limit: 12 });
  return { products };
}

export default function Shop() {
  const { products } = useLoaderData();

  if (!products || !products.length) return <p>No products found !</p>;
  return (
    <div>
      <Grid children={products}  />
    </div>
  );
}
