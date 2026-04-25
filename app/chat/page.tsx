'use client';

import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import BottomNav from '../components/BottomNav';

export default function ChatPage() {
  const { darkMode } = useStore();
  const [messages, setMessages] = useState([
    { id: 1, text: 'Здравствуйте! Чем могу помочь?', sender: 'seller', time: '10:30' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'user', time: new Date().toLocaleTimeString().slice(0, 5) }]);
    setNewMessage('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid', borderColor: darkMode ? '#2C2C2E' : '#F0F0F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/">
          <button style={{ padding: '12px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} color={darkMode ? '#FFFFFF' : '#000000'} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontWeight: '700', fontSize: '18px', color: darkMode ? '#FFFFFF' : '#000000' }}>SK SHOP Поддержка</h1>
          <p style={{ fontSize: '12px', color: '#34C759' }}>Онлайн</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: '20px',
              backgroundColor: msg.sender === 'user' ? '#D4AF37' : darkMode ? '#1C1C1E' : '#F0F0F0',
              color: msg.sender === 'user' ? '#000' : darkMode ? '#FFFFFF' : '#000'
            }}>
              <p style={{ marginBottom: '4px' }}>{msg.text}</p>
              <span style={{ fontSize: '10px', opacity: 0.6, display: 'block', textAlign: 'right' }}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid', borderColor: darkMode ? '#2C2C2E' : '#F0F0F0', display: 'flex', gap: '8px' }}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Введите сообщение..."
          style={{
            flex: 1,
            padding: '14px 16px',
            backgroundColor: darkMode ? '#1C1C1E' : '#F0F0F0',
            border: 'none',
            borderRadius: '30px',
            fontSize: '16px',
            outline: 'none',
            color: darkMode ? '#FFFFFF' : '#000000'
          }}
        />
        <button onClick={sendMessage} style={{ padding: '14px', backgroundColor: '#D4AF37', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
          <Send size={20} color="#000" />
        </button>
      </div>
      <BottomNav />
    </div>
  );
}