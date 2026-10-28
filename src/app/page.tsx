import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeCard from '@/components/ThemeCard';
import prisma from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { 
  Sparkles, Heart, ShieldCheck, ArrowRight, Play, Check, 
  ChevronRight, Star, Clock, Gift, Users, Music, Smartphone, Layout 
} from 'lucide-react';

// Cache Components enabled

export default async function HomePage() {
  const featuredThemes = await prisma.theme.findMany({
    where: { active: true, featured: true },
    include: { category: true, tradition: true },
    take: 6,
  });

  const traditions = await prisma.culturalTradition.findMany({
    take: 6,
  });

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { price: 'asc' },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    take: 3,
  });

  const faqs = [
    {
      q: 'Berapa lama proses pembuatan undangan digital hingga aktif?',
      a: 'Undangan digital langsung aktif seketika setelah pembayaran terverifikasi. Anda mendapatkan link unik siap sebar dalam hitungan menit!',
    },
    {
      q: 'Apakah bisa diedit kembali setelah link dipublikasikan?',
      a: 'Bisa! Anda dapat memperbarui foto, jadwal, lokasi acara, nama orang tua, maupun nomor rekening kapan saja dari Dashboard tanpa mengubah URL undangan Anda.',
    },
    {
      q: 'Bagaimana cara mengirim undangan dengan nama tamu personal?',
      a: 'Platform kami menyediakan fitur otomatis WhatsApp Generator. Anda cukup menambahkan nama tamu (misal: /invitation/andi-siti?to=Bapak+Budi), maka nama beliau akan otomatis tampil anggun di cover undangan.',
    },
    {
      q: 'Apakah lagu latar otomatis berputar di smartphone tamu?',
      a: 'Ya, sistem kami telah dioptimasi agar musik latar romantis langsung berputar saat tamu menyentuh tombol "Buka Undangan", sesuai standar keamanan browser Chrome & Safari.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E8D8B8]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D8B8]/40 border border-[#B59A62]/30 text-xs font-semibold text-[#24382E]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Marketplace Undangan Pernikahan Digital #1 Indonesia</span>
              </div>

              <h1 className="font-serif-cormorant text-5xl sm:text-6xl lg:text-7xl font-bold text-[#24382E] leading-[1.08] tracking-tight">
                Your Love Story, <br />
                <span className="italic font-normal text-[#B59A62]">Beautifully Invited.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#292929]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Rayakan keagungan tradisi Nusantara dan estetika modern berkelas. Dilengkapi live preview instan, musik latar sakral, konfirmasi RSVP, dan amplop digital terintegrasi.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/themes"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#24382E] text-[#FAF7F0] font-semibold text-sm hover:bg-[#192821] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Jelajahi Tema</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/invitation/andi-siti"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#24382E] border border-[#B59A62]/40 font-semibold text-sm hover:bg-[#E8D8B8]/20 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-[#B59A62] fill-current" />
                  <span>Lihat Demo Interaktif</span>
                </Link>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#B59A62]/20 text-center lg:text-left">
                <div>
                  <span className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">24+</span>
                  <span className="text-xs text-stone-500 font-medium">Tema Tradisi & Modern</span>
                </div>
                <div>
                  <span className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">10+</span>
                  <span className="text-xs text-stone-500 font-medium">Adat Suku Nusantara</span>
                </div>
                <div>
                  <span className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#24382E] block">100%</span>
                  <span className="text-xs text-stone-500 font-medium">Garansi Real-Time</span>
                </div>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[320px] sm:w-[350px] aspect-[9/16] rounded-[44px] p-3 bg-stone-900 shadow-2xl border-4 border-stone-800">
                <div className="w-full h-full rounded-[34px] overflow-hidden bg-[#FAF7F0] relative flex flex-col justify-between p-6 text-center border border-[#B59A62]/30">
                  {/* Mockup content */}
                  <div className="space-y-4 pt-6">
                    <div className="mx-auto wax-seal scale-90">
                      <span className="font-serif-cormorant text-xl font-bold">JD</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B59A62] font-semibold">Walimatul Ursy</span>
                    <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Andi & Siti</h2>
                    <p className="text-xs text-stone-500 italic font-serif-cormorant">Sabtu, 20 November 2026</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#E8D8B8]/30 border border-[#B59A62]/20 text-xs">
                    <span className="text-[10px] text-stone-500 block">Kepada Yth. Tamu Istimewa:</span>
                    <strong className="text-sm text-[#24382E] font-serif-cormorant">Bapak Prof. H. Bagus Triyanto</strong>
                  </div>

                  <Link
                    href="/invitation/andi-siti"
                    className="w-full py-2.5 rounded-full bg-[#24382E] text-[#FAF7F0] text-xs font-semibold hover:bg-[#192821] transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Buka Undangan Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. TRADITIONAL COLLECTIONS CAROUSEL */}
      <section className="py-20 bg-[#E8D8B8]/20 border-y border-[#B59A62]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B59A62] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Kekayaan Adat Nusantara</span>
              </div>
              <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
                Warisan Luhur Budaya Indonesia
              </h2>
            </div>
            <Link
              href="/traditional"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#24382E] hover:text-[#B59A62] transition-colors"
            >
              <span>Lihat Seluruh Tradisi</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {traditions.map((tr) => (
              <Link
                key={tr.id}
                href={`/traditional/${tr.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden border border-[#B59A62]/30 shadow-md flex flex-col justify-end p-6"
              >
                <img
                  src={tr.bannerUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'}
                  alt={tr.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2C24]/95 via-[#1C2C24]/50 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#E8D8B8] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                    {tr.region}
                  </span>
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#FAF7F0] group-hover:text-[#E8D8B8] transition-colors">
                    {tr.name}
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/80 line-clamp-2 leading-relaxed font-light">
                    {tr.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED THEMES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B59A62] font-semibold block mb-2">Desain Pilihan</span>
            <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
              Koleksi Tema Terpopuler
            </h2>
          </div>
          <Link
            href="/themes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#24382E] hover:text-[#B59A62] transition-colors"
          >
            <span>Semua Tema ({featuredThemes.length}+ Desain)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredThemes.map((th) => (
            <ThemeCard key={th.id} theme={th as any} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-[#FAF7F0] border-t border-[#B59A62]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#B59A62] font-semibold">Proses Cepat & Mudah</span>
            <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
              Hanya 4 Langkah Menuju Hari Bahagia
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3 text-left">
              <span className="w-9 h-9 rounded-full bg-[#24382E] text-[#E8D8B8] font-bold text-sm flex items-center justify-center">1</span>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Pilih Tema Impian</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pilih dari ratusan desain adat nusantara (Jawa, Sunda, Minang, dsb) atau gaya modern minimalis.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3 text-left">
              <span className="w-9 h-9 rounded-full bg-[#24382E] text-[#E8D8B8] font-bold text-sm flex items-center justify-center">2</span>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Personalisasi Data</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Isi profil kedua mempelai, waktu & lokasi acara, unggah foto prewedding, dan pilih musik romantis.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3 text-left">
              <span className="w-9 h-9 rounded-full bg-[#24382E] text-[#E8D8B8] font-bold text-sm flex items-center justify-center">3</span>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Pembayaran Aman</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bayar mudah dan instan melalui QRIS, Transfer Bank BCA/Mandiri, atau kartu via Midtrans.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3 text-left">
              <span className="w-9 h-9 rounded-full bg-[#24382E] text-[#E8D8B8] font-bold text-sm flex items-center justify-center">4</span>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Sebar Seketika</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Link undangan digital Anda langsung aktif! Buat link tamu personal dan kirim via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING PACKAGES */}
      <section className="py-20 bg-[#E8D8B8]/20 border-t border-[#B59A62]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#B59A62] font-semibold">Harga Transparan</span>
            <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
              Pilihan Paket Undangan
            </h2>
            <p className="text-xs text-stone-600">Investasi terbaik untuk membagikan kabar bahagia kepada keluarga dan kerabat</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-8 rounded-2xl border-2 flex flex-col justify-between transition-all ${
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
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B59A62] font-semibold">Kisah Bahagia</span>
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
            Kata Mereka yang Telah Berjanji
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{t.reviewText}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <img src={t.avatarUrl || ''} alt={t.coupleName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-serif-cormorant font-bold text-sm text-[#24382E]">{t.coupleName}</h4>
                  <span className="text-[10px] text-stone-500">{t.themeName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-20 bg-[#FAF7F0] border-t border-[#B59A62]/20">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B59A62] font-semibold">Tanya Jawab</span>
            <h2 className="font-serif-cormorant text-4xl font-bold text-[#24382E]">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-5 rounded-xl bg-white border border-[#B59A62]/20 shadow-sm space-y-2">
                <h3 className="font-semibold text-sm text-[#24382E]">{f.q}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
