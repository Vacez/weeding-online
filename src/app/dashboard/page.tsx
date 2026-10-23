export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatRupiah } from '@/lib/utils';
import { 
  Sparkles, Users, Eye, CheckCircle2, Copy, ExternalLink, 
  Share2, Plus, Calendar, Clock, MessageSquare, ArrowRight 
} from 'lucide-react';

export default async function CustomerDashboardPage() {
  let user = await getCurrentUser();
  if (!user) {
    // Demo fallback for previewing customer dashboard
    user = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' },
      select: { id: true, name: true, email: true, role: true, phone: true, avatar: true },
    });
  }

  const userId = user?.id || '';

  const invitations = await prisma.invitation.findMany({
    where: { userId },
    include: {
      theme: true,
      package: true,
      content: true,
      events: true,
      rsvps: { orderBy: { createdAt: 'desc' } },
      guests: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { package: true, theme: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  const activeInv = invitations[0];
  const totalGuests = activeInv?.guests?.length || 0;
  const totalRsvps = activeInv?.rsvps?.length || 0;
  const totalViews = activeInv?.viewCount || 0;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-10">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D8B8]/40 text-xs font-semibold text-[#24382E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Dashboard Pelanggan</span>
            </div>
            <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#24382E]">
              Selamat Datang, {user?.name || 'Mempelai Berbahagia'}!
            </h1>
            <p className="text-xs text-stone-500">
              Kelola undangan pernikahan digital, daftar tamu, dan pantau konfirmasi kehadiran (RSVP).
            </p>
          </div>

          <Link
            href="/wizard"
            className="px-6 py-3 rounded-full bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] shadow flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-[#C5A059]" />
            <span>Buat Undangan Baru</span>
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Status Undangan</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-lg font-bold text-[#24382E]">
                {activeInv?.status === 'PUBLISHED' ? 'Aktif Terbit' : 'Draf'}
              </strong>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Total Dilihat (Views)</span>
            <strong className="font-serif-cormorant text-3xl font-bold text-[#24382E] block">{totalViews}</strong>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Tamu Terdaftar</span>
            <strong className="font-serif-cormorant text-3xl font-bold text-[#24382E] block">{totalGuests}</strong>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/20 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-medium">Konfirmasi RSVP Masuk</span>
            <strong className="font-serif-cormorant text-3xl font-bold text-[#24382E] block">{totalRsvps}</strong>
          </div>
        </div>

        {/* Main Invitation Control Card */}
        {activeInv ? (
          <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B59A62] font-semibold">Undangan Aktif</span>
                <h2 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">{activeInv.title}</h2>
                <span className="text-xs text-stone-500 font-mono">/invitation/{activeInv.slug}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={'/invitation/' + activeInv.slug}
                  target="_blank"
                  className="px-4 py-2 rounded-lg bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Buka Undangan</span>
                </Link>
                <Link
                  href="/dashboard/guests"
                  className="px-4 py-2 rounded-lg border border-[#B59A62]/40 text-[#24382E] text-xs font-semibold hover:bg-[#FAF7F0] flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-[#B59A62]" />
                  <span>Kelola Buku Tamu</span>
                </Link>
              </div>
            </div>

            {/* Quick Share Link */}
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-2">
              <span className="text-xs font-semibold text-[#24382E] block">Kirim Cepat via WhatsApp</span>
              <p className="text-xs text-stone-600 font-light">
                Bagikan undangan langsung ke kerabat dengan pesan ramah otomatis dan nama tamu yang dipersonalisasi di cover.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/guests"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Buat Link WhatsApp Tamu Khusus &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Recent RSVPs Wall */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                  Ucapan & Doa Restu Terbaru ({activeInv.rsvps.length})
                </h3>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {activeInv.rsvps.length > 0 ? (
                  activeInv.rsvps.map((r) => (
                    <div key={r.id} className="p-3.5 rounded-xl bg-[#FAF7F0] border border-stone-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#24382E]">{r.guestName}</span>
                        <span className={'px-2 py-0.5 rounded text-[10px] ' + (
                          r.attendance === 'ATTENDING' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                        )}>
                          {r.attendance === 'ATTENDING' ? 'Hadir' : 'Tidak Hadir'} ({r.pax} Orang)
                        </span>
                      </div>
                      <p className="text-stone-700 italic">"{r.message}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-400 italic">Belum ada ucapan dari tamu.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-stone-200 text-center space-y-4">
            <Sparkles className="w-8 h-8 text-[#B59A62] mx-auto" />
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">Belum Ada Undangan Aktif</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Mulai buat undangan digital pertama Anda dengan memilih tema adat atau modern favorit.
            </p>
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#24382E] text-white text-xs font-semibold"
            >
              <span>Mulai Kustomisasi</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </Link>
          </div>
        )}

        {/* Order History */}
        <div className="p-6 rounded-3xl bg-white border border-[#B59A62]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Riwayat Pesanan</h3>
            <Link href="/dashboard/orders" className="text-xs text-[#B59A62] hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {orders.map((o) => (
              <div key={o.id} className="py-3 flex items-center justify-between">
                <div>
                  <strong className="block text-[#24382E]">{o.package.name} — {o.theme.name}</strong>
                  <span className="text-stone-400 font-mono text-[11px]">{o.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#24382E] block">{formatRupiah(o.netAmount)}</span>
                  <span className={'px-2 py-0.5 rounded text-[10px] ' + (
                    o.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  )}>
                    {o.status === 'PAID' ? 'Lunas' : 'Menunggu Pembayaran'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}