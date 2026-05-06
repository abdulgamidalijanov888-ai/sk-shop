import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const bcrypt = require('bcryptjs');

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Пароль минимум 6 символов' });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

    if (users.find((u: any) => u.email === email)) {
      return NextResponse.json({ error: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return NextResponse.json({
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Ошибка сервера' });
  }
}