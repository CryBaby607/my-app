import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const navigate = useNavigate();
  
  // 1. Inicializamos el estado basándonos en el tamaño de la pantalla
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  const [user, setUser] = useState({
    name: 'Admin',
    email: localStorage.getItem('adminEmail') || 'admin@dukicks.com',
    role: 'Administrador',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff'
  });
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nueva orden recibida', time: '5 min', read: false },
    { id: 2, message: 'Producto agotado', time: '1 hora', read: false },
    { id: 3, message: 'Comentario nuevo', time: '2 horas', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 2. Efecto para manejar el redimensionamiento de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: 'fas fa-shopping-bag', label: 'Productos' },
    { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Pedidos' },
    { path: '/admin/customers', icon: 'fas fa-users', label: 'Clientes' },
    { path: '/admin/categories', icon: 'fas fa-tags', label: 'Categorías' },
    { path: '/admin/inventory', icon: 'fas fa-boxes', label: 'Inventario' },
    { path: '/admin/settings', icon: 'fas fa-cog', label: 'Configuración' }
  ];

  const stats = {
    orders: { value: '156', change: '+12%', icon: 'fas fa-shopping-cart', color: 'blue' },
    revenue: { value: '$12,456', change: '+8%', icon: 'fas fa-dollar-sign', color: 'green' },
    customers: { value: '2,458', change: '+5%', icon: 'fas fa-users', color: 'purple' },
    products: { value: '189', change: '+3%', icon: 'fas fa-box', color: 'yellow' }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-black shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              {/* Icono de corona eliminado aquí */}
              <div>
                <h1 className="text-xl font-bold text-white">
                  <span>DU</span>
                  <span className="text-dukicks-blue">KICKS</span>
                </h1>
                <p className="text-gray-400 text-xs">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-dukicks-blue text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`
                    }
                    onClick={() => {
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                  >
                    <i className={`${item.icon} w-5 text-center`}></i>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Logout Button */}
            <div className="mt-6 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-gray-800">
            <div className="text-center text-gray-500 text-sm">
              <p>v2.1.0</p>
              <p className="mt-1">© 2024 DUKICKS</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left: Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>

            {/* Center: Breadcrumb/Title */}
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-900">Panel de Control</h2>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <i className="fas fa-search text-gray-400 mr-2"></i>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-48"
                  />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <i className="fas fa-bell text-xl"></i>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Notificaciones</h3>
                        <button className="text-sm text-dukicks-blue hover:underline">
                          Marcar todas como leídas
                        </button>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border ${
                              notification.read
                                ? 'border-gray-100 bg-gray-50'
                                : 'border-blue-100 bg-blue-50'
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {notification.message}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  <i className="far fa-clock mr-1"></i>
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-dukicks-blue rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/admin/notifications"
                        className="block mt-4 text-center text-dukicks-blue hover:underline text-sm"
                      >
                        Ver todas las notificaciones
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:inline text-gray-700 font-medium">
                    {user.name}
                  </span>
                  <i className="fas fa-chevron-down text-gray-500"></i>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="space-y-2">
                        <Link
                          to="/admin/profile"
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700"
                        >
                          <i className="fas fa-user w-5"></i>
                          <span>Mi Perfil</span>
                        </Link>
                        <Link
                          to="/admin/settings"
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700"
                        >
                          <i className="fas fa-cog w-5"></i>
                          <span>Configuración</span>
                        </Link>
                        <div className="border-t pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-red-600 w-full"
                          >
                            <i className="fas fa-sign-out-alt w-5"></i>
                            <span>Cerrar Sesión</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats).map(([key, stat]) => (
                <div key={key} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 capitalize">{key}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <i className={`${stat.icon} text-${stat.color}-600`}></i>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      <i className={`fas fa-arrow-${stat.change.startsWith('+') ? 'up' : 'down'} mr-1`}></i>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs ayer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;