
import React from 'react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import RatingStars from './RatingStars';
import { HeartIcon } from '../../assets/icons';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { selectProduct, addToWishlist, isProductInWishlist } = useApp();
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 group">
            <div className="relative">
                <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => selectProduct(product)}
                />
                {discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>}
                <button 
                    onClick={() => addToWishlist(product)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md text-gray-600 hover:text-red-500 transition-colors"
                >
                    <HeartIcon filled={isProductInWishlist(product.id)} className={`w-5 h-5 ${isProductInWishlist(product.id) ? 'text-red-500' : ''}`} />
                </button>
            </div>
            <div className="p-3">
                <h3 
                    className="text-sm font-semibold text-gray-800 truncate cursor-pointer"
                    onClick={() => selectProduct(product)}
                >{product.name}</h3>
                <div className="flex items-center mt-1">
                    <RatingStars rating={product.rating} />
                    <span className="text-xs text-gray-500 ml-1.5">({product.reviewCount})</span>
                </div>
                <div className="flex items-baseline space-x-2 mt-2">
                    <p className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
