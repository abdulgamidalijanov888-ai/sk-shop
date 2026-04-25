import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  img: string;
  description?: string;
  characteristics?: { name: string; value: string }[];
  sizes?: string[];
  images?: string[];
  category?: string;
  inStock?: boolean;
}

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: { productId: number; name: string; price: number; quantity: number; size?: string }[];
  total: number;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryMethod: string;
  paymentMethod: string;
}

interface StoreState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Куртка кожаная',
    price: 14990,
    oldPrice: 19990,
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Премиальная кожаная куртка из натуральной телячьей кожи.',
    characteristics: [
      { name: 'Материал', value: 'Натуральная кожа' },
      { name: 'Страна', value: 'Италия' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Одежда',
    inStock: true,
  },
  {
    id: 2,
    name: 'Кроссовки белые',
    price: 8990,
    oldPrice: 12990,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Стильные белые кроссовки для повседневной носки.',
    characteristics: [
      { name: 'Материал', value: 'Кожа/Текстиль' },
      { name: 'Страна', value: 'Вьетнам' },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    category: 'Обувь',
    inStock: true,
  },
  {
    id: 3,
    name: 'Сумка чёрная',
    price: 5990,
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Элегантная чёрная сумка через плечо.',
    characteristics: [
      { name: 'Материал', value: 'Экокожа' },
      { name: 'Страна', value: 'Китай' },
    ],
    sizes: ['One size'],
    category: 'Аксессуары',
    inStock: true,
  },
  {
    id: 4,
    name: 'Часы классика',
    price: 21990,
    oldPrice: 29990,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Классические наручные часы с кожаным ремешком.',
    characteristics: [
      { name: 'Механизм', value: 'Кварцевый' },
      { name: 'Страна', value: 'Япония' },
    ],
    sizes: ['One size'],
    category: 'Аксессуары',
    inStock: true,
  },
  {
    id: 5,
    name: 'Джинсы синие',
    price: 4990,
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
    description: 'Классические синие джинсы прямого кроя.',
    characteristics: [
      { name: 'Материал', value: 'Деним' },
      { name: 'Страна', value: 'Турция' },
    ],
    sizes: ['30', '32', '34', '36'],
    category: 'Одежда',
    inStock: true,
  },
  {
    id: 6,
    name: 'Футболка белая',
    price: 1990,
    oldPrice: 2990,
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Базовая белая футболка из 100% хлопка.',
    characteristics: [
      { name: 'Материал', value: 'Хлопок 100%' },
      { name: 'Страна', value: 'Бангладеш' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Одежда',
    inStock: true,
  },
];

const ADMIN_PASSWORD = 'admin123';

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        set({ darkMode: newMode });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newMode);
        }
      },
      
      cart: [],
      addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (productId) => set((state) => {
        const index = state.cart.findIndex((item) => item.id === productId);
        if (index === -1) return state;
        const newCart = [...state.cart];
        newCart.splice(index, 1);
        return { cart: newCart };
      }),
      clearCart: () => set({ cart: [] }),
      
      favorites: [],
      toggleFavorite: (productId) => set((state) => ({
        favorites: state.favorites.includes(productId)
          ? state.favorites.filter((id) => id !== productId)
          : [...state.favorites, productId]
      })),
      isFavorite: (productId) => get().favorites.includes(productId),
      
      reviews: [],
      addReview: (reviewData) => set((state) => ({
        reviews: [...state.reviews, {
          ...reviewData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        }]
      })),
      deleteReview: (reviewId) => set((state) => ({
        reviews: state.reviews.filter(r => r.id !== reviewId)
      })),
      getProductReviews: (productId) => {
        return get().reviews.filter(r => r.productId === productId);
      },
      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter(r => r.productId === productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return sum / productReviews.length;
      },
      
      products: initialProducts,
      addProduct: (productData) => set((state) => ({
        products: [...state.products, {
          ...productData,
          id: Math.max(...state.products.map(p => p.id), 0) + 1,
        }]
      })),
      updateProduct: (id, productData) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...productData } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      
      orders: [],
      addOrder: (orderData) => set((state) => ({
        orders: [...state.orders, {
          ...orderData,
          id: 'ORD-' + Date.now().toString().slice(-6),
          date: new Date().toLocaleDateString('ru-RU'),
        }]
      })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      })),
      
      isAdmin: false,
      adminLogin: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      adminLogout: () => set({ isAdmin: false }),
    }),
    { name: 'sk-shop-storage' }
  )
);