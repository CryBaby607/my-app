import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products'; // Importamos la fuente única de datos

const CategoryPage = ({ categoryKey }) => {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState('recent'); // Estado para controlar el orden

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 1. Mapeo para traducir la URL a la categoría de la BD
    const categoryMap = {
      'hombres': 'Hombres',
      'mujeres': 'Mujer',
      'ninos': 'Niños',
      'gorras': 'Gorras'
    };

    const targetCategory = categoryMap[categoryKey];

    // 2. Filtramos los productos de la BD central
    let filteredItems = products.filter(p => p.category === targetCategory);

    // 3. Aplicamos el ordenamiento según la selección
    if (sortOption === 'price-asc') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filteredItems.sort((a, b) => b.price - a.price);
    }
    // Si es 'recent', dejamos el orden por defecto (como vienen en el array)

    // Actualizamos el estado
    setItems([...filteredItems]);
    
  }, [categoryKey, sortOption]); // Se ejecuta cuando cambia la categoría O el orden

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="w-full">
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">{items.length} productos encontrados</span>
            
            {/* SELECTOR DE ORDENAMIENTO ACTIVO */}
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dukicks-blue bg-white cursor-pointer"
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
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
              <p className="text-gray-500 mb-4">No hay productos disponibles en esta categoría.</p>
              <Link to="/" className="text-dukicks-blue font-semibold hover:underline">
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;