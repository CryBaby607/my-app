import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Por favor, ingresa tu correo electrónico');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Correo electrónico inválido');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simular envío de email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En una implementación real, aquí se enviaría el email
      console.log('Password reset requested for:', email);
      
      setEmailSent(true);
    } catch (err) {
      setError('Error al enviar el correo. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
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
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-key text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Recuperar Contraseña
            </h1>
            <p className="text-gray-400">
              {emailSent 
                ? 'Revisa tu correo electrónico' 
                : 'Te enviaremos un enlace para restablecer tu contraseña'}
            </p>
          </div>

          {emailSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-green-400 text-3xl"></i>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                ¡Correo enviado!
              </h3>
              
              <p className="text-gray-300 mb-6">
                Hemos enviado un enlace de recuperación a <span className="font-semibold">{email}</span>. 
                El enlace expirará en 1 hora.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/admin/login')}
                  className="w-full bg-dukicks-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Volver al Login
                </button>
                
                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full border border-gray-600 text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Enviar otro correo
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-circle text-red-400 mr-2"></i>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fas fa-envelope mr-2"></i>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="admin@dukicks.com"
                  disabled={isLoading}
                />
              </div>

              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex items-center">
                  <i className="fas fa-info-circle mr-2 text-yellow-500"></i>
                  <span>El enlace será válido por 1 hora</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-shield-alt mr-2 text-green-500"></i>
                  <span>Proceso 100% seguro y encriptado</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando correo...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <i className="fas fa-paper-plane mr-2"></i>
                    Enviar Enlace de Recuperación
                  </div>
                )}
              </button>
            </form>
          )}

          {/* Enlaces */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/admin/login"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Volver al inicio de sesión
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <i className="fas fa-store mr-2"></i>
                Ir a la tienda pública
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>
            ¿Necesitas ayuda?{' '}
            <a href="mailto:soporte@dukicks.com" className="text-dukicks-blue hover:underline">
              soporte@dukicks.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;