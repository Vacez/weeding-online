import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#24382E] text-[#FAF7F0] pt-16 pb-10 border-t border-[#B59A62]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF7F0]/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F0] flex items-center justify-center text-[#24382E]">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
              </div>
              <span className="font-serif-cormorant text-2xl font-bold tracking-wider text-[#FAF7F0]">
                JANJI DIGITAL
              </span>
            </Link>
            <p className="text-sm text-[#FAF7F0]/70 max-w-sm leading-relaxed">
              Platform undangan pernikahan digital premium karya anak bangsa. Mengabadikan keagungan tradisi Nusantara dan estetika modern berkelas dengan teknologi mutakhir.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#E8D8B8]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Pembayaran Resmi Terverifikasi Midtrans Sandbox / Production</span>
            </div>
          </div>

          {/* Adat Nusantara */}
          <div>
            <h4 className="font-serif-cormorant text-lg font-semibold text-[#E8D8B8] mb-4 tracking-wide">
              Adat Nusantara
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F0]/70">
              <li>
                <Link href="/traditional/adat-jawa" className="hover:text-[#E8D8B8] transition-colors">
                  Undangan Adat Jawa
                </Link>
              </li>
              <li>
                <Link href="/traditional/adat-sunda" className="hover:text-[#E8D8B8] transition-colors">
                  Undangan Adat Sunda
                </Link>
              </li>
              <li>
                <Link href="/traditional/adat-minangkabau" className="hover:text-[#E8D8B8] transition-colors">
                  Undangan Adat Minang
                </Link>
              </li>
              <li>
                <Link href="/traditional/adat-batak" className="hover:text-[#E8D8B8] transition-colors">
                  Undangan Adat Batak
                </Link>
              </li>
              <li>
                <Link href="/traditional/adat-bali" className="hover:text-[#E8D8B8] transition-colors">
                  Undangan Adat Bali
                </Link>
              </li>
            </ul>
          </div>

          {/* Eksplorasi */}
          <div>
            <h4 className="font-serif-cormorant text-lg font-semibold text-[#E8D8B8] mb-4 tracking-wide">
              Eksplorasi
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F0]/70">
              <li>
                <Link href="/themes" className="hover:text-[#E8D8B8] transition-colors">
                  Katalog Semua Tema
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#E8D8B8] transition-colors">
                  Paket & Fitur
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#E8D8B8] transition-colors">
                  Cara Pemesanan
                </Link>
              </li>
              <li>
                <Link href="/invitation/andi-siti" className="hover:text-[#E8D8B8] transition-colors">
                  Lihat Demo Interaktif
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#E8D8B8] transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Bantuan & Kontak */}
          <div>
            <h4 className="font-serif-cormorant text-lg font-semibold text-[#E8D8B8] mb-4 tracking-wide">
              Bantuan
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F0]/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B59A62]" />
                <span>support@janji-digital.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B59A62]" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B59A62]" />
                <span>Jakarta & Yogyakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and payments */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/60">
          <p>© 2026 Janji Digital. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4 text-[#E8D8B8]/80">
            <span>Metode Pembayaran:</span>
            <span className="font-semibold px-2 py-0.5 bg-[#FAF7F0]/10 rounded">QRIS</span>
            <span className="font-semibold px-2 py-0.5 bg-[#FAF7F0]/10 rounded">BCA</span>
            <span className="font-semibold px-2 py-0.5 bg-[#FAF7F0]/10 rounded">Mandiri</span>
            <span className="font-semibold px-2 py-0.5 bg-[#FAF7F0]/10 rounded">BNI</span>
            <span className="font-semibold px-2 py-0.5 bg-[#FAF7F0]/10 rounded">Midtrans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
