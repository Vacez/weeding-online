import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeMarketplace from '@/components/ThemeMarketplace';
import prisma from '@/lib/prisma';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Katalog Tema Undangan Pernikahan Digital | Janji Digital',
  description: 'Jelajahi ratusan desain undangan digital pernikahan adat Nusantara (Jawa, Sunda, Minang, Batak, Bali) dan gaya modern minimalis mewah.',
};

export default async function ThemesPage() {
  const themes = await prisma.theme.findMany({
    where: { active: true },
    include: { category: true, tradition: true },
    orderBy: { salesCount: 'desc' },
  });

  const traditions = await prisma.culturalTradition.findMany({
    orderBy: { name: 'asc' },
  });

  const categories = await prisma.themeCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D8B8]/40 border border-[#B59A62]/30 text-xs font-semibold text-[#24382E]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Koleksi Terlengkap</span>
          </div>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
            Katalog Desain Undangan Digital
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Temukan tema yang sempurna untuk menyempurnakan hari istimewa Anda. Pilihan adat autentik Indonesia hingga estetika editorial modern.
          </p>
        </div>

        {/* Marketplace Interactive Container */}
        <ThemeMarketplace
          initialThemes={themes as any}
          traditions={traditions as any}
          categories={categories as any}
        />
      </main>

      <Footer />
    </div>
  );
}
