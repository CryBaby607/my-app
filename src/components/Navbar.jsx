import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import '../styles/components/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const closeSearch = () => setIsSearchOpen(false);

  const cartCount = getTotalItems();

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/admin/login');
    }
  };

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
        <a href="/" className="nav-link" onClick={closeMenu}>
          Inicio
        </a>
        <a href="/categoria/tenis_hombre" className="nav-link" onClick={closeMenu}>
          Hombre
        </a>
        <a href="/categoria/tenis_mujer" className="nav-link" onClick={closeMenu}>
          Mujer
        </a>
        <a href="/categoria/gorras" className="nav-link" onClick={closeMenu}>
          Gorras
        </a>
      </div>

      {/* Right Actions */}
      <div className="navbar-actions">
        {/* Search Button */}
        <button 
          className="search-btn"
          onClick={toggleSearch}
          title="Buscar"
          aria-label="Abrir búsqueda"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {/* Cart */}
        <a href="/carrito" className="nav-icon cart-icon" title="Carrito">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          title="Menú"
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Search Panel */}
      <SearchBar isOpen={isSearchOpen} onClose={closeSearch} />
    </nav>
  );
}