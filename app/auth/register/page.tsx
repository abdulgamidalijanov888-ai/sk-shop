'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) { setError('Введите email'); return; }
    if (!password || password.length < 6) { setError('Пароль должен быть не менее 6 символов'); return; }

    setLoading(true);

    const users = JSON.parse(localStorage.getItem('sk-shop-users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      setError('Неверный email или пароль');
      setLoading(false);
      return;
    }

    localStorage.setItem('sk-shop-current-user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    router.push('/profile');
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Вход через ${provider} будет доступен после подключения API ключей.\nСейчас зарегистрируйтесь через email.`);
    router.push('/auth/register');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFFFFF', 
      padding: '16px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%', paddingTop: '20px' }}>
        {/* Кнопка назад */}
        <div style={{ marginBottom: '20px' }}>
          <Link href="/profile">
            <button style={{ 
              padding: '10px', 
              backgroundColor: 'rgba(0,0,0,0.03)', 
              borderRadius: '30px', 
              border: 'none', 
              cursor: 'pointer' 
            }}>
              <ArrowLeft size={22} color="#000000" />
            </button>
          </Link>
        </div>

        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '32px',
            fontWeight: '800',
            color: '#D4AF37',
            marginBottom: '8px'
          }}>
            SK SHOP
          </h1>
          <p style={{ color: '#8E8E93', fontSize: '16px' }}>Войдите в аккаунт</p>
        </div>

        {!showEmailForm ? (
          <>
            {/* Социальные кнопки */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Google */}
              <button
                onClick={() => handleSocialLogin('Google')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  color: '#000',
                  border: '1px solid #E5E5E5',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F5F5F5'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Войти через Google
              </button>

              {/* Apple */}
              <button
                onClick={() => handleSocialLogin('Apple')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#000',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Войти через Apple
              </button>

              {/* Яндекс */}
              <button
                onClick={() => handleSocialLogin('Yandex')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#FC3F1D',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">Я</text>
                </svg>
                Войти через Яндекс
              </button>

              {/* Mail.ru */}
              <button
                onClick={() => handleSocialLogin('Mail.ru')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#005FF9',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">@</text>
                </svg>
                Войти через Mail.ru
              </button>

              {/* ВКонтакте */}
              <button
                onClick={() => handleSocialLogin('VK')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#0077FF',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">VK</text>
                </svg>
                Войти через ВКонтакте
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleSocialLogin('Telegram')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#2AABEE',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.35-.49.96-.74 3.77-1.64 6.28-2.72 7.54-3.24 3.59-1.49 4.34-1.75 4.83-1.76.11 0 .35.03.5.17.13.12.17.28.18.45-.01.06-.01.24-.04.38z"/>
                </svg>
                Войти через Telegram
              </button>
            </div>

            {/* Разделитель */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5' }} />
              <span style={{ color: '#8E8E93', fontSize: '14px' }}>или</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5' }} />
            </div>

            {/* Кнопка входа по email */}
            <button
              onClick={() => setShowEmailForm(true)}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#D4AF37',
                color: '#000',
                border: 'none',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <Mail size={20} />
              Войти по email
            </button>
          </>
        ) : (
          /* Форма входа по email */
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#FF3B3020', 
                color: '#FF3B30', 
                borderRadius: '12px', 
                fontSize: '14px', 
                textAlign: 'center' 
              }}>
                {error}
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="example@mail.ru" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: '#F0F0F0', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  color: '#000', 
                  outline: 'none' 
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Пароль</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Введите пароль" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: '#F0F0F0', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  color: '#000', 
                  outline: 'none' 
                }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', 
                padding: '16px', 
                backgroundColor: '#D4AF37', 
                color: '#000', 
                fontWeight: '600', 
                fontSize: '16px', 
                border: 'none', 
                borderRadius: '16px', 
                cursor: 'pointer', 
                opacity: loading ? 0.7 : 1 
              }}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>

            <button 
              type="button"
              onClick={() => setShowEmailForm(false)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#8E8E93',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ← Назад
            </button>
          </form>
        )}

        {/* Нет аккаунта */}
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