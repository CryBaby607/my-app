import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Inicializar carrito desde localStorage para no perder datos al recargar
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('dukicks_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('dukicks_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Añadir producto
  const addToCart = (product, quantity, size) => {
    setCartItems(prevItems => {
      // Verificar si el producto con esa ID y esa TALLA ya existe
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        // Si existe, actualizamos la cantidad
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Si no existe, lo agregamos nuevo
        return [...prevItems, { ...product, quantity, size }];
      }
    });
  };

  // Eliminar producto
  const removeFromCart = (id, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  // Actualizar cantidad
  const updateQuantity = (id, size, delta) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id && item.size === size) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Obtener número total de items (para el badge del header)
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};