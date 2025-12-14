import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPriceDetails } from '../utils/productUtils';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const queryText = searchParams.get('q') || ''; 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        
        const allProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (queryText) {
          const lowerQuery = queryText.toLowerCase();
          const results = allProducts.filter(product => {
            const brandMatch = (product.brand || '').toLowerCase().includes(lowerQuery);
            const modelMatch = (product.model || '').toLowerCase().includes(lowerQuery);
            const nameMatch = (product.name || '').toLowerCase().includes(lowerQuery); 
            const categoryMatch = (product.category || '').toLowerCase().includes(lowerQuery);
            const descriptionMatch = (product.description || '').toLowerCase().includes(lowerQuery);
            return brandMatch || modelMatch || nameMatch || categoryMatch || descriptionMatch;
          });
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
            {filteredProducts.map((product) => {
              const priceDetails = getPriceDetails(product.price, product.discount); 
              
              return (
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
                  {/* Etiqueta de Descuento */}
                  {priceDetails.isDiscounted && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{priceDetails.discount}%
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;