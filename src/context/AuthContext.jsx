import { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_CREDENTIALS, USER_ROLES, MESSAGES } from '../utils/constants';

const AuthContext = createContext();

// Clave para sessionStorage
const SESSION_KEY = 'admin_session';

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

  // Cargar sesión del sessionStorage al iniciar (solo persiste durante la sesión del navegador)
  useEffect(() => {
    try {
      const savedSession = sessionStorage.getItem(SESSION_KEY);
      if (savedSession) {
        const session = JSON.parse(savedSession);
        
        // Verificar que la sesión sea válida
        if (session && session.email && session.role === USER_ROLES.ADMIN) {
          setUser(session);
          setIsAuthenticated(true);
        } else {
          // Sesión inválida, limpiar
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (error) {
      console.error('Error cargando sesión:', error);
      sessionStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar sesión en sessionStorage cada vez que cambie el usuario
  useEffect(() => {
    if (!isLoading && user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
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
    sessionStorage.removeItem(SESSION_KEY);
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