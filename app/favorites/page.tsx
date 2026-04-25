'use client';

import { useStore, Product } from '../store/useStore';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const products: Product[] = [
  { id: 1, name: 'Куртка кожаная', price: 14990, oldPrice: 19990, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
  { id: 2, name: 'Кроссовки белые', price: 8990, oldPrice: 12990, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
  { id: 3, name: 'Сумка чёрная', price: 5990, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
  { id: 4, name: 'Часы классика', price: 21990, oldPrice: 29990, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
];

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart, darkMode } = useStore();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <Heart size={64} style={{ margin: '0 auto 24px', color: darkMode ? '#3A3A3C' : '#C6C6C8' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: darkMode ? '#FFFFFF' : '#000000' }}>В избранном пусто</h2>
          <p style={{ color: '#8E8E93', marginBottom: '32px', fontSize: '16px' }}>Добавляйте товары, нажимая на сердечко</p>
          <Link href="/">
            <button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>
              Перейти к покупкам
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Link href="/">
            <button style={{ padding: '12px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} />
            </button>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: darkMode ? '#FFFFFF' : '#000000' }}>Избранное</h1>
        </div>

        <div className="product-grid">
          {favoriteProducts.map((product) => (
            <div key={product.id} style={{
              backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
            }}>
              <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={() => toggleFavorite(product.id)} style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '10px',
                  backgroundColor: darkMode ? 'rgba(28,28,30,0.8)' : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  <Heart size={20} fill="#D4AF37" color="#D4AF37" />
                </button>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontWeight: '500', fontSize: '15px', marginBottom: '8px', color: darkMode ? '#FFFFFF' : '#000000' }}>{product.name}</h3>
                <p style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>{product.price.toLocaleString('ru-RU')} ₽</p>
                <button 
  onClick={() => addToCart(product)} 
  className="btn-cart-animation"
  style={{
    width: '100%',
    padding: '14px',
    backgroundColor: '#D4AF37',
    color: '#000',
    fontWeight: '600',
    fontSize: '15px',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
  }}
>
  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}