import { Outlet } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

export default function CartLayout() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
