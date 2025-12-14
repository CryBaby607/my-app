import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import LoadingSpinner from '../../components/LoadingSpinner';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
};

const Dashboard = () => {
    // Inicializar stats con valores que reflejen carga/cero
    const [stats, setStats] = useState({ 
        orders: { value: '0', change: '0%', icon: 'fas fa-shopping-cart', color: 'blue' },
        revenue: { value: '$0.00', change: '0%', icon: 'fas fa-dollar-sign', color: 'green' },
        customers: { value: 'N/A', change: '0%', icon: 'fas fa-users', color: 'purple' },
        products: { value: '0', change: '0%', icon: 'fas fa-box', color: 'yellow' }
    });
    const [salesChartData, setSalesChartData] = useState(null);
    const [categoryChartData, setCategoryChartData] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // 1. Obtener Productos (Catálogo)
            const productsSnapshot = await getDocs(collection(db, "products"));
            const productsCount = productsSnapshot.size;

            // 2. Obtener Órdenes/Cotizaciones
            const ordersSnapshot = await getDocs(query(collection(db, "whatsappOrders"), orderBy("timestamp", "desc"), limit(100)));
            const allOrders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // 3. Calcular Estadísticas y Gráficos
            let totalRevenue = 0;
            let totalCompletedOrders = 0;
            const monthlySales = {};
            
            const completedOrders = allOrders.filter(order => order.status === 'Completado');
            
            totalCompletedOrders = completedOrders.length;
            totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

            // Calcular ventas mensuales (simplificado por ahora)
            completedOrders.forEach(order => {
                const date = new Date(order.timestamp);
                const month = date.toLocaleString('es-ES', { month: 'short', year: 'numeric' });
                monthlySales[month] = (monthlySales[month] || 0) + order.total;
            });
            
            // Preparar datos para el gráfico de barras
            const salesLabels = Object.keys(monthlySales);
            const salesDataValues = Object.values(monthlySales);

            // Preparar datos para Pedidos Recientes (últimos 5)
            const sortedOrders = [...allOrders].sort((a, b) => b.timestamp - a.timestamp);
            setRecentOrders(sortedOrders.slice(0, 5));

            // Preparar datos para Gráfico de Categorías (Placeholder)
            const categoryBreakdown = {};
            productsSnapshot.docs.forEach(doc => {
                const category = doc.data().category || 'Sin Categoría';
                categoryBreakdown[category] = (categoryBreakdown[category] || 0) + 1;
            });
            const categoryLabels = Object.keys(categoryBreakdown);
            const categoryDataValues = Object.values(categoryBreakdown);


            setStats({ 
                totalProducts: productsCount, 
                totalCompletedOrders,
                totalRevenue
            });
            
            setSalesChartData({
                labels: salesLabels,
                datasets: [{
                    label: 'Ventas (Cotizaciones Completadas)',
                    data: salesDataValues,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                }]
            });
            
            setCategoryChartData({
                labels: categoryLabels,
                datasets: [
                    {
                        data: categoryDataValues,
                        backgroundColor: [
                            '#3b82f6', // blue
                            '#ef4444', // red
                            '#f59e0b', // yellow
                            '#10b981', // green
                            '#8b5cf6'  // purple
                        ]
                    }
                ]
            });


        } catch (error) {
            console.error("Error al cargar datos del dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []); 

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Ventas Mensuales' },
        },
    };
    
    // -----------------------------------------------------------
    // ARREGLO CRÍTICO: Eliminación de acciones no implementadas
    // -----------------------------------------------------------
    const quickActions = [
        { icon: 'fas fa-plus', label: 'Nuevo Producto', to: '/admin/products/new', color: 'blue' },
        // Botón de Pedidos actualizado para reflejar cotizaciones
        { icon: 'fas fa-shopping-cart', label: 'Ver Cotizaciones', to: '/admin/orders', color: 'green' },
        // Botones de Reportes y Crear Ofertas ELIMINADOS
    ];
    // -----------------------------------------------------------


  if (loading) return <div className="flex justify-center p-10"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido al panel de administración de DUKICKS</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button onClick={fetchDashboardData} className="px-4 py-2 bg-dukicks-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
            <i className="fas fa-sync-alt mr-2"></i>
            Actualizar Datos
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Usamos grid-cols-2 ya que solo quedan 2 botones */}
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${colorMap[action.color].bg} rounded-lg flex items-center justify-center mb-3`}>
              <i className={`${action.icon} ${colorMap[action.color].text} text-xl`}></i>
            </div>
            <p className="font-semibold text-gray-900">{action.label}</p>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Mensual (Órdenes Completadas)</h3>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option>Últimos 12 meses</option>
            </select>
          </div>
          <div className="h-64">
            {salesChartData ? (
                <Bar 
                    data={salesChartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            title: { display: false }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                />
            ) : <LoadingSpinner />}
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribución por Categoría</h3>
          <div className="h-64">
            {categoryChartData ? (
                <Pie 
                    data={categoryChartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />
            ) : <LoadingSpinner />}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Cotizaciones Recientes</h3>
            <Link to="/admin/orders" className="text-dukicks-blue hover:underline text-sm">
              Ver todos →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Est.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      order.status === 'Cotización Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link to="/admin/orders" className="text-dukicks-blue hover:text-blue-700 mr-3">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Cotizaciones Completadas</p>
              <p className="text-3xl font-bold mt-2">{stats.totalCompletedOrders || 0}</p>
            </div>
            <i className="fas fa-check-circle text-3xl opacity-50"></i>
          </div>
          <div className="mt-4 text-sm text-blue-100">
            Cotizaciones marcadas como completadas
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Revenue Estimado</p>
              <p className="text-3xl font-bold mt-2">${stats.totalRevenue ? stats.totalRevenue.toFixed(2) : '0.00'}</p>
            </div>
            <i className="fas fa-dollar-sign text-3xl opacity-50"></i>
          </div>
          <div className="mt-4 text-sm text-green-100">
            Revenue basado en cotizaciones completadas
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Productos</p>
              <p className="text-3xl font-bold mt-2">{stats.totalProducts || 0}</p>
            </div>
            <i className="fas fa-box text-3xl opacity-50"></i>
          </div>
          <div className="mt-4 text-sm text-purple-100">
            Productos activos en catálogo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;