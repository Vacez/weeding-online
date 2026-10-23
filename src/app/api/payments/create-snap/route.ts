import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createMidtransSnapTransaction } from '@/lib/midtrans';

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { package: true, theme: true },
    });

    if (!order) {
      return NextResponse.json({ message: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    const snapResult = await createMidtransSnapTransaction({
      orderId: order.orderNumber,
      grossAmount: order.netAmount,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      itemDetails: [
        {
          id: order.packageId,
          price: order.netAmount,
          quantity: 1,
          name: `${order.package.name} - ${order.theme.name}`.slice(0, 50),
        },
      ],
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        midtransToken: snapResult.token,
        midtransRedirectUrl: snapResult.redirect_url,
      },
    });

    return NextResponse.json(snapResult);
  } catch (error) {
    console.error('Snap error:', error);
    return NextResponse.json({ message: 'Gagal membuat transaksi Midtrans' }, { status: 500 });
  }
}
