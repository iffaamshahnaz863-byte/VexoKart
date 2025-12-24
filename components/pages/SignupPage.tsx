
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftIcon } from '../../assets/icons';

const SignupPage: React.FC = () => {
    const { navigateTo, login } = useApp();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup and login
        login(name, email);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
             <header className="sticky top-0 z-20 bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('login')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Create Account</h1>
                </div>
            </header>
            <div className="flex-grow flex items-center justify-center">
                 <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md m-4">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Join VexoKart</h1>
                    <form className="space-y-6" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
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
                                Sign Up
                            </button>
                        </div>
                    </form>
                     <p className="text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <button onClick={() => navigateTo('login')} className="font-medium text-purple-600 hover:text-purple-500">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
