
import React from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../layout/BottomNav';
import { ChevronRightIcon } from '../../assets/icons';

const ProfilePage: React.FC = () => {
    const { navigateTo, isAuthenticated, user, logout } = useApp();

    const menuItems = [
        { label: 'My Orders', action: () => navigateTo('orderHistory') },
        { label: 'My Wishlist', action: () => navigateTo('wishlist') },
        { label: 'Manage Addresses', action: () => {} },
        { label: 'Account Settings', action: () => {} },
    ];

    return (
        <div className="pb-20 bg-gray-100 min-h-screen">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-16 pt-6 rounded-b-3xl">
                <div className="container mx-auto px-4 text-center">
                    {isAuthenticated && user ? (
                        <>
                            <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} alt="User" className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg mb-2" />
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-sm opacity-80">{user.email}</p>
                        </>
                    ) : (
                         <>
                            <div className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg mb-2 bg-gray-200 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Welcome Guest</h1>
                            <p className="text-sm opacity-80">Login to manage your account</p>
                        </>
                    )}
                </div>
            </header>

            <main className="container mx-auto p-4 -mt-10">
                {isAuthenticated ? (
                    <>
                        <div className="bg-white rounded-lg shadow-lg">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="w-full text-left flex justify-between items-center p-4 border-b last:border-b-0"
                                >
                                    <span className="text-gray-700">{item.label}</span>
                                    <ChevronRightIcon />
                                </button>
                            ))}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={logout}
                                className="w-full bg-white text-red-500 font-bold py-3 rounded-lg shadow-md"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-800">You are not logged in</h2>
                        <p className="text-gray-500 mt-2">Please login or create an account to view your profile and orders.</p>
                        <button
                            onClick={() => navigateTo('login')}
                            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg"
                        >
                            Login / Sign Up
                        </button>
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
};

export default ProfilePage;
