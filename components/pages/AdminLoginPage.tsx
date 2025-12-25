
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftIcon } from '../../assets/icons';

const AdminLoginPage: React.FC = () => {
    const { navigateTo, adminLogin } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = adminLogin(email, password);
        if (!success) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
             <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">VexoKart</h1>
                    <p className="text-gray-400">Admin Panel</p>
                </div>
                <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password"  className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                             />
                        </div>
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:opacity-90">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center mt-6">
                    <button onClick={() => navigateTo('home')} className="text-sm text-gray-400 hover:text-white">
                        &larr; Back to Shop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
