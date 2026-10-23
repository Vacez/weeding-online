'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, Camera, Sparkles, Shield } from 'lucide-react';
import { FullInvitation } from '@/lib/types';
import { CulturalThemeConfig, CulturalMotif, CulturalCornerOrnaments } from '@/lib/culturalThemes';

interface Props {
  invitation: FullInvitation;
  config: CulturalThemeConfig;
  primaryEvent?: any;
}

export default function BatakLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: RUMA BOLON & MEDALLION DALIHAN NA TOLU */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative pt-6"
      >
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#280C0C] via-[#1B0808] to-[#120505] text-[#F9F5EC] border-2 border-[#C89D3C]/50 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#E5BF65] font-bold mb-1">
            <Shield className="w-4 h-4 text-[#C89D3C]" />
            <span>Gokhon Dohot Jou-jou Parsangapan</span>
            <Shield className="w-4 h-4 text-[#C89D3C]" />
          </div>

          <p className="text-xs text-[#E5BF65]/80 font-sans tracking-widest mb-3">
            ᯅᯖᯂ᯲ ᯖᯬᯅ — Dalihan Na Tolu
          </p>

          <CulturalMotif type="batak" className="w-28 h-24 my-2" />

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-[#F9F5EC] drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#C89D3C]/20 border border-[#C89D3C]/40 text-xs text-[#E5BF65]">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D3C]" />
            <span>Ulaon Unjuk Pamasu-masuon Adat Batak</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#E5BF65] mt-3">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
              : 'Sabtu, 14 November 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. UMPASA BATAK TOBA (QUOTE) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto p-8 rounded-3xl bg-[#F3EBE3] border-2 border-[#C89D3C]/50 shadow-md text-center space-y-3"
      >
        <div className="text-xs tracking-[0.25em] font-bold text-[#8B1414] uppercase">
          Umpasa Batak Toba & Dalihan Na Tolu
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#231515]">
          "{content.quote || 'Tombak gurgur tu dolok ni purbatua. Sai torkis ma hita on saluhutna, tubuan anak dohot boru, jala gabe na saur matua marpanumpak Tuhanta.'}"
        </p>
        <div className="text-xs font-semibold text-[#8B1414] tracking-wider uppercase">
          — {content.quoteSource || 'Umpasa Batak & Pengkhotbah 4:12'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: PANGOLI DOHOT OROAN (ULOS TAPESTRY) */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C89D3C] font-bold">
            Pangoli Dohot Oroan
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#8B1414]">
            Sepasang Pangenten Batak Toba
          </h3>
          <p className="text-xs text-stone-600 italic">Somba Marhula-hula, Elek Marboru, Manat Mardongan Tubu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom (Pangoli) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F3EBE3] border-2 border-[#C89D3C]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#8B1414] text-[#E5BF65] text-[10px] uppercase tracking-widest font-bold">
                Pangoli (Mempelai Pria)
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#C89D3C]">
                <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#231515]">
                  {content.groomName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Anak hinaholongan ni:</p>
                <p className="text-xs font-semibold text-[#231515]">{content.groomFather}</p>
                <p className="text-xs font-semibold text-[#231515]">& {content.groomMother}</p>
              </div>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#8B1414] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#C89D3C]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Bride (Oroan) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F3EBE3] border-2 border-[#C89D3C]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#8B1414] text-[#E5BF65] text-[10px] uppercase tracking-widest font-bold">
                Oroan (Mempelai Wanita)
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#C89D3C]">
                <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#231515]">
                  {content.brideName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Boru hinaholongan ni:</p>
                <p className="text-xs font-semibold text-[#231515]">{content.brideFather}</p>
                <p className="text-xs font-semibold text-[#231515]">& {content.brideMother}</p>
              </div>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#8B1414] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#C89D3C]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: PAMASU-MASUON GEREJA & ULAON UNJUK ADAT */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C89D3C] font-bold">
            Partording Ni Ulaon
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#8B1414]">
            Pemberkatan Suci & Pesta Adat
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#F3EBE3] border-2 border-[#C89D3C]/40 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#C89D3C]/40 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8B1414] font-bold block">
                    {i === 0 ? 'Pamasu-masuon (Pemberkatan Kudus)' : 'Ulaon Unjuk / Pesta Adat Batak'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#231515]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8B1414] text-[#E5BF65]">
                    Acara Utama
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#C89D3C] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C89D3C] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#C89D3C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#231515]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B1414] text-[#E5BF65] hover:bg-[#680C0C] text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#C89D3C]" />
                  <span>Petunjuk Lokasi Google Maps</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
