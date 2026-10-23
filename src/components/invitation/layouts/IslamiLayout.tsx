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

export default function IslamiLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: MIHRAB KUBAH NABAWI & BASMALAH */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative pt-6"
      >
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#14422D] via-[#0C2B1C] to-[#071910] text-[#F9FCFA] border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
          
          <div className="text-xl sm:text-2xl text-[#E6C962] font-serif font-bold tracking-widest mb-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-[#E6C962] font-semibold mb-2">
            Walimatul Ursy Syar'i — Mitsaqan Ghalidza
          </p>

          <CulturalMotif type="islami" className="w-28 h-24 my-2" />

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-[#F9FCFA] drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs text-[#E6C962]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Akad Suci Madinah Nur</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#E6C962] mt-3">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
              : 'Sabtu, 5 Desember 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. SURAH AR-RUM AYAT 21 (QUOTE) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto p-8 rounded-3xl bg-[#EBF3EE] border-2 border-[#D4AF37]/50 shadow-md text-center space-y-3"
      >
        <div className="text-xs tracking-[0.25em] font-bold text-[#14422D] uppercase">
          Kalam Ilahi — Surah Ar-Rum : 21
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#0C2B1C]">
          "{content.quote || 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.'}"
        </p>
        <div className="text-xs font-semibold text-[#8C6D2B] tracking-wider uppercase">
          — {content.quoteSource || 'QS. Ar-Rum Ayat 21'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: SEPASANG HAMBA BERIMAN (MASHREBIYA ALCOVES) */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
            Mempelai yang Dirahmati Allah SWT
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#14422D]">
            Pria & Wanita
          </h3>
          <p className="text-xs text-stone-600 italic">Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#EBF3EE] border-2 border-[#D4AF37]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#14422D] text-[#E6C962] text-[10px] uppercase tracking-widest font-bold">
                Mempelai Pria
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-t-full rounded-b-2xl overflow-hidden shadow-xl border-3 border-[#D4AF37]">
                <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#0C2B1C]">
                  {content.groomName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Putra tercinta dari:</p>
                <p className="text-xs font-semibold text-[#0C2B1C]">{content.groomFather}</p>
                <p className="text-xs font-semibold text-[#0C2B1C]">& {content.groomMother}</p>
              </div>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#14422D] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Bride */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#EBF3EE] border-2 border-[#D4AF37]/50 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#14422D] text-[#E6C962] text-[10px] uppercase tracking-widest font-bold">
                Mempelai Wanita
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-t-full rounded-b-2xl overflow-hidden shadow-xl border-3 border-[#D4AF37]">
                <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#0C2B1C]">
                  {content.brideName}
                </h4>
                <p className="text-xs text-stone-600 font-medium">Putri tercinta dari:</p>
                <p className="text-xs font-semibold text-[#0C2B1C]">{content.brideFather}</p>
                <p className="text-xs font-semibold text-[#0C2B1C]">& {content.brideMother}</p>
              </div>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white/80 hover:bg-white text-[#14422D] shadow-sm transition-all">
                <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: AKAD NIKAH SYAR'I & WALIMATUL URSY */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
            Agenda Ibadah Pernikahan
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#14422D]">
            Akad Nikah & Walimatul Ursy
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#EBF3EE] border-2 border-[#D4AF37]/40 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#14422D] font-bold block">
                    {i === 0 ? 'Akad Ijab Qobul Syar\'i' : 'Walimatul Ursy (Resepsi)'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#0C2B1C]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#14422D] text-[#E6C962]">
                    Acara Utama
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#0C2B1C]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14422D] text-[#E6C962] hover:bg-[#0C2B1C] text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
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
