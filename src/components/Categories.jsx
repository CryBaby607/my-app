import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'Gorras',
      icon: 'fa-hat-cowboy',
      description: 'Estilo urbano y deportivo para cada ocasión',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      buttonColor: 'bg-black hover:bg-gray-800',
      gradientFrom: 'from-gray-900',
      gradientTo: 'to-gray-700',
      path: '/gorras'
    },
    {
      id: 2,
      title: 'Tenis Hombres',
      icon: 'fa-shoe-prints',
      description: 'Diseño y comodidad para el día a día',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      buttonColor: 'bg-gradient-to-r from-dukicks-blue to-blue-500 hover:opacity-90',
      gradientFrom: 'from-dukicks-blue',
      gradientTo: 'to-blue-400',
      path: '/hombres'
    },
    {
      id: 3,
      title: 'Tenis Mujeres',
      icon: 'fa-female',
      description: 'Estilo y versatilidad para cada ocasión',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      buttonColor: 'bg-pink-500 hover:bg-pink-600',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-pink-400',
      path: '/mujer'
    },
    {
      id: 4,
      title: 'Tenis Niños',
      icon: 'fa-child',
      description: 'Diversión y comodidad para los más pequeños',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      gradientFrom: 'from-yellow-500',
      gradientTo: 'to-yellow-400',
      path: '/ninos'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Descubre por <span className="text-dukicks-blue">Categoría</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas en nuestras categorías especializadas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card bg-white rounded-2xl p-6 shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                {/* Se eliminó el div del círculo con el icono aquí */}
                
                <h3 className="text-2xl font-bold text-center mb-3 text-gray-900">{category.title}</h3>
                <p className="text-gray-600 text-center mb-6 text-sm">{category.description}</p>
                <div className="aspect-w-16 aspect-h-9 mb-4 rounded-xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              
              <Link 
                to={category.path}
                className={`w-full ${category.buttonColor} text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}
              >
                Explorar
                <i className="fas fa-chevron-right ml-2 text-sm"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;