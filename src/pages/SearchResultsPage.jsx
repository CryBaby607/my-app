import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../firebase/config'; // Importamos la DB
import { collection, getDocs } from 'firebase/firestore'; // Funciones de Firebase
import LoadingSpinner from '../components/LoadingSpinner';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const queryText = searchParams.get('q') || ''; // Renombrado para claridad
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);
      try {
        // 1. Traemos todos los productos de Firebase
        // (Nota: Firebase no tiene búsqueda de texto nativa simple "LIKE %texto%", 
        // así que traemos la colección y filtramos en el cliente. 
        // Para apps gigantes se usaría Algolia o ElasticSearch, pero esto sirve perfecto para empezar)
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        
        const allProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 2. Filtramos en memoria
        if (queryText) {
          const lowerQuery = queryText.toLowerCase();
          const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery) ||
            (product.description && product.description.toLowerCase().includes(lowerQuery))
          );
          setFilteredProducts(results);
        } else {
          setFilteredProducts([]);
        }

      } catch (error) {
        console.error("Error en búsqueda:", error);
      } finally {
        setLoading(false);
      }
      
      window.scrollTo(0, 0);
    };

    fetchAndFilterProducts();
  }, [queryText]);

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Resultados para: <span className="text-dukicks-blue">"{queryText}"</span>
        </h1>

        {loading ? (
          <div className="py-20 flex justify-center">
             <LoadingSpinner size="lg" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500 mb-6">No encontramos productos que coincidan con tu búsqueda.</p>
            <Link to="/" className="text-dukicks-blue font-semibold hover:underline">
              Ver todo el catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 block"
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
                  <span className="text-xl font-bold text-dukicks-blue">${Number(product.price).toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;