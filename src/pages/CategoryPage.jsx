import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';

const CategoryPage = ({ categoryKey }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const categoryMap = {
      'hombres': 'Hombres',
      'mujeres': 'Mujer',
      'ninos': 'Niños',
      'gorras': 'Gorras'
    };

    const targetCategory = categoryMap[categoryKey];

    // Filtramos usando la base de datos central
    const filteredItems = products.filter(p => p.category === targetCategory);
    setItems(filteredItems);
    
  }, [categoryKey]);

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">{items.length} productos encontrados</span>
            {/* Aquí implementaremos el ordenamiento luego */}
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dukicks-blue">
              <option>Más recientes</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
            </select>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <Link 
                  to={`/product/${product.id}`} 
                  key={product.id} 
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer block"
                >
                  <div className="relative aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-dukicks-blue">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">No hay productos en esta categoría por el momento.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;