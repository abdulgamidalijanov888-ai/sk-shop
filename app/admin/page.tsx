'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, Product } from '../store/useStore';
import Link from 'next/link';
import { 
  ArrowLeft, Package, ShoppingBag, Star, DollarSign, 
  Plus, Edit, Trash2, LogOut, BarChart3, Settings, X, Home, Upload, Image as ImageIcon
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { darkMode, isAdmin, adminLogin, adminLogout, products, orders, reviews } = useStore();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'reviews'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Неверный пароль');
    }
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalReviews = reviews.length;
  const pendingOrders = orders.filter(o => o.status === 'new' || o.status === 'processing').length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.1)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '32px',
              fontWeight: '800',
              color: '#D4AF37',
              marginBottom: '8px',
            }}>
              SK SHOP
            </h1>
            <p style={{ color: darkMode ? '#8E8E93' : '#666666' }}>Админ-панель</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: darkMode ? '#FFFFFF' : '#000000',
              }}>
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  color: darkMode ? '#FFFFFF' : '#000000',
                  outline: 'none',
                }}
                autoFocus
              />
              {loginError && (
                <p style={{ color: '#FF3B30', fontSize: '14px', marginTop: '8px' }}>{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#D4AF37',
                color: '#000',
                fontWeight: '700',
                fontSize: '16px',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
              }}
            >
              Войти
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/" style={{
              color: '#D4AF37',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <ArrowLeft size={16} />
              Вернуться в магазин
            </Link>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '13px',
            color: darkMode ? '#5C5C5E' : '#999999',
          }}>
            Пароль: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F5',
      display: 'flex',
    }}>
      <aside style={{
        width: '280px',
        backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
        borderRight: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}`,
        padding: '24px 16px',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'auto',
      }}>
        <div style={{ marginBottom: '32px', paddingLeft: '16px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            fontWeight: '800',
            color: '#D4AF37',
          }}>
            SK SHOP
          </h2>
          <p style={{ fontSize: '13px', color: darkMode ? '#8E8E93' : '#666666', marginTop: '4px' }}>
            Администратор
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <MenuItem icon={<BarChart3 size={20} />} label="Дашборд" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} darkMode={darkMode} />
          <MenuItem icon={<Package size={20} />} label="Товары" active={activeTab === 'products'} onClick={() => setActiveTab('products')} darkMode={darkMode} badge={totalProducts} />
          <MenuItem icon={<ShoppingBag size={20} />} label="Заказы" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} darkMode={darkMode} badge={pendingOrders > 0 ? pendingOrders : undefined} />
          <MenuItem icon={<Star size={20} />} label="Отзывы" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} darkMode={darkMode} badge={totalReviews} />
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <MenuItem icon={<Home size={20} />} label="В магазин" onClick={() => {}} darkMode={darkMode} />
          </Link>
          <MenuItem icon={<LogOut size={20} />} label="Выйти" onClick={() => { adminLogout(); router.push('/'); }} darkMode={darkMode} danger />
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '280px', padding: '32px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: darkMode ? '#FFFFFF' : '#000000' }}>
            {activeTab === 'dashboard' && 'Дашборд'}
            {activeTab === 'products' && 'Управление товарами'}
            {activeTab === 'orders' && 'Управление заказами'}
            {activeTab === 'reviews' && 'Управление отзывами'}
          </h1>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <StatCard icon={<DollarSign size={24} />} label="Выручка" value={`${totalRevenue.toLocaleString('ru-RU')} ₽`} darkMode={darkMode} />
              <StatCard icon={<ShoppingBag size={24} />} label="Заказы" value={totalOrders.toString()} subValue={`${pendingOrders} в обработке`} darkMode={darkMode} />
              <StatCard icon={<Package size={24} />} label="Товары" value={totalProducts.toString()} darkMode={darkMode} />
              <StatCard icon={<Star size={24} />} label="Рейтинг" value={averageRating} subValue={`${totalReviews} отзывов`} darkMode={darkMode} />
            </div>
          </div>
        )}

        {activeTab === 'products' && <ProductsPanel darkMode={darkMode} />}
        {activeTab === 'orders' && <OrdersPanel darkMode={darkMode} />}
        {activeTab === 'reviews' && <ReviewsPanel darkMode={darkMode} />}
      </main>
    </div>
  );
}

function MenuItem({ icon, label, active, onClick, darkMode, badge, danger }: any) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
      backgroundColor: active ? '#D4AF37' : 'transparent',
      color: active ? '#000' : danger ? '#FF3B30' : darkMode ? '#FFFFFF' : '#000000',
      border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500',
      cursor: 'pointer', width: '100%', transition: 'all 0.2s', position: 'relative',
    }}>
      {icon}
      <span>{label}</span>
      {badge && !active && (
        <span style={{ marginLeft: 'auto', backgroundColor: danger ? '#FF3B30' : '#D4AF37', color: danger ? '#FFF' : '#000', fontSize: '12px', fontWeight: '600', padding: '2px 8px', borderRadius: '20px' }}>
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, label, value, subValue, darkMode }: any) {
  return (
    <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', padding: '24px' }}>
      <div style={{ width: '48px', height: '48px', backgroundColor: '#D4AF37', opacity: 0.15, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <span style={{ color: '#D4AF37' }}>{icon}</span>
      </div>
      <p style={{ color: '#8E8E93', fontSize: '14px', marginBottom: '8px' }}>{label}</p>
      <p style={{ fontSize: '28px', fontWeight: '700', color: darkMode ? '#FFFFFF' : '#000000' }}>{value}</p>
      {subValue && <p style={{ fontSize: '13px', color: '#8E8E93', marginTop: '4px' }}>{subValue}</p>}
    </div>
  );
}

function ProductsPanel({ darkMode }: { darkMode: boolean }) {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', price: '', oldPrice: '', img: '', description: '', category: '', inStock: true,
  });

  const resetForm = () => setFormData({ name: '', price: '', oldPrice: '', img: '', description: '', category: '', inStock: true });

  const handleAddProduct = () => {
    if (!formData.name || !formData.price) { alert('Название и цена обязательны'); return; }
    if (!formData.img) { alert('Загрузите фото товара'); return; }
    addProduct({
      name: formData.name, price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      img: formData.img,
      description: formData.description, category: formData.category,
      inStock: formData.inStock, sizes: ['S', 'M', 'L', 'XL'], characteristics: [],
    });
    resetForm(); setShowAddModal(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    if (!formData.name || !formData.price) { alert('Название и цена обязательны'); return; }
    if (!formData.img) { alert('Загрузите фото товара'); return; }
    updateProduct(editingProduct.id, {
      name: formData.name, price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      img: formData.img, description: formData.description,
      category: formData.category, inStock: formData.inStock,
    });
    setShowEditModal(false); setEditingProduct(null); resetForm();
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price.toString(),
      oldPrice: product.oldPrice?.toString() || '', img: product.img,
      description: product.description || '', category: product.category || '',
      inStock: product.inStock !== false,
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => { resetForm(); setShowAddModal(true); }} style={{ padding: '14px 24px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Добавить товар
        </button>
      </div>

      <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#8E8E93' }}>ID</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#8E8E93' }}>Фото</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#8E8E93' }}>Название</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#8E8E93' }}>Цена</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#8E8E93' }}>Категория</th>
              <th style={{ padding: '16px', textAlign: 'center', color: '#8E8E93' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` }}>
                <td style={{ padding: '16px' }}>#{product.id}</td>
                <td style={{ padding: '16px' }}><img src={product.img} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} /></td>
                <td style={{ padding: '16px', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '16px', color: '#D4AF37', fontWeight: '600' }}>{product.price.toLocaleString('ru-RU')} ₽</td>
                <td style={{ padding: '16px' }}>{product.category || '—'}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button onClick={() => openEditModal(product)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#007AFF' }}><Edit size={18} /></button>
                    <button onClick={() => { if (confirm(`Удалить "${product.name}"?`)) deleteProduct(product.id); }} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#FF3B30' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <ProductModal title="Добавить товар" formData={formData} setFormData={setFormData} onSave={handleAddProduct} onClose={() => { setShowAddModal(false); resetForm(); }} darkMode={darkMode} />}
      {showEditModal && <ProductModal title="Редактировать товар" formData={formData} setFormData={setFormData} onSave={handleEditProduct} onClose={() => { setShowEditModal(false); setEditingProduct(null); resetForm(); }} darkMode={darkMode} />}
    </div>
  );
}

