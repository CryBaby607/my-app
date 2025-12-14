import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../firebase/config'; 
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy, limit, getDocs } from 'firebase/firestore'; 

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  const [user] = useState({
    name: 'Admin',
    email: localStorage.getItem('adminEmail') || 'admin@dukicks.com',
    role: 'Administrador',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff'
  });
  
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [realStats, setRealStats] = useState({
    orders: { value: '0', change: 'Total Cotiz.', icon: 'fas fa-shopping-cart', color: 'blue' },
    revenue: { value: '$0.00', change: 'Ventas Reales', icon: 'fas fa-dollar-sign', color: 'green' },
    customers: { value: '0', change: 'Cotizaciones', icon: 'fas fa-users', color: 'purple' },
    products: { value: '0', change: 'Catálogo', icon: 'fas fa-box', color: 'yellow' }
  });

  useEffect(() => {
    if (!db) return; 
    const q = query(
      collection(db, "whatsappOrders"),
      where("status", "==", "Cotización Pendiente"),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => {
        const data = doc.data();
        const minutesAgo = Math.floor((Date.now() - data.timestamp) / 60000);
        let timeText = minutesAgo < 1 ? 'Justo ahora' : minutesAgo < 60 ? `${minutesAgo} min` : `${Math.floor(minutesAgo/60)} horas`;
        return {
          id: doc.id,
          message: `Nueva cotización: $${data.total.toFixed(2)}`,
          time: timeText,
          read: false, 
          link: '/admin/orders'
        };
      });
      setNotifications(newNotifications);
    }, (error) => console.error("Error notificaciones:", error));
    return () => unsubscribe();
  }, []); 

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const productsSnap = await getDocs(collection(db, "products"));
            const totalProducts = productsSnap.size;

            const unsubscribeOrders = onSnapshot(collection(db, "whatsappOrders"), (snapshot) => {
                let totalOrders = 0;
                let totalRevenue = 0;
                const uniqueOrdersCount = snapshot.size;

                snapshot.forEach(doc => {
                    const data = doc.data();
                    totalOrders++;
                    
                    if (data.status === 'Completado') {
                        totalRevenue += (data.total || 0);
                    }
                });

                setRealStats(prev => ({
                    orders: { ...prev.orders, value: String(totalOrders), change: 'Total Cotiz.' },
                    revenue: { ...prev.revenue, value: `$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, change: 'Ventas Reales' },
                    customers: { ...prev.customers, value: String(uniqueOrdersCount), change: 'Cotizaciones' },
                    products: { ...prev.products, value: String(totalProducts), change: 'Catálogo' }
                }));
            });

            return () => unsubscribeOrders();
        } catch (error) {
            console.error("Error cargando estadísticas:", error);
        }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: 'fas fa-shopping-bag', label: 'Productos' },
    { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Pedidos' },
  ];

  const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error("Error logout:", error);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      navigate('/admin/login');
    }
  };
  
  const unreadNotifications = notifications.length;

  return (
    <div className="min-h-screen bg-gray-50">
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

      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-black shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-bold text-white">
                  <span>DU</span>
                  <span className="text-dukicks-blue">KICKS</span>
                </h1>
                <p className="text-gray-400 text-xs">Admin Panel</p>
              </div>
            </Link>
          </div>

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
                    onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                  >
                    <i className={`${item.icon} w-5 text-center`}></i>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4">
              <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors">
                <i className="fas fa-sign-out-alt"></i>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className="text-center text-gray-500 text-sm">
              <p>v2.1.0</p>
              <p className="mt-1">© 2024 DUKICKS</p>
            </div>
          </div>
        </div>
      </motion.aside>

      <div className="lg:pl-64 transition-all duration-300">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden">
              <i className="fas fa-bars text-xl"></i>
            </button>

            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-900">Panel de Control</h2>
            </div>

            <div className="flex items-center space-x-4">
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

              <div className="relative">
                <button
                  onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                  className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <i className="fas fa-bell text-xl"></i>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Notificaciones Pendientes</h3>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <Link
                                key={notification.id}
                                to={notification.link}
                                onClick={() => setShowNotifications(false)}
                                className="block p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-gray-900">{notification.message}</p>
                                    <p className="text-sm text-gray-500 mt-1"><i className="far fa-clock mr-1"></i>{notification.time}</p>
                                  </div>
                                  <div className="w-2 h-2 bg-dukicks-blue rounded-full flex-shrink-0 mt-1"></div>
                                </div>
                              </Link>
                            ))
                        ) : (
                            <div className="text-center py-4 text-gray-500"><i className="fas fa-check-circle mr-1"></i> No hay notificaciones nuevas.</div>
                        )}
                      </div>
                      <Link to="/admin/orders" onClick={() => setShowNotifications(false)} className="block mt-4 text-center text-dukicks-blue hover:underline text-sm">Ver todos los pedidos</Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden md:inline text-gray-700 font-medium">{user.name}</span>
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
                        <Link to="/admin/profile" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <i className="fas fa-user w-5"></i>
                            <span>Mi Perfil</span>
                        </Link>
                        <div className="border-t pt-2">
                          <button onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 text-red-600 w-full">
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

          {/* Stats Bar REAL */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(realStats).map(([key, stat]) => (
                <div key={key} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 capitalize">{key === 'revenue' ? 'Ingresos (Completados)' : key === 'orders' ? 'Cotizaciones Totales' : key === 'customers' ? 'Clientes Únicos' : 'Productos'}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${colorMap[stat.color].bg}`}> 
                      <i className={`${stat.icon} ${colorMap[stat.color].text}`}></i> 
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;