'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, Camera, Sparkles } from 'lucide-react';
import { FullInvitation } from '@/lib/types';
import { CulturalThemeConfig, CulturalMotif, CulturalCornerOrnaments } from '@/lib/culturalThemes';

interface Props {
  invitation: FullInvitation;
  config: CulturalThemeConfig;
  primaryEvent?: any;
}

export default function MinangLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: BALAIRUNG RUMAH GADANG & MARAWA BANNER */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative pt-6"
      >
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#4A0D18] via-[#360810] to-[#200408] text-[#FFF7E8] border-2 border-[#E0B338]/50 shadow-2xl relative overflow-hidden">
          
          {/* Marawa Tri-Color Accent Bar */}
          <div className="flex h-2 w-36 mx-auto rounded-full overflow-hidden shadow-md mb-3">
            <span className="w-1/3 bg-[#111111]" title="Hitam (Tahan Tapo)" />
            <span className="w-1/3 bg-[#8B1414]" title="Merah (Keberanian)" />
            <span className="w-1/3 bg-[#E0B338]" title="Kuning (Keagungan)" />
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-[#F5CF68] font-bold mb-1">
            Pesta Adat Baralek Gadang
          </p>
          <p className="text-xs text-[#E8D8B8]/80 italic mb-2">
            Siriah Sakapua Pinang Sabungka
          </p>

          <CulturalMotif type="minang" className="w-32 h-20 my-2" />

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-[#FFF7E8] drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#E0B338]/20 border border-[#E0B338]/40 text-xs text-[#F5CF68]">
            <Sparkles className="w-3.5 h-3.5 text-[#E0B338]" />
            <span>Aleik Rang Mudo & Puti Nan Jombang</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#F5CF68] mt-3">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
              : 'Minggu, 20 Desember 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. PEPATAH PETITIH MINANGKABAU (QUOTE) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto p-8 rounded-3xl bg-[#F6EDE2] border-2 border-[#E0B338]/50 shadow-md text-center space-y-3"
      >
        <div className="text-xs tracking-[0.25em] font-bold text-[#6B1624] uppercase">
          Pepatah Petitih Adat Minangkabau
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#300C13]">
          "{content.quote || 'Anak dipangku kamanakan dibimbing, adaik basandi syarak, syarak basandi Kitabullah. Sabiduak sadayuang ka tapian bahagia.'}"
        </p>
        <div className="text-xs font-semibold text-[#8C6D2B] tracking-wider uppercase">
          — {content.quoteSource || 'Kearifan Minang & QS. Ar-Rum: 21'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: PELAMINAN MINANG 7 TINGKAT (MARAWA GEOMETRIC) */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#E0B338] font-bold">
            Anak Daro & Marapulai
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#6B1624]">
            Rang Mudo Sutan & Puti
          </h3>
          <p className="text-xs text-stone-600 italic">Bulek aia dek pambuluah, bulek kato dek mupakaik</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Marapulai (Groom) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F6EDE2] border-2 border-[#E0B338]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#6B1624] text-[#F5CF68] text-[10px] uppercase tracking-widest font-bold">
                Marapulai (Mempelai Pria)
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#E0B338]">
                <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#300C13]">
                  {content.groomName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Urang mudo kasayangan dari:</p>
                <p className="text-xs font-semibold text-[#300C13]">{content.groomFather}</p>
                <p className="text-xs font-semibold text-[#300C13]">& {content.groomMother}</p>
              </div>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#6B1624] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#E0B338]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Anak Daro (Bride) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F6EDE2] border-2 border-[#E0B338]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#6B1624] text-[#F5CF68] text-[10px] uppercase tracking-widest font-bold">
                Anak Daro (Mempelai Wanita)
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#E0B338]">
                <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#300C13]">
                  {content.brideName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Puti nan rancak dari:</p>
                <p className="text-xs font-semibold text-[#300C13]">{content.brideFather}</p>
                <p className="text-xs font-semibold text-[#300C13]">& {content.brideMother}</p>
              </div>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#6B1624] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#E0B338]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: BARALEK GADANG & JAMUAN MAKAN BAJAMBA */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#E0B338] font-bold">
            Jadwal Rangkaian Acara
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#6B1624]">
            Akad Nikah & Baralek Gadang
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#F6EDE2] border-2 border-[#E0B338]/40 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#E0B338]/40 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6B1624] font-bold block">
                    {i === 0 ? 'Akad Ijab Qobul & Pasang Deta' : 'Pesta Adat Baralek Gadang Nan Basamo'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#300C13]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#6B1624] text-[#F5CF68]">
                    Acara Utama
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#E0B338] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#E0B338] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#E0B338] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#300C13]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B1624] text-[#F5CF68] hover:bg-[#4A0D18] text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#E0B338]" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
