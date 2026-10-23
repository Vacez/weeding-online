import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Nama, email, dan password wajib diisi' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({ message: 'Email sudah terdaftar. Silakan masuk.' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        password: hashPassword(password),
        phone: phone || null,
        role: 'CUSTOMER',
      },
    });

    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      message: 'Registrasi berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat pendaftaran' }, { status: 500 });
  }
}
