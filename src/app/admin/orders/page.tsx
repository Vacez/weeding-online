export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { ChevronLeft, CheckCircle2, Clock, Eye } from 'lucide-react';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { package: true, theme: true, user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/admin" className="hover:text-[#24382E] flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </Link>
          <span>/</span>
          <span className="text-[#24382E] font-medium">Manajemen Pesanan & Pembayaran</span>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-2">
          <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#24382E]">
            Seluruh Pesanan & Transaksi ({orders.length})
          </h1>
          <p className="text-xs text-stone-500">
            Daftar lengkap invoice, status pembayaran Midtrans, dan detail pesanan pelanggan.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
          <div className="divide-y divide-stone-100">
            {orders.map((o) => (
              <div key={o.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm text-[#24382E]">{o.orderNumber}</span>
                    <span className={'px-2 py-0.5 rounded text-[10px] font-bold ' + (
                      o.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    )}>
                      {o.status}
                    </span>
                  </div>
                  <strong className="text-stone-800 block">{o.customerName} &lt;{o.customerEmail}&gt;</strong>
                  <span className="text-stone-500 block">
                    Paket: {o.package.name} • Tema: {o.theme.name}
                  </span>
                  <span className="text-[11px] text-stone-400 block font-mono">
                    Metode: {o.paymentMethod || 'Midtrans Sandbox'}
                  </span>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <span className="font-serif-cormorant text-2xl font-bold text-[#24382E]">
                    {formatRupiah(o.netAmount)}
                  </span>
                  <Link
                    href={'/checkout/' + o.id}
                    className="px-3 py-1 rounded-lg border border-stone-200 text-[#24382E] hover:bg-stone-50 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Invoice</span>
                  </Link>
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