import React from 'react';
import { Link } from 'react-router-dom';
import { Line, Bar, Pie } from 'react-chartjs-2';
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

const Dashboard = () => {
  // Datos para gráficos
  const salesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas 2024',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4
      }
    ]
  };

  const categoryData = {
    labels: ['Tenis', 'Gorras', 'Ropa', 'Accesorios'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          '#2563eb',
          '#10b981',
          '#f59e0b',
          '#8b5cf6'
        ]
      }
    ]
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'Juan Pérez', amount: '$89.99', status: 'Completado', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'María García', amount: '$149.50', status: 'Pendiente', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Carlos López', amount: '$67.99', status: 'Completado', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Ana Martínez', amount: '$199.99', status: 'Enviado', date: '2024-01-13' },
    { id: '#ORD-005', customer: 'Pedro Sánchez', amount: '$45.50', status: 'Cancelado', date: '2024-01-12' }
  ];

  const quickActions = [
    { icon: 'fas fa-plus', label: 'Nuevo Producto', to: '/admin/products/new', color: 'blue' },
    { icon: 'fas fa-truck', label: 'Envíos Pendientes', to: '/admin/orders?status=shipping', color: 'green' },
    { icon: 'fas fa-chart-bar', label: 'Reportes', to: '/admin/reports', color: 'purple' },
    { icon: 'fas fa-bullhorn', label: 'Crear Oferta', to: '/admin/promotions/new', color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido al panel de administración de DUKICKS</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-dukicks-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
            <i className="fas fa-download mr-2"></i>
            Exportar Reporte
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <i className="fas fa-filter mr-2"></i>
            Filtros
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3`}>
              <i className={`${action.icon} text-${action.color}-600 text-xl`}></i>
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
            <h3 className="text-lg font-semibold text-gray-900">Ventas Mensuales</h3>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="h-64">
            <Line 
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ventas por Categoría</h3>
          <div className="h-64">
            <Pie 
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pedidos Recientes</h3>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px 6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
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
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-dukicks-blue hover:text-blue-700 mr-3">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <i className="fas fa-edit"></i>
                    </button>
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
              <p className="text-blue-100">Productos más vendidos</p>
              <p className="text-3xl font-bold mt-2">Tenis Running Pro</p>
            </div>
            <i className="fas fa-shoe-prints text-3xl opacity-50"></i>
          </div>
          <div className="mt-4 text-sm text-blue-100">
            156 unidades vendidas este mes
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Cliente destacado</p>
              <p className="text-3xl font-bold mt-2">María García</p>
            </div>
            <i className="fas fa-crown text-3xl opacity-50"></i>
          </div>
          <div className="mt-4 text-sm text-green-100">
            $1,245 en compras este mes
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Inventario bajo</p>
              <p className="text-3xl font-bold mt-2">12 productos</p>
            </div>
            <i className="fas fa-exclamation-triangle text-3xl opacity-50"></i>
          </div>
          <div className="mt-4 text-sm text-purple-100">
            Necesitan reabastecimiento
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;