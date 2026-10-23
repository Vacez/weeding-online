import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { orderId, paymentMethod = 'QRIS Instant Sandbox' } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { invitations: true },
    });

    if (!order) {
      return NextResponse.json({ message: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    // Update Order to PAID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        paymentMethod: `Midtrans Sandbox (${paymentMethod})`,
        paidAt: new Date(),
      },
    });

    // Update Invitation to PUBLISHED
    let invitationSlug = '';
    if (order.invitations && order.invitations.length > 0) {
      const inv = order.invitations[0];
      await prisma.invitation.update({
        where: { id: inv.id },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
      });
      invitationSlug = inv.slug;
    }

    return NextResponse.json({
      success: true,
      message: 'Pembayaran sandbox berhasil diverifikasi!',
      invitationSlug,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error('Simulate payment error:', error);
    return NextResponse.json({ message: 'Gagal memverifikasi simulasi pembayaran' }, { status: 500 });
  }
}
