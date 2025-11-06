import '../styles/pages/Home.css';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a Dukicks</h1>
          <p className="hero-subtitle">Descubre los mejores tenis y gorras de marcas reconocidas</p>
          <button className="hero-btn">Explorar Ahora</button>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder"></div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <h2>Categorías Destacadas</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Tenis Hombre</h3>
            <p>Colección premium para hombres</p>
            <a href="/categoria/tenis_hombre" className="category-link">Ver más →</a>
          </div>
          <div className="category-card">
            <div className="category-icon">👗</div>
            <h3>Tenis Mujer</h3>
            <p>Diseños exclusivos para mujeres</p>
            <a href="/categoria/tenis_mujer" className="category-link">Ver más →</a>
          </div>
          <div className="category-card">
            <div className="category-icon">🧢</div>
            <h3>Gorras</h3>
            <p>Accesorios de moda y confort</p>
            <a href="/categoria/gorras" className="category-link">Ver más →</a>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Productos Destacados</h2>
          <ProductGrid />
        <p className="text-center text-lg text-gray">Cargando productos...</p>
      </section>
      

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>¡Ofertas Especiales!</h2>
          <p>Obtén hasta 25% de descuento en productos seleccionados</p>
          <button className="promo-btn">Ver Ofertas</button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>¿Por qué elegir Dukicks?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✓</div>
            <h3>Productos Originales</h3>
            <p>Garantizamos 100% autenticidad en todos nuestros productos</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Envío Rápido</h3>
            <p>Entrega en 24-48 horas a cualquier parte del país</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💳</div>
            <h3>Pago Seguro</h3>
            <p>Múltiples opciones de pago seguro y confiable</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">↩️</div>
            <h3>Cambios Fáciles</h3>
            <p>Devuelve o cambia tus productos sin complicaciones</p>
          </div>
        </div>
      </section>
    </div>
  );
}