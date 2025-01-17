import React, { createContext, useReducer } from 'react';

// Define initial state
const initialState = {
  cart: [],
};

// Create context
export const CartContext = createContext(initialState);

// Define reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    // Define your actions here
    default:
      return state;
  }
};

// Create provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
