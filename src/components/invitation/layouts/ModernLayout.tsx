'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, Camera, Sparkles } from 'lucide-react';
import { FullInvitation } from '@/lib/types';
import { CulturalThemeConfig, CulturalMotif } from '@/lib/culturalThemes';

interface Props {
  invitation: FullInvitation;
  config: CulturalThemeConfig;
  primaryEvent?: any;
}

export default function ModernLayout({ invitation, config, primaryEvent }: Props) {
  const content = invitation.content!;

  return (
    <div className="space-y-20">
      {/* 1. HERO: VOGUE WEDDING EDITORIAL COVER */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative pt-6"
      >
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#202020] via-[#161616] to-[#0D0D0D] text-[#FAF8F5] border border-[#B59A62]/40 shadow-2xl relative overflow-hidden">
          
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.35em] text-[#E8D8B8] border-b border-white/10 pb-3 mb-6">
            <span>The Wedding Issue</span>
            <span>Est. 2026</span>
            <span>Vol. I</span>
          </div>

          <CulturalMotif type="modern" className="w-20 h-16 my-2" />

          <h2 className="font-serif-cormorant text-5xl sm:text-6xl font-bold tracking-tight text-[#FAF8F5] drop-shadow-md">
            {content.groomNickname} & {content.brideNickname}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-white/10 border border-white/20 text-xs text-[#E8D8B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#B59A62]" />
            <span>The Royal Ivory & Champagne Editorial</span>
          </div>

          <p className="text-sm italic font-serif-cormorant text-lg text-[#E8D8B8] mt-4">
            {primaryEvent?.date 
              ? new Date(primaryEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) 
              : 'Saturday, December 19, 2026'}
          </p>
        </div>
      </motion.section>

      {/* 2. EDITORIAL PULL-QUOTE */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto p-8 rounded-3xl bg-[#F0ECE1] border border-[#B59A62]/30 shadow-sm text-center space-y-3"
      >
        <div className="text-[11px] tracking-[0.3em] font-bold text-stone-500 uppercase">
          A Timeless Love Story
        </div>
        <p className="font-serif-cormorant text-xl sm:text-2xl italic leading-relaxed text-[#1F1F1F]">
          "{content.quote || 'Two souls with but a single thought, two hearts that beat as one. A modern love story, celebrated in timeless grace.'}"
        </p>
        <div className="text-xs font-semibold text-[#B59A62] tracking-wider uppercase">
          — {content.quoteSource || '1 Corinthians 13:13 & John Keats'}
        </div>
      </motion.section>

      {/* 3. MEMPELAI: DUAL POLAROID EDITORIAL SPREAD */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B59A62] font-bold">
            The Happy Couple
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F1F1F]">
            Groom & Bride
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom Card */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F0ECE1] border border-[#B59A62]/30 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#1F1F1F] text-[#E8D8B8] text-[10px] uppercase tracking-widest font-bold">
                The Groom
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-white p-1 bg-white">
                <img src={content.groomPhoto || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'} alt={content.groomName} className="w-full h-full object-cover rounded-lg" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F1F1F]">
                  {content.groomName}
                </h4>
                <p className="text-xs text-stone-500 font-medium">Beloved son of:</p>
                <p className="text-xs font-semibold text-[#1F1F1F]">{content.groomFather}</p>
                <p className="text-xs font-semibold text-[#1F1F1F]">& {content.groomMother}</p>
              </div>
            </div>

            {content.groomInstagram && (
              <a href={`https://instagram.com/${content.groomInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white text-[#1F1F1F] shadow-sm hover:scale-105 transition-all">
                <Camera className="w-3.5 h-3.5 text-[#B59A62]" />
                <span>@{content.groomInstagram}</span>
              </a>
            )}
          </motion.div>

          {/* Bride Card */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-3xl bg-[#F0ECE1] border border-[#B59A62]/30 shadow-md text-center space-y-4 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-block py-1 px-4 rounded-full bg-[#1F1F1F] text-[#E8D8B8] text-[10px] uppercase tracking-widest font-bold">
                The Bride
              </span>

              <div className="relative w-40 h-52 mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-white p-1 bg-white">
                <img src={content.bridePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'} alt={content.brideName} className="w-full h-full object-cover rounded-lg" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F1F1F]">
                  {content.brideName}
                </h4>
                <p className="text-xs text-stone-500 font-medium">Beloved daughter of:</p>
                <p className="text-xs font-semibold text-[#1F1F1F]">{content.brideFather}</p>
                <p className="text-xs font-semibold text-[#1F1F1F]">& {content.brideMother}</p>
              </div>
            </div>

            {content.brideInstagram && (
              <a href={`https://instagram.com/${content.brideInstagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-4 rounded-full bg-white text-[#1F1F1F] shadow-sm hover:scale-105 transition-all">
                <Camera className="w-3.5 h-3.5 text-[#B59A62]" />
                <span>@{content.brideInstagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. ACARA: BLACK-TIE GALA ITINERARY */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B59A62] font-bold">
            The Wedding Schedule
          </p>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#1F1F1F]">
            Matrimony & Evening Gala
          </h3>
        </div>

        <div className="space-y-5">
          {invitation.events?.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-[#F0ECE1] border border-[#B59A62]/30 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B59A62] font-bold block">
                    {i === 0 ? 'Holy Matrimony Service' : 'Dinner Gala & Toast'}
                  </span>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-[#1F1F1F]">
                    {ev.title}
                  </h4>
                </div>
                {ev.isPrimary && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1F1F1F] text-[#E8D8B8]">
                    Primary Event
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#B59A62] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">
                    {new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#B59A62] flex-shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.startTime} - {ev.endTime} {ev.timezone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs mb-4">
                <MapPin className="w-4 h-4 text-[#B59A62] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#1F1F1F]">{ev.venueName}</p>
                  <p className="text-stone-600 leading-relaxed">{ev.venueAddress}</p>
                </div>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1F1F] text-[#E8D8B8] hover:bg-black text-xs font-semibold shadow-md transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-[#B59A62]" />
                  <span>View Location on Google Maps</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
