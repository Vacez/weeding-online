import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Koleksi Undangan Adat Indonesia | Janji Digital',
  description: 'Eksplorasi tema undangan pernikahan adat Nusantara terlengkap: Jawa, Sunda, Minangkabau, Batak, Bali, Bugis, Betawi, Madura, dan lainnya.',
};

export default async function TraditionalPage() {
  const traditions = await prisma.culturalTradition.findMany({
    include: {
      themes: {
        where: { active: true },
        take: 3,
      },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D8B8]/40 border border-[#B59A62]/30 text-xs font-semibold text-[#24382E]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Koleksi Tema Adat Indonesia</span>
          </div>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
            Keanggunan Tradisi Nusantara
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Setiap adat memiliki kesakralan, doa, dan filosofi luhur. Kami hadirkan sentuhan ornamen budaya asli yang dikemas anggun dan modern.
          </p>
        </div>

        <div className="space-y-16">
          {traditions.map((tradition) => (
            <div
              key={tradition.id}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={tradition.bannerUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'}
                    alt={tradition.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider block text-[#E8D8B8]">{tradition.region}</span>
                    <h3 className="font-serif-cormorant text-2xl font-bold">{tradition.name}</h3>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#B59A62] uppercase tracking-wider">{tradition.region}</span>
                    <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">{tradition.name}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {tradition.description}
                  </p>
                  {tradition.culturalElements && (
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-[#24382E] block mb-1.5">Ornamen & Elemen Filosofis:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {tradition.culturalElements.split(',').map((el, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#B59A62]/20 text-stone-700">
                            {el.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-4">
                    <Link
                      href={`/traditional/${tradition.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#24382E] text-[#FAF7F0] text-xs font-semibold hover:bg-[#192821] transition-colors"
                    >
                      <span>Lihat Koleksi ${tradition.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>
              </div>

              {tradition.themes.length > 0 && (
                <div className="border-t border-stone-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Desain Populer ${tradition.name}</h4>
                    <Link href={`/traditional/${tradition.slug}`} className="text-xs text-[#B59A62] hover:underline">
                      Lihat Semua &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {tradition.themes.map((th) => (
                      <Link
                        key={th.id}
                        href={`/themes/${th.slug}`}
                        className="group bg-[#FAF7F0] rounded-xl overflow-hidden border border-[#B59A62]/20 p-3 hover:border-[#B59A62] transition-colors flex items-center gap-3"
                      >
                        <img src={th.coverImage} alt={th.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h5 className="font-serif-cormorant font-bold text-sm text-[#24382E] group-hover:text-[#B59A62] line-clamp-1">{th.name}</h5>
                          <p className="text-[11px] text-stone-500 line-clamp-1">{th.shortDesc}</p>
                          <span className="text-xs font-bold text-[#24382E]">{formatRupiah(th.price)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}