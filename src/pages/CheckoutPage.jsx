import { useCart } from '../context/CartContext';
import './css/CheckoutPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HeadText from '../components/HeadText';
import { chooseus } from '../assets/chooseus';
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form and cart data to a backend here
    alert('Order placed successfully!');
    clearCart();
    navigate('/shop');
  };

  if (items.length === 0) {
    return (
      <div className="flex-col">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/shop" className="primary link-btn">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2>Checkout</h2>
      <div className="checkout-page">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-form-fields">
            <label>
              Full Name
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Address
              <textarea
                name="address"
                required
                value={form.address}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <ul className="checkout-summry-list">
              {items.map((item) => (
                <li key={item.id}>
                  {item.title} × {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </p>
            <button type="submit" className="primary">
              Place Order
            </button>
            <ul className="why-choose-us">
              <div className="why-choose-us-title">
                <span>Why choose us?</span>
              </div>
              {chooseus.map((item) => (
                <li>
                  <HeadText text={item.text} head={item.head} />
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </>
  );
}
