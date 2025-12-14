import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore'; // AGREGADO collection y addDoc
import LoadingSpinner from '../components/LoadingSpinner';
import { getPriceDetails } from '../utils/productUtils';

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
    
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // 1. Referencia al documento específico por ID
        const docRef = doc(db, "products", id);
        // 2. Obtener el documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 3. Guardar datos en el estado
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Producto no encontrado en Firebase");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error obteniendo producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  const productNameDisplay = product 
    ? `${product.brand || product.name || ''} ${product.model || ''}`.trim() 
    : '';

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    // CORRECCIÓN: Creamos un objeto con el nombre compuesto asegurado para el carrito
    const productForCart = {
      ...product,
      name: productNameDisplay || product.name || 'Producto sin nombre'
    };

    // Pasamos el producto corregido al contexto
    addToCart(productForCart, quantity, selectedSize);
    
    setBtnText('¡Agregado!');
    setTimeout(() => {
      setBtnText('Agregar al Carrito');
    }, 2000);
  };

  const handleBuyNow = async () => { // HECHO ASYNC
    if (!selectedSize) {
      alert('Por favor selecciona una talla para continuar');
      return;
    }

    const priceDetails = getPriceDetails(product.price, product.discount);
    const finalPrice = priceDetails.finalPrice;
    
    const quantityVal = quantity;
    const itemSubtotal = finalPrice * quantityVal;
    
    // Aplicamos el costo de envío fijo para la cotización de compra directa
    const shippingCost = 10.00;
    const finalTotal = itemSubtotal + shippingCost;
    
    // --- LÓGICA PARA GUARDAR EN FIREBASE ---
    const orderData = {
        items: [{
            id: product.id,
            name: productNameDisplay, 
            size: selectedSize,
            quantity: quantityVal,
            price: finalPrice,
            category: product.category, 
            image: product.image
        }],
        subtotal: itemSubtotal,
        shipping: shippingCost,
        total: finalTotal,
        timestamp: Date.now(),
        status: 'Cotización Pendiente', // Estado inicial
        checkoutMethod: 'WhatsApp (Directo)'
    };
    // ------------------------------------------

    const message = `Hola DUKICKS, me gustaría cotizar la compra inmediata de este producto:%0A%0A` +
      `- ${quantityVal}x ${productNameDisplay} (Talla: ${selectedSize}) - $${finalPrice.toFixed(2)} c/u%0A%0A` +
      `Subtotal: $${itemSubtotal.toFixed(2)}%0A` +
      `Envío estimado: $${shippingCost.toFixed(2)}%0A` +
      `*Total estimado: $${finalTotal.toFixed(2)}*%0A%0A` +
      `Por favor, confirma disponibilidad y el proceso de pago.`;

    try {
        await addDoc(collection(db, "whatsappOrders"), orderData); // Guardamos la cotización
        
        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    } catch (error) {
        console.error("Error guardando orden de WhatsApp:", error);
        alert("Hubo un error al procesar tu pedido. Intenta nuevamente.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
      <Link to="/" className="text-dukicks-blue hover:underline">Volver a la tienda</Link>
    </div>
  );

  const priceDetails = getPriceDetails(product.price, product.discount); // Usando product.discount
  

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
          {/* CORRECCIÓN: Usando productNameDisplay para el breadcrumb */}
          <span className="text-gray-900 font-medium">{productNameDisplay}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Imagen */}
          <div className="md:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 aspect-w-1 aspect-h-1">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Detalles */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <p className="text-dukicks-blue font-semibold tracking-wide uppercase text-sm mb-2">
                {product.category}
              </p>
              {/* CORRECCIÓN: Usando productNameDisplay para el título principal */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{productNameDisplay}</h1>
              
              {/* Bloque de Precio con Descuento */}
              <div className="flex items-center space-x-3">
                {priceDetails.isDiscounted && (
                  <p className="text-2xl text-gray-400 line-through">
                    ${priceDetails.regularPrice.toFixed(2)}
                  </p>
                )}
                <p className={`text-3xl font-bold ${priceDetails.isDiscounted ? 'text-red-500' : 'text-gray-900'}`}>
                  ${priceDetails.finalPrice.toFixed(2)}
                </p>
                {priceDetails.isDiscounted && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{priceDetails.discount}% OFF</span>
                )}
              </div>
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
                {product.sizes && product.sizes.length > 0 ? (
                  product.sizes.map((size) => (
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
                  ))
                ) : (
                  <p className="text-gray-500 text-sm col-span-4">No hay tallas registradas.</p>
                )}
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

            {/* Botones */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 text-white py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg ${
                    btnText === '¡Agregado!' ? 'bg-green-600' : 'bg-black hover:bg-gray-800'
                }`}
              >
                {btnText}
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
              >
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