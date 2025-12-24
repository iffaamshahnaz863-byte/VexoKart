
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftIcon } from '../../assets/icons';

const LoginPage: React.FC = () => {
    const { navigateTo, login } = useApp();
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('password123');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - in a real app, you'd call an API
        login('John Doe', email);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
             <header className="sticky top-0 z-20 bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('home')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Login</h1>
                </div>
            </header>
            <div className="flex-grow flex items-center justify-center">
                 <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md m-4">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Welcome Back!</h1>
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
                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <button onClick={() => navigateTo('signup')} className="font-medium text-purple-600 hover:text-purple-500">
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
