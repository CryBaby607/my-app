import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../../utils/cloudinary';
import LoadingSpinner from '../../components/LoadingSpinner';

const EditProduct = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    sizes: [],
    image: '' // Guardamos la URL de la imagen actual
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', 'S/M', 'M/L', 'L/XL', 'Unitalla'];

  // 1. Cargar datos del producto al iniciar
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
          setImagePreview(docSnap.data().image); // Mostrar la imagen actual
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

      // 2. Si el usuario seleccionó una NUEVA imagen, la subimos
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      // 3. Actualizamos el documento en Firebase
      const productRef = doc(db, "products", id);
      
      await updateDoc(productRef, {
        ...formData,
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dukicks-blue outline-none"
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
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
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