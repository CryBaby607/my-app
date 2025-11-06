import { useState } from 'react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar'; // ✅ NUEVO
import '../styles/components/Navbar.css';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // ✅ MEJORADO

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const closeSearch = () => setIsSearchOpen(false); // ✅ NUEVO

  const cartCount = getTotalItems();

  return (
    <nav className="navbar">
      {/* Logo - Left */}
      <div className="navbar-logo">
        <a href="/" className="logo-link">
          <span className="logo-text">Dukicks</span>
        </a>
      </div>

      {/* Menu Links - Center */}
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" className="nav-link" onClick={closeMenu}>Inicio</a>
        <a href="/categoria/tenis_hombre" className="nav-link" onClick={closeMenu}>Hombre</a>
        <a href="/categoria/tenis_mujer" className="nav-link" onClick={closeMenu}>Mujer</a>
        <a href="/categoria/gorras" className="nav-link" onClick={closeMenu}>Gorras</a>
      </div>

      {/* Right Actions */}
      <div className="navbar-actions">
        {/* Search Button */}
        <button 
          className="search-btn"
          onClick={toggleSearch}
          title="Buscar"
        >
          🔍
        </button>

        {/* Cart */}
        <a href="/carrito" className="nav-icon cart-icon" title="Carrito">
          <span className="icon">🛒</span>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          title="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Search Panel */}
      <SearchBar isOpen={isSearchOpen} onClose={closeSearch} /> {/* ✅ NUEVO */}
    </nav>
  );
}