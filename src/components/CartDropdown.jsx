import React, { useState } from 'react';

const CartDropdown = ({ onClose, onUpdateCart }) => {
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

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-dukicks-blue rounded-full flex items-center justify-center mr-3">
            <i className="fas fa-shopping-cart text-white text-sm"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-900">Tu Carrito</h3>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                <p className="text-gray-500 text-xs">{item.size}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <i className="fas fa-minus text-xs text-gray-600"></i>
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <i className="fas fa-plus text-xs text-gray-600"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-dukicks-blue">${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-dukicks-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            onClick={onUpdateCart}
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Comprar por WhatsApp
          </button>
          <button className="w-full mt-2 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Ver Carrito Completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;