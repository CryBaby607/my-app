import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, ADMIN_CREDENTIALS, USER_ROLES, MESSAGES } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar sesión del localStorage al iniciar
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (savedSession) {
        const session = JSON.parse(savedSession);
        
        // Verificar que la sesión sea válida
        if (session && session.email && session.role === USER_ROLES.ADMIN) {
          setUser(session);
          setIsAuthenticated(true);
        } else {
          // Sesión inválida, limpiar
          localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        }
      }
    } catch (error) {
      console.error('Error cargando sesión:', error);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar sesión en localStorage cada vez que cambie el usuario
  useEffect(() => {
    if (!isLoading && user) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user));
    }
  }, [user, isLoading]);

  // Función para login de administrador
  const loginAdmin = async (email, password) => {
    setError(null);
    setIsLoading(true);

    // Simular delay de red (opcional, para UX más realista)
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Validar credenciales
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser = {
          email: email,
          role: USER_ROLES.ADMIN,
          loginTime: new Date().toISOString(),
        };

        setUser(adminUser);
        setIsAuthenticated(true);
        setIsLoading(false);

        return {
          success: true,
          message: MESSAGES.SUCCESS.LOGIN_SUCCESS,
        };
      } else {
        // Credenciales incorrectas
        setIsLoading(false);
        setError(MESSAGES.ERROR.INVALID_CREDENTIALS);
        
        return {
          success: false,
          error: MESSAGES.ERROR.INVALID_CREDENTIALS,
        };
      }
    } catch (err) {
      setIsLoading(false);
      setError(MESSAGES.ERROR.GENERIC_ERROR);
      
      return {
        success: false,
        error: MESSAGES.ERROR.GENERIC_ERROR,
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  };

  // Verificar si el usuario es administrador
  const isAdmin = () => {
    return isAuthenticated && user?.role === USER_ROLES.ADMIN;
  };

  const value = {
    // Estado
    isAuthenticated,
    user,
    isLoading,
    error,
    
    // Funciones
    loginAdmin,
    logout,
    isAdmin,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};