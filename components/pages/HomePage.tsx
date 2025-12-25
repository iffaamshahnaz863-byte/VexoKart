
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data';
import Header from '../layout/Header';
import BottomNav from '../layout/BottomNav';
import ProductCard from '../ui/ProductCard';
import { SearchIcon } from '../../assets/icons';

const HomePage: React.FC = () => {
    const { navigateTo, products, banners } = useApp();
    const featuredProducts = products.slice(0, 4);
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        if (banners.length > 1) {
            const timer = setInterval(() => {
                setCurrentBanner(prev => (prev + 1) % banners.length);
            }, 5000); // Change banner every 5 seconds
            return () => clearInterval(timer);
        }
    }, [banners.length]);

    return (
        <div className="pb-20">
            <Header />
            <main className="container mx-auto p-4">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <input type="text" placeholder="Search for products..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                    </div>
                </div>

                {/* Banner Carousel */}
                {banners.length > 0 && (
                    <div className="relative rounded-lg overflow-hidden shadow-lg mb-6 w-full h-48">
                        {banners.map((banner, index) => (
                             <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                                    <h2 className="text-xl font-bold">{banner.title}</h2>
                                    <p className="text-sm">{banner.subtitle}</p>
                                </div>
                            </div>
                        ))}
                       
                        {banners.length > 1 && (
                             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                                {banners.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentBanner(index)}
                                        className={`h-2 w-2 rounded-full transition-colors ${currentBanner === index ? 'bg-white' : 'bg-white/50'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}


                {/* Categories */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Categories</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                        {categories.map(category => (
                            <div key={category.id} className="text-center flex-shrink-0 w-20 cursor-pointer" onClick={() => navigateTo('productList', category)}>
                                <img src={category.image} alt={category.name} className="w-16 h-16 rounded-full mx-auto border-2 border-purple-200" />
                                <p className="text-sm mt-2 text-gray-700">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Products */}
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Featured Products</h2>
                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">No products available yet.</p>
                            <p className="text-sm text-gray-500 mt-1">The administrator can add products from the admin panel.</p>
                        </div>
                    )}
                </section>
            </main>
            <BottomNav />
        </div>
    );
};

export default HomePage;