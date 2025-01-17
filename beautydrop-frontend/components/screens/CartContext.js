import React, { createContext, useState, useContext } from 'react';
import CartScreen from './CartScreen';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map((item) => item.id === productId ? { ...item, quantity } : item));
  };

  const removeItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};


export default CartContext;