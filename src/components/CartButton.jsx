import React from 'react';
import './css/CartButton.css';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link to={'/cart'} className="cart-btn link-btn primary clickable">
      <ShoppingCart />
      {totalItems > 0 && (
        <div className="cart-btn-total">
          <span>{totalItems}</span>
        </div>
      )}
    </Link>
  );
}
