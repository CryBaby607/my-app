import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../../utils/cloudinary';
import LoadingSpinner from '../../components/LoadingSpinner';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '', 
    price: '',
    category: '',
    description: '',
    sizes: [],
    image: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Definición de tallas por categoría
  const categorySizes = {
    'Hombres': ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30', '30.5', '31'],
    'Mujer': ['22', '22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26', '26.5', '27'],
    'Niños': ['15', '16', '17', '18', '19', '20', '21', '22'],
    'Gorras': ['Unitalla']
  };

  // Obtener tallas dinámicas basadas en la categoría ACTUAL
  const currentSizes = categorySizes[formData.category] || [];

  // Cargar producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // NEW: Usar 'brand' y 'model' si existen, o fallback a 'name'
          setFormData({
            ...data,
            brand: data.brand || data.name, 
            model: data.model || '',       
          });
          setImagePreview(data.image);
        } else {
          alert("Producto no encontrado");
          navigate('/admin/products');
        }
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Manejar cambio de categoría en Edición
  // IMPORTANTE: Aquí NO borramos las tallas automáticamente en el useEffect 
  // porque al cargar el producto por primera vez se dispararía y borraría las tallas guardadas.
  // Solo las borramos si el usuario cambia manualmente el select.
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    // Si cambia de categoría, limpiamos tallas porque las anteriores no tendrán sentido (ej: pasar de Gorra a Tenis)
    setFormData({ 
      ...formData, 
      category: newCategory,
      sizes: [] 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const productRef = doc(db, "products", id);
      
      await updateDoc(productRef, {
        ...formData,
        // NEW: Concatena brand y model para el campo 'name'
        name: `${formData.brand} ${formData.model}`.trim(),
        price: parseFloat(formData.price),
        image: imageUrl,
        updatedAt: new Date()
      });

      alert('¡Producto actualizado correctamente!');
      navigate('/admin/products');

    } catch (error) {
      console.error("Error actualizando:", error);
      alert('Error al guardar los cambios.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-admin border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Producto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NEW: Marca y Modelo en lugar de Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marca / Modelo</label>
            <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
                  placeholder="Marca"
                  required
                />
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
                  placeholder="Modelo"
                  required
                />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange} // Usamos el handler especial
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
          >
            <option value="Hombres">Hombres</option>
            <option value="Mujer">Mujer</option>
            <option value="Niños">Niños</option>
            <option value="Gorras">Gorras</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none resize-none"
            required
          />
        </div>

        {/* TALLAS DINÁMICAS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tallas Disponibles ({formData.category})
          </label>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {currentSizes.length > 0 ? (
                currentSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm ${
                      formData.sizes.includes(size)
                        ? 'bg-dukicks-blue text-white ring-2 ring-blue-300 ring-offset-1'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No hay tallas definidas para esta categoría.</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
              />
              <span className="text-xs text-gray-500">Deja esto vacío si no quieres cambiar la imagen.</span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="w-1/3 py-3 px-4 rounded-lg text-gray-700 font-bold border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`w-2/3 py-3 px-4 rounded-lg text-white font-bold transition-all ${
              isSaving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-dukicks-blue hover:bg-blue-700 shadow-lg hover:-translate-y-1'
            }`}
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProduct;