import { useState } from 'react';
import '../styles/components/Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
        {/* Search */}
        <div className="search-container">
          <button 
            className="search-btn"
            onClick={toggleSearch}
            title="Buscar"
          >
            🔍
          </button>
          {isSearchOpen && (
            <input 
              type="text" 
              className="search-input"
              placeholder="Buscar productos..."
              autoFocus
            />
          )}
        </div>

        {/* Cart */}
        <a href="/carrito" className="nav-icon cart-icon" title="Carrito">
          <span className="icon">🛒</span>
          <span className="badge">3</span>
        </a>

        {/* User */}
        <a href="/login" className="nav-icon user-icon" title="Mi cuenta">
          <span className="icon">👤</span>
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
    </nav>
  );
}