// Funciones de formateo reutilizables

/**
 * Formatea un número como moneda
 * @param {number} price - Precio a formatear
 * @param {string} currency - Código de moneda (default: MXN)
 * @returns {string} Precio formateado
 */
export const formatPrice = (price, currency = 'MXN') => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Calcula el precio final con descuento
 * @param {number} price - Precio original
 * @param {number} discount - Porcentaje de descuento
 * @returns {number} Precio con descuento
 */
export const calculateDiscount = (price, discount) => {
  return price - (price * discount) / 100;
};

/**
 * Calcula el ahorro en dinero
 * @param {number} price - Precio original
 * @param {number} discount - Porcentaje de descuento
 * @returns {number} Monto ahorrado
 */
export const calculateSavings = (price, discount) => {
  return (price * discount) / 100;
};

/**
 * Trunca un texto a una cantidad de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} length - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Formatea una fecha a formato legible
 * @param {string | Date} date - Fecha a formatear
 * @param {string} locale - Locale para el formateo
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = 'es-MX') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Formatea la hora relativa (hace 2 horas, hace 1 día, etc)
 * @param {string | Date} date - Fecha a formatear
 * @returns {string} Tiempo relativo
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Hace unos segundos';
  if (minutes < 60) return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (days < 30) return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  return formatDate(date);
};

/**
 * Capitaliza la primera letra de un texto
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convierte texto a slug
 * @param {string} text - Texto a convertir
 * @returns {string} Slug
 */
export const toSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Genera un email válido de prueba
 * @param {string} name - Nombre para el email
 * @returns {string} Email de prueba
 */
export const generateTestEmail = (name) => {
  return `${toSlug(name || 'user')}@example.com`;
};

/**
 * Calcula el total del carrito
 * @param {Array} items - Items del carrito
 * @returns {number} Total
 */
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = item.price * item.quantity;
    return total + itemPrice;
  }, 0);
};

/**
 * Calcula el descuento total del carrito
 * @param {Array} items - Items del carrito
 * @returns {number} Descuento total
 */
export const calculateCartDiscount = (items) => {
  return items.reduce((total, item) => {
    const savings = calculateSavings(item.price, item.discount || 0);
    return total + savings * item.quantity;
  }, 0);
};

/**
 * Calcula el total con descuentos
 * @param {number} subtotal - Subtotal
 * @param {number} discountPercentage - Porcentaje de descuento
 * @returns {number} Total con descuento
 */
export const calculateTotalWithDiscount = (subtotal, discountPercentage = 0) => {
  return subtotal - (subtotal * discountPercentage) / 100;
};

/**
 * Formatea un número con separadores de miles
 * @param {num} - Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('es-MX').format(num);
};

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} Es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima
 * @returns {boolean} Es válida
 */
export const isValidPassword = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Convierte bytes a formato legible (KB, MB, GB)
 * @param {number} bytes - Bytes a convertir
 * @returns {string} Formato legible
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Calcula el porcentaje
 * @param {number} actual - Valor actual
 * @param {number} total - Valor total
 * @returns {number} Porcentaje
 */
export const calculatePercentage = (actual, total) => {
  return Math.round((actual / total) * 100);
};