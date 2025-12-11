import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext'; // <--- IMPORTANTE: Importar el contexto

// Simulamos una "Base de Datos" unificada
const allProductsDB = [
  { id: 101, name: 'Nike Air Max', price: 129.99, category: 'Hombres', description: 'El clásico reinventado con mayor amortiguación.', image: 'https://images.unsplash.com/photo-1605348532760-6753d6c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['40', '41', '42', '43', '44'] },
  { id: 102, name: 'Adidas Ultraboost', price: 159.99, category: 'Hombres', description: 'Energía sin fin para tus carreras diarias.', image: 'https://images.unsplash.com/photo-1587563871167-1ee797455c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['40', '41', '42'] },
  { id: 103, name: 'Puma RS-X', price: 99.99, category: 'Hombres', description: 'Estilo retro-futurista con comodidad extrema.', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['39', '40', '41', '42'] },
  { id: 104, name: 'Jordan Retro High', price: 179.99, category: 'Hombres', description: 'El icono que lo empezó todo.', image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['41', '42', '43', '44', '45'] },
  { id: 201, name: 'Nike Air Force 1', price: 109.99, category: 'Mujer', description: 'Leyenda del baloncesto convertida en icono urbano.', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['36', '37', '38', '39'] },
  { id: 202, name: 'Converse Chuck 70', price: 85.00, category: 'Mujer', description: 'Las Chuck 70 mezclan detalles de los 70 con una artesanía impecable.', image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['36', '37', '38', '39'] },
  { id: 301, name: 'Nike Kids Star', price: 45.99, category: 'Niños', description: 'Comodidad estelar para los más pequeños.', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['28', '29', '30', '31'] },
  { id: 401, name: 'NY Yankees Classic', price: 35.99, category: 'Gorras', description: 'La gorra más famosa del mundo.', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', sizes: ['S/M', 'M/L', 'L/XL'] },
];

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // <--- Usamos el hook del contexto
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [btnText, setBtnText] = useState('Agregar al Carrito');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Buscar producto por ID
    const foundProduct = allProductsDB.find(p => p.id === parseInt(id));
    
    // Fallback por si el ID no existe en nuestra "DB" simulada
    const productData = foundProduct || {
      id: parseInt(id),
      name: 'Producto Demo',
      price: 99.99,
      category: 'General',
      description: 'Este es un producto de demostración generado dinámicamente.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      sizes: ['38', '40', '42', '44']
    };

    setProduct(productData);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    // Llamada a la función global para añadir al carrito
    addToCart(product, quantity, selectedSize);
    
    // Feedback visual en el botón
    setBtnText('¡Agregado!');
    setTimeout(() => {
      setBtnText('Agregar al Carrito');
    }, 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-dukicks-blue">Inicio</Link> 
          <span className="mx-2">/</span>
          <Link to={`/${product.category.toLowerCase()}`} className="hover:text-dukicks-blue">{product.category}</Link>
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
                {product.sizes.map((size) => (
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