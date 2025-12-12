import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../../utils/cloudinary';

const NewProduct = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Hombres', // Valor por defecto
    description: '',
    sizes: [], 
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- DEFINICIÓN DE TALLAS POR CATEGORÍA ---
  const categorySizes = {
    'Hombres': ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30', '30.5', '31'],
    'Mujer': ['22', '22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26', '26.5', '27'],
    'Niños': ['15', '16', '17', '18', '19', '20', '21', '22'],
    'Gorras': ['Unitalla'] // O puedes poner ['S/M', 'L/XL'] si manejas tallas
  };

  // Obtener las tallas actuales basadas en la categoría seleccionada
  const currentSizes = categorySizes[formData.category] || [];

  // Efecto: Si cambia la categoría, limpiamos las tallas seleccionadas para evitar incoherencias
  // (Opcional: puedes quitar esto si prefieres mantenerlas)
  useEffect(() => {
    setFormData(prev => ({ ...prev, sizes: [] }));
  }, [formData.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
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
    
    if (!imageFile) {
      alert('Por favor selecciona una imagen para el producto');
      return;
    }

    if (formData.sizes.length === 0) {
      alert('Selecciona al menos una talla');
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(imageFile);
      
      if (!imageUrl) throw new Error('Error al subir la imagen');

      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageUrl,
        createdAt: new Date()
      };

      await addDoc(collection(db, "products"), newProduct);

      alert('¡Producto creado exitosamente!');
      navigate('/admin/products');

    } catch (error) {
      console.error("Error creando producto:", error);
      alert('Hubo un error al crear el producto.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-admin border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
              placeholder="Ej: Nike Air Force 1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
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
            placeholder="Detalles del producto..."
            required
          />
        </div>

        {/* SECCIÓN DE TALLAS DINÁMICAS */}
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
            {formData.sizes.length === 0 && <p className="text-amber-600 text-xs mt-3 flex items-center"><i className="fas fa-info-circle mr-1"></i> Selecciona al menos una opción.</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-xs text-center px-2">Sin imagen</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-all ${
              isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 shadow-lg hover:-translate-y-1'
            }`}
          >
            {isUploading ? 'Guardando...' : 'Crear Producto'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewProduct;