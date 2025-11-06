import '../styles/components/ProductCard.css';
import { formatPrice, calculateDiscount } from '../utils/formatters';

export default function ProductCard({ product }) {
  const finalPrice = product.discount > 0 
    ? calculateDiscount(product.price, product.discount)
    : product.price;

  return (
    <div className="product-card">
      {/* Badge de descuento */}
      {product.discount > 0 && (
        <span className="product-badge">-{product.discount}%</span>
      )}

      {/* Imagen */}
      <div className="product-image">
        <img src={product.image} alt={`${product.brand} ${product.model}`} />
      </div>

      {/* Contenido */}
      <div className="product-content">
        {/* Marca */}
        <span className="product-brand">{product.brand}</span>

        {/* Nombre */}
        <h3 className="product-name">{product.model}</h3>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-value">({product.rating})</span>
          <span className="reviews-count">{product.reviews} reviews</span>
        </div>

        {/* Precios */}
        <div className="product-prices">
          {product.discount > 0 ? (
            <>
              <span className="price-original">{formatPrice(product.price)}</span>
              <span className="price-final">{formatPrice(finalPrice)}</span>
            </>
          ) : (
            <span className="price-final">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Stock */}
        <div className="product-stock">
          {product.stock > 10 ? (
            <span className="stock-available">Disponible</span>
          ) : product.stock > 0 ? (
            <span className="stock-low">Últimas {product.stock} unidades</span>
          ) : (
            <span className="stock-out">Agotado</span>
          )}
        </div>

        {/* Botón */}
        <button className="product-button">
          Ver detalles
        </button>
      </div>
    </div>
  );
}