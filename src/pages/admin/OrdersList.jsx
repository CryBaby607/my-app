import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import LoadingSpinner from '../../components/LoadingSpinner';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "whatsappOrders"), orderBy("timestamp", "desc"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersArray);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, "whatsappOrders", orderId);
            await updateDoc(orderRef, {
                status: newStatus,
                updatedAt: Date.now()
            });
            alert(`Estado de la cotización ${orderId} actualizado a ${newStatus}`);
        } catch (error) {
            console.error("Error actualizando estado:", error);
            alert("Error al actualizar el estado.");
        }
    };
    
    const getStatusClasses = (status) => {
        switch (status) {
            case 'Completado':
                return 'bg-green-100 text-green-800';
            case 'Cancelado':
                return 'bg-red-100 text-red-800';
            default: 
                return 'bg-yellow-100 text-yellow-800';
        }
    };
    
    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const handleViewDetails = (order) => {
        const details = order.items.map(item => 
            `- ${item.name} (Talla: ${item.size}, Cantidad: ${item.quantity}, Precio: $${item.price.toFixed(2)})`
        ).join('\n');
        
        alert(`Detalles de la Cotización ${order.id}:\n\nTotal estimado: $${order.total.toFixed(2)}\n\nProductos:\n${details}\n\nMétodo: ${order.checkoutMethod}`);
    };


    if (loading) return <div className="flex justify-center p-10"><LoadingSpinner size="lg" /></div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Pedidos y Cotizaciones ({orders.length})</h1>
            
            <p className="text-sm text-gray-600 mb-4">
                *Esta lista contiene las cotizaciones iniciadas por el cliente a través de WhatsApp. Deben ser gestionadas manualmente.
            </p>

            {orders.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl shadow-lg border border-gray-200">
                    <i className="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Aún no hay cotizaciones registradas.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de Orden</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Est.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatTimestamp(order.timestamp)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.items.length} items
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <select 
                                            value={order.status} 
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-dukicks-blue focus:border-dukicks-blue"
                                        >
                                            <option value="Cotización Pendiente">Pendiente</option>
                                            <option value="Completado">Completado</option>
                                            <option value="Cancelado">Cancelado</option>
                                        </select>
                                        <button 
                                            onClick={() => handleViewDetails(order)}
                                            className="ml-3 text-dukicks-blue hover:text-blue-700"
                                            title="Ver detalles"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrdersList;