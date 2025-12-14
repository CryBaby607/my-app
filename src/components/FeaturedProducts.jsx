import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import LoadingSpinner from './LoadingSpinner';
import { getPriceDetails } from '../utils/productUtils';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const productsRef = collection(db, "products");
        
        const q = query(
          productsRef, 
          limit(4)
        );

        const querySnapshot = await getDocs(q);
        
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) return <div className="py-16"><LoadingSpinner /></div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Productos <span className="text-dukicks-blue">Destacados</span>
            </h2>
            <p className="text-gray-600 mt-2">Los favoritos de nuestra comunidad</p>
          </div>
          <Link to="/search?q=" className="text-dukicks-blue font-semibold flex items-center hover:underline group">
            Ver todos
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Aún no hay productos destacados.</p>
            <p className="text-sm text-gray-400 mt-2">Ve al panel de admin para crear uno.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => {
              const priceDetails = getPriceDetails(product.price, product.discount);
              
              return (
              <div
                key={product.id}
                className="product-card bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative overflow-hidden aspect-w-1 aspect-h-1">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image w-full h-64 object-cover transition-transform duration-500"
                    />
                    {priceDetails.isDiscounted ? (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{priceDetails.discount}%
                        </div>
                    ) : (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Nuevo
                    </div>
                    )}
                  </Link>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2">
                    <Link to={`/product/${product.id}`} className="font-bold text-lg text-gray-900 hover:text-dukicks-blue transition-colors line-clamp-1">
                      {`${product.brand || product.name} ${product.model || ''}`.trim()}
                    </Link>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        {priceDetails.isDiscounted && (
                            <span className="text-sm text-gray-500 line-through block">${priceDetails.regularPrice.toFixed(2)}</span>
                        )}
                        <span className={`text-2xl font-bold ${priceDetails.isDiscounted ? 'text-red-500' : 'text-gray-900'}`}>
                            ${priceDetails.finalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="add-to-cart-btn text-center block no-underline"
                    >
                      <i className="fas fa-eye mr-2"></i>
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;