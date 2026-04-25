import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Пароль должен быть не менее 6 символов' }, { status: 400 });
    }

    // Возвращаем данные пользователя (клиент сам сохранит в localStorage)
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: Date.now().toString(), 
        name: name || email.split('@')[0], 
        email 
      } 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}