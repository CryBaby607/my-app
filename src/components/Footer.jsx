import React from 'react';

const Footer = () => {
  const socialLinks = [
    { icon: 'fab fa-instagram', color: 'hover:bg-dukicks-blue', title: 'Instagram', url: 'https://www.instagram.com/dukicksmx/' },
    { icon: 'fab fa-facebook-f', color: 'hover:bg-blue-700', title: 'Facebook', url: 'https://www.facebook.com/Dukicks?locale=es_LA' },
    { icon: 'fab fa-whatsapp', color: 'hover:bg-green-500', title: 'WhatsApp', url: '#' },
    { icon: 'fab fa-tiktok', color: 'hover:bg-gray-800', title: 'TikTok', url: 'https://www.tiktok.com/@dukicksmx' }
  ];

  const contactInfo = [
    { icon: 'fab fa-whatsapp', text: '+1 (555) 123-4567', color: 'text-green-400' },
    { icon: 'fas fa-envelope', text: 'hola@dukicks.com', color: 'text-gray-400' },
    { icon: 'fas fa-clock', text: 'Lun-Vie: 9am - 6pm', color: 'text-gray-400' }
  ];

  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold tracking-tightest">
                <span className="text-white">DU</span><span className="text-dukicks-blue">KICKS</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Tienda especializada en gorras y tenis de calidad. Encuentra tu estilo único con nosotros.
            </p>

            <div className="mt-4">
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url} // Usamos la nueva URL
                    target="_blank" // Abrir en una nueva pestaña
                    rel="noopener noreferrer" // Mejores prácticas de seguridad
                    className={`w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center ${social.color} transition-colors`}
                    title={social.title}
                    // Eliminamos el onClick que prevenía la navegación
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/3">
            <h4 className="font-bold text-lg mb-4 text-white">Contacto</h4>
            <div className="space-y-2">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <i className={`${info.icon} ${info.color}`}></i>
                  <span className="text-gray-300">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>
        <div className="text-center">
          <p className="text-gray-500">
            &copy; 2024 <span className="text-white">DU</span><span className="text-dukicks-blue">KICKS</span>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;