
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import RatingStars from '../ui/RatingStars';
import { ArrowLeftIcon, HeartIcon } from '../../assets/icons';

const ProductDetailPage: React.FC = () => {
    const { selectedProduct, navigateTo, addToCart, addToWishlist, isProductInWishlist, isAuthenticated } = useApp();
    const [mainImage, setMainImage] = useState(selectedProduct?.images[0] || '');

    if (!selectedProduct) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Product not found. <button onClick={() => navigateTo('home')} className="text-purple-600">Go Home</button></p>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigateTo('login');
            return;
        }
        addToCart(selectedProduct);
        navigateTo('cart');
    }

    const discount = Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100);

    return (
        <div className="pb-24 bg-white">
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <button onClick={() => navigateTo('home')} className="p-2 -ml-2">
                        <ArrowLeftIcon />
                    </button>
                    <button onClick={() => addToWishlist(selectedProduct)} className="p-2">
                         <HeartIcon filled={isProductInWishlist(selectedProduct.id)} className={`w-6 h-6 ${isProductInWishlist(selectedProduct.id) ? 'text-red-500' : 'text-gray-600'}`} />
                    </button>
                </div>
            </header>

            <main>
                <div className="mb-4">
                    <img src={mainImage} alt={selectedProduct.name} className="w-full h-80 object-cover" />
                    <div className="flex space-x-2 p-2 overflow-x-auto">
                        {selectedProduct.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-purple-600' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="px-4">
                    <h1 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h1>
                    <div className="flex items-center mt-2">
                        <RatingStars rating={selectedProduct.rating} />
                        <span className="text-sm text-gray-500 ml-2">({selectedProduct.reviewCount} reviews)</span>
                    </div>

                    <div className="flex items-baseline space-x-2 mt-4">
                        <p className="text-3xl font-bold text-purple-600">₹{selectedProduct.price.toFixed(2)}</p>
                        <p className="text-lg text-gray-500 line-through">₹{selectedProduct.originalPrice.toFixed(2)}</p>
                        {discount > 0 && <span className="text-base font-semibold text-green-600">{discount}% OFF</span>}
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">{selectedProduct.description}</p>
                    </div>
                </div>
            </main>
            
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] p-3">
                <div className="flex space-x-3 max-w-lg mx-auto">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
