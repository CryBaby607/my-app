import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About */}
        <div className="footer-column">
          <h4 className="footer-title">Sobre Dukicks</h4>
          <p className="footer-text">
            Somos tu tienda de confianza para los mejores tenis y gorras de marcas reconocidas mundialmente.
          </p>
        </div>

        {/* Column 2: Links */}
        <div className="footer-column">
          <h4 className="footer-title">Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/categoria/tenis_hombre">Hombre</a></li>
            <li><a href="/categoria/tenis_mujer">Mujer</a></li>
            <li><a href="/categoria/gorras">Gorras</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="footer-column">
          <h4 className="footer-title">Servicio al Cliente</h4>
          <ul className="footer-links">
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#politica">Política de Privacidad</a></li>
            <li><a href="#terminos">Términos y Condiciones</a></li>
            <li><a href="#cambios">Cambios y Devoluciones</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-column">
          <h4 className="footer-title">Contacto</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📧</span>
              <a href="mailto:support@dukicks.mx">support@dukicks.mx</a>
            </li>
            <li>
              <span className="contact-icon">📱</span>
              <a href="https://wa.me/525512345678" target="_blank" rel="noopener noreferrer">
                +52 55 1234 5678
              </a>
            </li>
            <li>
              <span className="contact-icon">📍</span>
              <span>Tuxtla, Chiapas, MX</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; 2024 Dukicks. Todos los derechos reservados.
        </p>
        <div className="footer-social">
          <a href="#" className="social-link" title="Facebook">f</a>
          <a href="#" className="social-link" title="Instagram">📷</a>
          <a href="#" className="social-link" title="Twitter">𝕏</a>
        </div>
      </div>
    </footer>
  );
}