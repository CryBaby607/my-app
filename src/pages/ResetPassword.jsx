import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es requerida';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Mínimo 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Debe incluir mayúsculas, minúsculas y números';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar token (en producción, verificarías el token con el backend)
    if (!token) {
      setErrors({
        submit: 'Enlace inválido o expirado'
      });
      return;
    }
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular reset de contraseña
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Password reset for token:', token);
      console.log('New password:', formData.newPassword);
      
      // Éxito
      setResetSuccess(true);
      
      // Auto-redirección después de 3 segundos
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
      
    } catch (error) {
      setErrors({
        submit: 'Error al restablecer la contraseña. Por favor, intenta nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordRequirements = () => (
    <div className="bg-gray-700/30 rounded-lg p-4 mt-2">
      <h4 className="text-sm font-medium text-gray-300 mb-2">Requisitos de seguridad:</h4>
      <ul className="text-xs text-gray-400 space-y-1">
        <li className={`flex items-center ${formData.newPassword.length >= 8 ? 'text-green-400' : ''}`}>
          <i className={`fas ${formData.newPassword.length >= 8 ? 'fa-check-circle' : 'fa-circle'} mr-2`}></i>
          Mínimo 8 caracteres
        </li>
        <li className={`flex items-center ${/(?=.*[a-z])/.test(formData.newPassword) ? 'text-green-400' : ''}`}>
          <i className={`fas ${/(?=.*[a-z])/.test(formData.newPassword) ? 'fa-check-circle' : 'fa-circle'} mr-2`}></i>
          Al menos una minúscula
        </li>
        <li className={`flex items-center ${/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-green-400' : ''}`}>
          <i className={`fas ${/(?=.*[A-Z])/.test(formData.newPassword) ? 'fa-check-circle' : 'fa-circle'} mr-2`}></i>
          Al menos una mayúscula
        </li>
        <li className={`flex items-center ${/(?=.*\d)/.test(formData.newPassword) ? 'text-green-400' : ''}`}>
          <i className={`fas ${/(?=.*\d)/.test(formData.newPassword) ? 'fa-check-circle' : 'fa-circle'} mr-2`}></i>
          Al menos un número
        </li>
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-8">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-lock-open text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {resetSuccess ? '¡Contraseña Actualizada!' : 'Nueva Contraseña'}
            </h1>
            <p className="text-gray-400">
              {resetSuccess 
                ? 'Tu contraseña ha sido restablecida exitosamente' 
                : 'Crea una nueva contraseña segura'}
            </p>
          </div>

          {resetSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-green-400 text-4xl"></i>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                ¡Contraseña actualizada!
              </h3>
              
              <p className="text-gray-300 mb-6">
                Ahora puedes iniciar sesión con tu nueva contraseña. Serás redirigido automáticamente...
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/admin/login')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Ir al Login
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {!token && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                    <p className="text-red-400 text-sm">
                      Enlace inválido o expirado. Solicita un nuevo enlace de recuperación.
                    </p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center">
                      <i className="fas fa-exclamation-circle text-red-400 mr-2"></i>
                      <p className="text-red-400 text-sm">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <i className="fas fa-lock mr-2"></i>
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.newPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-700/50 border ${errors.newPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-12`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <i className={`fas ${showPasswords.newPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <i className="fas fa-info-circle mr-1"></i>
                      {errors.newPassword}
                    </p>
                  )}
                  <PasswordRequirements />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <i className="fas fa-lock mr-2"></i>
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-700/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-12`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <i className={`fas ${showPasswords.confirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <i className="fas fa-info-circle mr-1"></i>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !token}
                  className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 ${(isLoading || !token) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Actualizando contraseña...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <i className="fas fa-sync-alt mr-2"></i>
                      Restablecer Contraseña
                    </div>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Enlaces */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/admin/login"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Volver al login
              </Link>
              <Link
                to="/admin/forgot-password"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <i className="fas fa-redo mr-2"></i>
                Solicitar nuevo enlace
              </Link>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center bg-gray-800 rounded-full px-4 py-2">
            <i className="fas fa-shield-alt text-green-400 mr-2"></i>
            <span className="text-gray-300 text-sm">Conexión segura SSL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;