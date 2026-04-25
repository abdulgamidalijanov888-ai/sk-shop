'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '../store/useStore';
import { ArrowLeft, Lock } from 'lucide-react';

function PayContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const orderId = searchParams.get('orderId') || '';
  const name = searchParams.get('name') || '';
  const phone = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';
  const address = searchParams.get('address') || '';
  const productId = searchParams.get('productId') || '';
  const productName = searchParams.get('productName') || '';
  const size = searchParams.get('size') || '';
  const deliveryMethod = searchParams.get('deliveryMethod') || 'courier_mkala';
  const paymentMethod = searchParams.get('paymentMethod') || 'card';
  
  const { darkMode, addOrder } = useStore();
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardDate || !cardCvv) {
      alert('Заполните все поля карты');
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      addOrder({
        customer: { name, phone, email, address },
        items: [{ productId: Number(productId), name: productName, price: Number(amount), quantity: 1, size: size || undefined }],
        total: Number(amount),
        deliveryMethod: deliveryMethod === 'courier_mkala' ? 'Курьер по Махачкале' : deliveryMethod === 'russian_post' ? 'Почта России' : deliveryMethod === 'sdek' ? 'СДЭК' : 'Самовывоз',
        paymentMethod: 'Онлайн оплата',
       status: 'new',
      });
      
      router.push('/success');
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ maxWidth: '420px', width: '100%', backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '24px', padding: '32px', boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => router.back()} style={{ padding: '8px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={20} color={darkMode ? '#FFFFFF' : '#000000'} />
          </button>
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Оплата заказа</h2>
        </div>

        <div style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#8E8E93', marginBottom: '4px' }}>Заказ #{orderId}</p>
          <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '2px' }}>{productName}</p>
          {size && <p style={{ fontSize: '13px', color: '#8E8E93' }}>Размер: {size}</p>}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', color: '#8E8E93' }}>Сумма к оплате</span>
          <p style={{ fontSize: '36px', fontWeight: '700', color: '#D4AF37', marginTop: '4px' }}>{Number(amount).toLocaleString('ru-RU')} ₽</p>
        </div>

        {isProcessing ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '60px', height: '60px', border: '4px solid #D4AF37', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ fontWeight: '600' }}>Обработка платежа...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Номер карты</label>
              <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19))} 
                placeholder="0000 0000 0000 0000" 
                style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} 
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Срок действия</label>
                <input 
                  type="text" 
                  value={cardDate} 
                  onChange={(e) => setCardDate(e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5))} 
                  placeholder="ММ/ГГ" 
                  style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>CVV/CVC</label>
                <input 
                  type="text" 
                  value={cardCvv} 
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} 
                  placeholder="***" 
                  maxLength={3} 
                  style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} 
                />
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '18px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '700', fontSize: '18px', border: 'none', borderRadius: '16px', cursor: 'pointer', marginTop: '8px' }}>
              💳 Оплатить {Number(amount).toLocaleString('ru-RU')} ₽
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
              <Lock size={14} color="#8E8E93" />
              <p style={{ fontSize: '12px', color: '#8E8E93', textAlign: 'center' }}>
                Данные не сохраняются. Это тестовая страница.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Загрузка...</div>}>
      <PayContent />
    </Suspense>
  );
}