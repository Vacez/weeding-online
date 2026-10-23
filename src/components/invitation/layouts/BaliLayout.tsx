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

export default function BaliLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: GAPURA CANDI BENTAR & KORI AGUNG DEWATA */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative pt-6"
      >
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#3A1E16] via-[#2A160F] to-[#180A06] text-[#FDF7ED] border-2 border-[#D4A836]/50 shadow-2xl relative overflow-hidden">
          
          <p className="text-xs tracking-[0.3em] uppercase text-[#F0CA60] font-bold mb-1">
            Pawiwahan Ageng Suci Dharma
          </p>
          <p className="text-xs text-[#F0CA60]/80 font-sans tracking-widest mb-3">
            ᬑᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ — Tri Hita Karana
          </p>

          <CulturalMotif type="bali" className="w-28 h-24 my-2" />

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-[#FDF7ED] drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#D4A836]/20 border border-[#D4A836]/40 text-xs text-[#F0CA60]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A836]" />
            <span>Puri Agung Dewata Emas Bali</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#F0CA60] mt-3">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
              : 'Jumat, 20 November 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. SLOKA MANAWA DHARMASASTRA (QUOTE) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto p-8 rounded-3xl bg-[#F4ECE0] border-2 border-[#D4A836]/50 shadow-md text-center space-y-3"
      >
        <div className="text-xs tracking-[0.25em] font-bold text-[#8C3827] uppercase">
          Kearifan Suci Dharma Pawiwahan Bali
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#281A16]">
          "{content.quote || 'Asih, asah, asuh ring sajroning suadarma pawiwahan. Mogi Ida Sang Hyang Widhi Wasa ngicenin karahayuan miwah karahajengan langgeng selawasnyane.'}"
        </p>
        <div className="text-xs font-semibold text-[#8C3827] tracking-wider uppercase">
          — {content.quoteSource || 'Sloka Manawa Dharmasastra IX.101'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: SANG PRATYAKSA PAWIWAHAN (PAYAS AGUNG PEDESTAL) */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4A836] font-bold">
            Sang Kalih Sane Maiketan Tresna
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#8C3827]">
            Sang Purusa & Sang Pradana
          </h3>
          <p className="text-xs text-stone-600 italic">Melarapan antuk paswecan Ida Sang Hyang Widhi Wasa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom (Purusa) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F4ECE0] border-2 border-[#D4A836]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#8C3827] text-[#F0CA60] text-[10px] uppercase tracking-widest font-bold">
                Sang Purusa (Mempelai Pria)
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#D4A836]">
                <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#281A16]">
                  {content.groomName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Okan sane kasayangin olih:</p>
                <p className="text-xs font-semibold text-[#281A16]">{content.groomFather}</p>
                <p className="text-xs font-semibold text-[#281A16]">& {content.groomMother}</p>
              </div>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#8C3827] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#D4A836]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Bride (Pradana) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F4ECE0] border-2 border-[#D4A836]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#8C3827] text-[#F0CA60] text-[10px] uppercase tracking-widest font-bold">
                Sang Pradana (Mempelai Wanita)
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#D4A836]">
                <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#281A16]">
                  {content.brideName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Okan sane kasayangin olih:</p>
                <p className="text-xs font-semibold text-[#281A16]">{content.brideFather}</p>
                <p className="text-xs font-semibold text-[#281A16]">& {content.brideMother}</p>
              </div>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#8C3827] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#D4A836]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: DUDONAN KARYA PAWIWAHAN DEWATA */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4A836] font-bold">
            Dudonan Karya
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#8C3827]">
            Upacara Suci Pawiwahan & Resepsi
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#F4ECE0] border-2 border-[#D4A836]/40 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#D4A836]/40 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8C3827] font-bold block">
                    {i === 0 ? 'Upacara Suci Pawiwahan & Mebyala-byala' : 'Resepsi Sunset Tropical Dewata'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#281A16]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8C3827] text-[#F0CA60]">
                    Acara Utama
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#D4A836] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4A836] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#D4A836] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#281A16]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8C3827] text-[#F0CA60] hover:bg-[#6E2A1C] text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4A836]" />
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
