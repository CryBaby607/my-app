import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../styles/pages/Categoria.css';
import ProductGrid from '../components/ProductGrid';
import { CATEGORIES_LABELS, SORT_LABELS, SORT_OPTIONS } from '../utils/constants';

export default function Categoria() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);

  const categoryLabel = CATEGORIES_LABELS[category] || 'Productos';

  return (
    <div className="categoria-page">
      {/* Main Content */}
      <div className="categoria-container">
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
          </div>

          {/* Products Grid */}
          <ProductGrid category={category} limit={12} />
        </main>
      </div>
    </div>
  );
}