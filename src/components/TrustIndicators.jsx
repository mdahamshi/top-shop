import {
  Truck,
  Smile,
  RotateCcw,
  CreditCard,
  Bitcoin,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import './css/TrustIndicators.css';
import { useApp } from '../context/AppContext';

import payment from '../../public/payment.webp';
export default function TrustIndicators() {
  const { happyCustomers } = useApp();

  return (
    <section className="trust-container">
      <div className="trust-icons">
        <div className="trust-item">
          <Truck />
          <p>Free Shipping</p>
        </div>
        <div className="trust-item">
          <Smile />
          <p>
            <strong>{happyCustomers}</strong> Happy customers
          </p>
        </div>
        <div className="trust-item">
          <RotateCcw />
          <p>Easy returns</p>
        </div>
      </div>

      <div className="checkout-secure">
        <ShieldCheck size={20} strokeWidth={2} />
        <span>Fast Secure Checkout</span>
      </div>

      <div className="payment-methods">
        <img src={payment} alt="payment methods" />
      </div>
    </section>
  );
}
