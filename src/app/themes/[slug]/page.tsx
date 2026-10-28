import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemePackageSelector from '@/components/ThemePackageSelector';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { 
  Sparkles, Star, Check, ShieldCheck, Heart, 
  Eye, Music, Smartphone, Palette, ChevronLeft 
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const theme = await prisma.theme.findUnique({
      where: { slug },
    });
    if (!theme) return { title: 'Tema Undangan Digital | Janji Digital' };
    return {
      title: `${theme.name} — Pilihan Paket & Undangan Pernikahan | Janji Digital`,
      description: theme.shortDesc,
    };
  } catch {
    return { title: 'Detail Desain Undangan Digital | Janji Digital' };
  }
}

export default async function ThemeDetailPage({ params }: Props) {
  const { slug } = await params;

  let theme: any = null;
  let packages: any[] = [];
  let relatedThemes: any[] = [];

  try {
    theme = await prisma.theme.findUnique({
      where: { slug },
      include: { category: true, tradition: true },
    });

    packages = await prisma.package.findMany({
      where: { active: true },
      orderBy: { price: 'asc' },
    });

    if (theme) {
      relatedThemes = await prisma.theme.findMany({
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
    }
  } catch (error) {
    console.error('Error fetching theme detail from database:', error);
  }

  // Fallback if packages are empty
  if (!packages || packages.length === 0) {
    packages = [
      {
        id: 'pkg-basic',
        code: 'BASIC',
        name: 'Paket Basic',
        slug: 'paket-basic',
        price: 50000,
        originalPrice: 99000,
        description: 'Pilihan hemat untuk pernikahan intim dengan template elegan, informasi esensial lengkap, dan navigasi acara.',
        isPopular: false,
        features: JSON.stringify([
          '1 Pilihan Template Undangan (Modern / Adat)',
          'Informasi Profil Kedua Mempelai & Orang Tua',
          'Detail Susunan Acara Akad & Resepsi',
          'Petunjuk Arah & Navigasi Langsung Google Maps',
          'Hitung Mundur Waktu Acara (Countdown Timer)',
          'Galeri Foto Prewedding (Hingga 5 Foto)',
          'Musik Latar Otomatis (Autoplay Audio)',
          'Masa Aktif Undangan 6 Bulan',
        ]),
      },
      {
        id: 'pkg-premium',
        code: 'PREMIUM',
        name: 'Paket Premium',
        slug: 'paket-premium',
        price: 100000,
        originalPrice: 199000,
        description: 'Paket paling diminati! Lengkap dengan semua template adat & modern, live RSVP, amplop digital QRIS, dan galeri foto.',
        isPopular: true,
        features: JSON.stringify([
          'Semua Fitur Paket Basic',
          'Bebas Akses Seluruh Template Adat Nusantara & Modern',
          'Galeri Foto Prewedding (Hingga 15 Foto)',
          'Amplop Digital & Tanda Kasih (Bank & QRIS)',
          'Konfirmasi Kehadiran Tamu (Live RSVP Interaktif)',
          'Buku Tamu Ucapan & Doa Restu Realtime',
          'Personalisasi Nama Tamu Tak Terbatas (?to=Nama)',
          'Masa Aktif Undangan 1 Tahun Penuh',
        ]),
      },
      {
        id: 'pkg-exclusive',
        code: 'EXCLUSIVE',
        name: 'Paket Exclusive VIP',
        slug: 'paket-exclusive-vip',
        price: 150000,
        originalPrice: 299000,
        description: 'Solusi paripurna tanpa batas. Akses ke seluruh template eksklusif, love story timeline, video teaser, QR check-in, dan masa aktif selamanya.',
        isPopular: false,
        features: JSON.stringify([
          'Semua Fitur Paket Premium',
          'Akses Bebas Semua Template VIP & Eksklusif',
          'Galeri Foto Tanpa Batas (Unlimited) + Video Embed Teaser',
          'Kisah Perjalanan Cinta (Love Story Timeline)',
          'QR Code Check-In Tamu Meja Resepsi',
          'Bebas Watermark Janji Digital',
          'Masa Aktif Selamanya (Lifetime)',
        ]),
      },
    ];
  }

  // Fallback theme if not found in db
  if (!theme) {
    const slugName = slug
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');

    theme = {
      id: `theme-${slug}`,
      slug,
      name: slugName || 'Desain Undangan Nusantara',
      description: 'Perpaduan agung nilai-nilai luhur dan estetika digital modern untuk momen paling bersejarah dalam hidup Anda.',
      shortDesc: 'Desain undangan pernikahan digital anggun dan bermakna.',
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      price: 100000,
      originalPrice: 199000,
      rating: 4.95,
      salesCount: 380,
      badge: 'BESTSELLER',
      category: { name: 'Tradisional Nusantara', slug: 'cat-tradisional' },
      tradition: { name: 'Adat Nusantara', slug: slug.includes('jawa') ? 'jawa' : 'modern' },
      features: JSON.stringify([
        'Amplop Digital & QRIS',
        'Live RSVP & Buku Tamu',
        'Navigasi Langsung Google Maps',
        'Galeri Foto & Video Teaser',
        'Musik Latar Autoplay',
        'Hitung Mundur Acara',
      ]),
      colorPalette: JSON.stringify([
        { name: 'Hijau Keraton', hex: '#24382E' },
        { name: 'Kuningan Emas', hex: '#C5A059' },
        { name: 'Krem Gading', hex: '#FAF7F0' },
      ]),
    };
  }

  let featuresList: string[] = [];
  try {
    featuresList = JSON.parse(theme.features || '[]');
  } catch {
    featuresList = [];
  }

  let colorPalette: any[] = [];
  try {
    colorPalette = JSON.parse(theme.colorPalette || '[]');
  } catch {
    colorPalette = [];
  }

  const previewUrl =
    theme.tradition?.slug?.includes('sunda') || theme.slug.includes('sunda')
      ? '/invitation/asep-neng'
      : theme.tradition?.slug?.includes('minang') || theme.slug.includes('minang')
      ? '/invitation/rizki-siti'
      : theme.tradition?.slug?.includes('batak') || theme.slug.includes('batak')
      ? '/invitation/parlin-tiurma'
      : theme.tradition?.slug?.includes('bali') || theme.slug.includes('bali')
      ? '/invitation/wayan-ketut'
      : theme.slug.includes('madinah') || theme.slug.includes('akad') || theme.slug.includes('islami')
      ? '/invitation/farhan-aisyah'
      : theme.tradition?.slug?.includes('jawa') || theme.slug.includes('jawa')
      ? '/invitation/andi-siti'
      : '/invitation/kevin-clarissa';

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
        {/* Breadcrumb Navigation */}
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
          {/* Left Column: Theme Cover & Visual Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-stone-900 border-2 border-[#B59A62]/30 shadow-2xl flex items-center justify-center p-3">
              <img
                src={theme.coverImage}
                alt={theme.name}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 right-6">
                <Link
                  href={previewUrl}
                  className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#24382E] font-semibold text-xs hover:bg-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B59A62]" />
                  <span>Lihat Demo Interaktif</span>
                </Link>
              </div>
            </div>

            {/* Color Palette */}
            {colorPalette.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-[#B59A62]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#24382E]">
                  <Palette className="w-4 h-4 text-[#B59A62]" />
                  <span>Palet Warna Budaya:</span>
                </div>
                <div className="flex items-center gap-3">
                  {colorPalette.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5" title={c.name}>
                      <span
                        className="w-4 h-4 rounded-full border border-stone-300 shadow-sm inline-block"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[11px] text-stone-600 hidden sm:inline">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Theme Description & Philosophy */}
            <div className="p-6 rounded-2xl bg-white/70 border border-[#B59A62]/20 space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                Makna & Filosofi Desain
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                {theme.description}
              </p>
            </div>
          </div>

          {/* Right Column: Theme Info & Interactive Package Selector */}
          <div className="lg:col-span-6 space-y-6">
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
                {theme.category && (
                  <span className="text-[10px] text-stone-500">
                    • {theme.category.name}
                  </span>
                )}
              </div>

              <h1 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#24382E] tracking-tight">
                {theme.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{theme.rating?.toFixed(1) || '4.9'}</span>
                </div>
                <span>•</span>
                <span>{theme.salesCount || 250}+ Pasangan Memilih Ini</span>
              </div>
            </div>

            {/* INTERACTIVE PACKAGE SELECTOR (Basic 50k, Premium 100k, Exclusive VIP 150k) */}
            <ThemePackageSelector
              themeSlug={theme.slug}
              themeName={theme.name}
              packages={packages}
              previewUrl={previewUrl}
            />

            {/* Theme Standout Features */}
            {featuresList.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 space-y-3">
                <h3 className="font-serif-cormorant text-lg font-bold text-[#24382E]">
                  Keunggulan Ornamen Tema
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {featuresList.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Themes Section */}
        {relatedThemes.length > 0 && (
          <div className="pt-12 border-t border-[#B59A62]/20 space-y-6">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">
              Desain Serupa yang Mungkin Anda Sukai
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedThemes.map((r) => (
                <Link
                  key={r.id}
                  href={`/themes/${r.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#B59A62]/20 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={r.coverImage}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] text-stone-500">
                      {r.tradition?.name || r.category?.name}
                    </span>
                    <h4 className="font-serif-cormorant font-bold text-lg text-[#24382E] group-hover:text-[#B59A62] transition-colors">
                      {r.name}
                    </h4>
                    <span className="text-xs font-bold text-[#24382E]">
                      Mulai {formatRupiah(r.price)}
                    </span>
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