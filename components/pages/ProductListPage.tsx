
import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Category } from '../../types';
import BottomNav from '../layout/BottomNav';
import ProductCard from '../ui/ProductCard';
import { ArrowLeftIcon } from '../../assets/icons';

interface ProductListPageProps {
    category?: Category;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ category }) => {
    const { navigateTo, products } = useApp();
    const filteredProducts = category ? products.filter(p => p.category === category.name) : products;

    return (
        <div className="pb-20">
            <header className="sticky top-0 z-20 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('home')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">{category ? category.name : 'All Products'}</h1>
                </div>
            </header>
            <main className="container mx-auto p-4">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-20">
                        <p className="text-gray-600 text-lg">No products found.</p>
                        <p className="text-sm text-gray-500 mt-1">Check back later or explore other categories.</p>
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
};

export default ProductListPage;
