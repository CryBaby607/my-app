import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import productsData from '../../data/products.json';
import '../../styles/pages/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calcular estadísticas
  const totalProducts = productsData.length;
  const totalStock = productsData.reduce((acc, product) => acc + product.stock, 0);
  const lowStockProducts = productsData.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStockProducts = productsData.filter(p => p.stock === 0).length;

  // Productos con descuento
  const productsWithDiscount = productsData.filter(p => p.discount > 0).length;

  // Categorías
  const categories = {
    tenis_hombre: productsData.filter(p => p.category === 'tenis_hombre').length,
    tenis_mujer: productsData.filter(p => p.category === 'tenis_mujer').length,
    gorras: productsData.filter(p => p.category === 'gorras').length,
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>Panel de Administración</h1>
            <p className="dashboard-subtitle">Bienvenido, {user?.email}</p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
              Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Stats Cards */}
        <section className="dashboard-stats">
          <div className="stat-card stat-card-primary">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Total Productos</h3>
              <p className="stat-number">{totalProducts}</p>
              <span className="stat-label">En catálogo</span>
            </div>
          </div>

          <div className="stat-card stat-card-success">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>Stock Total</h3>
              <p className="stat-number">{totalStock}</p>
              <span className="stat-label">Unidades disponibles</span>
            </div>
          </div>

          <div className="stat-card stat-card-warning">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>Stock Bajo</h3>
              <p className="stat-number">{lowStockProducts}</p>
              <span className="stat-label">Requieren atención</span>
            </div>
          </div>

          <div className="stat-card stat-card-danger">
            <div className="stat-icon">✕</div>
            <div className="stat-content">
              <h3>Agotados</h3>
              <p className="stat-number">{outOfStockProducts}</p>
              <span className="stat-label">Sin stock</span>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <h2 className="section-title">Acciones Rápidas</h2>
          <div className="quick-actions">
            <button className="action-card" onClick={() => alert('Funcionalidad en desarrollo')}>
              <span className="action-icon">➕</span>
              <span className="action-title">Agregar Producto</span>
              <span className="action-description">Añadir un nuevo producto al catálogo</span>
            </button>

            <button className="action-card" onClick={() => alert('Funcionalidad en desarrollo')}>
              <span className="action-icon">📝</span>
              <span className="action-title">Editar Productos</span>
              <span className="action-description">Modificar productos existentes</span>
            </button>

            <button className="action-card" onClick={() => alert('Funcionalidad en desarrollo')}>
              <span className="action-icon">🗑️</span>
              <span className="action-title">Eliminar Productos</span>
              <span className="action-description">Remover productos del catálogo</span>
            </button>
          </div>
        </section>

        {/* Categories Overview */}
        <section className="dashboard-section">
          <h2 className="section-title">Productos por Categoría</h2>
          <div className="categories-overview">
            <div className="category-item">
              <div className="category-header">
                <span className="category-icon">👕</span>
                <h3>Tenis Hombre</h3>
              </div>
              <p className="category-count">{categories.tenis_hombre} productos</p>
            </div>

            <div className="category-item">
              <div className="category-header">
                <span className="category-icon">👗</span>
                <h3>Tenis Mujer</h3>
              </div>
              <p className="category-count">{categories.tenis_mujer} productos</p>
            </div>

            <div className="category-item">
              <div className="category-header">
                <span className="category-icon">🧢</span>
                <h3>Gorras</h3>
              </div>
              <p className="category-count">{categories.gorras} productos</p>
            </div>
          </div>
        </section>

        {/* Recent Products */}
        <section className="dashboard-section">
          <h2 className="section-title">Productos Recientes</h2>
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Descuento</th>
                </tr>
              </thead>
              <tbody>
                {productsData.slice(0, 5).map(product => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td className="product-name">{product.model}</td>
                    <td>{product.brand}</td>
                    <td>
                      <span className="category-badge">
                        {product.category === 'tenis_hombre' && '👕 Hombre'}
                        {product.category === 'tenis_mujer' && '👗 Mujer'}
                        {product.category === 'gorras' && '🧢 Gorras'}
                      </span>
                    </td>
                    <td>
                      <span className={`stock-badge ${
                        product.stock > 10 ? 'stock-high' : 
                        product.stock > 0 ? 'stock-low' : 
                        'stock-out'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="product-price">${product.price.toFixed(2)}</td>
                    <td>
                      {product.discount > 0 ? (
                        <span className="discount-badge">-{product.discount}%</span>
                      ) : (
                        <span className="no-discount">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}