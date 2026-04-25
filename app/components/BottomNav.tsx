'use client';

import Link from 'next/link';
import { Home, Heart, ShoppingBag, MessageCircle, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const { darkMode, cart, favorites } = useStore();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '400px',
      backgroundColor: darkMode ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRadius: '40px',
      padding: '8px',
      boxShadow: darkMode 
        ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset' 
        : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset',
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '30px',
            backgroundColor: isActive('/') ? '#D4AF37' : 'transparent',
            transition: 'all 0.2s'
          }}>
            <Home size={22} color={isActive('/') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93'} />
            <span style={{ fontSize: '11px', fontWeight: isActive('/') ? '600' : '500', marginTop: '4px', color: isActive('/') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93' }}>
              Главная
            </span>
          </div>
        </Link>

        <Link href="/favorites" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '30px',
            backgroundColor: isActive('/favorites') ? '#D4AF37' : 'transparent',
            transition: 'all 0.2s',
            position: 'relative'
          }}>
            <Heart size={22} color={isActive('/favorites') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93'} />
            {favorites.length > 0 && !isActive('/favorites') && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '10px',
                backgroundColor: '#D4AF37',
                color: '#000',
                fontSize: '10px',
                fontWeight: '700',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {favorites.length}
              </span>
            )}
            <span style={{ fontSize: '11px', fontWeight: isActive('/favorites') ? '600' : '500', marginTop: '4px', color: isActive('/favorites') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93' }}>
              Избранное
            </span>
          </div>
        </Link>

        <Link href="/cart" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '30px',
            backgroundColor: isActive('/cart') ? '#D4AF37' : 'transparent',
            transition: 'all 0.2s',
            position: 'relative'
          }}>
            <ShoppingBag size={22} color={isActive('/cart') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93'} />
            {cart.length > 0 && !isActive('/cart') && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '10px',
                backgroundColor: '#D4AF37',
                color: '#000',
                fontSize: '10px',
                fontWeight: '700',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
            <span style={{ fontSize: '11px', fontWeight: isActive('/cart') ? '600' : '500', marginTop: '4px', color: isActive('/cart') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93' }}>
              Корзина
            </span>
          </div>
        </Link>

        <Link href="/chat" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '30px',
            backgroundColor: isActive('/chat') ? '#D4AF37' : 'transparent',
            transition: 'all 0.2s'
          }}>
            <MessageCircle size={22} color={isActive('/chat') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93'} />
            <span style={{ fontSize: '11px', fontWeight: isActive('/chat') ? '600' : '500', marginTop: '4px', color: isActive('/chat') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93' }}>
              Чат
            </span>
          </div>
        </Link>

        <Link href="/profile" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '30px',
            backgroundColor: isActive('/profile') ? '#D4AF37' : 'transparent',
            transition: 'all 0.2s'
          }}>
            <User size={22} color={isActive('/profile') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93'} />
            <span style={{ fontSize: '11px', fontWeight: isActive('/profile') ? '600' : '500', marginTop: '4px', color: isActive('/profile') ? '#000' : darkMode ? '#8E8E93' : '#8E8E93' }}>
              Профиль
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}