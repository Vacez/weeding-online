import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Paket & Harga Undangan Digital | Janji Digital',
  description: 'Pilihan paket undangan pernikahan digital transparan dan terjangkau, mulai dari Paket Basic hingga Exclusive VIP.',
};

export default async function PricingPage() {
  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { price: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D8B8]/40 border border-[#B59A62]/30 text-xs font-semibold text-[#24382E]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Investasi Bahagia</span>
          </div>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
            Paket Undangan Digital Transparan
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Tanpa biaya tersembunyi. Pilih paket yang paling sesuai dengan kebutuhan perayaan pernikahan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 rounded-3xl border-2 flex flex-col justify-between transition-all ${
                pkg.isPopular
                  ? 'border-[#24382E] bg-white shadow-2xl ring-2 ring-[#B59A62] scale-105'
                  : 'border-stone-200 bg-[#FAF7F0] shadow-sm'
              }`}
            >
              <div>
                {pkg.isPopular && (
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#C5A059] text-white uppercase tracking-wider mb-3 inline-block">
                    Paling Populer
                  </span>
                )}
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">{pkg.name}</h3>
                <div className="mt-3 mb-4">
                  <span className="text-3xl font-bold text-[#24382E]">{formatRupiah(pkg.price)}</span>
                  {pkg.originalPrice && (
                    <span className="text-xs text-stone-400 line-through ml-2">
                      {formatRupiah(pkg.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mb-6 leading-relaxed">{pkg.description}</p>

                <div className="border-t border-stone-100 pt-4 space-y-2.5">
                  {JSON.parse(pkg.features || '[]').map((f: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={`/wizard?package=${pkg.slug}`}
                  className={`block w-full py-3 rounded-full text-center text-xs font-semibold tracking-wider uppercase transition-colors ${
                    pkg.isPopular
                      ? 'bg-[#24382E] text-white hover:bg-[#192821] shadow'
                      : 'border border-[#24382E] text-[#24382E] hover:bg-[#24382E] hover:text-white'
                  }`}
                >
                  Pilih Paket Ini
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}