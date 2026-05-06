import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersFile = path.join(process.cwd(), 'data', 'users.json');
const SECRET = 'sk-shop-secret-key-2024';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json({ error: 'Неверный email или пароль' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Ошибка сервера' });
  }
}