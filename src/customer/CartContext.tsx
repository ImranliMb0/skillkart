// src/customer/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  color?: string;
  quantity: number;
  sellerId: string;
  sellerEmail?: string; // ✅ Required for tracking who the seller is
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, color?: string) => void;
  updateCartQty: (id: string, color: string | undefined, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQty: () => {},
  clearCart: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (merge if same id + color)
  const addToCart = (item: CartItem) => {
    setCart(prev =>
      prev.some(ci => ci.id === item.id && ci.color === item.color)
        ? prev.map(ci =>
            ci.id === item.id && ci.color === item.color
              ? { ...ci, quantity: ci.quantity + item.quantity }
              : ci
          )
        : [...prev, item]
    );
  };

  // Remove item from cart
  const removeFromCart = (id: string, color?: string) =>
    setCart(prev => prev.filter(ci => ci.id !== id || ci.color !== color));

  // Update quantity of a cart item
  const updateCartQty = (id: string, color: string | undefined, qty: number) =>
    setCart(prev =>
      prev.map(ci =>
        ci.id === id && ci.color === color
          ? { ...ci, quantity: qty > 1 ? qty : 1 }
          : ci
      )
    );

  // Clear all items from cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
