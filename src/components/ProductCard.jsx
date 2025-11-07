import { useNavigate } from 'react-router-dom';
import '../styles/components/ProductCard.css';
import { formatPrice, calculateDiscount } from '../utils/formatters';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const finalPrice = product.discount > 0 
    ? calculateDiscount(product.price, product.discount)
    : product.price;

  const handleViewDetails = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
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
      </div>
    </div>
  );
}