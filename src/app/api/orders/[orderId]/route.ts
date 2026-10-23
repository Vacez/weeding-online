import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Props {
  params: Promise<{ orderId: string }>;
}

export async function GET(req: Request, { params }: Props) {
  try {
    const { orderId } = await params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: orderId }, { orderNumber: orderId }],
      },
      include: {
        package: true,
        theme: true,
        invitations: true,
      },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}