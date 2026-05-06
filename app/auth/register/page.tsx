'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('sk-shop-current-user', JSON.stringify(data.user));
        setSuccess(true);
        setTimeout(() => {
          router.push('/profile');
        }, 1000);
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Регистрация успешна!</h2>
          <p style={{ color: '#8E8E93' }}>Перенаправляем в профиль...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', padding: '16px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/profile">
            <button style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={22} color="#000000" />
            </button>
          </Link>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>Регистрация</h1>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#FF3B3020', color: '#FF3B30', borderRadius: '12px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Имя</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" required style={{ width: '100%', padding: '14px', backgroundColor: '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: '#000000', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.ru" required style={{ width: '100%', padding: '14px', backgroundColor: '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: '#000000', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Пароль</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Минимум 6 символов" required minLength={6} style={{ width: '100%', padding: '14px', backgroundColor: '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: '#000000', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#8E8E93' }}>
          Уже есть аккаунт?{' '}
          <Link href="/auth/signin" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '500' }}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}