// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/PrivateRoute.jsx'

// Páginas Públicas
import Home from './pages/Home.jsx'
import Categoria from './pages/Categoria.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'

// Páginas de Admin
import AdminLogin from './pages/admin/Login.jsx'


function App() {

  return (
    <>
      <Routes>
        {/* Rutas de Admin (sin Navbar ni Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rutas Públicas (con Navbar y Footer) */}
        <Route path="*" element={
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
      </Routes>
    </>
  )
}

export default App