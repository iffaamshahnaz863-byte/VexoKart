
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center">
            <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4">
                <span className="text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);

const AdminDashboardPage: React.FC = () => {
    const { navigateTo, isAdminAuthenticated, adminLogout, orders, products } = useApp();
    
    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigateTo('adminLogin');
        }
    }, [isAdminAuthenticated, navigateTo]);

    const handleResetData = () => {
        if (window.confirm('Are you sure you want to reset all application data? This will delete all products, orders, banners, and users and restore the application to its initial state. This action cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    if (!isAdminAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button onClick={adminLogout} className="text-sm font-semibold text-purple-600 hover:text-purple-800">
                        Logout
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} icon="💰" />
                    <StatCard title="Total Orders" value={totalOrders.toString()} icon="📦" />
                    <StatCard title="Total Products" value={totalProducts.toString()} icon="🏷️" />
                </div>

                <div className="bg-white rounded-lg shadow p-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <button onClick={() => navigateTo('adminManageProducts')} className="bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600">Manage Products</button>
                        <button onClick={() => navigateTo('adminManageBanners')} className="bg-indigo-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-600">Manage Banners</button>
                        <button onClick={() => navigateTo('adminManageOrders')} className="bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600">Manage Orders</button>
                        <button onClick={() => navigateTo('adminManageUsers')} className="bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600">Manage Users</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-5 mt-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Danger Zone</h2>
                    <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-400 rounded">
                        <div>
                            <p className="font-bold text-red-800">Reset Application Data</p>
                            <p className="text-sm text-red-700 mt-1">This will permanently delete all data and restore the default sample data.</p>
                        </div>
                        <button 
                            onClick={handleResetData}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 ml-4 flex-shrink-0"
                        >
                            Reset Data
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardPage;