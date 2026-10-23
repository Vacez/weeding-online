import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyMidtransSignature } from '@/lib/midtrans';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      payment_type,
    } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-DemoKeyWeddingMarketplace2026';

    // Verify official signature in production
    const isValid = verifyMidtransSignature(order_id, status_code, gross_amount, serverKey, signature_key);
    if (!isValid && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ message: 'Invalid Midtrans signature' }, { status: 403 });
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber: order_id },
      include: { invitations: true },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          paymentMethod: payment_type || 'Midtrans Payment',
          paidAt: new Date(),
        },
      });

      // Publish invitation
      if (order.invitations && order.invitations.length > 0) {
        await prisma.invitation.update({
          where: { id: order.invitations[0].id },
          data: {
            status: 'PUBLISHED',
            publishedAt: new Date(),
          },
        });
      }
    } else if (transaction_status === 'cancel' || transaction_status === 'deny') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'FAILED' },
      });
    } else if (transaction_status === 'expire') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'EXPIRED' },
      });
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ message: 'Webhook processing error' }, { status: 500 });
  }
}
