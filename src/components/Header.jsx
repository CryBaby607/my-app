import React, { useState } from 'react';
import CartDropdown from './CartDropdown';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [activeLink, setActiveLink] = useState('Inicio');

  const navLinks = [
    { name: 'Inicio', icon: 'fa-home' },
    { name: 'Hombres', icon: 'fa-male' },
    { name: 'Mujer', icon: 'fa-female' },
    { name: 'Niños', icon: 'fa-child' },
  ];

  const showNotification = (message) => {
    // Implementar notificación
    console.log(message);
  };

  const handleSearch = (searchTerm, isMobile = false) => {
    if (searchTerm) {
      showNotification(`Buscando: "${searchTerm}"...`);
      if (isMobile) {
        setIsMobileSearchOpen(false);
      }
    } else {
      showNotification('🔍 Escribe algo para buscar');
    }
  };

  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
    showNotification(`Navegando a ${linkName}...`);
  };

  const handleAddToCart = () => {
    setCartItems(prev => prev + 1);
    showNotification('Producto agregado al carrito!');
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg border-b border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="logo-hover">
            <a href="#" className="text-2xl font-bold tracking-tightest" onClick={(e) => e.preventDefault()}>
              <span className="text-white">DU</span><span className="text-dukicks-blue">KICKS</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className={`nav-link font-medium text-sm uppercase tracking-wider ${
                  activeLink === link.name 
                    ? 'active text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.name);
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="search-bar relative">
                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-full px-4 py-2 hover:border-gray-700 transition-colors">
                  <i className="fas fa-search text-gray-400 mr-3"></i>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input w-full text-white text-sm bg-transparent placeholder-gray-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                id="cartButton"
                className="relative p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors cart-pulse"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <i className="fas fa-shopping-cart text-white text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-dukicks-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              </button>

              {isCartOpen && (
                <CartDropdown 
                  onClose={() => setIsCartOpen(false)}
                  onUpdateCart={handleAddToCart}
                />
              )}
            </div>

            <button
              id="mobileSearchButton"
              className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                setIsMobileMenuOpen(false);
                setIsCartOpen(false);
              }}
            >
              <i className="fas fa-search text-xl"></i>
            </button>

            <button
              id="mobileMenuButton"
              className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsMobileSearchOpen(false);
                setIsCartOpen(false);
              }}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="mobile-search md:hidden border-t border-gray-800">
            <div className="py-3 px-4">
              <div className="search-expanded">
                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-full px-4 py-3 hover:border-gray-700 transition-colors">
                  <i className="fas fa-search text-gray-400 mr-3"></i>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="search-input w-full text-white bg-transparent placeholder-gray-500"
                    id="mobileSearchInput"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(e.target.value, true);
                      }
                    }}
                  />
                  <button
                    className="ml-2 px-4 py-2 bg-dukicks-blue text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      const input = document.getElementById('mobileSearchInput');
                      handleSearch(input.value, true);
                    }}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`mobile-menu md:hidden border-t border-gray-800 ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className={`block nav-link font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors ${
                  activeLink === link.name 
                    ? 'active text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.name);
                }}
              >
                <i className={`fas ${link.icon} mr-3`}></i>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;