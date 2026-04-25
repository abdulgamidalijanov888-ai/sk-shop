'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft, Star, ChevronRight, Send, User, X, Truck } from 'lucide-react';
import { useStore, Product } from '../../store/useStore';
import BottomNav from '../../components/BottomNav';

const similarProducts: Product[] = [
  { id: 1, name: 'Куртка кожаная', price: 14990, oldPrice: 19990, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
  { id: 2, name: 'Кроссовки белые', price: 8990, oldPrice: 12990, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
  { id: 5, name: 'Джинсы синие', price: 4990, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop' },
  { id: 6, name: 'Футболка белая', price: 1990, oldPrice: 2990, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
];

export default function ProductPage() {
  const params = useParams();
  const id = Number(params.id);
  const { darkMode, addToCart, toggleFavorite, isFavorite, addReview, getProductReviews, getAverageRating, products, addOrder } = useStore();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const [showBuyNow, setShowBuyNow] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '', phone: '', email: '', address: '',
    deliveryMethod: 'courier_mkala', paymentMethod: 'card',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Товар не найден</h2>
          <Link href="/"><button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>Вернуться в каталог</button></Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ textAlign: 'center', maxWidth: '450px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Заказ оформлен!</h2>
          <p style={{ color: '#8E8E93', marginBottom: '24px' }}>Спасибо за заказ! Мы свяжемся с вами в ближайшее время.</p>
          <Link href="/"><button style={{ padding: '16px 32px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '600', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer' }}>Вернуться к покупкам</button></Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const productReviews = getProductReviews(product.id);
  const averageRating = getAverageRating(product.id);
  const totalReviews = productReviews.length;
  
  const productImages = product.images && product.images.length > 0 ? product.images : [product.img || 'https://via.placeholder.com/400?text=Нет+фото'];
  const productSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
  const productCharacteristics = product.characteristics && product.characteristics.length > 0 ? product.characteristics : [{ name: 'Материал', value: 'Не указан' }, { name: 'Страна', value: 'Не указана' }];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim()) { alert('Введите ваше имя'); return; }
    if (!reviewText.trim()) { alert('Напишите текст отзыва'); return; }
    addReview({ productId: product.id, author: reviewAuthor, rating: reviewRating, text: reviewText });
    setReviewAuthor(''); setReviewRating(5); setReviewText(''); setShowReviewModal(false);
    alert('Спасибо за отзыв!');
  };

  if (showBuyNow) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: darkMode ? 'rgba(10,10,10,0.8)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', padding: '12px 16px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setShowBuyNow(false)} style={{ padding: '10px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}><ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} /></button>
            <h1 style={{ fontSize: '22px', fontWeight: '700' }}>Оформление заказа</h1>
          </div>
        </header>
        
        <main style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
          <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '16px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <img src={productImages[0]} alt={product.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }} />
            <div>
              <h3 style={{ fontWeight: '600' }}>{product.name}</h3>
              {selectedSize && <span style={{ fontSize: '13px', color: '#8E8E93' }}>Размер: {selectedSize}</span>}
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37', marginTop: '4px' }}>{product.price.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontWeight: '600' }}>Контактные данные</h3>
            <div><label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Имя *</label><input type="text" value={orderData.name} onChange={(e) => setOrderData({ ...orderData, name: e.target.value })} placeholder="Ваше имя" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Телефон *</label><input type="tel" value={orderData.phone} onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })} placeholder="+7 (999) 123-45-67" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Email</label><input type="email" value={orderData.email} onChange={(e) => setOrderData({ ...orderData, email: e.target.value })} placeholder="example@mail.ru" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>Адрес доставки *</label><textarea value={orderData.address} onChange={(e) => setOrderData({ ...orderData, address: e.target.value })} placeholder="Город, улица, дом, квартира" rows={2} style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none', resize: 'vertical' }} /></div>

            <h3 style={{ fontWeight: '600' }}>Способ доставки</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'courier_mkala', label: 'Курьер по Махачкале', price: '300 ₽' },
                { id: 'russian_post', label: 'Почта России', price: 'от 250 ₽' },
                { id: 'sdek', label: 'СДЭК', price: 'от 350 ₽' },
                { id: 'pickup', label: 'Самовывоз (ул. Мира 42)', price: 'Бесплатно' },
              ].map((method) => (
                <div key={method.id} onClick={() => setOrderData({ ...orderData, deliveryMethod: method.id })} style={{
                  padding: '14px', backgroundColor: orderData.deliveryMethod === method.id ? '#D4AF37' : darkMode ? '#1C1C1E' : '#F0F0F0',
                  color: orderData.deliveryMethod === method.id ? '#000' : 'inherit', borderRadius: '14px', cursor: 'pointer',
                }}>
                  <div style={{ fontWeight: '600' }}>{method.label}</div>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>{method.price}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: '600' }}>Способ оплаты</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'card', label: 'Онлайн оплата' },
                { id: 'cash', label: 'Наличными при получении' },
                { id: 'card_on_delivery', label: 'Картой при получении' },
              ].map((method) => (
                <div key={method.id} onClick={() => setOrderData({ ...orderData, paymentMethod: method.id })} style={{
                  padding: '14px', backgroundColor: orderData.paymentMethod === method.id ? '#D4AF37' : darkMode ? '#1C1C1E' : '#F0F0F0',
                  color: orderData.paymentMethod === method.id ? '#000' : 'inherit', borderRadius: '14px', cursor: 'pointer',
                }}>
                  <div style={{ fontWeight: '500' }}>{method.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '16px', padding: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700' }}>
                <span>К оплате</span>
                <span style={{ color: '#D4AF37' }}>{product.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (!orderData.name.trim()) { alert('Введите ваше имя'); return; }
                if (!orderData.phone.trim()) { alert('Введите номер телефона'); return; }
                if (!orderData.address.trim()) { alert('Введите адрес доставки'); return; }

                if (orderData.paymentMethod === 'card') {
                  try {
                    const response = await fetch('/api/payment', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        amount: product.price,
                        orderId: `SK-${Date.now()}`,
                        name: orderData.name,
                        phone: orderData.phone,
                        email: orderData.email,
                        address: orderData.address,
                        productId: product.id,
                        productName: product.name,
                        size: selectedSize || undefined,
                        deliveryMethod: orderData.deliveryMethod,
                        paymentMethod: orderData.paymentMethod,
                      })
                    });
                    
                    const data = await response.json();
                    if (data.paymentUrl) {
                      window.location.href = data.paymentUrl;
                    }
                  } catch (err) {
                    console.error('Ошибка при переходе к оплате:', err);
                    alert('Ошибка при создании платежа. Попробуйте позже.');
                  }
                } else {
                  addOrder({
                    customer: { name: orderData.name, phone: orderData.phone, email: orderData.email, address: orderData.address },
                    items: [{ productId: product.id, name: product.name, price: product.price, quantity: 1, size: selectedSize || undefined }],
                    total: product.price,
                    deliveryMethod: orderData.deliveryMethod === 'courier_mkala' ? 'Курьер по Махачкале' : orderData.deliveryMethod === 'russian_post' ? 'Почта России' : orderData.deliveryMethod === 'sdek' ? 'СДЭК' : 'Самовывоз',
                    paymentMethod: orderData.paymentMethod === 'cash' ? 'Наличными при получении' : 'Картой при получении',
                    status: 'new',
                  });
                  setOrderSuccess(true);
                }
              }}
              style={{
                width: '100%', padding: '18px', backgroundColor: '#D4AF37', color: '#000',
                fontWeight: '700', fontSize: '18px', border: 'none', borderRadius: '16px',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px',
              }}
            >
              {orderData.paymentMethod === 'card' ? (
                <>💳 Перейти к оплате</>
              ) : (
                <><Truck size={20} /> Оформить заказ</>
              )}
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', paddingBottom: '100px' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: darkMode ? 'rgba(10,10,10,0.8)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', padding: '12px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/"><button style={{ padding: '10px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}><ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} /></button></Link>
          <Link href="/"><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '800', color: '#D4AF37' }}>SK SHOP</h1></Link>
          <div style={{ width: '42px' }} />
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1' }}>
            <img src={productImages[selectedImage] || product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {productImages.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto' }}>
              {productImages.map((img: string, index: number) => (
                <button key={index} onClick={() => setSelectedImage(index)} style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: selectedImage === index ? '2px solid #D4AF37' : 'none', opacity: selectedImage === index ? 1 : 0.6 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', flex: 1 }}>{product.name}</h2>
            <button onClick={() => toggleFavorite(product.id)} style={{ padding: '10px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
              <Heart size={22} fill={favorite ? '#D4AF37' : 'none'} color={favorite ? '#D4AF37' : darkMode ? '#FFFFFF' : '#000000'} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill={star <= Math.round(averageRating) ? '#D4AF37' : 'none'} color="#D4AF37" />)}
            </div>
            <span style={{ fontWeight: '600' }}>{averageRating.toFixed(1)}</span>
            <span style={{ color: '#8E8E93' }}>• {totalReviews} отзывов</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#D4AF37' }}>{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <>
                <span style={{ fontSize: '18px', color: '#8E8E93', textDecoration: 'line-through' }}>{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
                <span style={{ backgroundColor: '#FF3B30', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>-{discount}%</span>
              </>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Размер</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {productSizes.map((size: string) => (
                <button key={size} onClick={() => setSelectedSize(size)} style={{ padding: '12px 20px', backgroundColor: selectedSize === size ? '#D4AF37' : darkMode ? '#1C1C1E' : '#F0F0F0', color: selectedSize === size ? '#000' : 'inherit', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>{size}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => { addToCart(product); alert('Товар добавлен в корзину'); }} style={{ flex: 1, padding: '16px', backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0', color: darkMode ? '#FFFFFF' : '#000000', fontWeight: '600', fontSize: '15px', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <ShoppingBag size={18} /> В корзину
            </button>
            <button onClick={() => setShowBuyNow(true)} style={{ flex: 1, padding: '16px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '700', fontSize: '15px', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Truck size={18} /> Купить сейчас
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Описание</h3>
            <p style={{ lineHeight: '1.6', color: darkMode ? '#CCCCCC' : '#444444' }}>{product.description || 'Описание отсутствует'}</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Характеристики</h3>
            <div style={{ backgroundColor: darkMode ? '#1C1C1E' : '#F8F8F8', borderRadius: '16px', overflow: 'hidden' }}>
              {productCharacteristics.map((char: { name: string; value: string }, index: number) => (
                <div key={index} style={{ display: 'flex', padding: '14px 16px', borderBottom: index < productCharacteristics.length - 1 ? `1px solid ${darkMode ? '#2C2C2E' : '#E5E5E5'}` : 'none' }}>
                  <span style={{ width: '40%', color: '#8E8E93' }}>{char.name}</span>
                  <span style={{ width: '60%', fontWeight: '500' }}>{char.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Отзывы ({totalReviews})</h3>
              <button onClick={() => setShowReviewModal(true)} style={{ padding: '12px 20px', backgroundColor: '#D4AF37', color: '#000', border: 'none', borderRadius: '30px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>⭐ Написать отзыв</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {productReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: darkMode ? '#1C1C1E' : '#F8F8F8', borderRadius: '16px' }}>
                  <Star size={40} style={{ margin: '0 auto 12px', color: '#8E8E93' }} />
                  <p style={{ color: '#8E8E93' }}>Пока нет отзывов. Будьте первым!</p>
                </div>
              ) : (
                productReviews.slice().reverse().map((review: any) => (
                  <div key={review.id} style={{ backgroundColor: darkMode ? '#1C1C1E' : '#F8F8F8', borderRadius: '16px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '36px', height: '36px', backgroundColor: '#D4AF37', opacity: 0.2, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} color="#D4AF37" /></div>
                        <span style={{ fontWeight: '600' }}>{review.author}</span>
                      </div>
                      <span style={{ fontSize: '13px', color: '#8E8E93' }}>{review.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill={star <= review.rating ? '#D4AF37' : 'none'} color="#D4AF37" />)}
                    </div>
                    <p style={{ lineHeight: '1.5' }}>{review.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Похожие товары</h3>
              <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>Все <ChevronRight size={16} /></Link>
            </div>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {similarProducts.map((item) => (
                <Link key={item.id} href={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '140px', backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                    <div style={{ padding: '10px' }}><h4 style={{ fontSize: '13px', fontWeight: '500' }}>{item.name}</h4><span style={{ fontSize: '15px', fontWeight: '700', color: '#D4AF37' }}>{item.price.toLocaleString('ru-RU')} ₽</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showReviewModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setShowReviewModal(false)}>
          <div style={{ maxWidth: '500px', width: '100%', backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF', borderRadius: '24px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h2 style={{ fontSize: '20px', fontWeight: '700' }}>Написать отзыв</h2><button onClick={() => setShowReviewModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={24} color={darkMode ? '#FFFFFF' : '#000000'} /></button></div>
            <form onSubmit={handleSubmitReview}>
              <div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Ваше имя</label><input type="text" value={reviewAuthor} onChange={(e) => setReviewAuthor(e.target.value)} placeholder="Введите имя" style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none' }} /></div>
              <div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Оценка</label><div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>{[1, 2, 3, 4, 5].map((star) => (<button key={star} type="button" onClick={() => setReviewRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}><Star size={36} fill={star <= (hoverRating || reviewRating) ? '#D4AF37' : 'none'} color="#D4AF37" /></button>))}</div></div>
              <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Отзыв</label><textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Напишите ваше мнение..." rows={4} style={{ width: '100%', padding: '14px', backgroundColor: darkMode ? '#0A0A0A' : '#F0F0F0', border: 'none', borderRadius: '12px', fontSize: '16px', color: darkMode ? '#FFFFFF' : '#000000', outline: 'none', resize: 'vertical' }} /></div>
              <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#D4AF37', color: '#000', fontWeight: '700', fontSize: '16px', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Send size={18} /> Отправить отзыв</button>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}