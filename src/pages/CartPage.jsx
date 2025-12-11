import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartPage = () => {
  // Estado local simulado (Idealmente esto vendría de un Context global)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Gorra Negra Clásica',
      size: 'Talla Única',
      price: 29.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'Tenis Running Pro',
      size: 'Talla 42',
      price: 89.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00; // Ejemplo de envío
  const total = subtotal + shipping;

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
                <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.size}</p>
                    <div className="text-dukicks-blue font-bold text-xl">${item.price.toFixed(2)}</div>
                  </div>
                  
                  <div className="flex items-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-lg mr-6">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
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

                <button className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center">
                  <i className="fab fa-whatsapp mr-2 text-2xl"></i>
                  Completar Pedido por WhatsApp
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