
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftIcon } from '../../assets/icons';
import { Order } from '../../types';

const AdminManageOrdersPage: React.FC = () => {
    const { navigateTo, isAdminAuthenticated, orders, updateOrderStatus } = useApp();
    
    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigateTo('adminLogin');
        }
    }, [isAdminAuthenticated, navigateTo]);
    
    const handleStatusChange = (orderId: string, status: Order['status']) => {
        updateOrderStatus(orderId, status);
    };

    if (!isAdminAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('adminDashboard')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Manage Orders</h1>
                </div>
            </header>
            <main className="container mx-auto p-4">
                 <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="p-3 whitespace-nowrap font-mono text-sm">{order.id}</td>
                                    <td className="p-3 whitespace-nowrap text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="p-3 whitespace-nowrap text-sm">{order.user?.name || 'Guest'}</td>
                                    <td className="p-3 whitespace-nowrap text-sm font-semibold">₹{order.total.toFixed(2)}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                            className="p-1 border rounded-md text-sm"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminManageOrdersPage;
