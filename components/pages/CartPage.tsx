
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../layout/BottomNav';
import { ArrowLeftIcon, MinusIcon, PlusIcon, TrashIcon } from '../../assets/icons';

const CartPage: React.FC = () => {
    const { cart, navigateTo, updateCartQuantity, removeFromCart, isAuthenticated } = useApp();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigateTo('login');
        }
    }, [isAuthenticated, navigateTo]);

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 50.00 : 0;
    const total = subtotal + shipping;

    if (!isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
    }

    return (
        <div className="pb-20 bg-gray-100 min-h-screen">
            <header className="sticky top-0 z-20 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('home')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Cart ({cart.length})</h1>
                </div>
            </header>

            <main className="container mx-auto p-4">
                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600 text-lg">Your cart is empty.</p>
                        <button onClick={() => navigateTo('home')} className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">Shop Now</button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-md"/>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-gray-800">{item.product.name}</h3>
                                        {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                                        <p className="text-lg font-bold text-gray-900 mt-1">₹{item.product.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1.5"><MinusIcon /></button>
                                                <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                                                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1.5"><PlusIcon /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-gray-500 hover:text-red-500">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg shadow p-4 mt-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
                                <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2 mt-2"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                            </div>
                        </div>

                        <div className="mt-6">
                             <button 
                                onClick={() => navigateTo('checkout')}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </main>
            <BottomNav />
        </div>
    );
};

export default CartPage;