'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home, Sparkles } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#B59A62]/30 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#E8D8B8]/40 border border-[#B59A62]/30 flex items-center justify-center text-[#24382E]">
          <Sparkles className="w-8 h-8 text-[#C5A059]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E]">
            Sedang Memuat Halaman
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Terjadi kendala saat memuat data. Silakan muat ulang halaman atau kembali ke katalog tema.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 px-5 rounded-full bg-[#24382E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#192821] transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
          <Link
            href="/themes"
            className="flex-1 py-3 px-5 rounded-full border border-[#24382E] text-[#24382E] text-xs font-semibold uppercase tracking-wider hover:bg-[#24382E] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Katalog Tema</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
