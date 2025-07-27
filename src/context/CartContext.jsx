import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';
import { useApp } from './AppContext';
import { type } from '@testing-library/user-event/dist/cjs/utility/type.js';

const CartContext = createContext();
function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((item) => item.id === action.payload.id);
      if (existing) {
        return items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...items, action.payload];
    }
    case 'delete': {
      return items.filter((item) => item.id !== action.payload);
    }
    case 'quantity': {
      return items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }
    case 'clear': {
      return [];
    }
    case 'set': {
      console.log(`setting cart: ${action.payload}`);
      return action.payload;
    }
    default:
      return items;
  }
}
export function CartProvider({ children }) {
  const { appName } = useApp();
  const storageCartName = useMemo(() => `${appName}-cart`, [appName]);
  const [items, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const stored = localStorage.getItem(storageCartName);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageCartName, JSON.stringify(items));
  }, [items, storageCartName]);

  const addItem = (newItem) => dispatch({ type: 'add', payload: newItem });
  const removeItem = (id) => dispatch({ type: 'delete', payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'quantity', payload: { id, quantity } });

  const clearCart = () => dispatch({ type: 'clear' });

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
