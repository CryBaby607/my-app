import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importar estilos base en orden
import './styles/base/reset.css'
import './styles/base/variables.css'
import './styles/base/typography.css'
import './styles/utils/utilities.css'
import './styles/utils/animations.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
