import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeCard from '@/components/ThemeCard';
import prisma from '@/lib/prisma';
import { Sparkles, ChevronLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tradition = await prisma.culturalTradition.findUnique({
    where: { slug },
  });
  if (!tradition) return { title: 'Tradisi Tidak Ditemukan' };
  return {
    title: `Tema Undangan ${tradition.name} | Janji Digital`,
    description: tradition.description,
  };
}

export default async function TraditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const tradition = await prisma.culturalTradition.findUnique({
    where: { slug },
    include: {
      themes: {
        where: { active: true },
        include: { category: true, tradition: true },
        orderBy: { salesCount: 'desc' },
      },
    },
  });

  if (!tradition) notFound();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/traditional" className="hover:text-[#24382E] flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Koleksi Adat Nusantara</span>
          </Link>
          <span>/</span>
          <span className="text-[#24382E] font-medium">{tradition.name}</span>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-[#24382E] text-white p-8 sm:p-12 shadow-xl border border-[#B59A62]/30">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#E8D8B8] uppercase">{tradition.region}</span>
            <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold">{tradition.name}</h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">{tradition.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#B59A62]/20 pb-4">
            <h2 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">
              Katalog Tema ${tradition.name} ({tradition.themes.length} Desain)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradition.themes.map((th) => (
              <ThemeCard key={th.id} theme={th as any} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}