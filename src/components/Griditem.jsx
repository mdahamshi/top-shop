import React from 'react';
import './css/Griditem.css';

export default function Griditem({ title, image, rate, count, price }) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalfStar) stars.push('☆'); // optional: half star
    for (let i = 0; i < emptyStars; i++) stars.push('☆');
    return stars.join(' ');
  };

  return (
    <div className="grid-card">
      {image && (
        <div
          className="grid-card-image"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="grid-card-content">
        <h3 className="grid-card-title">{title}</h3>
        <div>
          <div className="grid-card-rating">
            <span className="stars">{renderStars()}</span>
            <span className="count">({count})</span>
          </div>
          <div className="grid-card-price">${price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
