import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/formatters';
import '../styles/pages/Carrito.css';

export default function Carrito() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    clearCart, 
    getSubtotal, 
    getDiscount, 
    getTotal,
    getTotalItems 
  } = useCart();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const totalItems = getTotalItems();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    // Aquí iría la lógica de checkout
    alert('Funcionalidad de checkout en desarrollo');
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      clearCart();
    }
  };

  // Carrito vacío
  if (cartItems.length === 0) {
    return (
      <div className="carrito-page">
        <div className="carrito-empty">
          <div className="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra</p>
          <button 
            className="btn-primary"
            onClick={handleContinueShopping}
          >
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <div className="carrito-container">
        {/* Header */}
        <div className="carrito-header">
          <h1>Carrito de Compras</h1>
          <span className="items-count">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        <div className="carrito-content">
          {/* Lista de productos */}
          <div className="carrito-items">
            <div className="items-header">
              <h2>Productos</h2>
              <button 
                className="btn-clear"
                onClick={handleClearCart}
              >
                Vaciar carrito
              </button>
            </div>

            <div className="items-list">
              {cartItems.map((item, index) => (
                <CartItem 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} 
                  item={item} 
                />
              ))}
            </div>
          </div>

          {/* Resumen */}
          <div className="carrito-summary">
            <div className="summary-card">
              <h2>Resumen de compra</h2>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} productos)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Descuentos</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Envío</span>
                  <span className="free-shipping">GRATIS</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                className="btn-checkout"
                onClick={handleCheckout}
              >
                Proceder al pago
              </button>

              <button 
                className="btn-continue"
                onClick={handleContinueShopping}
              >
                Continuar comprando
              </button>

              {/* Beneficios */}
              <div className="summary-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">🚚</span>
                  <span className="benefit-text">Envío gratis</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔄</span>
                  <span className="benefit-text">Devoluciones fáciles</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🛡️</span>
                  <span className="benefit-text">Compra segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}