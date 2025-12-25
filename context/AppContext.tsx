
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { AppContextType, Page, Product, CartItem, Order, User, Banner } from '../types';
import { products as mockProducts } from '../data';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to get initial state from localStorage or return a default
const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
    }
    return defaultValue;
};


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<Page>('home');
    const [pageData, setPageData] = useState<any>(null);

    const [products, setProducts] = useState<Product[]>(() => {
        const storedProducts = getInitialState<Product[]>('vexokart_products', []);
        // If no products are stored, or the stored list is empty, default to mockProducts.
        // This makes the sample products reappear if the admin clears all products.
        if (!storedProducts || storedProducts.length === 0) {
            return mockProducts;
        }
        return storedProducts;
    });
    const [banners, setBanners] = useState<Banner[]>(() => getInitialState('vexokart_banners', []));
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>(() => getInitialState('vexokart_cart', []));
    const [wishlist, setWishlist] = useState<Product[]>(() => getInitialState('vexokart_wishlist', []));
    const [orders, setOrders] = useState<Order[]>(() => getInitialState('vexokart_orders', []));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getInitialState('vexokart_isAuthenticated', false));
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => getInitialState('vexokart_isAdminAuthenticated', false));
    const [user, setUser] = useState<User | null>(() => getInitialState('vexokart_user', null));
    const [users, setUsers] = useState<User[]>(() => getInitialState('vexokart_users', []));

    useEffect(() => { localStorage.setItem('vexokart_products', JSON.stringify(products)); }, [products]);
    useEffect(() => { localStorage.setItem('vexokart_banners', JSON.stringify(banners)); }, [banners]);
    useEffect(() => { localStorage.setItem('vexokart_cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { localStorage.setItem('vexokart_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
    useEffect(() => { localStorage.setItem('vexokart_orders', JSON.stringify(orders)); }, [orders]);
    useEffect(() => { localStorage.setItem('vexokart_isAuthenticated', JSON.stringify(isAuthenticated)); }, [isAuthenticated]);
    useEffect(() => { localStorage.setItem('vexokart_isAdminAuthenticated', JSON.stringify(isAdminAuthenticated)); }, [isAdminAuthenticated]);
    useEffect(() => { localStorage.setItem('vexokart_user', JSON.stringify(user)); }, [user]);
    useEffect(() => { localStorage.setItem('vexokart_users', JSON.stringify(users)); }, [users]);

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

    const addToCart = (product: Product, quantity: number = 1, size?: string) => {
        const cartId = `${product.id}-${size || 'default'}`;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === cartId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === cartId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { id: cartId, product, quantity, selectedSize: size }];
        });
    };

    const removeFromCart = (cartId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== cartId));
    };

    const updateCartQuantity = (cartId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cartId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === cartId ? { ...item, quantity } : item
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

    const addBanner = (bannerData: Omit<Banner, 'id'>) => {
        const newBanner: Banner = {
            ...bannerData,
            id: Date.now(),
        };
        setBanners(prev => [newBanner, ...prev]);
    };

    const deleteBanner = (bannerId: number) => {
        setBanners(prev => prev.filter(b => b.id !== bannerId));
    };

    const value = {
        page,
        pageData,
        products,
        banners,
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
        addBanner,
        deleteBanner,
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