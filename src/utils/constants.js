// Constantes globales de la aplicación

// RUTAS
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CATEGORIA: '/categoria/:category',
  PRODUCTO: '/producto/:id',
  CARRITO: '/carrito',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  NOT_FOUND: '*',
};

// CATEGORÍAS
export const CATEGORIES = {
  TENIS_HOMBRE: 'tenis_hombre',
  TENIS_MUJER: 'tenis_mujer',
  GORRAS: 'gorras',
};

export const CATEGORIES_LABELS = {
  tenis_hombre: 'Tenis Hombre',
  tenis_mujer: 'Tenis Mujer',
  gorras: 'Gorras',
};

// ESTADO DE STOCK
export const STOCK_STATUS = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
};

export const STOCK_THRESHOLDS = {
  LOW: 10,
};

// ÓRDENES DE CLASIFICACIÓN
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW_HIGH: 'price_low_high',
  PRICE_HIGH_LOW: 'price_high_low',
  MOST_RATED: 'most_rated',
  TRENDING: 'trending',
};

export const SORT_LABELS = {
  newest: 'Más nuevo',
  price_low_high: 'Precio: menor a mayor',
  price_high_low: 'Precio: mayor a menor',
  most_rated: 'Mejor calificado',
  trending: 'Tendencia',
};

// VALIDACIÓN
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
};

// MENSAJES
export const MESSAGES = {
  SUCCESS: {
    PRODUCT_ADDED: 'Producto agregado al carrito',
    PRODUCT_REMOVED: 'Producto removido del carrito',
    PURCHASE_COMPLETE: 'Compra completada exitosamente',
    LOGIN_SUCCESS: 'Sesión iniciada correctamente',
    LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  },
  ERROR: {
    PRODUCT_NOT_FOUND: 'Producto no encontrado',
    INVALID_EMAIL: 'Email inválido',
    INVALID_PASSWORD: 'Contraseña inválida',
    INVALID_CREDENTIALS: 'Credenciales incorrectas',
    STOCK_UNAVAILABLE: 'Producto sin disponibilidad',
    GENERIC_ERROR: 'Algo salió mal, intenta de nuevo',
    UNAUTHORIZED: 'No tienes autorización para acceder',
  },
  INFO: {
    LOADING: 'Cargando...',
    EMPTY_CART: 'Tu carrito está vacío',
    EMPTY_RESULTS: 'No se encontraron productos',
  },
};

// CONFIGURACIÓN DE PAGINACIÓN
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZES: [12, 24, 36],
};

// CONFIGURACIÓN DE LA APP
export const APP_CONFIG = {
  APP_NAME: 'Dukicks',
  COMPANY: 'Dukicks MX',
  SUPPORT_EMAIL: 'support@dukicks.mx',
  WHATSAPP_NUMBER: '+529611567875',
  MAX_CART_QUANTITY: 999,
  TAX_RATE: 0.16,
  CURRENCY: 'MXN',
  CURRENCY_SYMBOL: '$',
};

// COLORES PARA CATEGORÍAS
export const CATEGORY_COLORS = {
  tenis_hombre: '#2563EB',
  tenis_mujer: '#EC4899',
  gorras: '#F59E0B',
};

// TIEMPOS
export const TIMINGS = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
};

// ALMACENAMIENTO LOCAL
export const STORAGE_KEYS = {
  CART: 'cart_items',
  USER: 'user_data',
  PREFERENCES: 'user_preferences',
  AUTH_TOKEN: 'auth_token',
  ADMIN_SESSION: 'admin_session',
  PRODUCTS: 'products_data',
};

// CREDENCIALES DE ADMINISTRADOR (HARDCODED - SOLO DESARROLLO)
export const ADMIN_CREDENTIALS = {
  email: 'admin@dukicks.mx',
  password: 'admin123',
};

// ROLES DE USUARIO
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};