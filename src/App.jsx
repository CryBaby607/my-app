import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Importa los componentes de administración
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import NewProduct from './pages/admin/NewProduct'; // <--- IMPORTANTE: Importamos el nuevo componente
import ProtectedRoute from './components/ProtectedRoute';

// Importa los componentes de la tienda pública
import MainApp from './components/MainApp';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal de la tienda pública */}
        <Route path="/" element={<MainApp />} />
        
        {/* Ruta del Carrito de Compras */}
        <Route path="/cart" element={<CartPage />} />

        {/* Rutas de Categorías */}
        <Route path="/gorras" element={<CategoryPage categoryKey="gorras" />} />
        <Route path="/hombres" element={<CategoryPage categoryKey="hombres" />} />
        <Route path="/mujer" element={<CategoryPage categoryKey="mujeres" />} />
        <Route path="/ninos" element={<CategoryPage categoryKey="ninos" />} />

        {/* Ruta Detalle de Producto */}
        <Route path="/product/:id" element={<ProductPage />} />
        
        {/* Ruta de Resultados de Búsqueda */}
        <Route path="/search" element={<SearchResultsPage />} />
        
        {/* Rutas de autenticación para administradores */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Rutas protegidas del panel de administración */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* --- RUTA NUEVA PARA CREAR PRODUCTOS --- */}
          <Route path="products/new" element={<NewProduct />} />
          
          <Route path="products" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2></div>} />
          <Route path="orders" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Gestión de Pedidos</h2></div>} />
          <Route path="customers" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Gestión de Clientes</h2></div>} />
          <Route path="categories" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Gestión de Categorías</h2></div>} />
          <Route path="inventory" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Gestión de Inventario</h2></div>} />
          <Route path="settings" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Configuración</h2></div>} />
          <Route path="profile" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Mi Perfil</h2></div>} />
        </Route>
        
        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;