import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [activeLink, setActiveLink] = useState('Inicio');

  const navLinks = [
    { name: 'Inicio', icon: 'fa-home', path: '/' },
    { name: 'Gorras', icon: 'fa-hat-cowboy', path: '/gorras' },
    { name: 'Hombres', icon: 'fa-male', path: '/hombres' },
    { name: 'Mujer', icon: 'fa-female', path: '/mujer' },
    { name: 'Niños', icon: 'fa-child', path: '/ninos' },
  ];

  const showNotification = (message) => {
    console.log(message);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      showNotification(`Buscando: "${searchTerm}"...`);
      setIsMobileSearchOpen(false);
    } else {
      showNotification('🔍 Escribe algo para buscar');
    }
  };

  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg border-b border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="logo-hover">
            <Link 
              to="/" 
              className="text-2xl font-bold tracking-tightest"
              onClick={() => handleNavClick('Inicio')}
            >
              <span className="text-white">DU</span><span className="text-dukicks-blue">KICKS</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link font-medium text-sm uppercase tracking-wider ${
                  activeLink === link.name 
                    ? 'active text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
              </Link>
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
              <Link
                to="/cart"
                className="relative block p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors cart-pulse"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileSearchOpen(false);
                }}
              >
                <i className="fas fa-shopping-cart text-white text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-dukicks-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              </Link>
            </div>

            <button
              id="mobileSearchButton"
              className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <i className="fas fa-search text-xl"></i>
            </button>

            <button
              id="mobileMenuButton"
              className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                        handleSearch(e.target.value);
                      }
                    }}
                  />
                  <button
                    className="ml-2 px-4 py-2 bg-dukicks-blue text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      const input = document.getElementById('mobileSearchInput');
                      handleSearch(input.value);
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
              <Link
                key={link.name}
                to={link.path}
                className={`block nav-link font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors ${
                  activeLink === link.name 
                    ? 'active text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleNavClick(link.name)}
              >
                <i className={`fas ${link.icon} mr-3`}></i>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;