import { createContext, useContext, useEffect, useState } from 'react';
import { useApp } from './AppContext';

const CartContext = createContext();
export function CartProvider({ children }) {
  const { appName } = useApp();
  const storageCartName = `${appName}-cart`;
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem(storageCartName);
    return typeof stored === 'string' ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageCartName, JSON.stringify(items));
  });

  const addItem = (newItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, quantity } : item;
      });
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
