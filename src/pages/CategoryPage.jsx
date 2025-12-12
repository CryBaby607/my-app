import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPriceDetails } from '../utils/productUtils'; // <-- NUEVO

const CategoryPage = ({ categoryKey }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        // 1. Mapeo de URL a nombre exacto en Firebase
        // IMPORTANTE: Estos deben coincidir con lo que guardaste en el Admin (NewProduct.jsx)
        const categoryMap = {
          'hombres': 'Hombres',
          'mujeres': 'Mujer',
          'ninos': 'Niños',
          'gorras': 'Gorras'
        };

        const targetCategory = categoryMap[categoryKey];

        // 2. Consulta a Firebase
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("category", "==", targetCategory));
        
        const querySnapshot = await getDocs(q);
        
        let fetchedItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 3. Ordenamiento (lo hacemos en el cliente para evitar crear índices complejos en Firebase por ahora)
        if (sortOption === 'price-asc') {
          fetchedItems.sort((a, b) => {
            // Se calcula el precio final para ordenar correctamente
            const priceA = getPriceDetails(a.price, a.discount).finalPrice; // <-- CORREGIDO: Usando a.discount
            const priceB = getPriceDetails(b.price, b.discount).finalPrice; // <-- CORREGIDO: Usando b.discount
            return priceA - priceB;
          });
        } else if (sortOption === 'price-desc') {
           fetchedItems.sort((a, b) => {
            // Se calcula el precio final para ordenar correctamente
            const priceA = getPriceDetails(a.price, a.discount).finalPrice; // <-- CORREGIDO: Usando a.discount
            const priceB = getPriceDetails(b.price, b.discount).finalPrice; // <-- CORREGIDO: Usando b.discount
            return priceB - priceA;
          });
        } else if (sortOption === 'recent') {
           // Si tienes fecha, podrías ordenar por fecha aquí
           // fetchedItems.sort((a, b) => b.createdAt - a.createdAt);
        }

        setItems(fetchedItems);
      } catch (error) {
        console.error("Error cargando categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
    
  }, [categoryKey, sortOption]); // Recargar si cambia la categoría o el orden

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="w-full">
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">{items.length} productos encontrados</span>
            
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

          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => {
                const priceDetails = getPriceDetails(product.price, product.discount); // <-- CORREGIDO: Usando product.discount

                return (
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
                    {/* Etiqueta de Descuento */}
                    {priceDetails.isDiscounted && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{priceDetails.discount}%
                        </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                      {/* NEW: Mostrar nombre concatenado */}
                      {`${product.brand || product.name} ${product.model || ''}`.trim()}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {priceDetails.isDiscounted && (
                          <span className="text-base text-gray-500 line-through">${priceDetails.regularPrice.toFixed(2)}</span>
                      )}
                      <span className={`text-xl font-bold ${priceDetails.isDiscounted ? 'text-red-500' : 'text-dukicks-blue'}`}>
                          ${priceDetails.finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <i className="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
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