'use client';

import { useEffect, useState } from 'react';
import { Heart, ShoppingBag, Sun, Moon, Search, X } from 'lucide-react';
import { useStore } from './store/useStore';
import Link from 'next/link';
import BottomNav from './components/BottomNav';

export default function HomePage() {
  const { darkMode, toggleDarkMode, addToCart, toggleFavorite, isFavorite, cart, products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF' }}>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: darkMode ? 'rgba(10,10,10,0.8)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        padding: '12px 16px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <h1 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#D4AF37',
                  letterSpacing: '4px',
                  textShadow: darkMode 
                    ? '0 0 20px rgba(212, 175, 55, 0.5)' 
                    : '0 0 20px rgba(212, 175, 55, 0.3)',
                  margin: 0,
                  display: 'inline-block',
                }}>
                  SK SHOP
                </h1>
              </Link>
            </div>
            
            <div style={{ 
              position: 'absolute', 
              right: 0, 
              top: '50%', 
              transform: 'translateY(-50%)',
              display: 'flex', 
              gap: '8px' 
            }}>
              <button onClick={toggleDarkMode} style={{
                padding: '10px',
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer'
              }}>
                {darkMode ? <Sun size={22} color="#D4AF37" /> : <Moon size={22} color="#1A1A1A" />}
              </button>
              <Link href="/cart" style={{ position: 'relative' }}>
                <button style={{
                  padding: '10px',
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <ShoppingBag size={22} color={darkMode ? '#FFFFFF' : '#1A1A1A'} />
                  {cart.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      backgroundColor: '#D4AF37',
                      color: '#000',
                      fontSize: '11px',
                      fontWeight: '700',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {cart.length}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: darkMode ? '#8E8E93' : '#8E8E93'
            }} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 44px',
                backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0',
                border: 'none',
                borderRadius: '30px',
                fontSize: '15px',
                outline: 'none',
                color: darkMode ? '#FFFFFF' : '#000000',
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={16} color={darkMode ? '#8E8E93' : '#8E8E93'} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', fontFamily: "'Playfair Display', serif" }}>
            {searchQuery ? 'Результаты поиска' : 'Рекомендуем'}
          </h2>
          <span style={{ fontSize: '14px', color: '#8E8E93' }}>
            {filteredProducts.length} товаров
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Search size={48} style={{ margin: '0 auto 16px', color: darkMode ? '#3A3A3C' : '#C6C6C8' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Ничего не найдено
            </h3>
            <p style={{ color: '#8E8E93' }}>
              Попробуйте изменить запрос
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const favorite = isFavorite(product.id);
              const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

              return (
                <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="product-card" style={{
                    backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
                  }}>
                    <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                      <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {discount > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(255,59,48,0.9)',
                          color: 'white',
                          fontSize: '13px',
                          fontWeight: '600',
                          padding: '6px 12px',
                          borderRadius: '30px',
                        }}>
                          -{discount}%
                        </span>
                      )}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '10px',
                          backgroundColor: darkMode ? 'rgba(28,28,30,0.8)' : 'rgba(255,255,255,0.8)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '50%',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          zIndex: 10,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Heart size={20} fill={favorite ? '#D4AF37' : 'none'} color={favorite ? '#D4AF37' : darkMode ? '#FFFFFF' : '#1A1A1A'} />
                      </button>
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ fontWeight: '500', fontSize: '15px', marginBottom: '8px' }}>{product.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span className="price-animation" style={{ fontSize: '20px', color: darkMode ? '#FFFFFF' : '#000000' }}>
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {product.oldPrice && (
                          <span style={{ fontSize: '14px', color: '#8E8E93', textDecoration: 'line-through' }}>
                            {product.oldPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
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
                          zIndex: 10,
                          position: 'relative',
                        }}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}