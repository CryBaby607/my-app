import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: 'fa-search',
      title: 'Explora el Catálogo',
      description: 'Navega entre nuestras categorías y encuentra el producto perfecto para ti.',
      color: 'from-blue-50 to-white',
      borderColor: 'border-blue-100',
      iconColor: 'text-dukicks-blue'
    },
    {
      number: 2,
      icon: 'fa-shopping-cart',
      title: 'Agrega al Carrito',
      description: 'Selecciona talla, color y cantidad. Agrega todos los productos que desees.',
      color: 'from-green-50 to-white',
      borderColor: 'border-green-100',
      iconColor: 'text-green-600'
    },
    {
      number: 3,
      icon: 'fab fa-whatsapp',
      title: 'Compra por WhatsApp',
      description: 'Finaliza tu pedido vía WhatsApp con atención personalizada y seguimiento.',
      color: 'from-purple-50 to-white',
      borderColor: 'border-purple-100',
      iconColor: 'text-green-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cómo <span className="text-dukicks-blue">Funciona</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprar en Dukicks es simple, rápido y seguro. Solo sigue estos pasos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative inline-block mb-6">
                <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto border-2 ${step.borderColor}`}>
                  <i className={`${step.icon} ${step.iconColor} text-3xl`}></i>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-dukicks-blue text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;