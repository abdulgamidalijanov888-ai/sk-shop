'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import Link from 'next/link';
import { Trash2, ArrowLeft, ShoppingBag, Send, CreditCard, Truck } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, darkMode, addOrder } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Состояние для формы заказа
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'courier_mkala',
    paymentMethod: 'card',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData.name.trim()) { alert('Введите ваше имя'); return; }
    if (!orderData.phone.trim()) { alert('Введите номер телефона'); return; }
    if (!orderData.address.trim()) { alert('Введите адрес доставки'); return; }

    // Создаём заказ
    addOrder({
      customer: {
        name: orderData.name,
        phone: orderData.phone,
        email: orderData.email,
        address: orderData.address,
      },
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })),
      total: total,
      deliveryMethod: orderData.deliveryMethod === 'courier_mkala' ? 'Курьер по Махачкале' :
                     orderData.deliveryMethod === 'russian_post' ? 'Почта России' :
                     orderData.deliveryMethod === 'sdek' ? 'СДЭК' : 'Самовывоз',
      paymentMethod: orderData.paymentMethod === 'card' ? 'Онлайн оплата' :
                     orderData.paymentMethod === 'cash' ? 'Наличными при получении' : 'Картой при получении',
      status: 'new',
    });

    // Очищаем корзину и показываем успех
    clearCart();
    setOrderSuccess(true);
  };

  // Экран успешного заказа
  if (orderSuccess) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ textAlign: 'center', maxWidth: '450px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Заказ оформлен!</h2>
          <p style={{ color: '#8E8E93', marginBottom: '24px' }}>Спасибо за заказ! Мы свяжемся с вами в ближайшее время.</p>
          <Link href="/">
            <button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>
              Вернуться к покупкам
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Пустая корзина
  if (cart.length === 0 && !showCheckout) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <ShoppingBag size={64} style={{ margin: '0 auto 24px', color: darkMode ? '#3A3A3C' : '#C6C6C8' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: darkMode ? '#FFFFFF' : '#000000' }}>Корзина пуста</h2>
          <p style={{ color: '#8E8E93', marginBottom: '32px', fontSize: '16px' }}>Добавьте товары из каталога</p>
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
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
        {/* Шапка */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Link href="/">
            <button style={{ padding: '12px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} />
            </button>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: '700', flex: 1 }}>{showCheckout ? 'Оформление заказа' : 'Корзина'}</h1>
          {!showCheckout && (
            <button onClick={clearCart} style={{ color: '#FF3B30', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>Очистить</button>
          )}
        </div>

        {!showCheckout ? (
          <>
            {/* Список товаров */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', padding: '16px', display: 'flex', gap: '16px', boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)' }}>
                  <img src={item.img} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>{item.name}</h3>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37' }}>{item.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ padding: '10px', backgroundColor: darkMode ? 'rgba(255,59,48,0.15)' : 'rgba(255,59,48,0.1)', borderRadius: '30px', border: 'none', cursor: 'pointer', height: 'fit-content' }}>
                    <Trash2 size={18} color="#FF3B30" />
                  </button>
                </div>
              ))}
            </div>

            {/* Итого */}
            <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', padding: '20px', boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#8E8E93' }}>Товары ({cart.length})</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', paddingTop: '16px', borderTop: darkMode ? '1px solid #2C2C2E' : '1px solid #F0F0F0' }}>
                <span>Итого</span>
                <span style={{ color: '#D4AF37' }}>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Кнопка перехода к оформлению */}
            <button onClick={() => setShowCheckout(true)} style={{
              width: '100%', padding: '18px', backgroundColor: '#D4AF37', color: '#000',
              fontWeight: '700', fontSize: '18px', border: 'none', borderRadius: '16px',
              cursor: 'pointer', marginTop: '24px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
            }}>
              <CreditCard size={20} /> Перейти к оформлению
            </button>
          </>
        ) : (
          /* Форма оформления заказа */
          <form onSubmit={handleSubmitOrder}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Контактные данные</h2>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Имя *</label>
                <input type="text" value={orderData.name} onChange={(e) => setOrderData({ ...orderData, name: e.target.value })} placeholder="Ваше имя" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Телефон *</label>
                <input type="tel" value={orderData.phone} onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })} placeholder="+7 (999) 123-45-67" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Email</label>
                <input type="email" value={orderData.email} onChange={(e) => setOrderData({ ...orderData, email: e.target.value })} placeholder="example@mail.ru" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} />
              </div>

              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Адрес доставки *</label>
                <textarea value={orderData.address} onChange={(e) => setOrderData({ ...orderData, address: e.target.value })} placeholder="Город, улица, дом, квартира" rows={2} style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none', resize: 'vertical' }} />
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>Способ доставки</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'courier_mkala', label: 'Курьер по Махачкале', desc: 'Доставка по городу', price: '300 ₽' },
                  { id: 'russian_post', label: 'Почта России', desc: 'От 3 до 14 дней', price: 'от 250 ₽' },
                  { id: 'sdek', label: 'СДЭК', desc: 'Доставка до ПВЗ или курьером', price: 'от 350 ₽' },
                  { id: 'pickup', label: 'Самовывоз', desc: 'Махачкала, ул. Мира 42', price: 'Бесплатно' },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setOrderData({ ...orderData, deliveryMethod: method.id })}
                    style={{
                      padding: '16px',
                      backgroundColor: orderData.deliveryMethod === method.id ? '#D4AF37' : darkMode ? '#1C1C1E' : '#F0F0F0',
                      color: orderData.deliveryMethod === method.id ? '#000' : 'inherit',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{method.label}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7 }}>
                      {method.desc} • {method.price}
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>Способ оплаты</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'card', label: 'Онлайн оплата', icon: <CreditCard size={18} /> },
                  { id: 'cash', label: 'Наличными при получении', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="12" cy="12" r="4" /></svg> },
                  { id: 'card_on_delivery', label: 'Картой при получении', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setOrderData({ ...orderData, paymentMethod: method.id })}
                    style={{
                      padding: '16px',
                      backgroundColor: orderData.paymentMethod === method.id ? '#D4AF37' : darkMode ? '#1C1C1E' : '#F0F0F0',
                      color: orderData.paymentMethod === method.id ? '#000' : 'inherit',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {method.icon}
                    <span style={{ fontWeight: '500' }}>{method.label}</span>
                  </div>
                ))}
              </div>

              {/* Итого */}
              <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '16px', padding: '20px', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#8E8E93' }}>Товары ({cart.length})</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', marginTop: '12px', paddingTop: '12px', borderTop: darkMode ? '1px solid #2C2C2E' : '1px solid #F0F0F0' }}>
                  <span>К оплате</span>
                  <span style={{ color: '#D4AF37' }}>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {/* Кнопки */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowCheckout(false)} style={{
                  flex: 1, padding: '16px', backgroundColor: darkMode ? '#2C2C2E' : '#F0F0F0',
                  color: darkMode ? '#FFFFFF' : '#000000', fontWeight: '600', fontSize: '16px',
                  border: 'none', borderRadius: '16px', cursor: 'pointer',
                }}>
                  Назад
                </button>
                <button type="submit" style={{
                  flex: 2, padding: '16px', backgroundColor: '#D4AF37', color: '#000',
                  fontWeight: '700', fontSize: '16px', border: 'none', borderRadius: '16px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  <Truck size={18} /> Оформить заказ
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <BottomNav />
    </div>
  );
}