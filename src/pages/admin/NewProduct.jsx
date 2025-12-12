import React, { useState } from 'react';
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
    sizes: [], // Array para las tallas seleccionadas
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Opciones de tallas disponibles (puedes agregar más)
  const availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', 'S/M', 'M/L', 'L/XL', 'Unitalla'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Crear preview local para que el usuario vea qué seleccionó
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size) // Quitar si ya está
        : [...prev.sizes, size]; // Agregar si no está
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
      // 1. Subir imagen a Cloudinary usando tu utilidad
      console.log("Subiendo imagen...");
      const imageUrl = await uploadImageToCloudinary(imageFile);
      
      if (!imageUrl) throw new Error('Error al subir la imagen');

      // 2. Preparar objeto para Firebase
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price), // Convertir texto a número
        image: imageUrl,
        createdAt: new Date() // Guardamos la fecha de creación
      };

      // 3. Guardar en Firestore
      console.log("Guardando en base de datos...");
      await addDoc(collection(db, "products"), newProduct);

      alert('¡Producto creado exitosamente!');
      navigate('/admin/dashboard'); // Redirigir al terminar

    } catch (error) {
      console.error("Error creando producto:", error);
      alert('Hubo un error al crear el producto. Revisa la consola.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-admin border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Nombre y Precio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue focus:border-transparent outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue focus:border-transparent outline-none"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue focus:border-transparent outline-none"
          >
            <option value="Hombres">Hombres</option>
            <option value="Mujer">Mujer</option>
            <option value="Niños">Niños</option>
            <option value="Gorras">Gorras</option>
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue focus:border-transparent outline-none resize-none"
            placeholder="Detalles del producto..."
            required
          />
        </div>

        {/* Tallas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tallas Disponibles</label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  formData.sizes.includes(size)
                    ? 'bg-dukicks-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {formData.sizes.length === 0 && <p className="text-red-500 text-xs mt-1">Selecciona al menos una talla</p>}
        </div>

        {/* Subida de Imagen */}
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

        {/* Botón Submit */}
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
            {isUploading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i> Guardando...
              </span>
            ) : (
              'Crear Producto'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewProduct;