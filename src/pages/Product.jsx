import React from 'react';
import './css/Product.css';
import { fetchProducts } from '../api/fakeProducts';
import { useLoaderData } from 'react-router-dom';
import TrustIndicators from '../components/TrustIndicators';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const { addItem, totalItems } = useCart();
  const [added, setAdded] = useState(false);

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

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
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
        <button onClick={handleAddToCart} className="primary add-to-cart">
          Add to Cart
        </button>
        {totalItems > 0 && (
          <Link to={'/checkout'} className="link-btn">
            Go to checkout
          </Link>
        )}
        {added && <p className="product-added">Item added successfully!</p>}

        <TrustIndicators />
      </div>
    </div>
  );
}
