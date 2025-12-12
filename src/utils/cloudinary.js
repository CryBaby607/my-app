export const uploadImageToCloudinary = async (file) => {
  // 1. Validar que exista un archivo
  if (!file) return null;

  // 2. Obtener credenciales del entorno
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // 3. Preparar los datos para el envío (FormData)
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  // Opcional: Agregar folder para organizar mejor en Cloudinary
  formData.append('folder', 'dukicks_products'); 

  try {
    // 4. Hacer la petición POST a Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    // 5. Verificar si hubo error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error subiendo imagen: ${errorData.error.message}`);
    }

    // 6. Retornar la URL segura (https)
    const data = await response.json();
    return data.secure_url;

  } catch (error) {
    console.error("Error en servicio Cloudinary:", error);
    throw error;
  }
};