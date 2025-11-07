import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import ProductModal from '../../components/ProductModal';
import ConfirmModal from '../../components/ConfirmModal';
import '../../styles/pages/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // Estados para modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estado para mensajes de éxito
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calcular estadísticas
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  // Productos con descuento
  const productsWithDiscount = products.filter(p => p.discount > 0).length;

  // Categorías
  const categories = {
    tenis_hombre: products.filter(p => p.category === 'tenis_hombre').length,
    tenis_mujer: products.filter(p => p.category === 'tenis_mujer').length,
    gorras: products.filter(p => p.category === 'gorras').length,
  };

  // Mostrar mensaje de éxito temporal
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handlers para agregar producto
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddProduct = (productData) => {
    addProduct(productData);
    handleCloseAddModal();
    showSuccessMessage('✓ Producto agregado exitosamente');
  };

  // Handlers para editar producto
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (productData) => {
    updateProduct(selectedProduct.id, productData);
    handleCloseEditModal();
    showSuccessMessage('✓ Producto actualizado exitosamente');
  };

  // Handlers para eliminar producto
  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    deleteProduct(selectedProduct.id);
    setIsDeleting(false);
    handleCloseDeleteModal();
    showSuccessMessage('✓ Producto eliminado exitosamente');
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
        {/* Mensaje de Éxito */}
        {successMessage && (
          <div className="success-toast">
            {successMessage}
          </div>
        )}

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
            <button className="action-card" onClick={handleOpenAddModal}>
              <span className="action-icon">➕</span>
              <span className="action-title">Agregar Producto</span>
              <span className="action-description">Añadir un nuevo producto al catálogo</span>
            </button>

            <button className="action-card" onClick={() => navigate('/')}>
              <span className="action-icon">👁️</span>
              <span className="action-title">Ver Tienda</span>
              <span className="action-description">Ir a la página pública</span>
            </button>

            <button className="action-card" onClick={() => window.location.reload()}>
              <span className="action-icon">🔄</span>
              <span className="action-title">Refrescar Datos</span>
              <span className="action-description">Actualizar información</span>
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

        {/* Products Table */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Todos los Productos</h2>
            <span className="product-count">{totalProducts} productos</span>
          </div>
          
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
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
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
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => handleOpenEditModal(product)}
                          title="Editar producto"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => handleOpenDeleteModal(product)}
                          title="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modales */}
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleAddProduct}
      />

      <ProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleUpdateProduct}
        product={selectedProduct}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteProduct}
        title="¿Eliminar producto?"
        message={`¿Estás seguro de que deseas eliminar "${selectedProduct?.model}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}