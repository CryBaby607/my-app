import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    setCartItems(prevItems => {
      // Buscar si ya existe el producto con las mismas características
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        // Si existe, actualizar cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, {
          ...product,
          quantity,
          selectedSize,
          selectedColor,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  // Remover producto del carrito
  const removeFromCart = (productId, selectedSize = null, selectedColor = null) => {
    setCartItems(prevItems => 
      prevItems.filter(
        item => !(
          item.id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        )
      )
    );
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, quantity, selectedSize = null, selectedColor = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular subtotal (sin descuentos)
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Calcular descuento total
  const getDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount > 0) {
        const savings = (item.price * item.discount / 100) * item.quantity;
        return total + savings;
      }
      return total;
    }, 0);
  };

  // Calcular total final
  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId, selectedSize = null, selectedColor = null) => {
    return cartItems.some(
      item => 
        item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );
  };

  // Obtener cantidad de un producto específico
  const getItemQuantity = (productId, selectedSize = null, selectedColor = null) => {
    const item = cartItems.find(
      item => 
        item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscount,
    getTotal,
    getTotalItems,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};