
import React from 'react';
import { useApp } from '../../context/AppContext';
import { HomeIcon, GridIcon, CartIcon, UserIcon } from '../../assets/icons';
import type { Page } from '../../types';

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    pageName: Page;
}> = ({ icon, label, pageName }) => {
    const { page, navigateTo, cart } = useApp();
    const isActive = page === pageName;
    const color = isActive ? 'text-purple-600' : 'text-gray-500';

    return (
        <button
            onClick={() => navigateTo(pageName)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 ${color} transition-colors duration-200`}
        >
            <div className="relative">
                {icon}
                {pageName === 'cart' && cart.length > 0 && (
                    <span className="absolute -top-1 -right-2 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-medium">{cart.length}</span>
                )}
            </div>
            <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>{label}</span>
        </button>
    );
};


const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] z-20 h-16">
            <div className="flex justify-around items-center h-full max-w-lg mx-auto">
                <NavItem icon={<HomeIcon />} label="Home" pageName="home" />
                <NavItem icon={<GridIcon />} label="Categories" pageName="productList" />
                <NavItem icon={<CartIcon />} label="Cart" pageName="cart" />
                <NavItem icon={<UserIcon />} label="Profile" pageName="profile" />
            </div>
        </nav>
    );
};

export default BottomNav;
