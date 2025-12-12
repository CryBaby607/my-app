import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products'; // Importamos la data real

const FeaturedProducts = () => {
  // Seleccionamos los primeros 4 productos para mostrar como destacados
  // (O podrías filtrar por IDs específicos si prefieres: products.filter(p => [101, 202].includes(p.id)))
  const featuredList = products.slice(0, 4);

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
          {/* Enlazamos "Ver todos" a una búsqueda vacía para mostrar todo el catálogo o a una categoría principal */}
          <Link to="/search?q=" className="text-dukicks-blue font-semibold flex items-center hover:underline group">
            Ver todos
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredList.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-64 object-cover transition-transform duration-500"
                  />
                  {/* Ejemplo de etiqueta dinámica: si es ID 101 mostramos 'Nuevo' */}
                  {product.id === 101 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Nuevo
                    </div>
                  )}
                </Link>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                  <Link to={`/product/${product.id}`} className="font-bold text-lg text-gray-900 hover:text-dukicks-blue transition-colors">
                    {product.name}
                  </Link>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Redirigimos al detalle para que seleccionen talla */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;