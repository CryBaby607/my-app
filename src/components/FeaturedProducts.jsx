import React, { useState } from 'react';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Gorra Negra Premium',
      description: 'Ajuste perfecto, calidad premium',
      price: 29.99,
      originalPrice: 37.50,
      discount: '-20%',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      badge: 'discount'
    },
    {
      id: 2,
      name: 'Tenis Running Pro',
      description: 'Máxima comodidad para deporte',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Zapatillas Urbanas',
      description: 'Estilo urbano contemporáneo',
      price: 75.50,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      badge: 'new'
    },
    {
      id: 4,
      name: 'Gorra Vintage',
      description: 'Estilo retro, calidad moderna',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const handleAddToCart = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        // Aquí podrías añadir lógica para el carrito
        console.log(`Producto ${product.name} agregado al carrito`);
      }
      return product;
    }));
  };

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
          <button className="text-dukicks-blue font-semibold flex items-center hover:underline group">
            Ver todos
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image w-full h-64 object-cover transition-transform duration-500"
                />
                {product.badge === 'discount' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}
                  </div>
                )}
                {product.badge === 'new' && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nuevo
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;