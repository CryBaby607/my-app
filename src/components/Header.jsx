import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Inicio');
  const [searchTerm, setSearchTerm] = useState('');

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Gorras', path: '/gorras' },
    { name: 'Hombres', path: '/hombres' },
    { name: 'Mujer', path: '/mujer' },
    { name: 'Niños', path: '/ninos' },
  ];

  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchTerm(''); 
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg border-b border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="logo-hover">
            <Link 
              to="/" 
              className="text-2xl font-bold tracking-tightest"
              onClick={() => handleNavClick('Inicio')}
            >
              <span className="text-white">DU</span><span className="text-dukicks-blue">KICKS</span>
            </Link>
          </div>

          {/* Nav Desktop */}
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

          {/* Iconos Derecha */}
          <div className="flex items-center space-x-4">
            
            {/* Buscador Desktop */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearchSubmit} className="search-bar relative">
                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-full px-4 py-2 hover:border-gray-700 transition-colors">
                  <button type="submit" className="fas fa-search text-gray-400 mr-3 hover:text-dukicks-blue transition-colors"></button>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input w-full text-white text-sm bg-transparent placeholder-gray-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* Carrito */}
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
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-dukicks-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
            
            {/* Botones Móviles */}
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
        
        {/* Barra de Búsqueda Móvil Desplegable */}
        {isMobileSearchOpen && (
          <div className="mobile-search md:hidden border-t border-gray-800 fade-in">
             <div className="py-3 px-4">
               <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
                  <button type="submit" className="fas fa-search text-gray-400 mr-3"></button>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full text-white bg-transparent focus:outline-none placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
               </form>
             </div>
          </div>
        )}

        {/* Menú Móvil - Corregido sin iconos */}
        <div className={`mobile-menu md:hidden border-t border-gray-800 ${isMobileMenuOpen ? 'open' : ''}`}>
           <div className="py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block nav-link font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors text-gray-300 hover:text-white"
                onClick={() => handleNavClick(link.name)}
              >
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