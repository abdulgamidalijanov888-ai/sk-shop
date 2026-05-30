'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('sk-shop-current-user', JSON.stringify(data.user));
        localStorage.setItem('sk-shop-token', data.token);
        router.push('/profile');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/profile' });
  };

  const handleYandexSignIn = () => {
    signIn('yandex', { callbackUrl: '/profile' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', padding: '16px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
        <Link href="/profile">
          <button style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
            <ArrowLeft size={22} color="#000000" />
          </button>
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>Войти</h1>

        {/* Google */}
        <button onClick={handleGoogleSignIn} style={{ width: '100%', padding: '15px', backgroundColor: '#F2F2F2', color: '#333', border: '1px solid #DDD', borderRadius: '14px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Войти через Google
        </button>

        {/* Яндекс */}
        <button onClick={handleYandexSignIn} style={{ width: '100%', padding: '15px', backgroundColor: '#FC3F1D', color: '#FFF', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Я</span>
          Войти через Яндекс
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5' }} />
          <span style={{ color: '#8E8E93', fontSize: '14px' }}>или</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5' }} />
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#FF3B3020', color: '#FF3B30', borderRadius: '12px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.ru" required style={{ width: '100%', padding: '14px', backgroundColor: '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', outline: 'none' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Пароль</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" required style={{ width: '100%', padding: '14px', backgroundColor: '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#8E8E93' }}>
          Нет аккаунта?{' '}
          <Link href="/auth/register" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '500' }}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}