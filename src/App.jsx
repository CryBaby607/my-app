// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

// Páginas Públicas
import Home from './pages/Home.jsx'
import Categoria from './pages/Categoria.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'

// Páginas de Admin
import AdminLogin from './pages/Admin/Login.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'

function App() {
  const location = useLocation();

  // Rutas donde NO se deben mostrar navbar y footer
  const hideNavFooterRoutes = ['/admin/login', '/admin/dashboard'];
  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavFooter && <Navbar />}
      <main className={`main-content ${!shouldHideNavFooter ? 'with-header' : ''}`}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:category" element={<Categoria />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Rutas de Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      {!shouldHideNavFooter && <Footer />}
    </>
  )
}

export default App