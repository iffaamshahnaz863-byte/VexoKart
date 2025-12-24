
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftIcon } from '../../assets/icons';

const AdminManageUsersPage: React.FC = () => {
    const { navigateTo, isAdminAuthenticated, users } = useApp();
    
    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigateTo('adminLogin');
        }
    }, [isAdminAuthenticated, navigateTo]);

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
                    <h1 className="text-xl font-bold text-gray-800">Manage Users</h1>
                </div>
            </header>
            <main className="container mx-auto p-4">
                 <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map(user => (
                                <tr key={user.email}>
                                    <td className="p-3 whitespace-nowrap font-semibold">{user.name}</td>
                                    <td className="p-3 whitespace-nowrap">{user.email}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        <button className="text-red-600 font-semibold text-sm">Delete</button>
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

export default AdminManageUsersPage;
