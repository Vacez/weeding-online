'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, Camera, Sparkles, Flower2 } from 'lucide-react';
import { FullInvitation } from '@/lib/types';
import { CulturalThemeConfig, CulturalMotif, CulturalCornerOrnaments } from '@/lib/culturalThemes';

interface Props {
  invitation: FullInvitation;
  config: CulturalThemeConfig;
  primaryEvent?: any;
}

export default function SundaLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: BALE PARAHYANGAN & RONCE MELATI FLORAL ARCH */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center relative pt-6"
      >
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#163625] via-[#12281D] to-[#0D1C14] text-[#FDFBF7] border border-[#DFCEAC]/50 shadow-2xl relative overflow-hidden">
          
          {/* Jasmine Ronce Floating Accents */}
          <div className="flex justify-center items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#DFCEAC] font-medium mb-1">
            <Flower2 className="w-4 h-4 text-[#DFCEAC] animate-spin-slow" />
            <span>Wawar Uleman Walimatul Ursy</span>
            <Flower2 className="w-4 h-4 text-[#DFCEAC] animate-spin-slow" />
          </div>

          <p className="text-[11px] text-[#DFCEAC]/80 tracking-widest font-sans mb-3">
            ᮝᮃᮝᮁ ᮅᮜᮨᮙᮔ᮪ ᮕᮛᮠᮡᮍᮔ᮪
          </p>

          <CulturalMotif type="sunda" className="w-28 h-20 my-3" />

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#DFCEAC]/20 border border-[#DFCEAC]/40 text-xs text-[#E2D1B3]">
            <Sparkles className="w-3.5 h-3.5 text-[#DFCEAC]" />
            <span>Pesona Parahyangan Siger Kencana</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#E2D1B3] mt-3">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
              : 'Saptu, 28 Nopember 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. POETIC SUNDANESE WISDOM (SILIIH ASIH SILIH ASAH SILIH ASUH) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto p-7 rounded-3xl bg-[#F0F5F1] border-2 border-[#D4B26F]/40 shadow-sm text-center space-y-3"
      >
        <div className="text-xs tracking-[0.25em] font-bold text-[#1E3F2E] uppercase">
          Kearifan Luhur Tatar Sunda
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#1A3828]">
          "{content.quote || 'Silih asih, silih asah, silih asuh. Kanyaah salawasna nyangcang dina rasa, nyaangan jalan kahirupan kulawarga anu barokah.'}"
        </p>
        <div className="text-xs font-semibold text-[#8C6D2B] tracking-wider uppercase">
          — {content.quoteSource || 'Parahyangan & QS. An-Nur: 32'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: PANGANTEN ISTIMEWA SUNDA (CIRCULAR PEARL MEDALLIONS) */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4B26F] font-bold">
            Panganten Anom Parahyangan
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1A3828]">
            Calon Panganten Pameget & Istri
          </h3>
          <p className="text-xs text-stone-600 italic">Mugia ginuluran karahayuan sareng panangtayungan Gusti Nu Maha Suci</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Groom Card with Pearl Medallion */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-8 rounded-3xl bg-[#F0F5F1] border border-[#D4B26F]/40 shadow-md text-center space-y-4 relative"
          >
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-[#D4B26F] p-1 bg-white">
              <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover rounded-full" />
            </div>

            <span className="inline-block py-1 px-4 rounded-full bg-[#1A3828] text-[#E2D1B3] text-[10px] uppercase tracking-widest font-bold">
              Panganten Pameget (Pria)
            </span>

            <div className="space-y-1">
              <h4 className="font-serif-cormorant text-2xl font-bold text-[#1A3828]">
                {content.groomName}
              </h4>
              <p className="text-xs text-stone-600 font-medium">Putra pituin ti pasangan:</p>
              <p className="text-xs font-semibold text-[#1A3828]">{content.groomFather}</p>
              <p className="text-xs font-semibold text-[#1A3828]">& {content.groomMother}</p>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white text-[#1A3828] shadow-sm hover:scale-105 transition-all">
                <Camera className="w-3.5 h-3.5 text-[#D4B26F]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Bride Card with Pearl Medallion */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-8 rounded-3xl bg-[#F0F5F1] border border-[#D4B26F]/40 shadow-md text-center space-y-4 relative"
          >
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-[#D4B26F] p-1 bg-white">
              <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover rounded-full" />
            </div>

            <span className="inline-block py-1 px-4 rounded-full bg-[#1A3828] text-[#E2D1B3] text-[10px] uppercase tracking-widest font-bold">
              Panganten Istri (Wanita)
            </span>

            <div className="space-y-1">
              <h4 className="font-serif-cormorant text-2xl font-bold text-[#1A3828]">
                {content.brideName}
              </h4>
              <p className="text-xs text-stone-600 font-medium">Putri pituin ti pasangan:</p>
              <p className="text-xs font-semibold text-[#1A3828]">{content.brideFather}</p>
              <p className="text-xs font-semibold text-[#1A3828]">& {content.brideMother}</p>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white text-[#1A3828] shadow-sm hover:scale-105 transition-all">
                <Camera className="w-3.5 h-3.5 text-[#D4B26F]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: RUNTUYAN ADAT SAWER & WALIMATUL URSY */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4B26F] font-bold">
            Runtuyan Acara
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1A3828]">
            Waktos & Tempat Akad Sarta Walimah
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#F0F5F1] border border-[#D4B26F]/40 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#D4B26F]/30 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#1E3F2E] font-bold block">
                    {i === 0 ? 'Akad Nikah & Sawer Panganten' : 'Uleman Resepsi Walimatul Ursy'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#1A3828]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A3828] text-[#E2D1B3]">
                    Acara Utama
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#D4B26F] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4B26F] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#D4B26F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#1A3828]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A3828] text-[#E2D1B3] hover:bg-[#12281D] text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4B26F]" />
                  <span>Pituduh Lokasi Google Maps</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
