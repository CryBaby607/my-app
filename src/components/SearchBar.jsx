import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import productsData from '../data/products.json';
import { formatPrice } from '../utils/formatters';
import '../styles/components/SearchBar.css';

export default function SearchBar({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Buscar productos cuando cambia el query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      setShowResults(false);
      setSelectedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = productsData.filter(product => {
      const matchesName = product.model.toLowerCase().includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      
      return matchesName || matchesBrand || matchesCategory;
    }).slice(0, 8); // Limitar a 8 resultados

    setResults(filtered);
    setShowResults(filtered.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery]);

  // Navegar al producto seleccionado
  const handleSelectProduct = (productId) => {
    navigate(`/producto/${productId}`);
    setSearchQuery('');
    setShowResults(false);
    onClose();
  };

  // Manejo de teclado
  const handleKeyDown = (e) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectProduct(results[selectedIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowResults(false);
        onClose();
        break;
      default:
        break;
    }
  };

  // Scroll automático cuando se selecciona un item con teclado
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="search-backdrop"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div className="search-panel">
        {/* Input */}
        <div className="search-input-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Buscar productos, marcas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              title="Limpiar búsqueda"
              aria-label="Limpiar búsqueda"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        {/* Results / Empty State */}
        {showResults ? (
          <div className="search-results" ref={resultsRef}>
            <div className="results-header">
              <span className="results-count">
                {results.length} resultado{results.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="results-list">
              {results.map((product, index) => (
                <button
                  key={product.id}
                  className={`result-item ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => handleSelectProduct(product.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {/* Imagen */}
                  <div className="result-image">
                    <img 
                      src={product.image} 
                      alt={`${product.brand} ${product.model}`}
                      loading="lazy"
                    />
                    {product.discount > 0 && (
                      <span className="result-discount">-{product.discount}%</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="result-info">
                    <div className="result-header">
                      <span className="result-brand">{product.brand}</span>
                      <span className="result-price">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <h4 className="result-name">{product.model}</h4>
                    <div className="result-footer">
                      <span className="result-category">
                        {product.category === 'tenis_hombre' && '👕 Hombre'}
                        {product.category === 'tenis_mujer' && '👗 Mujer'}
                        {product.category === 'gorras' && '🧢 Gorras'}
                      </span>
                      <span className={`result-stock ${
                        product.stock > 10 ? 'available' : 
                        product.stock > 0 ? 'low' : 
                        'out'
                      }`}>
                        {product.stock > 10 && '✓ En stock'}
                        {product.stock > 0 && product.stock <= 10 && `⚠ ${product.stock} ud.`}
                        {product.stock === 0 && '✗ Agotado'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : searchQuery && (
          <div className="search-empty">
            <div className="empty-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <h3>No encontramos productos</h3>
            <p>Intenta con otro término de búsqueda</p>
          </div>
        )}
      </div>
    </>
  );
}