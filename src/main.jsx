import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 

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
      <App />
    </BrowserRouter>
  </StrictMode>,
)