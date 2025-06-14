// Context voor het winkelmandje (cart) zodat je overal in de app producten kan toevoegen/verwijderen.

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

// CartProvider maakt het winkelmandje beschikbaar voor alle children (de hele app)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Voeg een product toe aan het winkelmandje
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        // Verhoog alleen de quantity als het product al bestaat
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Voeg nieuw product toe
        return [...prevItems, { ...product }];
      }
    });
  };

  // Verwijder een product uit het winkelmandje
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};