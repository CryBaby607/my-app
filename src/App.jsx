// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// Páginas Públicas
import Home from './pages/Home.jsx'
import Categoria from './pages/Categoria.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content with-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:category" element={<Categoria />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App