export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatRupiah, formatDateIndo } from '@/lib/utils';
import { ChevronLeft, Receipt, CheckCircle2, Clock } from 'lucide-react';

export default async function CustomerOrdersPage() {
  let user = await getCurrentUser();
  if (!user) {
    user = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' },
      select: { id: true, name: true, email: true, role: true, phone: true, avatar: true },
    });
  }

  const orders = await prisma.order.findMany({
    where: { userId: user?.id || '' },
    include: { package: true, theme: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/dashboard" className="hover:text-[#24382E] flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span>/</span>
          <span className="text-[#24382E] font-medium">Riwayat Pembelian & Faktur</span>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-2">
          <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#24382E]">
            Riwayat Pesanan Saya
          </h1>
          <p className="text-xs text-stone-500">
            Daftar seluruh transaksi paket undangan digital yang telah Anda lakukan.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
          <div className="divide-y divide-stone-100">
            {orders.map((o) => (
              <div key={o.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#24382E]">{o.orderNumber}</span>
                    <span className={'px-2 py-0.5 rounded text-[10px] font-semibold ' + (
                      o.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    )}>
                      {o.status === 'PAID' ? 'LUNAS' : 'MENUNGGU PEMBAYARAN'}
                    </span>
                  </div>
                  <p className="text-stone-700 font-medium">
                    {o.package.name} — Tema: {o.theme.name}
                  </p>
                  <span className="text-[11px] text-stone-400 block">
                    Metode: {o.paymentMethod || 'Midtrans Sandbox'}
                  </span>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <span className="font-serif-cormorant text-2xl font-bold text-[#24382E]">
                    {formatRupiah(o.netAmount)}
                  </span>
                  {o.status === 'PENDING' && (
                    <Link
                      href={'/checkout/' + o.id}
                      className="px-4 py-1.5 rounded-lg bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821]"
                    >
                      Bayar Sekarang
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}