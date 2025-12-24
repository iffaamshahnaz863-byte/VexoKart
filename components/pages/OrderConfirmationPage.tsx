
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircleIcon } from '../../assets/icons';

const OrderConfirmationPage: React.FC = () => {
    const { pageData, navigateTo } = useApp();
    const order = pageData;

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
                <h1 className="text-xl font-bold">No order details found.</h1>
                <button onClick={() => navigateTo('home')} className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">
                    Go to Homepage
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <CheckCircleIcon />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Thank You!</h1>
            <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
            <p className="text-gray-600 mt-1">Order ID: <span className="font-semibold text-gray-800">{order.id}</span></p>

            <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 mt-8 border">
                 <h2 className="font-bold text-lg mb-2">Order Summary</h2>
                 <div className="space-y-1 text-left text-sm">
                    {order.items.map((item: any) => (
                        <div key={item.product.id} className="flex justify-between">
                            <span className="text-gray-600">{item.product.name} x {item.quantity}</span>
                            <span className="text-gray-800">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                 </div>
                 <div className="flex justify-between font-bold text-base border-t mt-3 pt-2">
                     <span>Total Paid</span>
                     <span>₹{order.total.toFixed(2)}</span>
                 </div>
            </div>

            <div className="mt-8 w-full max-w-md space-y-3">
                <button onClick={() => navigateTo('home')} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg">
                    Continue Shopping
                </button>
                <button onClick={() => navigateTo('orderHistory')} className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg">
                    View My Orders
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
