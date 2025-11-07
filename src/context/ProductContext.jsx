import { createContext, useContext, useState, useEffect } from 'react';
import productsDataInitial from '../data/products.json';
import { STORAGE_KEYS } from '../utils/constants';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar productos del localStorage al iniciar
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        // Si no hay productos guardados, usar los del JSON inicial
        setProducts(productsDataInitial);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsDataInitial));
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProducts(productsDataInitial);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar productos en localStorage cada vez que cambien
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }, [products, isLoading]);

  // Agregar nuevo producto
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  // Actualizar producto existente
  const updateProduct = (id, productData) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
  };

  // Eliminar producto
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // Obtener producto por ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  // Obtener productos por categoría
  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  // Buscar productos
  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.model.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  };

  // Restaurar productos originales
  const resetProducts = () => {
    setProducts(productsDataInitial);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsDataInitial));
  };

  const value = {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    searchProducts,
    resetProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};