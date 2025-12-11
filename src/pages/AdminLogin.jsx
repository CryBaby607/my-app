import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular petición a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la lógica real de autenticación
      console.log('Login attempt:', formData);
      
      // Guardar token en localStorage (simulado)
      localStorage.setItem('adminToken', 'fake-jwt-token');
      localStorage.setItem('adminEmail', formData.email);
      localStorage.setItem('rememberMe', formData.rememberMe);
      
      // Redirigir al dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setErrors({
        submit: 'Credenciales incorrectas. Por favor, intente nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/admin/forgot-password');
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      'superadmin': { email: 'superadmin@dukicks.com', password: 'admin123' },
      'admin': { email: 'admin@dukicks.com', password: 'admin123' },
      'editor': { email: 'editor@dukicks.com', password: 'admin123' }
    };
    
    setFormData({
      ...demoCredentials[role],
      rememberMe: false
    });
  };

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
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-dukicks-blue to-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-lock text-white text-2xl"></i>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-white">DU</span>
              <span className="text-dukicks-blue">KICKS</span>
              <span className="text-gray-400 text-lg ml-2">Admin</span>
            </h1>
            <p className="text-gray-400">Panel de Administración</p>
          </div>

          {/* Formulario */}
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
                <i className="fas fa-envelope mr-2"></i>
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dukicks-blue focus:border-transparent transition-all`}
                  placeholder="admin@dukicks.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="absolute right-3 top-3">
                    <i className="fas fa-exclamation-circle text-red-500"></i>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <i className="fas fa-info-circle mr-1"></i>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                <i className="fas fa-lock mr-2"></i>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/50 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dukicks-blue focus:border-transparent transition-all pr-12`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <i className="fas fa-info-circle mr-1"></i>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-dukicks-blue focus:ring-2"
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-300 text-sm">
                  Recordarme
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-dukicks-blue hover:text-blue-400 text-sm font-medium transition-colors"
                disabled={isLoading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-dukicks-blue to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Iniciar Sesión
                </div>
              )}
            </button>
          </form>

          {/* Demo Access */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Acceso Demo</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {['superadmin', 'admin', 'editor'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role)}
                  disabled={isLoading}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Enlace a tienda pública */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <Link
              to="/"
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center justify-center"
            >
              <i className="fas fa-store mr-2"></i>
              Volver a la tienda pública
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center">
              <i className="fas fa-shield-alt mr-1"></i>
              <span>Seguro</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-encryption mr-1"></i>
              <span>Encriptado</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-history mr-1"></i>
              <span>Último acceso: 5 min</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;