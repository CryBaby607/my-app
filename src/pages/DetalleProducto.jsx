import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages/DetalleProducto.css';
import productsData from '../data/products.json';
import { formatPrice, calculateDiscount } from '../utils/formatters';

export default function DetalleProducto() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular búsqueda del producto
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);

    if (foundProduct) {
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id]);

  if (loading) {
    return <div className="loading-container">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="error-container">Producto no encontrado</div>;
  }

  const finalPrice = product.discount > 0 
    ? calculateDiscount(product.price, product.discount)
    : product.price;

  const stockStatus = product.stock > 10 
    ? 'available' 
    : product.stock > 0 
    ? 'low' 
    : 'out';

  return (
    <div className="detalle-producto">
      <div className="producto-container">
        {/* Imagen Principal */}
        <div className="producto-imagen-section">
          <div className="imagen-principal">
            <img src={product.image} alt={`${product.brand} ${product.model}`} />
            {product.discount > 0 && (
              <span className="descuento-badge">-{product.discount}%</span>
            )}
          </div>
          
          {/* Imágenes Miniatura */}
          <div className="imagenes-miniatura">
            <img src={product.image} alt="Miniatura 1" className="miniatura active" />
            <img src={product.image} alt="Miniatura 2" className="miniatura" />
            <img src={product.image} alt="Miniatura 3" className="miniatura" />
            <img src={product.image} alt="Miniatura 4" className="miniatura" />
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="producto-detalles">
          {/* Header */}
          <div className="producto-header">
            <span className="brand">{product.brand}</span>
            <h1 className="modelo">{product.model}</h1>
          </div>

          {/* Precio */}
          <div className="precio-section">
            {product.discount > 0 ? (
              <>
                <span className="precio-original">{formatPrice(product.price)}</span>
                <span className="precio-final">{formatPrice(finalPrice)}</span>
                <span className="ahorro">
                  Ahorras {formatPrice(product.price - finalPrice)}
                </span>
              </>
            ) : (
              <span className="precio-final">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className="stock-section">
            {stockStatus === 'available' && (
              <p className="stock-available">✓ Disponible en stock</p>
            )}
            {stockStatus === 'low' && (
              <p className="stock-low">⚠ Solo {product.stock} unidades disponibles</p>
            )}
            {stockStatus === 'out' && (
              <p className="stock-out">✗ Agotado</p>
            )}
          </div>

          {/* Talla */}
          <div className="opcion-group">
            <label className="opcion-label">Talla:</label>
            <div className="tallas-grid">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`talla-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="opcion-group">
            <label className="opcion-label">Color:</label>
            <div className="colores-grid">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                >
                  <span className="color-name">{color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="opcion-group">
            <label className="opcion-label">Cantidad:</label>
            <div className="cantidad-selector">
              <button 
                className="cantidad-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input 
                type="number" 
                min="1" 
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="cantidad-input"
              />
              <button 
                className="cantidad-btn"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="acciones-section">
            <button 
              className="btn-carrito"
              disabled={stockStatus === 'out'}
            >
              Agregar al Carrito
            </button>
            
          </div>

          {/* Envío */}
          <div className="envio-section">
            <div className="envio-item">
              <span className="envio-icon">🚚</span>
              <span>Envío a todo México en 24-48 horas</span>
            </div>
            <div className="envio-item">
              <span className="envio-icon">🔄</span>
              <span>Cambios y devoluciones sin costo</span>
            </div>
            <div className="envio-item">
              <span className="envio-icon">🛡️</span>
              <span>Compra protegida y segura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción y Características */}
      <div className="producto-info-section">
        <div className="info-tabs">
          <button className="tab-btn active">Características</button>
          <button className="tab-btn">Especificaciones</button>
          <button className="tab-btn">Reseñas</button>
        </div>

        <div className="tab-content">
          <div className="caracteristicas">
            <h3>Características principales</h3>
            <ul>
              {product.features && product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Productos Relacionados */}
      <div className="productos-relacionados">
        <h2>Productos Relacionados</h2>
        <p className="text-center">Cargando productos relacionados...</p>
      </div>
    </div>
  );
}