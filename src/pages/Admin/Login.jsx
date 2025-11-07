import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_CREDENTIALS } from '../../utils/constants';
import '../../styles/pages/Login.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin, isLoading, error, setError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginAdmin(formData.email, formData.password);

    if (result.success) {
      // Redirigir al dashboard después de login exitoso
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    }
  };

  const handleFillDemo = () => {
    setFormData({
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
    });
    setShowCredentials(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        {/* Lado izquierdo - Información */}
        <div className="admin-login-info">
          <div className="admin-info-content">
            <div className="admin-badge">🔐 ADMIN</div>
            <h1>Panel de Administración</h1>
            <p className="admin-info-subtitle">Dukicks - Gestión de Tienda</p>
            
            <div className="admin-info-features">
              <div className="admin-feature-item">
                <span className="admin-feature-icon">📦</span>
                <span>Gestiona productos y categorías</span>
              </div>
              <div className="admin-feature-item">
                <span className="admin-feature-icon">📊</span>
                <span>Visualiza ventas y estadísticas</span>
              </div>
              <div className="admin-feature-item">
                <span className="admin-feature-icon">🛒</span>
                <span>Administra pedidos de clientes</span>
              </div>
              <div className="admin-feature-item">
                <span className="admin-feature-icon">⚙️</span>
                <span>Configura la tienda</span>
              </div>
            </div>

            <div className="admin-info-note">
              <span className="admin-note-icon">ℹ️</span>
              <p>Este área es exclusiva para administradores. Si no eres administrador, regresa a la tienda principal.</p>
            </div>

            <a href="/" className="btn-back-store">
              ← Volver a la tienda
            </a>
          </div>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="admin-login-form-container">
          <div className="admin-form-header">
            <h2>Inicia Sesión</h2>
            <p>Acceso exclusivo para administradores</p>
          </div>

          {/* Mensajes de error */}
          {error && (
            <div className="admin-alert admin-alert-error">
              <span className="admin-alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Campo Email */}
            <div className="admin-form-group">
              <label htmlFor="email">Email de Administrador</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@dukicks.mx"
                required
                disabled={isLoading}
                className="admin-form-input"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="admin-form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="admin-password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Tu contraseña segura"
                  required
                  disabled={isLoading}
                  className="admin-form-input"
                />
                <button
                  type="button"
                  className="admin-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  title={showPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Botón Enviar */}
            <button 
              type="submit" 
              className="admin-btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="admin-spinner"></span>
                  Verificando credenciales...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="admin-demo-section">
            <button
              type="button"
              className="admin-btn-show-demo"
              onClick={() => setShowCredentials(!showCredentials)}
              disabled={isLoading}
            >
              {showCredentials ? '✕ Ocultar credenciales' : '❓ Credenciales de prueba'}
            </button>

            {showCredentials && (
              <div className="admin-demo-credentials">
                <div className="admin-credential-item">
                  <span className="admin-label">Email:</span>
                  <code>{ADMIN_CREDENTIALS.email}</code>
                </div>
                <div className="admin-credential-item">
                  <span className="admin-label">Contraseña:</span>
                  <code>{ADMIN_CREDENTIALS.password}</code>
                </div>
                <button
                  type="button"
                  className="admin-btn-fill-demo"
                  onClick={handleFillDemo}
                  disabled={isLoading}
                >
                  Llenar formulario
                </button>
              </div>
            )}
          </div>

          {/* Seguridad */}
          <p className="admin-form-security">
            🔒 Tus credenciales están protegidas. Esta es un área segura.
          </p>
        </div>
      </div>
    </div>
  );
}