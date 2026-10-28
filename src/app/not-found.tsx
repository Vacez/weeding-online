import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 pt-40 pb-24 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#E8D8B8]/50 border border-[#B59A62]/30 flex items-center justify-center text-[#24382E]">
          <Sparkles className="w-10 h-10 text-[#C5A059]" />
        </div>

        <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed font-light">
          Halaman atau tema yang Anda cari mungkin telah dipindahkan atau belum tersedia. Silakan kembali ke katalog tema untuk melihat ratusan koleksi lainnya.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/themes"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#24382E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#192821] transition-all shadow"
          >
            Lihat Katalog Tema
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-[#24382E] text-[#24382E] text-xs font-semibold uppercase tracking-wider hover:bg-[#24382E] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
