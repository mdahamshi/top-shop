import React from 'react';
import './css/Product.css';
import { fetchProducts } from '../api/fakeProducts';
import { useLoaderData } from 'react-router-dom';
import TrustIndicators from '../components/TrustIndicators';
export async function loader({ params }) {
  const product = await fetchProducts({
    id: params.productId,
    endpoint: 'products',
  });
  if (!product) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { product };
}

export default function Product() {
  const { product } = useLoaderData();
  const { title, image, price, description } = { ...product };
  const { rate, count } = { ...product.rating };

  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalfStar) stars.push('☆');
    for (let i = 0; i < emptyStars; i++) stars.push('☆');
    return stars.join(' ');
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <div className="product-details">
        <h1 className="product-title">{title}</h1>
        <div className="product-rating">
          <span className="stars">{renderStars()}</span>
          <span className="count">({count} reviews)</span>
        </div>
        <div className="product-price">${price.toFixed(2)}</div>
        <p className="product-description">{description}</p>
        <button className="primary add-to-cart">Add to Cart</button>
        <TrustIndicators />
      </div>
    </div>
  );
}
