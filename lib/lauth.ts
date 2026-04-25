import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Простая проверка — получаем пользователей из localStorage через глобальную переменную
        if (typeof window === "undefined") return null;
        
        const users = JSON.parse(localStorage.getItem('sk-shop-users') || '[]');
        const user = users.find((u: any) => u.email === credentials.email);
        
        if (!user) return null;
        if (user.password !== credentials.password) return null;
        
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo",
    }),
    
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID || "demo",
      clientSecret: process.env.YANDEX_CLIENT_SECRET || "demo",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};