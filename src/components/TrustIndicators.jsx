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
import payment from '../../public/payment.webp';
export default function TrustIndicators() {
  return (
    <section className="trust-container">
      <div className="trust-icons">
        <div className="trust-item">
          <Truck size={32} strokeWidth={2} />
          <p>Free Shipping</p>
        </div>
        <div className="trust-item">
          <Smile size={32} strokeWidth={2} />
          <p>
            <strong>6150</strong> Happy customers
          </p>
        </div>
        <div className="trust-item">
          <RotateCcw size={32} strokeWidth={2} />
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
