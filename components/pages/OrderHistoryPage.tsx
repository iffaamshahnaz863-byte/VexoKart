
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../layout/BottomNav';
import { ArrowLeftIcon } from '../../assets/icons';

const OrderHistoryPage: React.FC = () => {
    const { orders, navigateTo, isAuthenticated } = useApp();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigateTo('login');
        }
    }, [isAuthenticated, navigateTo]);

    const getStatusColor = (status: 'Delivered' | 'Processing' | 'Cancelled') => {
        switch (status) {
            case 'Delivered': return 'text-green-600 bg-green-100';
            case 'Processing': return 'text-blue-600 bg-blue-100';
            case 'Cancelled': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }

    if (!isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
    }

    return (
        <div className="pb-20 bg-gray-100 min-h-screen">
            <header className="sticky top-0 z-20 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('profile')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Orders ({orders.length})</h1>
                </div>
            </header>

            <main className="container mx-auto p-4">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600 text-lg">You have no past orders.</p>
                        <button onClick={() => navigateTo('home')} className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">Shop Now</button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex justify-between items-start border-b pb-2 mb-2">
                                    <div>
                                        <p className="font-bold text-gray-800">{order.id}</p>
                                        <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                                </div>
                                <div className="space-y-2">
                                    {order.items.slice(0, 2).map(item => (
                                        <div key={item.product.id} className="flex items-center space-x-3">
                                            <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-700 truncate">{item.product.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {order.items.length > 2 && <p className="text-xs text-gray-500 text-center pt-1">...and {order.items.length - 2} more items</p>}
                                </div>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                    <p className="text-gray-600">Total: <span className="font-bold text-gray-800">₹{order.total.toFixed(2)}</span></p>
                                    <button className="text-purple-600 font-semibold text-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
};

export default OrderHistoryPage;
