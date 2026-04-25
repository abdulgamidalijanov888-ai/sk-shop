'use client';

import Link from 'next/link';
import { useStore } from '../store/useStore';

export default function SuccessPage() {
  const { darkMode } = useStore();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', color: darkMode ? '#FFFFFF' : '#000000' }}>Заказ оплачен!</h1>
      <p style={{ color: '#8E8E93', marginBottom: '32px', fontSize: '16px' }}>Спасибо за покупку! Мы свяжемся с вами в ближайшее время.</p>
      <Link href="/">
        <button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>
          Вернуться в каталог
        </button>
      </Link>
    </div>
  );
}