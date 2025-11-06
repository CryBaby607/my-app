import { useCart as useCartContext } from '../context/CartContext';

// Re-exportar el hook del contexto
// Este archivo permite una importación más limpia
export const useCart = () => {
  return useCartContext();
};

export default useCart;