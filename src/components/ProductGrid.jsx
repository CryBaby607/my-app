import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

export default function ProductGrid({ category = null, limit = 8 }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filtrar productos por categoría si se especifica
    let filtered = productsData;
    
    if (category) {
      filtered = productsData.filter(product => product.category === category);
    }

    // Limitar cantidad de productos
    const limited = filtered.slice(0, limit);
    setProducts(limited);
  }, [category, limit]);

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}