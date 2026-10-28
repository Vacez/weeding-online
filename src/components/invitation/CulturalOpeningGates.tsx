'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CulturalThemeConfig, CulturalType, CulturalMotif, CulturalCornerOrnaments } from '@/lib/culturalThemes';
import { Music, Sparkles, ChevronDown, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CulturalOpeningGatesProps {
  config: CulturalThemeConfig;
  selectedCulture: CulturalType;
  groomNickname: string;
  brideNickname: string;
  guestName: string;
  isOpened: boolean;
  onOpened: () => void;
}

export default function CulturalOpeningGates({
  config,
  selectedCulture,
  groomNickname,
  brideNickname,
  guestName,
  isOpened,
  onOpened,
}: CulturalOpeningGatesProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // Culture-tailored confetti palette
    const confettiColors: Record<CulturalType, string[]> = {
      jawa: [config.accentGold, '#E8D8B8', '#FAF7F0', '#FFFFFF', '#D4AF37'],
      sunda: ['#DFCEAC', '#153222', '#D4B26F', '#F4E8D1', '#FFFFFF'],
      minang: ['#E0B338', '#6B1624', '#000000', '#F7D87E', '#FFFFFF'],
      batak: ['#C89D3C', '#781515', '#2A0E0E', '#FAF6F2', '#E8C56E'],
      bali: ['#D4A836', '#8C3827', '#FDF7ED', '#F0CA60', '#FFE4B5'],
      islami: ['#D4AF37', '#14422D', '#FFFFFF', '#E6C962', '#F9FCFA'],
      modern: ['#B59A62', '#1C1C1E', '#E8D8B8', '#FFFFFF', '#F2E6CD'],
    };

    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: confettiColors[selectedCulture] || [config.accentGold, '#FFFFFF'],
    });

    // Let the gate opening animation complete before marking opened
    setTimeout(() => {
      onOpened();
    }, 1300);
  };

  return (
    <>
      {/* =========================================================================
          PERSISTENT THEMATIC LANDMARK BACKGROUND (Visible both on Cover & Scroll)
          ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Landmark Photo with Slow Ken-Burns Cinematic Zoom */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${config.landmarkImage})`,
            filter: isOpened ? 'blur(4px)' : 'none',
          }}
        />

        {/* Ambient Dark Gradient Vignette & Cultural Tint */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isOpened
              ? 'bg-[#FAF7F0]/90 dark:bg-black/85 backdrop-blur-[2px]'
              : 'bg-gradient-to-b from-black/75 via-black/55 to-black/85'
          }`}
        />

        {/* Subtle Landmark Attribution Pill at Bottom-Right */}
        {!isOpened && (
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white/80">
            <MapPin className="w-3 h-3 text-[#C5A059]" />
            <span>{config.landmarkName}</span>
          </div>
        )}
      </div>

      {/* =========================================================================
          COVER & GATE OPENING DOORS (Interactive Screen until opened)
          ========================================================================= */}
      <AnimatePresence>
        {!isOpened && (
          <div className="fixed inset-0 z-30 flex items-center justify-center p-4 overflow-hidden perspective-[1200px]">
            {/* -------------------------------------------------------------
                LEFT CULTURAL DOOR LEAF (Swings and slides to the left)
                ------------------------------------------------------------- */}
            <motion.div
              initial={{ x: 0, rotateY: 0 }}
              animate={
                isOpening
                  ? {
                      x: '-110%',
                      rotateY: -35,
                      opacity: [1, 0.9, 0],
                      transition: { duration: 1.25, ease: [0.76, 0, 0.24, 1] },
                    }
                  : { x: 0, rotateY: 0 }
              }
              className="absolute top-0 bottom-0 left-0 w-1/2 z-40 pointer-events-none overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${config.gateColorTheme.primary} 0%, ${config.gateColorTheme.secondary} 100%)`,
                boxShadow: '15px 0 35px rgba(0,0,0,0.7)',
                borderRight: `2px solid ${config.gateColorTheme.border}`,
              }}
            >
              {/* Left Door Authentic Ornaments & Motif */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="absolute top-6 left-6 opacity-60">
                <CulturalCornerOrnaments type={selectedCulture} />
              </div>
              <div className="absolute top-1/2 -right-16 -translate-y-1/2 opacity-25">
                <CulturalMotif type={selectedCulture} className="w-48 h-48" />
              </div>
              {/* Door Panel Bevel Lines */}
              <div
                className="absolute inset-4 sm:inset-8 border rounded-2xl pointer-events-none opacity-40"
                style={{ borderColor: config.gateColorTheme.accent }}
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 w-3 h-16 rounded-full border shadow-inner opacity-80"
                style={{
                  backgroundColor: config.gateColorTheme.accent,
                  borderColor: '#FFFFFF',
                }}
              />
            </motion.div>

            {/* -------------------------------------------------------------
                RIGHT CULTURAL DOOR LEAF (Swings and slides to the right)
                ------------------------------------------------------------- */}
            <motion.div
              initial={{ x: 0, rotateY: 0 }}
              animate={
                isOpening
                  ? {
                      x: '110%',
                      rotateY: 35,
                      opacity: [1, 0.9, 0],
                      transition: { duration: 1.25, ease: [0.76, 0, 0.24, 1] },
                    }
                  : { x: 0, rotateY: 0 }
              }
              className="absolute top-0 bottom-0 right-0 w-1/2 z-40 pointer-events-none overflow-hidden"
              style={{
                background: `linear-gradient(225deg, ${config.gateColorTheme.primary} 0%, ${config.gateColorTheme.secondary} 100%)`,
                boxShadow: '-15px 0 35px rgba(0,0,0,0.7)',
                borderLeft: `2px solid ${config.gateColorTheme.border}`,
              }}
            >
              {/* Right Door Authentic Ornaments & Motif */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="absolute top-6 right-6 opacity-60 scale-x-[-1]">
                <CulturalCornerOrnaments type={selectedCulture} />
              </div>
              <div className="absolute top-1/2 -left-16 -translate-y-1/2 opacity-25 scale-x-[-1]">
                <CulturalMotif type={selectedCulture} className="w-48 h-48" />
              </div>
              {/* Door Panel Bevel Lines */}
              <div
                className="absolute inset-4 sm:inset-8 border rounded-2xl pointer-events-none opacity-40"
                style={{ borderColor: config.gateColorTheme.accent }}
              />
              <div
                className="absolute top-1/2 left-4 -translate-y-1/2 w-3 h-16 rounded-full border shadow-inner opacity-80"
                style={{
                  backgroundColor: config.gateColorTheme.accent,
                  borderColor: '#FFFFFF',
                }}
              />
            </motion.div>

            {/* -------------------------------------------------------------
                REVEAL FLASH & CULTURAL WELCOME GREETING ON OPENING
                ------------------------------------------------------------- */}
            {isOpening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.05, 1.1, 1.2] }}
                transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1] }}
                className="absolute inset-0 z-45 flex flex-col items-center justify-center pointer-events-none text-center px-4"
              >
                <div
                  className="w-32 h-32 rounded-full blur-2xl absolute"
                  style={{ backgroundColor: `${config.accentGold}40` }}
                />
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="space-y-3 relative z-10"
                >
                  <span className="text-3xl sm:text-5xl font-bold tracking-widest text-[#FAF7F0] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] block">
                    {config.welcomeAksara}
                  </span>
                  <p
                    className="font-serif-cormorant text-xl sm:text-2xl font-bold tracking-wide drop-shadow-md"
                    style={{ color: config.accentGold }}
                  >
                    {config.welcomeGreeting}
                  </p>
                  <p className="text-xs text-white/90 font-light italic max-w-sm mx-auto">
                    {config.gateSubtitle}
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* -------------------------------------------------------------
                CENTER INVITATION COVER CARD (Enclosed inside the gate)
                ------------------------------------------------------------- */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={
                isOpening
                  ? { scale: 1.08, opacity: 0, y: -20, transition: { duration: 0.6 } }
                  : { scale: 1, opacity: 1, y: 0, transition: { duration: 0.7 } }
              }
              className={`max-w-md w-full text-center space-y-4 sm:space-y-5 p-7 sm:p-9 rounded-3xl bg-black/60 backdrop-blur-2xl border ${config.coverBorderClass} shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative z-40 overflow-hidden my-auto`}
            >
              {/* Cultural Frame Accents */}
              <CulturalCornerOrnaments type={selectedCulture} />

              {/* Landmark Header Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] text-[#E8D8B8]">
                <MapPin className="w-3 h-3 text-[#C5A059]" />
                <span className="font-medium truncate max-w-[240px]">
                  {config.landmarkName}
                </span>
              </div>

              {/* Glowing Cultural Wax Seal */}
              <div className="relative mx-auto w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#C5A059]/50 animate-spin-slow pointer-events-none" />
                <div className="wax-seal shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-transform hover:scale-110 duration-300">
                  <span className="font-serif-cormorant text-2xl font-bold tracking-tighter text-[#2A1D17]">
                    {config.waxSealMonogram}
                  </span>
                </div>
              </div>

              {/* Cultural Headings & Couple Nicknames */}
              <div className="space-y-1">
                <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#E8D8B8]/90 font-medium">
                  {config.subHonorific}
                </p>
                <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0] drop-shadow-md">
                  {groomNickname} & {brideNickname}
                </h1>
                <p className="text-xs text-[#E8D8B8]/80 italic font-serif">
                  {config.honorificTitle}
                </p>
              </div>

              {/* Cultural Motif Breathing Icon */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="my-1"
              >
                <CulturalMotif type={selectedCulture} className="w-20 h-20 sm:w-24 sm:h-24 mx-auto" />
              </motion.div>

              {/* Personalized Guest Badge */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl ${config.coverBadgeClass} backdrop-blur-md text-center space-y-1 relative overflow-hidden`}
              >
                <p className="text-[10px] sm:text-[11px] text-[#E8D8B8]/80 font-light">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <p className="font-serif-cormorant text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {guestName}
                </p>
                <p className="text-[9px] sm:text-[10px] text-[#E8D8B8]/70 italic">
                  Mohon maaf bila ada kesalahan penulisan nama atau gelar
                </p>
              </div>

              {/* Music Pill */}
              <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-black/40 border border-[#C5A059]/30 text-[10px] text-[#E8D8B8]/95 shadow-inner">
                <Music className="w-3 h-3 text-[#C5A059] animate-pulse" />
                <span className="truncate max-w-[210px]">{config.musicTitle}</span>
              </div>

              {/* Open CTA Button with Gate Shimmer Effect */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className={`w-full py-3.5 sm:py-4 px-6 rounded-full bg-gradient-to-r ${config.buttonGradientClass} font-bold text-xs tracking-[0.18em] uppercase shadow-2xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 group cursor-pointer relative overflow-hidden`}
              >
                <span className="absolute inset-0 w-1/3 bg-white/30 skew-x-12 animate-shimmer-sweep pointer-events-none" />
                <Sparkles
                  className="w-4 h-4 text-[#1A1412] animate-spin"
                  style={{ animationDuration: '4s' }}
                />
                <span className="relative z-10 font-extrabold">
                  {isOpening ? 'Membuka Gerbang...' : 'Buka Undangan Resmi'}
                </span>
                <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
