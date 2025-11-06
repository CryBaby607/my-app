// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Páginas Públicas
import Home from './pages/Home.jsx'
import Categoria from './pages/Categoria.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'

// Páginas de Admin
import AdminLogin from './pages/admin/AdminLogin.jsx'


function App() {

  return (
    <>
      {/* Navbar solo se muestra en rutas públicas */}
      <Routes>
        <Route path="/*" element={
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
        } />
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </>
  )
}

export default App