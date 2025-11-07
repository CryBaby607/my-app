import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages/Login.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  
  const { loginAdmin, isLoading, error, setError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        {/* Formulario */}
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

          {/* Seguridad */}
          <p className="admin-form-security">
            🔒 Tus credenciales están protegidas. Esta es un área segura.
          </p>
        </div>
      </div>
    </div>
  );
}