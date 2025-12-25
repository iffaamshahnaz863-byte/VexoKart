
import type { Product, Category } from './types';

export const categories: Category[] = [
  { id: 1, name: 'Electronics', image: 'https://picsum.photos/id/1/200/200' },
  { id: 2, name: 'Fashion', image: 'https://picsum.photos/id/103/200/200' },
  { id: 3, name: 'Home', image: 'https://picsum.photos/id/20/200/200' },
  { id: 4, name: 'Books', image: 'https://picsum.photos/id/24/200/200' },
  { id: 5, name: 'Toys', image: 'https://picsum.photos/id/35/200/200' },
  { id: 6, name: 'Grocery', image: 'https://picsum.photos/id/40/200/200' },
];

export const products: Product[] = [];

export const banners = [
    { id: 1, image: 'https://picsum.photos/id/12/1200/400', title: 'Big Holiday Sale!', subtitle: 'Up to 50% off on electronics' },
    { id: 2, image: 'https://picsum.photos/id/15/1200/400', title: 'New Fashion Arrivals', subtitle: 'Discover the latest trends' },
];
