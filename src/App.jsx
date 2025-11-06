// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Categoria from './pages/Categoria.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'

function App() {

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main className="main-content with-header"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:category" element={<Categoria />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App