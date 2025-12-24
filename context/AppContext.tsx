
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { AppContextType, Page, Product, CartItem, Order, User } from '../types';
import { products as mockProducts } from '../data';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<Page>('home');
    const [pageData, setPageData] = useState<any>(null);
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const navigateTo = useCallback((newPage: Page, data?: any) => {
        setPage(newPage);
        setPageData(data || null);
        window.scrollTo(0, 0);
    }, []);

    const login = (name: string, email: string) => {
        const newUser = { name, email };
        setUser(newUser);
        setUsers(prev => [...prev.filter(u => u.email !== email), newUser]);
        setIsAuthenticated(true);
        navigateTo('profile');
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setCart([]);
        setWishlist([]);
        // Keep orders and users
        navigateTo('home');
    };

    const adminLogin = (email: string, pass: string): boolean => {
        if (email === 'admin@vexokart.com' && pass === 'admin123') {
            setIsAdminAuthenticated(true);
            navigateTo('adminDashboard');
            return true;
        }
        return false;
    };

    const adminLogout = () => {
        setIsAdminAuthenticated(false);
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
            user: user || undefined,
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        navigateTo('orderConfirmation', newOrder);
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? { ...o, status } : o));
    }

    const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
        const newProduct: Product = {
            ...productData,
            id: Date.now(),
            rating: 0,
            reviewCount: 0,
        };
        setProducts(prev => [newProduct, ...prev]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (productId: number) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };


    const value = {
        page,
        pageData,
        products,
        selectedProduct,
        cart,
        wishlist,
        orders,
        users,
        isAuthenticated,
        isAdminAuthenticated,
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
        adminLogin,
        adminLogout,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
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
