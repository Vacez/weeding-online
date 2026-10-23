import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { 
  Sparkles, Star, Check, ArrowRight, ShieldCheck, Heart, 
  Eye, Music, Smartphone, Palette, Share2, ChevronLeft 
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const theme = await prisma.theme.findUnique({
    where: { slug },
  });
  if (!theme) return { title: 'Tema Tidak Ditemukan' };
  return {
    title: `${theme.name} — Undangan Pernikahan Digital | Janji Digital`,
    description: theme.shortDesc,
  };
}

export default async function ThemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const theme = await prisma.theme.findUnique({
    where: { slug },
    include: { category: true, tradition: true },
  });

  if (!theme) notFound();

  const relatedThemes = await prisma.theme.findMany({
    where: {
      active: true,
      id: { not: theme.id },
      OR: [
        { traditionId: theme.traditionId },
        { categoryId: theme.categoryId },
      ],
    },
    take: 3,
    include: { category: true, tradition: true },
  });

  const featuresList = JSON.parse(theme.features || '[]');
  const colorPalette = JSON.parse(theme.colorPalette || '[]');

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/themes" className="hover:text-[#24382E] flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Katalog Tema</span>
          </Link>
          <span>/</span>
          {theme.tradition && (
            <>
              <Link href={`/traditional/${theme.tradition.slug}`} className="hover:text-[#24382E]">
                {theme.tradition.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#24382E] font-medium">{theme.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border-2 border-[#B59A62]/30 shadow-2xl flex items-center justify-center p-4">
              <img src={theme.coverImage} alt={theme.name} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute bottom-6 right-6">
                <Link
                  href={
                    theme.tradition?.slug.includes('sunda') || theme.slug.includes('sunda')
                      ? '/invitation/asep-neng'
                      : theme.tradition?.slug.includes('minang') || theme.slug.includes('minang')
                      ? '/invitation/rizki-siti'
                      : theme.tradition?.slug.includes('batak') || theme.slug.includes('batak')
                      ? '/invitation/parlin-tiurma'
                      : theme.tradition?.slug.includes('bali') || theme.slug.includes('bali')
                      ? '/invitation/wayan-ketut'
                      : theme.slug.includes('madinah') || theme.slug.includes('akad')
                      ? '/invitation/farhan-aisyah'
                      : theme.tradition?.slug.includes('jawa') || theme.slug.includes('jawa')
                      ? '/invitation/andi-siti'
                      : '/invitation/kevin-clarissa'
                  }
                  className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#24382E] font-semibold text-xs hover:bg-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B59A62]" />
                  <span>Lihat Demo Interaktif Bertema</span>
                </Link>
              </div>
            </div>

            {colorPalette.length > 0 && (
              <div className="p-4 rounded-xl bg-white border border-[#B59A62]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#24382E]">
                  <Palette className="w-4 h-4 text-[#B59A62]" />
                  <span>Palet Warna Filosofis:</span>
                </div>
                <div className="flex items-center gap-3">
                  {colorPalette.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5" title={c.name}>
                      <span className="w-4 h-4 rounded-full border border-stone-300 shadow-sm inline-block" style={{ backgroundColor: c.hex }} />
                      <span className="text-[11px] text-stone-600 hidden sm:inline">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {theme.badge && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#B83B5E] text-white uppercase tracking-wider">
                    {theme.badge}
                  </span>
                )}
                {theme.tradition && (
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8D8B8]/50 text-[#24382E] border border-[#B59A62]/30">
                    {theme.tradition.name}
                  </span>
                )}
              </div>

              <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E] tracking-tight">
                {theme.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{theme.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>{theme.salesCount} Pasangan Memilih Ini</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3">
              <span className="text-xs text-stone-500">Harga Mulai Dari:</span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif-cormorant text-4xl font-bold text-[#24382E]">
                  {formatRupiah(theme.price)}
                </span>
                {theme.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatRupiah(theme.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-700 font-medium">
                ✓ Aktivasi Instan • Bebas Revisi Data • Garansi Kepuasan
              </p>

              <div className="pt-3 space-y-2">
                <Link
                  href={`/wizard?theme=${theme.slug}`}
                  className="w-full py-3.5 rounded-full bg-[#24382E] text-[#FAF7F0] font-semibold text-sm hover:bg-[#192821] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Kustomisasi Desain Ini</span>
                </Link>
                <Link
                  href={
                    theme.tradition?.slug.includes('sunda') || theme.slug.includes('sunda')
                      ? '/invitation/asep-neng'
                      : theme.tradition?.slug.includes('minang') || theme.slug.includes('minang')
                      ? '/invitation/rizki-siti'
                      : theme.tradition?.slug.includes('batak') || theme.slug.includes('batak')
                      ? '/invitation/parlin-tiurma'
                      : theme.tradition?.slug.includes('bali') || theme.slug.includes('bali')
                      ? '/invitation/wayan-ketut'
                      : theme.slug.includes('madinah') || theme.slug.includes('akad')
                      ? '/invitation/farhan-aisyah'
                      : theme.tradition?.slug.includes('jawa') || theme.slug.includes('jawa')
                      ? '/invitation/andi-siti'
                      : '/invitation/kevin-clarissa'
                  }
                  className="w-full py-3 rounded-full border border-[#B59A62]/40 text-[#24382E] font-semibold text-xs hover:bg-[#FAF7F0] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B59A62]" />
                  <span>Pratinjau Layar Penuh Bertema</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Makna & Filosofi Desain</h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                {theme.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Fitur Unggulan Tema</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {featuresList.map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedThemes.length > 0 && (
          <div className="pt-12 border-t border-[#B59A62]/20 space-y-6">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Desain Serupa yang Mungkin Anda Sukai</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedThemes.map((r) => (
                <Link
                  key={r.id}
                  href={`/themes/${r.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[#B59A62]/20 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img src={r.coverImage} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] text-stone-500">{r.tradition?.name || r.category.name}</span>
                    <h4 className="font-serif-cormorant font-bold text-lg text-[#24382E] group-hover:text-[#B59A62] transition-colors">{r.name}</h4>
                    <span className="text-xs font-bold text-[#24382E]">{formatRupiah(r.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}