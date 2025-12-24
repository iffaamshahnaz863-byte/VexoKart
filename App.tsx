
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import HomePage from './components/pages/HomePage';
import ProductListPage from './components/pages/ProductListPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import CartPage from './components/pages/CartPage';
import ProfilePage from './components/pages/ProfilePage';
import CheckoutPage from './components/pages/CheckoutPage';
import OrderConfirmationPage from './components/pages/OrderConfirmationPage';
import WishlistPage from './components/pages/WishlistPage';
import OrderHistoryPage from './components/pages/OrderHistoryPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';

const PageRenderer: React.FC = () => {
    const { page, pageData } = useApp();

    switch (page) {
        case 'home':
            return <HomePage />;
        case 'productList':
            return <ProductListPage category={pageData as any} />;
        case 'productDetail':
            return <ProductDetailPage />;
        case 'cart':
            return <CartPage />;
        case 'profile':
            return <ProfilePage />;
        case 'checkout':
            return <CheckoutPage />;
        case 'orderConfirmation':
            return <OrderConfirmationPage />;
        case 'wishlist':
            return <WishlistPage />;
        case 'orderHistory':
            return <OrderHistoryPage />;
        case 'login':
            return <LoginPage />;
        case 'signup':
            return <SignupPage />;
        default:
            return <HomePage />;
    }
};

function App() {
    return (
        <AppProvider>
            <div className="bg-gray-50 min-h-screen font-sans">
                <PageRenderer />
            </div>
        </AppProvider>
    );
}

export default App;
