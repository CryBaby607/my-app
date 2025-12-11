import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener Link importado
import Header from '../components/Header';
import Footer from '../components/Footer';

// ... (El bloque productsData se mantiene igual, no lo repito para ahorrar espacio) ...
const productsData = {
  // ... tus datos existentes ...
  hombres: [
    { id: 101, name: 'Nike Air Max', price: 129.99, category: 'Hombres', image: 'https://images.unsplash.com/photo-1605348532760-6753d6c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 102, name: 'Adidas Ultraboost', price: 159.99, category: 'Hombres', image: 'https://images.unsplash.com/photo-1587563871167-1ee797455c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 103, name: 'Puma RS-X', price: 99.99, category: 'Hombres', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 104, name: 'Jordan Retro High', price: 179.99, category: 'Hombres', image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  ],
  mujeres: [
    { id: 201, name: 'Nike Air Force 1', price: 109.99, category: 'Mujer', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 202, name: 'Converse Chuck 70', price: 85.00, category: 'Mujer', image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 203, name: 'New Balance 574', price: 89.99, category: 'Mujer', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  ],
  ninos: [
    { id: 301, name: 'Nike Kids Star', price: 45.99, category: 'Niños', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 302, name: 'Adidas Superstar Kids', price: 55.00, category: 'Niños', image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  ],
  gorras: [
    { id: 401, name: 'NY Yankees Classic', price: 35.99, category: 'Gorras', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 402, name: 'LA Dodgers Blue', price: 34.99, category: 'Gorras', image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 403, name: 'Chicago Bulls Snapback', price: 39.99, category: 'Gorras', image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  ]
};

const categoryTitles = {
  hombres: { title: 'Colección Hombres', subtitle: 'Estilo y rendimiento para él' },
  mujeres: { title: 'Colección Mujeres', subtitle: 'Tendencias urbanas para ella' },
  ninos: { title: 'Niños', subtitle: 'Comodidad para los pequeños gigantes' },
  gorras: { title: 'Gorras Exclusivas', subtitle: 'El toque final para tu outfit' }
};

const CategoryPage = ({ categoryKey }) => {
  const [items, setItems] = useState([]);
  // Elimino 'info' si no se va a usar en el banner
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setItems(productsData[categoryKey] || []);
  }, [categoryKey]);

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="w-full">
          
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500">{items.length} productos encontrados</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dukicks-blue">
                <option>Más recientes</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                // CAMBIO AQUÍ: Convertimos el div contenedor en un Link
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;