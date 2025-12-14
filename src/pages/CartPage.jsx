import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore'; 

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  // Función para generar el link de WhatsApp con el pedido
  const handleWhatsAppCheckout = async () => {
    if (cartItems.length === 0) return;

    // --- LÓGICA PARA GUARDAR EN FIREBASE ---
    const orderItemsData = cartItems.map(item => ({
        id: item.id,
        // Aseguramos el nombre completo del producto
        name: `${item.brand || item.name || ''} ${item.model || ''}`.trim(), 
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        category: item.category, 
        image: item.image
    }));

    const orderData = {
        items: orderItemsData,
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        timestamp: Date.now(),
        status: 'Cotización Pendiente',
        checkoutMethod: 'WhatsApp (Carrito)'
    };
    
    let message = "Hola DUKICKS, he preparado un pedido en la web. Aquí están los detalles para cotizar:%0A%0A";
    
    orderItemsData.forEach(item => {
      // Usamos el nombre asegurado del array orderItemsData
      message += `- ${item.quantity}x ${item.name} (Talla: ${item.size}) - $${item.price.toFixed(2)} c/u%0A`; 
    });
    
    // Se añade el desglose del resumen
    message += `%0A*Resumen de la Cotización:*%0A`;
    message += `Subtotal: $${subtotal.toFixed(2)}%0A`;
    message += `Envío estimado: $${shipping.toFixed(2)}%0A`;
    message += `*Total estimado: $${total.toFixed(2)}*%0A%0A`;
    message += `Por favor, ayúdame a completar mi pedido.`;

    try {
        await addDoc(collection(db, "whatsappOrders"), orderData);
        
        // Reemplaza el número con el real de la tienda
        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        
    } catch (error) {
        console.error("Error guardando orden de WhatsApp:", error);
        alert("Hubo un error al procesar tu pedido. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <i className="fas fa-shopping-basket text-6xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500 mb-6">Tu carrito está vacío</p>
            <Link to="/" className="bg-dukicks-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de Productos */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map((item) => (
                // Usamos item.id + item.size como key para diferenciar tallas
                <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">Talla: {item.size}</p>
                    {/* Bloque de Precio con Descuento */}
                    <div className="flex items-center space-x-2">
                        {item.discount > 0 && ( // <-- CORREGIDO: Usando item.discount
                            <span className="text-gray-500 text-base line-through">${item.regularPrice.toFixed(2)}</span>
                        )}
                        <div className="text-dukicks-blue font-bold text-xl">${item.price.toFixed(2)}</div>
                        {item.discount > 0 && ( // <-- CORREGIDO: Usando item.discount
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">{item.discount}% OFF</span>
                        )}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-lg mr-6">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de Compra */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío estimado</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-2 text-2xl"></i>
                  Completar Pedido
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  <i className="fas fa-lock mr-1"></i>
                  Pago seguro coordinado directamente con un asesor.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;