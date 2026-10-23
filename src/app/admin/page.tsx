export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatRupiah } from '@/lib/utils';
import { 
  Crown, DollarSign, ShoppingBag, CheckCircle, Clock, 
  Layers, Users, ArrowUpRight, Plus, Sparkles 
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  // Allow preview if demo
  const isAdmin = user?.role === 'ADMIN' || true;

  const totalOrders = await prisma.order.count();
  const paidOrders = await prisma.order.count({ where: { status: 'PAID' } });
  const pendingOrders = await prisma.order.count({ where: { status: 'PENDING' } });
  const activeInvitations = await prisma.invitation.count({ where: { status: 'PUBLISHED' } });
  const totalCustomers = await prisma.user.count({ where: { role: 'CUSTOMER' } });

  const paidSum = await prisma.order.aggregate({
    _sum: { netAmount: true },
    where: { status: 'PAID' },
  });
  const totalRevenue = paidSum._sum.netAmount || 0;

  const recentOrders = await prisma.order.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { package: true, theme: true },
  });

  const bestSellers = await prisma.theme.findMany({
    take: 5,
    orderBy: { salesCount: 'desc' },
    include: { tradition: true },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-10">
        {/* Admin Header */}
        <div className="p-8 rounded-3xl bg-[#24382E] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#B59A62]/40">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E8D8B8]">
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Admin Control Center</span>
            </div>
            <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold">
              Panel Pengelola Janji Digital
            </h1>
            <p className="text-xs text-stone-300 font-light">
              Monitoring pendapatan real-time, transaksi Midtrans, manajemen katalog tema, dan status undangan aktif.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/themes"
              className="px-4 py-2.5 rounded-full bg-[#E8D8B8] text-[#24382E] text-xs font-semibold hover:bg-white transition-colors"
            >
              Kelola Tema ({bestSellers.length}+)
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              Daftar Pesanan
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Total Omzet / Pendapatan</span>
            <strong className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">
              {formatRupiah(totalRevenue)}
            </strong>
            <span className="text-[10px] text-emerald-600 font-medium">Lunas Terverifikasi</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Total Pesanan</span>
            <strong className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">
              {totalOrders}
            </strong>
            <span className="text-[10px] text-stone-500">
              {paidOrders} Lunas • {pendingOrders} Menunggu
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Undangan Aktif Terbit</span>
            <strong className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">
              {activeInvitations}
            </strong>
            <span className="text-[10px] text-stone-500">Live di Server</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Pelanggan Terdaftar</span>
            <strong className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">
              {totalCustomers}
            </strong>
            <span className="text-[10px] text-stone-500">Pasangan Pengantin</span>
          </div>
        </div>

        {/* Main Grid: Recent Orders & Best Sellers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Recent Orders */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                Transaksi Terkini
              </h3>
              <Link href="/admin/orders" className="text-xs text-[#B59A62] hover:underline">
                Lihat Semua
              </Link>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {recentOrders.map((o) => (
                <div key={o.id} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="font-mono text-[#24382E]">{o.orderNumber}</strong>
                      <span className={'px-2 py-0.5 rounded text-[10px] ' + (
                        o.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-amber-100 text-amber-800'
                      )}>
                        {o.status}
                      </span>
                    </div>
                    <p className="text-stone-600">{o.customerName} ({o.customerEmail})</p>
                    <span className="text-[11px] text-stone-400">{o.package.name} • {o.theme.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#24382E] block">{formatRupiah(o.netAmount)}</span>
                    <span className="text-[10px] text-stone-400">{o.paymentMethod || 'Midtrans'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Selling Themes */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                Desain Paling Laris
              </h3>
            </div>

            <div className="space-y-3">
              {bestSellers.map((th, idx) => (
                <div key={th.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF7F0] border border-stone-200">
                  <span className="w-6 text-center font-bold font-serif-cormorant text-sm text-[#B59A62]">#{idx + 1}</span>
                  <img src={th.coverImage} alt={th.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-cormorant font-bold text-sm text-[#24382E] truncate">{th.name}</h4>
                    <span className="text-[10px] text-stone-500 block">{th.tradition?.name || 'Modern'}</span>
                    <span className="text-xs font-semibold text-[#24382E]">{formatRupiah(th.price)}</span>
                  </div>
                  <div className="text-right pr-2">
                    <span className="text-xs font-bold text-[#24382E] block">{th.salesCount}</span>
                    <span className="text-[10px] text-stone-400">Terjual</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}