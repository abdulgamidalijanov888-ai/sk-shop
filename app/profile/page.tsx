'use client';

import Link from 'next/link';
import { ArrowLeft, User, Package, Heart, MapPin, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const { darkMode } = useStore();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Link href="/">
            <button style={{ padding: '12px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} />
            </button>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: darkMode ? '#FFFFFF' : '#000000' }}>Профиль</h1>
        </div>

        <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '70px', height: '70px', backgroundColor: '#D4AF37', opacity: 0.15, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={36} color="#D4AF37" /></div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: darkMode ? '#FFFFFF' : '#000000' }}>Гость</h2>
            <p style={{ color: '#8E8E93' }}>+7 (999) 123-45-67</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MenuItem icon={<Package size={22} color="#D4AF37" />} label="Мои заказы" href="/orders" darkMode={darkMode} />
          <MenuItem icon={<Heart size={22} color="#D4AF37" />} label="Избранное" href="/favorites" darkMode={darkMode} />
          <MenuItem icon={<MapPin size={22} color="#D4AF37" />} label="Адреса доставки" href="/addresses" darkMode={darkMode} />
          <MenuItem icon={<Settings size={22} color="#D4AF37" />} label="Админ-панель" href="/admin" darkMode={darkMode} />
        </div>

        <button style={{ width: '100%', marginTop: '24px', padding: '16px', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#FF3B30', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}>
          <LogOut size={18} /> Выйти
        </button>
      </div>
      <BottomNav />
    </div>
  );
}

function MenuItem({ icon, label, href, darkMode }: any) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {icon}
          <span style={{ color: darkMode ? '#FFFFFF' : '#000000' }}>{label}</span>
        </div>
        <ChevronRight size={18} color="#8E8E93" />
      </div>
    </Link>
  );
}