function ProductModal({ title, formData, setFormData, onSave, onClose, darkMode }: any) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер 5 МБ');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData({ ...formData, img: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const clearImage = () => {
    setFormData({ ...formData, img: '' });
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.7)', 
        backdropFilter: 'blur(5px)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 1000, 
        padding: '16px' 
      }} 
      onClick={onClose}
    >
      <div 
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          maxHeight: '90vh', 
          overflowY: 'auto',
          backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
          borderRadius: '24px', 
          padding: '24px' 
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: darkMode ? '#FFFFFF' : '#000000' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={24} color={darkMode ? '#FFFFFF' : '#000000'} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input label="Название *" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} darkMode={darkMode} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input label="Цена *" type="number" value={formData.price} onChange={(e: any) => setFormData({ ...formData, price: e.target.value })} darkMode={darkMode} />
            <Input label="Старая цена" type="number" value={formData.oldPrice} onChange={(e: any) => setFormData({ ...formData, oldPrice: e.target.value })} darkMode={darkMode} />
          </div>
          
          <Input label="Категория" value={formData.category} onChange={(e: any) => setFormData({ ...formData, category: e.target.value })} darkMode={darkMode} />
          
          {/* ЗАГРУЗКА ФОТО */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: darkMode ? '#FFFFFF' : '#000000' }}>Фото товара *</label>
            
            {formData.img ? (
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <img 
                  src={formData.img} 
                  alt="Предпросмотр" 
                  style={{ 
                    width: '100%', 
                    maxHeight: '200px', 
                    objectFit: 'contain', 
                    borderRadius: '12px',
                    backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0'
                  }} 
                />
                <button 
                  onClick={clearImage}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px',
                    backgroundColor: '#FF3B30',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} color="white" />
                </button>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragActive ? '#D4AF37' : darkMode ? '#2C2C2E' : '#E5E5E5'}`,
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center',
                  backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <Upload size={32} style={{ margin: '0 auto 12px', color: dragActive ? '#D4AF37' : '#8E8E93' }} />
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>
                  {dragActive ? 'Отпустите файл' : 'Нажмите или перетащите фото'}
                </p>
                <p style={{ fontSize: '13px', color: '#8E8E93' }}>
                  PNG, JPG, GIF до 5 МБ
                </p>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: darkMode ? '#FFFFFF' : '#000000' }}>Описание</label>
            <textarea 
              value={formData.description} 
              onChange={(e: any) => setFormData({ ...formData, description: e.target.value })} 
              rows={3} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', 
                border: 'none', 
                borderRadius: '12px', 
                fontSize: '16px', 
                color: darkMode ? '#FFFFFF' : '#000000', 
                outline: 'none', 
                resize: 'vertical' 
              }} 
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input 
              type="checkbox" 
              id="inStock" 
              checked={formData.inStock} 
              onChange={(e: any) => setFormData({ ...formData, inStock: e.target.checked })} 
              style={{ width: '20px', height: '20px', cursor: 'pointer' }} 
            />
            <label htmlFor="inStock" style={{ cursor: 'pointer', color: darkMode ? '#FFFFFF' : '#000000' }}>В наличии</label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={onClose} style={{ 
            flex: 1, padding: '16px', 
            backgroundColor: darkMode ? '#2C2C2E' : '#F0F0F0',
            color: darkMode ? '#FFFFFF' : '#000000', 
            fontWeight: '600', fontSize: '16px',
            border: 'none', borderRadius: '16px', cursor: 'pointer' 
          }}>
            Отмена
          </button>
          <button onClick={onSave} style={{ 
            flex: 1, padding: '16px', 
            backgroundColor: '#D4AF37',
            color: '#000', 
            fontWeight: '600', fontSize: '16px',
            border: 'none', borderRadius: '16px', cursor: 'pointer' 
          }}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = 'text', value, onChange, darkMode }: any) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: darkMode ? '#FFFFFF' : '#000000' }}>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        style={{ 
          width: '100%', 
          padding: '14px', 
          backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', 
          border: 'none', 
          borderRadius: '12px', 
          fontSize: '16px', 
          color: darkMode ? '#FFFFFF' : '#000000', 
          outline: 'none' 
        }} 
      />
    </div>
  );
}

function OrdersPanel({ darkMode }: { darkMode: boolean }) {
  const { orders, updateOrderStatus } = useStore();
  if (orders.length === 0) return <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', padding: '60px', textAlign: 'center', color: '#8E8E93' }}>Нет заказов</div>;

  return (
    <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` }}>
            <th style={{ padding: '16px', color: '#8E8E93' }}>№</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Клиент</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Товары</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Сумма</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Доставка</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` }}>
              <td style={{ padding: '16px' }}>{order.id}</td>
              <td style={{ padding: '16px' }}><div>{order.customer.name}</div><div style={{ fontSize: '13px', color: '#8E8E93' }}>{order.customer.phone}</div></td>
              <td style={{ padding: '16px' }}>{order.items.length} поз.</td>
              <td style={{ padding: '16px', color: '#D4AF37', fontWeight: '600' }}>{order.total.toLocaleString('ru-RU')} ₽</td>
              <td style={{ padding: '16px' }}>{order.deliveryMethod}</td>
              <td style={{ padding: '16px' }}>
                <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as any)} style={{ padding: '8px 12px', backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', border: 'none', borderRadius: '8px', color: darkMode ? '#FFFFFF' : '#000000', cursor: 'pointer' }}>
                  <option value="new">Новый</option>
                  <option value="processing">В обработке</option>
                  <option value="shipped">Отправлен</option>
                  <option value="delivered">Доставлен</option>
                  <option value="cancelled">Отменён</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewsPanel({ darkMode }: { darkMode: boolean }) {
  const { reviews, deleteReview } = useStore();
  if (reviews.length === 0) return <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', padding: '60px', textAlign: 'center', color: '#8E8E93' }}>Нет отзывов</div>;

  return (
    <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '20px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` }}>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Автор</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Товар ID</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Оценка</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Отзыв</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}>Дата</th>
            <th style={{ padding: '16px', color: '#8E8E93' }}></th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} style={{ borderBottom: `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` }}>
              <td style={{ padding: '16px' }}>{review.author}</td>
              <td style={{ padding: '16px' }}>#{review.productId}</td>
              <td style={{ padding: '16px' }}>{'⭐'.repeat(review.rating)}</td>
              <td style={{ padding: '16px', maxWidth: '300px' }}>{review.text}</td>
              <td style={{ padding: '16px', color: '#8E8E93' }}>{review.date}</td>
              <td style={{ padding: '16px' }}>
                <button onClick={() => deleteReview(review.id)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#FF3B30' }}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}