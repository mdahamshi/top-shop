import React from 'react';
import Grid from '../components/Grid';
import { fetchProducts } from '../api/fakeProducts';
import { useLoaderData } from 'react-router-dom';
import Griditem from '../components/GridLinkCard';
import { useApp } from '../context/AppContext';
import { StarRating } from '../components/StarRating';

export async function loader({ request }) {
  const products = await fetchProducts({ limit: 12 });
  return { products };
}

export default function Shop() {
  const { products } = useLoaderData();
  const { productsPath } = useApp();

  if (!products || !products.length) return <p>No products found !</p>;
  return (
    <div>
      <Grid>
        {products.map((child, index) => (
          <div key={child.id ? child.id : index}>
            <Griditem link={`${productsPath}/${child.id}`}>
              {child.image && (
                <div
                  className="grid-card-image"
                  style={{ backgroundImage: `url(${child.image})` }}
                />
              )}
              <div className="grid-card-content">
                <h3 className="grid-card-title">{child.title}</h3>
                <div>
                  <div className="grid-card-rating">
                    <StarRating rate={child.rating.rate} />
                    <span className="count">({child.rating.count})</span>
                  </div>
                  <div className="grid-card-price">
                    ${child.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </Griditem>
          </div>
        ))}
      </Grid>
    </div>
  );
}
