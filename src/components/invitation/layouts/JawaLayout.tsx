'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, Camera, Sparkles } from 'lucide-react';
import { FullInvitation } from '@/lib/types';
import { CulturalThemeConfig, CulturalMotif, CulturalDivider, CulturalCornerOrnaments } from '@/lib/culturalThemes';

interface Props {
  invitation: FullInvitation;
  config: CulturalThemeConfig;
  primaryEvent?: any;
}

export default function JawaLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: GAPURA BANGSAL KENCANA & PENDOPO AGUNG */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative pt-8 pb-4"
      >
        {/* Royal Keraton Wooden Arch Header */}
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2A1D17] to-[#1A1412] text-[#F5EAD4] border-2 border-[#C5A059]/50 shadow-2xl relative overflow-hidden">
          <CulturalCornerOrnaments type="jawa" />

          {/* Aksara Jawa Royal Header */}
          <p className="font-serif-cormorant text-base tracking-[0.2em] text-[#C5A059] mb-1 font-semibold uppercase">
            Serat Ulem Pawiwahan Dalem
          </p>
          <p className="text-xs text-[#E8D8B8]/80 tracking-widest font-sans mb-3">
            ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀ꦥꦮꦶꦮꦲꦤ꧀
          </p>

          {/* Central Gunungan with Royal Halo */}
          <div className="relative my-4 flex justify-center">
            <div className="absolute inset-0 bg-[#C5A059]/20 blur-xl rounded-full pointer-events-none" />
            <CulturalMotif type="jawa" className="w-28 h-28 relative z-10" />
          </div>

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-[#FAF7F0] drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-xs text-[#E8D8B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Pawiwahan Ageng Keraton Hadiningrat</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#E8D8B8]/90 mt-3">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
              : 'Sabtu Pahing, 12 Desember 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. SERAT CENTHINI PHILOSOPHICAL SCROLL (QUOTE) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto p-8 rounded-3xl bg-[#F4ECE1] border-2 border-[#C5A059]/40 shadow-md text-center space-y-4 relative"
      >
        <div className="text-xs tracking-[0.3em] font-bold text-[#8C6D2B] uppercase">
          Filosofi Luhur Jawa Serat Centhini
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#2A1D17]">
          "{content.quote || 'Ngluruk tanpa bala, menang tanpa ngasorake, sekti tanpa aji-aji, sugih tanpa bandha. Memayu hayuning bawana, tresna sejati ingkang suci.'}"
        </p>
        <div className="text-xs font-semibold text-[#8C6D2B] tracking-wider uppercase">
          — {content.quoteSource || 'Serat Centhini & QS. Ar-Rum: 21'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: PASANGAN PRAJA KERATON (GEBYOK UKIR DIPTYCH) */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Panganten Suci Ingkang Bagya Mulya
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#2A1D17]">
            Sang Kakung & Sang Putri
          </h3>
          <p className="text-xs text-stone-600 italic">Mugi Gusti Murbeng Dumadi tansah maringi berkah katentreman</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom: Raden Mas */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F4ECE1] border-2 border-[#C5A059]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#2A1D17] text-[#E8D8B8] text-[10px] uppercase tracking-widest font-bold">
                Sang Kakung (Mempelai Pria)
              </span>

              {/* Photo in Keraton Gold Frame */}
              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#C5A059]">
                <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#2A1D17]">
                  {content.groomName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Putra tercinta dalem:</p>
                <p className="text-xs font-semibold text-[#2A1D17]">{content.groomFather}</p>
                <p className="text-xs font-semibold text-[#2A1D17]">& {content.groomMother}</p>
              </div>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#2A1D17] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Bride: Raden Ajeng */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F4ECE1] border-2 border-[#C5A059]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#2A1D17] text-[#E8D8B8] text-[10px] uppercase tracking-widest font-bold">
                Sang Putri (Mempelai Wanita)
              </span>

              {/* Photo in Keraton Gold Frame */}
              <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden shadow-xl border-3 border-[#C5A059]">
                <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#2A1D17]">
                  {content.brideName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Putri tercinta dalem:</p>
                <p className="text-xs font-semibold text-[#2A1D17]">{content.brideFather}</p>
                <p className="text-xs font-semibold text-[#2A1D17]">& {content.brideMother}</p>
              </div>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#2A1D17] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: PRASASTI IJAB QOBUL & PAHARGYAN AGENG */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Rerangkening Pahargyan
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#2A1D17]">
            Rangkaian Acara Pawiwahan
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 sm:p-8 rounded-3xl bg-[#F4ECE1] border-2 border-[#C5A059]/40 shadow-sm relative overflow-hidden"
            >
              {/* Header with Gebyok motif icon */}
              <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8C6D2B] font-bold block">
                    {i === 0 ? 'Upacara Suci Ijab Qobul & Panggih' : 'Pahargyan Ageng Resepsi'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#2A1D17]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2A1D17] text-[#E8D8B8]">
                    Acara Utama
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#2A1D17]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A1D17] text-[#E8D8B8] hover:bg-[#1A1412] text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Pituduh Papan Palenggahan (Google Maps)</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
