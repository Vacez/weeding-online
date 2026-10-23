import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Cara Pemesanan Undangan Digital | Janji Digital',
  description: 'Panduan 4 langkah mudah memesan dan membagikan undangan pernikahan digital Janji Digital.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Pilih Desain & Adat Pilihan',
      desc: 'Jelajahi galeri tema adat Jawa, Sunda, Minangkabau, Batak, Bali, hingga gaya modern minimalis. Pratinjau langsung di layar smartphone Anda.',
    },
    {
      step: '02',
      title: 'Personalisasi Data & Momen Bahagia',
      desc: 'Lengkapi nama kedua mempelai, orang tua, detail akad nikah & resepsi, lokasi Google Maps, foto prewedding, dan musik latar favorit.',
    },
    {
      step: '03',
      title: 'Pembayaran Aman & Verifikasi Realtime',
      desc: 'Selesaikan transaksi melalui QRIS, Transfer Bank Otomatis (BCA, Mandiri, BNI, BRI), atau Kartu Kredit melalui Midtrans Payment Gateway.',
    },
    {
      step: '04',
      title: 'Undangan Aktif & Bagikan via WhatsApp',
      desc: 'Link unik Anda langsung aktif seketika. Gunakan fitur WhatsApp Generator untuk mengirim undangan dengan nama tamu yang dipersonalisasi.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D8B8]/40 border border-[#B59A62]/30 text-xs font-semibold text-[#24382E]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Panduan Mudah</span>
          </div>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
            Cara Pemesanan Undangan
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Hanya butuh beberapa menit dari memilih desain hingga undangan digital Anda siap disebarkan ke keluarga dan sahabat tercinta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3">
              <span className="font-serif-cormorant text-3xl font-bold text-[#B59A62] block">{s.step}</span>
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">{s.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/themes"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] shadow-md transition-all"
          >
            <span>Mulai Buat Undangan Sekarang</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}