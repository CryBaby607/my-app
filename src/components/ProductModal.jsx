import { useState, useEffect } from 'react';
import '../styles/components/ProductModal.css';

export default function ProductModal({ isOpen, onClose, onSave, product = null }) {
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    category: 'tenis_hombre',
    price: '',
    discount: 0,
    stock: '',
    image: '',
    sizes: [],
    colors: [],
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Opciones predefinidas
  const categories = [
    { value: 'tenis_hombre', label: '👕 Tenis Hombre' },
    { value: 'tenis_mujer', label: '👗 Tenis Mujer' },
    { value: 'gorras', label: '🧢 Gorras' },
  ];

  const availableSizes = {
    tenis_hombre: ['23', '24', '25', '26', '27', '28', '29', '30'],
    tenis_mujer: ['21', '22', '23', '24', '25', '26', '27', '28'],
    gorras: ['Único'],
  };

  const availableColors = [
    'Negro', 'Blanco', 'Gris', 'Rojo', 'Azul', 
    'Verde', 'Amarillo', 'Rosa', 'Morado', 'Naranja'
  ];

  // Cargar datos del producto si es edición
  useEffect(() => {
    if (product) {
      setFormData({
        brand: product.brand,
        model: product.model,
        category: product.category,
        price: product.price,
        discount: product.discount || 0,
        stock: product.stock,
        image: product.image,
        sizes: product.sizes || [],
        colors: product.colors || [],
      });
    }
  }, [product]);

  // Resetear formulario al cerrar
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        brand: '',
        model: '',
        category: 'tenis_hombre',
        price: '',
        discount: 0,
        stock: '',
        image: '',
        sizes: [],
        colors: [],
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: newCategory,
      sizes: [], // Reset sizes when category changes
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorToggle = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'El stock debe ser mayor o igual a 0';
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'El descuento debe estar entre 0 y 100';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es requerida';
    }

    if (formData.sizes.length === 0) {
      newErrors.sizes = 'Selecciona al menos una talla';
    }

    if (formData.colors.length === 0) {
      newErrors.colors = 'Selecciona al menos un color';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      discount: parseInt(formData.discount),
      stock: parseInt(formData.stock),
    };

    onSave(productData);
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="modal-container">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h2>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-body">
              {/* Marca */}
              <div className="form-group">
                <label htmlFor="brand">Marca *</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Nike, Adidas, Puma..."
                  className={errors.brand ? 'error' : ''}
                />
                {errors.brand && <span className="error-message">{errors.brand}</span>}
              </div>

              {/* Modelo */}
              <div className="form-group">
                <label htmlFor="model">Modelo *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Air Max 90, Ultraboost..."
                  className={errors.model ? 'error' : ''}
                />
                {errors.model && <span className="error-message">{errors.model}</span>}
              </div>

              {/* Categoría */}
              <div className="form-group">
                <label htmlFor="category">Categoría *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio y Descuento */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Precio *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={errors.price ? 'error' : ''}
                  />
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="discount">Descuento (%)</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className={errors.discount ? 'error' : ''}
                  />
                  {errors.discount && <span className="error-message">{errors.discount}</span>}
                </div>
              </div>

              {/* Stock */}
              <div className="form-group">
                <label htmlFor="stock">Stock *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className={errors.stock ? 'error' : ''}
                />
                {errors.stock && <span className="error-message">{errors.stock}</span>}
              </div>

              {/* Imagen */}
              <div className="form-group">
                <label htmlFor="image">URL de Imagen *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className={errors.image ? 'error' : ''}
                />
                {errors.image && <span className="error-message">{errors.image}</span>}
                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>

              {/* Tallas */}
              <div className="form-group">
                <label>Tallas * {errors.sizes && <span className="error-message">{errors.sizes}</span>}</label>
                <div className="options-grid">
                  {availableSizes[formData.category].map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`option-btn ${formData.sizes.includes(size) ? 'active' : ''}`}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colores */}
              <div className="form-group">
                <label>Colores * {errors.colors && <span className="error-message">{errors.colors}</span>}</label>
                <div className="options-grid">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`option-btn ${formData.colors.includes(color) ? 'active' : ''}`}
                      onClick={() => handleColorToggle(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="spinner"></span>
                    Guardando...
                  </>
                ) : (
                  isEditing ? 'Guardar Cambios' : 'Agregar Producto'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}