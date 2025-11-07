import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext' // ← AGREGAR

// Importar estilos base en orden
import './styles/base/reset.css'
import './styles/base/variables.css'
import './styles/base/typography.css'
import './styles/utils/utilities.css'
import './styles/utils/animations.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider> {/* ← AGREGAR */}
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider> {/* ← AGREGAR */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)