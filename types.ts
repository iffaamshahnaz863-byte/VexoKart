
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
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Delivered' | 'Processing' | 'Cancelled';
}

export interface User {
    name: string;
    email: string;
}

export type Page = 'home' | 'productList' | 'productDetail' | 'cart' | 'profile' | 'checkout' | 'orderConfirmation' | 'wishlist' | 'orderHistory' | 'login' | 'signup';

export interface AppContextType {
  page: Page;
  pageData: any;
  selectedProduct: Product | null;
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  isAuthenticated: boolean;
  user: User | null;
  navigateTo: (page: Page, data?: any) => void;
  selectProduct: (product: Product) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isProductInWishlist: (productId: number) => boolean;
  placeOrder: (cart: CartItem[], total: number) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
}
