export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { ChevronLeft, Sparkles, Star, Plus, Eye, Edit } from 'lucide-react';

export default async function AdminThemesPage() {
  const themes = await prisma.theme.findMany({
    include: { category: true, tradition: true },
    orderBy: { salesCount: 'desc' },
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
          <span className="text-[#24382E] font-medium">Manajemen Katalog Tema</span>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#24382E]">
              Katalog Tema Undangan ({themes.length} Desain)
            </h1>
            <p className="text-xs text-stone-500">
              Daftar seluruh tema yang aktif di marketplace, konfigurasi harga, dan statistik penjualan.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
          <div className="divide-y divide-stone-100">
            {themes.map((th) => (
              <div key={th.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <img src={th.coverImage} alt={th.name} className="w-16 h-16 rounded-xl object-cover border border-stone-200" />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-base font-serif-cormorant font-bold text-[#24382E]">{th.name}</strong>
                      {th.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B83B5E] text-white">
                          {th.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      {th.tradition?.name || th.category.name} • {th.salesCount} Terjual • Rating {th.rating.toFixed(1)}
                    </span>
                    <span className="font-bold text-xs text-[#24382E]">{formatRupiah(th.price)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={'/themes/' + th.slug}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-[#24382E] hover:bg-stone-50 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B59A62]" />
                    <span>Lihat Halaman</span>
                  </Link>
                  <Link
                    href={'/wizard?theme=' + th.slug}
                    className="px-3 py-1.5 rounded-lg bg-[#24382E] text-white hover:bg-[#192821] flex items-center gap-1 font-semibold"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Uji Desain</span>
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