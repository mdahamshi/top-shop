import { useCart } from '../context/CartContext';
import './css/Cart.css';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex-col">
        <h2>Your cart is empty 🛒</h2>
        <Link to={'/shop'} className="primary link-btn checkout-btn">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2>Your Cart</h2>
      <div className="cart-page">
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="cart-info">
                <div>
                  <h4>{item.title}</h4>
                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          updateQuantity(item.id, Math.max(1, val));
                        }
                      }}
                    />

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-controls">
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    X
                  </button>
                  <p className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <p>
            <strong>Total Items:</strong> {totalItems}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
          <button onClick={clearCart}>Clear Cart</button>
          <Link to={'/checkout'} className="primary link-btn checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
