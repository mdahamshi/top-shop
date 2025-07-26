import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useApp } from './AppContext';

const CartContext = createContext();
export function CartProvider({ children }) {
  const { appName } = useApp();
  const storageCartName = `${appName}-cart`;
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(storageCartName);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageCartName, JSON.stringify(items));
  }, [items, storageCartName]);

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

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
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
