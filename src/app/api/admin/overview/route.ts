export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Akses terbatas untuk administrator' }, { status: 403 });
    }

    const totalOrders = await prisma.order.count();
    const paidOrders = await prisma.order.count({ where: { status: 'PAID' } });
    const pendingOrders = await prisma.order.count({ where: { status: 'PENDING' } });
    
    const paidSum = await prisma.order.aggregate({
      _sum: { netAmount: true },
      where: { status: 'PAID' },
    });
    const totalRevenue = paidSum._sum.netAmount || 0;

    const activeInvitations = await prisma.invitation.count({ where: { status: 'PUBLISHED' } });
    const totalCustomers = await prisma.user.count({ where: { role: 'CUSTOMER' } });

    const recentOrders = await prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { package: true, theme: true },
    });

    const bestSellers = await prisma.theme.findMany({
      take: 5,
      orderBy: { salesCount: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        salesCount: true,
        price: true,
        rating: true,
        coverImage: true,
      },
    });

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      paidOrders,
      pendingOrders,
      activeInvitations,
      totalCustomers,
      recentOrders,
      bestSellers,
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return NextResponse.json({ message: 'Gagal memuat ringkasan admin' }, { status: 500 });
  }
}
