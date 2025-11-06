import { useCart } from '../context/CartContext';
import { formatPrice, calculateDiscount } from '../utils/formatters';
import '../styles/components/CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const finalPrice = item.discount > 0 
    ? calculateDiscount(item.price, item.discount)
    : item.price;

  const itemTotal = finalPrice * item.quantity;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity, item.selectedSize, item.selectedColor);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };

  return (
    <div className="cart-item">
      {/* Imagen */}
      <div className="cart-item-image">
        <img src={item.image} alt={`${item.brand} ${item.model}`} />
      </div>

      {/* Detalles */}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <div>
            <span className="cart-item-brand">{item.brand}</span>
            <h3 className="cart-item-name">{item.model}</h3>
          </div>
          <button 
            className="cart-item-remove"
            onClick={handleRemove}
            title="Eliminar producto"
          >
            ✕
          </button>
        </div>

        {/* Opciones seleccionadas */}
        <div className="cart-item-options">
          {item.selectedSize && (
            <span className="cart-item-option">
              Talla: <strong>{item.selectedSize}</strong>
            </span>
          )}
          {item.selectedColor && (
            <span className="cart-item-option">
              Color: <strong>{item.selectedColor}</strong>
            </span>
          )}
        </div>

        {/* Precio y Cantidad */}
        <div className="cart-item-footer">
          {/* Precio unitario */}
          <div className="cart-item-price">
            {item.discount > 0 ? (
              <>
                <span className="price-original">{formatPrice(item.price)}</span>
                <span className="price-final">{formatPrice(finalPrice)}</span>
              </>
            ) : (
              <span className="price-final">{formatPrice(item.price)}</span>
            )}
          </div>

          {/* Selector de cantidad */}
          <div className="cart-item-quantity">
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <input 
              type="number" 
              min="1" 
              max={item.stock}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="quantity-input"
            />
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>

          {/* Total del item */}
          <div className="cart-item-total">
            <span className="total-label">Subtotal:</span>
            <span className="total-price">{formatPrice(itemTotal)}</span>
          </div>
        </div>

        {/* Alerta de stock bajo */}
        {item.quantity >= item.stock && (
          <div className="cart-item-alert">
            ⚠️ Cantidad máxima disponible
          </div>
        )}
      </div>
    </div>
  );
}