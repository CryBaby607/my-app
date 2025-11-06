import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../styles/pages/Categoria.css';
import ProductGrid from '../components/ProductGrid';
import { CATEGORIES_LABELS, SORT_LABELS, SORT_OPTIONS } from '../utils/constants';

export default function Categoria() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);
  const [viewType, setViewType] = useState('grid'); // grid o list

  const categoryLabel = CATEGORIES_LABELS[category] || 'Productos';

  return (
    <div className="categoria-page">
        
      {/* Main Content */}
      <div className="categoria-container">
        {/* Sidebar - Filtros */}
        <aside className="categoria-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Filtros</h3>

            {/* Filter by Price */}
            <div className="filter-group">
              <h4 className="filter-subtitle">Rango de Precio</h4>
              <div className="price-range">
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  className="price-slider"
                />
                <div className="price-display">
                  <span>$0</span>
                  <span>$5,000</span>
                </div>
              </div>
            </div>

            {/* Filter by Brand */}
            <div className="filter-group">
              <h4 className="filter-subtitle">Marca</h4>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>Nike</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>Adidas</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>Puma</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>Converse</span>
                </label>
              </div>
            </div>

            {/* Filter by Rating */}
            <div className="filter-group">
              <h4 className="filter-subtitle">Calificación</h4>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>⭐⭐⭐⭐⭐ 5 estrellas</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>⭐⭐⭐⭐ 4+ estrellas</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>⭐⭐⭐ 3+ estrellas</span>
                </label>
              </div>
            </div>

            {/* Filter by Stock */}
            <div className="filter-group">
              <h4 className="filter-subtitle">Disponibilidad</h4>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input type="checkbox" defaultChecked />
                  <span>En stock</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" />
                  <span>Con descuento</span>
                </label>
              </div>
            </div>

            {/* Reset Filters */}
            <button className="reset-filters">Limpiar Filtros</button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="categoria-main">
          {/* Toolbar */}
          <div className="categoria-toolbar">
            <div className="toolbar-left">
              <span className="results-count">Mostrando 12 productos</span>
            </div>

            <div className="toolbar-center">
              <label htmlFor="sort-select" className="sort-label">Ordenar por:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {Object.entries(SORT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="toolbar-right">
              <button 
                className={`view-toggle ${viewType === 'grid' ? 'active' : ''}`}
                onClick={() => setViewType('grid')}
                title="Vista de grilla"
              >
                ⊞
              </button>
              <button 
                className={`view-toggle ${viewType === 'list' ? 'active' : ''}`}
                onClick={() => setViewType('list')}
                title="Vista de lista"
              >
                ≡
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid category={category} limit={12} />
        </main>
      </div>
    </div>
  );
}