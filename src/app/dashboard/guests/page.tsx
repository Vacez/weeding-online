'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, UserPlus, Share2, Copy, Check, MessageSquare, 
  ExternalLink, ChevronLeft, Sparkles, Send 
} from 'lucide-react';

export default function GuestManagementPage() {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [invitationSlug, setInvitationSlug] = useState('andi-siti');
  const [guests, setGuests] = useState<any[]>([
    { id: '1', name: 'Bapak Prof. H. Bagus Triyanto', slug: 'bagus-triyanto', phone: '081234567890' },
    { id: '2', name: 'Ibu Dr. Ratna Kusuma Wardhani', slug: 'ratna-kusuma', phone: '081298765432' },
    { id: '3', name: 'Keluarga Besar Alm. H. Darsono', slug: 'keluarga-darsono', phone: '081355556666' },
  ]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) return;

    const slug = guestName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    const newGuest = {
      id: Date.now().toString(),
      name: guestName,
      slug,
      phone: guestPhone || '',
    };
    setGuests([newGuest, ...guests]);
    setGuestName('');
    setGuestPhone('');
  };

  const getGuestUrl = (name: string) => {
    const encoded = encodeURIComponent(name);
    return (typeof window !== 'undefined' ? window.location.origin : '') + '/invitation/' + invitationSlug + '?to=' + encoded;
  };

  const getWhatsAppLink = (name: string, phone?: string) => {
    const url = getGuestUrl(name);
    const message = encodeURIComponent(
      `Halo Bapak/Ibu/Saudara/i *${name}*.\n\nDengan penuh kebahagiaan dan rasa syukur, kami mengundang Anda untuk hadir di acara pernikahan kami.\n\nInformasi lengkap mengenai jadwal dan lokasi acara dapat dilihat melalui tautan resmi berikut:\n${url}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nSalam hangat,\nKeluarga Besar Mempelai`
    );
    const targetPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    return 'https://api.whatsapp.com/send?text=' + message + (targetPhone ? '&phone=' + targetPhone : '');
  };

  const copyUrl = (name: string, id: string) => {
    const url = getGuestUrl(name);
    navigator.clipboard.writeText(url);
    setCopiedSlug(id);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/dashboard" className="hover:text-[#24382E] flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span>/</span>
          <span className="text-[#24382E] font-medium">Manajemen Tamu & WhatsApp Blast</span>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3">
          <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#24382E]">
            Generator Undangan Tamu Personal
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Tambahkan nama kerabat atau sahabat Anda. Sistem akan membuatkan link unik otomatis dengan nama tamu terpampang anggun di cover dan format pesan WhatsApp siap kirim.
          </p>
        </div>

        {/* Add Guest Form */}
        <form onSubmit={handleAddGuest} className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
          <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E] flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#B59A62]" />
            <span>Tambah Nama Tamu Baru</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Tamu / Gelar</label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Bpk. H. Bambang & Keluarga"
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor WhatsApp (Opsional)</label>
              <input
                type="text"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Generate Link Tamu</span>
          </button>
        </form>

        {/* Guests List Table */}
        <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
              Daftar Tamu ({guests.length})
            </h3>
          </div>

          <div className="divide-y divide-stone-100">
            {guests.map((g) => (
              <div key={g.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-sm font-serif-cormorant font-bold text-[#24382E] block">{g.name}</strong>
                  <span className="text-stone-400 font-mono text-[11px] truncate block max-w-sm">
                    {getGuestUrl(g.name)}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => copyUrl(g.name, g.id)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-[#24382E] hover:bg-stone-50 flex items-center gap-1 font-medium"
                  >
                    {copiedSlug === g.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#B59A62]" />
                    )}
                    <span>{copiedSlug === g.id ? 'Tersalin' : 'Salin Link'}</span>
                  </button>

                  <a
                    href={getWhatsAppLink(g.name, g.phone)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim WA</span>
                  </a>
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