import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para eliminar
  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      try {
        await deleteDoc(doc(db, "products", id));
        // Actualizamos la lista localmente filtrando el eliminado
        setProducts(products.filter(product => product.id !== id));
        alert("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al eliminar");
      }
    }
  };
  
  // Función para obtener el precio a mostrar en la tabla (incluye descuento si aplica)
  const getDisplayPrice = (product) => {
    const price = Number(product.price);
    const discount = Number(product.discount) || 0; // <-- CORREGIDO: Usando 'discount'
    
    if (discount > 0) {
      const finalPrice = price * (1 - (discount / 100));
      return (
        <div className="flex flex-col">
          <span className="text-red-600 font-bold">${finalPrice.toFixed(2)}</span>
          <span className="text-xs text-gray-500 line-through">${price.toFixed(2)}</span>
        </div>
      );
    }
    
    return <span>${price.toFixed(2)}</span>;
  };

  if (loading) return <div className="flex justify-center p-10"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Inventario de Productos</h2>
        <Link 
          to="/admin/products/new" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Nuevo Producto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Producto</th>
              <th className="px-6 py-4 font-semibold">Categoría</th>
              <th className="px-6 py-4 font-semibold">Precio</th>
              <th className="px-6 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4">
                      {/* NEW: Mostrar nombre concatenado */}
                      <div className="font-medium text-gray-900">{`${product.brand || product.name} ${product.model || ''}`.trim()}</div>
                      <div className="text-gray-500 text-xs truncate max-w-xs">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {getDisplayPrice(product)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-3">
                    {/* Botón Editar - CORREGIDO */}
                    <Link 
                      to={`/admin/products/edit/${product.id}`} 
                      className="text-blue-600 hover:text-blue-900" 
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    
                    {/* Botón Eliminar */}
                    <button 
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-600 hover:text-red-900" 
                      title="Eliminar"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No hay productos registrados. ¡Agrega el primero!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;