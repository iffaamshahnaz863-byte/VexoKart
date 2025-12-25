
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  stock: number;
  sizes?: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface CartItem {
  id: string; // Unique identifier for product-size combination, e.g., "123-M"
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Delivered' | 'Processing' | 'Cancelled';
    user?: User;
}

export interface User {
    name: string;
    email: string;
}

export type Page = 'home' | 'productList' | 'productDetail' | 'cart' | 'profile' | 'checkout' | 'orderConfirmation' | 'wishlist' | 'orderHistory' | 'login' | 'signup' | 'adminLogin' | 'adminDashboard' | 'adminManageProducts' | 'adminManageOrders' | 'adminManageUsers' | 'adminManageBanners';

export interface AppContextType {
  page: Page;
  pageData: any;
  products: Product[];
  banners: Banner[];
  selectedProduct: Product | null;
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  users: User[];
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  user: User | null;
  navigateTo: (page: Page, data?: any) => void;
  selectProduct: (product: Product) => void;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isProductInWishlist: (productId: number) => boolean;
  placeOrder: (cart: CartItem[], total: number) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  deleteBanner: (bannerId: number) => void;
}