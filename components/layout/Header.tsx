
import React from 'react';
import { useApp } from '../../context/AppContext';
import { SearchIcon, HeartIcon } from '../../assets/icons';

interface HeaderProps {
    title?: string;
    showSearch?: boolean;
    showWishlist?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = "VexoKart", showSearch = true, showWishlist = true }) => {
    const { navigateTo, wishlist } = useApp();
    return (
        <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {title === "VexoKart" && <p className="text-xs font-light -mt-1">Shop Online, Shop Smart</p>}
                </div>
                <div className="flex items-center space-x-4">
                    {showSearch && (
                        <button className="p-2">
                            <SearchIcon />
                        </button>
                    )}
                    {showWishlist && (
                        <button className="relative p-2" onClick={() => navigateTo('wishlist')}>
                            <HeartIcon />
                            {wishlist.length > 0 && (
                                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">{wishlist.length}</span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
