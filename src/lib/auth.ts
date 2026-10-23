import crypto from 'crypto';
import { cookies } from 'next/headers';
import prisma from './prisma';

const SECRET = process.env.NEXTAUTH_SECRET || 'janji-digital-secret-key-super-secure-production-ready-2026';

export function hashPassword(password: string): string {
  return crypto.createHmac('sha256', SECRET).update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function createToken(payload: { userId: string; email: string; role: string; name: string }): string {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  const b64 = Buffer.from(data).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
  return `${b64}.${signature}`;
}

export function verifyToken(token: string): { userId: string; email: string; role: string; name: string } | null {
  try {
    const [b64, signature] = token.split('.');
    if (!b64 || !signature) return null;
    const expectedSig = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
    if (signature !== expectedSig) return null;
    const data = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
    if (data.exp && Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  const verified = verifyToken(token);
  if (!verified) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: verified.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        avatar: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}
