
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftIcon } from '../../assets/icons';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const CheckoutPage: React.FC = () => {
    const { cart, navigateTo, placeOrder, isAuthenticated, user } = useApp();
    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigateTo('login');
        } else if (cart.length === 0) {
            navigateTo('cart');
        }
    }, [isAuthenticated, cart, navigateTo]);

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 50.00;
    const total = subtotal + shipping;

    const handlePayment = () => {
        setIsLoading(true);
        if (paymentMethod === 'cod') {
            setTimeout(() => {
                placeOrder(cart, total);
                setIsLoading(false);
            }, 1500);
        } else {
            const options = {
                key: "rzp_test_RvMWPrY8vqt8VV",
                amount: total * 100,
                currency: "INR",
                name: "VexoKart",
                description: "Test Transaction",
                image: "https://picsum.photos/id/237/200/200",
                handler: function (response: any) {
                    console.log('Razorpay Response:', response);
                    placeOrder(cart, total);
                    setIsLoading(false);
                },
                prefill: {
                    name: user?.name || "John Doe",
                    email: user?.email || "john.doe@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "VexoKart Corporate Office",
                },
                theme: {
                    color: "#6D28D9",
                },
                modal: {
                    ondismiss: function() {
                        console.log('Checkout form closed');
                        setIsLoading(false);
                    }
                }
            };
            try {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } catch(e) {
                console.error("Razorpay error", e);
                alert("Payment gateway failed to load. Please try again later.");
                setIsLoading(false);
            }
        }
    };
    
    if (!isAuthenticated || cart.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="sticky top-0 z-20 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <button onClick={() => navigateTo('cart')} className="p-2 -ml-2 mr-2">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 pb-24">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Shipping Address</h2>
                    <p className="text-gray-600">{user?.name}</p>
                    <p className="text-gray-600">123 VexoKart Lane, E-commerce City, 12345</p>
                    <button className="text-purple-600 font-semibold mt-2 text-sm">Change</button>
                </div>

                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Order Summary</h2>
                    {cart.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm text-gray-600 py-1">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                 <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Payment Method</h2>
                    <div className="space-y-3">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                            <input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                            <span className="ml-3 text-gray-700">Online Payment (Razorpay)</span>
                        </label>
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                             <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                            <span className="ml-3 text-gray-700">Cash on Delivery</span>
                        </label>
                    </div>
                </div>
            </main>
            
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] p-3">
                <div className="flex justify-between items-center max-w-lg mx-auto mb-2 px-1">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                </div>
                <button 
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : `Place Order`}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
