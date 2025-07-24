import { useState, useEffect } from 'react';

export function useProducts(limit = 12) {
  const [products, setProducts] = useState(null);
  const dataURL = `https://fakestoreapi.com/products?limit=${limit}`;
  useEffect(() => {
    const dataFetch = async () => {
      fetch(dataURL, { mode: 'cors' })
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    dataFetch();
  }, [dataURL, products]);

  return products;
}
