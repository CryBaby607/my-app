import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [btnText, setBtnText] = useState('Agregar al Carrito');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Buscar en la BD centralizada
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
        // Manejo básico de error o producto no encontrado
       console.error("Producto no encontrado");
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    
    setBtnText('¡Agregado!');
    setTimeout(() => {
      setBtnText('Agregar al Carrito');
    }, 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  
  if (!product) return <div className="min-h-screen flex items-center justify-center">Producto no encontrado. <Link to="/" className="ml-2 text-blue-500">Volver</Link></div>;

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-dukicks-blue">Inicio</Link> 
          <span className="mx-2">/</span>
          <Link to={`/${product.category === 'Niños' ? 'ninos' : product.category.toLowerCase()}`} className="hover:text-dukicks-blue">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Columna Izquierda: Imagen */}
          <div className="md:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Columna Derecha: Detalles */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <p className="text-dukicks-blue font-semibold tracking-wide uppercase text-sm mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <div className="prose text-gray-600">
              <p>{product.description}</p>
            </div>

            {/* Selector de Talla */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900">Seleccionar Talla</span>
                <button className="text-sm text-dukicks-blue hover:underline">Guía de tallas</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes && product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border text-center font-medium transition-all ${
                      selectedSize === size
                        ? 'border-dukicks-blue bg-dukicks-blue text-white shadow-md'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Cantidad */}
            <div className="flex items-center space-x-4">
              <span className="font-bold text-gray-900">Cantidad</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 text-white py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg ${
                    btnText === '¡Agregado!' ? 'bg-green-600' : 'bg-black hover:bg-gray-800'
                }`}
              >
                {btnText}
              </button>
              {/* Botón comprar ahora (placeholder para futura implementación) */}
              <button className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center">
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;