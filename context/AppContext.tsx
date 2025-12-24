
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { AppContextType, Page, Product, CartItem, Order, User } from '../types';
import { products as mockProducts } from '../data';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<Page>('home');
    const [pageData, setPageData] = useState<any>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const navigateTo = useCallback((newPage: Page, data?: any) => {
        setPage(newPage);
        setPageData(data || null);
        window.scrollTo(0, 0);
    }, []);

    const login = (name: string, email: string) => {
        setUser({ name, email });
        setIsAuthenticated(true);
        // On successful login, go back to profile or home
        navigateTo('profile');
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setCart([]);
        setWishlist([]);
        setOrders([]);
        navigateTo('home');
    };

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
        navigateTo('productDetail');
    };

    const addToCart = (product: Product, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { product, quantity }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const updateCartQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };
    
    const isProductInWishlist = (productId: number) => {
        return wishlist.some(p => p.id === productId);
    }

    const addToWishlist = (product: Product) => {
        if (!isAuthenticated) {
            navigateTo('login');
            return;
        }
        setWishlist(prev => {
            if (isProductInWishlist(product.id)) {
                return prev.filter(p => p.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist(prev => prev.filter(p => p.id !== productId));
    }
    
    const placeOrder = (orderedItems: CartItem[], total: number) => {
        const newOrder: Order = {
            id: `VXK-${Date.now()}`,
            date: new Date().toISOString(),
            items: orderedItems,
            total,
            status: 'Processing',
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        navigateTo('orderConfirmation', newOrder);
    };

    const value = {
        page,
        pageData,
        selectedProduct,
        cart,
        wishlist,
        orders,
        isAuthenticated,
        user,
        navigateTo,
        selectProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isProductInWishlist,
        placeOrder,
        login,
        logout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
