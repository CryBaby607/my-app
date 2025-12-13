import React from 'react';

const Hero = () => {
  const stats = [
    { value: '10+', label: 'Años de Experiencia' },
    { value: '50K+', label: 'Clientes Satisfechos' },
    { value: '200+', label: 'Marcas Exclusivas' },
    { value: '24/7', label: 'Soporte al Cliente' },
  ];

  return (
    <section className="gradient-bg overflow-hidden fade-in">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-dukicks-blue to-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                Desde 2013
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                <span className="highlight-text">Más que una tienda,</span>
                <br />
                <span className="text-dukicks-blue">una comunidad</span>
              </h1>
            </div>

            <div className="space-y-6 text-gray-700 text-lg">
              <p className="leading-relaxed">
                En <span className="font-bold text-gray-900">DUKICKS</span> no solo vendemos tenis y gorras,
                <span className="font-semibold text-gray-900"> creamos conexiones</span>. Desde 2013, hemos sido el punto de encuentro
                para los amantes de la cultura urbana y el streetwear.
              </p>
              <p className="leading-relaxed">
                Nuestra pasión por la moda urbana nos impulsa a buscar constantemente
                <span className="font-semibold text-gray-900"> las piezas más exclusivas</span> y las colaboraciones más esperadas,
                siempre manteniendo la autenticidad que nos caracteriza.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card rounded-xl p-5 text-center shadow-soft">
                  <div className="text-2xl md:text-3xl font-bold text-dukicks-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Tienda DUKICKS - Interior"
                className="rounded-3xl w-full h-auto object-cover border-8 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;