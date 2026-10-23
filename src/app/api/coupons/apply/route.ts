import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { code, amount } = await req.json();

    if (!code) {
      return NextResponse.json({ message: 'Kode kupon wajib diisi' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!coupon || !coupon.active) {
      return NextResponse.json({ message: 'Kupon tidak valid atau sudah kedaluwarsa' }, { status: 404 });
    }

    if (coupon.validUntil && new Date() > coupon.validUntil) {
      return NextResponse.json({ message: 'Kupon telah melewati masa berlaku' }, { status: 400 });
    }

    if (coupon.usedCount >= coupon.maxUsage) {
      return NextResponse.json({ message: 'Batas penggunaan kupon telah habis' }, { status: 400 });
    }

    let discount = 0;
    if (coupon.discountPercent) {
      discount = Math.round((amount * coupon.discountPercent) / 100);
    } else if (coupon.discountAmount) {
      discount = Math.min(amount, coupon.discountAmount);
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountAmount: discount,
      message: `Kupon ${coupon.code} berhasil diterapkan! Hemat ${discount}`,
    });
  } catch (error) {
    console.error('Coupon error:', error);
    return NextResponse.json({ message: 'Gagal memverifikasi kupon' }, { status: 500 });
  }
}
