'use client';

import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, ShoppingBag } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function OrdersPage() {
  const { darkMode, orders } = useStore();
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sk-shop-current-user');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  // Показываем ВСЕ заказы для всех (для теста)
  const sortedOrders = [...orders].reverse();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'new': return { label: 'Оформлен', color: '#007AFF', icon: <Clock size={20} color="#007AFF" /> };
      case 'processing': return { label: 'В обработке', color: '#FF9500', icon: <Package size={20} color="#FF9500" /> };
      case 'shipped': return { label: 'В пути', color: '#34C759', icon: <Truck size={20} color="#34C759" /> };
      case 'delivered': return { label: 'Доставлен', color: '#30B0C0', icon: <CheckCircle size={20} color="#30B0C0" /> };
      case 'cancelled': return { label: 'Отменён', color: '#FF3B30', icon: <XCircle size={20} color="#FF3B30" /> };
      default: return { label: 'Оформлен', color: '#007AFF', icon: <Clock size={20} color="#007AFF" /> };
    }
  };

  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <Package size={64} style={{ margin: '0 auto 24px', color: darkMode ? '#3A3A3C' : '#C6C6C8' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: darkMode ? '#FFFFFF' : '#000000' }}>Войдите в аккаунт</h2>
          <p style={{ color: '#8E8E93', marginBottom: '24px' }}>Чтобы видеть свои заказы</p>
          <Link href="/auth/signin">
            <button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>
              Войти
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Link href="/profile">
            <button style={{ padding: '12px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} />
            </button>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: darkMode ? '#FFFFFF' : '#000000' }}>Мои заказы</h1>
          <span style={{ color: '#8E8E93', marginLeft: 'auto' }}>{sortedOrders.length} шт.</span>
        </div>

        {sortedOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <ShoppingBag size={64} style={{ margin: '0 auto 24px', color: darkMode ? '#3A3A3C' : '#C6C6C8' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: darkMode ? '#FFFFFF' : '#000000' }}>Нет заказов</h2>
            <p style={{ color: '#8E8E93', marginBottom: '24px' }}>Вы ещё ничего не заказали</p>
            <Link href="/">
              <button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>
                Перейти к покупкам
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sortedOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} style={{
                  backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', color: '#8E8E93', marginBottom: '4px' }}>Заказ</p>
                      <p style={{ fontWeight: '700', fontSize: '16px' }}>{order.id}</p>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 14px', backgroundColor: `${statusInfo.color}15`,
                      borderRadius: '30px',
                    }}>
                      {statusInfo.icon}
                      <span style={{ fontWeight: '600', fontSize: '14px', color: statusInfo.color }}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ 
                        display: 'flex', justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: index < order.items.length - 1 ? `1px solid ${darkMode ? '#2C2C2E' : '#F0F0F0'}` : 'none'
                      }}>
                        <span style={{ fontSize: '14px' }}>{item.name} {item.size && `(${item.size})`} × {item.quantity}</span>
                        <span style={{ fontWeight: '500' }}>{item.price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
                    borderRadius: '12px', padding: '12px', marginBottom: '12px', fontSize: '13px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#8E8E93' }}>Доставка:</span>
                      <span>{order.deliveryMethod}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#8E8E93' }}>Оплата:</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8E8E93' }}>Дата:</span>
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: `1px solid ${darkMode ? '#2C2C2E' : '#F0F0F0'}` }}>
                    <span style={{ fontSize: '16px', fontWeight: '700' }}>Итого</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#D4AF37' }}>
                      {order.total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}