'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, Gift, Copy, Check, Send, 
  Sparkles, ChevronDown, Music, 
  CheckCircle2
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import CulturalParticles from './CulturalParticles';
import { FullInvitation, Theme } from '@/lib/types';
import confetti from 'canvas-confetti';
import { 
  detectCulturalType, 
  CULTURAL_CONFIGS, 
  CulturalType,
  CulturalMotif,
  CulturalCornerOrnaments,
  CulturalDivider
} from '@/lib/culturalThemes';

// Layout imports
import JawaLayout from './layouts/JawaLayout';
import SundaLayout from './layouts/SundaLayout';
import MinangLayout from './layouts/MinangLayout';
import BatakLayout from './layouts/BatakLayout';
import BaliLayout from './layouts/BaliLayout';
import IslamiLayout from './layouts/IslamiLayout';
import ModernLayout from './layouts/ModernLayout';

interface InvitationRendererProps {
  invitation: FullInvitation;
  guestName?: string;
  isDemo?: boolean;
  allThemes?: Theme[];
}

export default function InvitationRenderer({ 
  invitation, 
  guestName = 'Tamu Undangan Terhormat', 
  isDemo = false,
  allThemes = []
}: InvitationRendererProps) {
  // Cultural theme state (allows live testing/switching on the fly)
  const initialType = detectCulturalType(invitation.theme?.slug, invitation.theme?.tradition?.slug);
  const [selectedCulture, setSelectedCulture] = useState<CulturalType>(initialType);

  const config = CULTURAL_CONFIGS[selectedCulture] || CULTURAL_CONFIGS.jawa;

  const [isOpened, setIsOpened] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [loveCount, setLoveCount] = useState(156);
  const [hasLoved, setHasLoved] = useState(false);
  
  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan Terhormat' ? guestName : '');
  const [rsvpAttendance, setRsvpAttendance] = useState<'ATTENDING' | 'NOT_ATTENDING' | 'MAYBE'>('ATTENDING');
  const [rsvpPax, setRsvpPax] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpsList, setRsvpsList] = useState(invitation.rsvps || []);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const content = invitation.content || {
    groomName: 'Raden Mas Andi Pratama, S.T.',
    groomNickname: 'Andi',
    groomFather: 'Bpk. K.R.T. Bambang Sudiro',
    groomMother: 'Ibu Hj. Raden Ayu Sri Rahayu',
    groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    groomInstagram: 'andipratama',
    brideName: 'Raden Ajeng Siti Nur Aisyah, S.Farm.',
    brideNickname: 'Siti',
    brideFather: 'Bpk. Dr. H. Ahmad Fauzi Hadikusumo',
    brideMother: 'Ibu Hj. Siti Maemunah Murti',
    bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    brideInstagram: 'sitianuraisyiah',
    quote: config.quoteFallback,
    quoteSource: config.quoteSourceFallback,
    openingGreeting: config.salutation,
    closingGreeting: config.closingSalutation,
  };

  const primaryEvent = invitation.events?.find((e) => e.isPrimary) || invitation.events?.[0];
  const targetDate = primaryEvent?.date ? new Date(`${primaryEvent.date}T${primaryEvent.startTime || '08:00'}:00`) : new Date(Date.now() + 30 * 24 * 3600 * 1000);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    confetti({
      particleCount: 95,
      spread: 75,
      origin: { y: 0.6 },
      colors: [config.accentGold, '#E8D8B8', '#FAF7F0', '#FFFFFF', '#D4AF37'],
    });
  };

  const handleSendLove = () => {
    setLoveCount((prev) => prev + 1);
    setHasLoved(true);
    confetti({
      particleCount: 35,
      spread: 45,
      origin: { x: 0.1, y: 0.9 },
      colors: ['#E11D48', '#FDA4AF', '#F59E0B', config.accentGold],
    });
    setTimeout(() => setHasLoved(false), 2000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 3000);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpMessage) return;

    setIsSubmittingRsvp(true);
    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationId: invitation.id,
          guestName: rsvpName,
          attendance: rsvpAttendance,
          pax: rsvpPax,
          message: rsvpMessage,
        }),
      });

      if (res.ok) {
        const newRsvp = await res.json();
        setRsvpsList([newRsvp, ...rsvpsList]);
        setRsvpSuccess(true);
        setRsvpMessage('');
      } else {
        throw new Error();
      }
    } catch {
      // Optimistic update
      setRsvpsList([
        {
          id: Date.now().toString(),
          invitationId: invitation.id,
          guestName: rsvpName,
          attendance: rsvpAttendance,
          pax: rsvpPax,
          message: rsvpMessage,
          createdAt: new Date(),
        },
        ...rsvpsList,
      ]);
      setRsvpSuccess(true);
      setRsvpMessage('');
    } finally {
      setIsSubmittingRsvp(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [config.accentGold, '#10B981', '#F59E0B'],
      });
    }
  };

  const cultureTabs: { type: CulturalType; label: string; icon: string; musicDesc: string }[] = [
    { type: 'jawa', label: 'Adat Jawa', icon: '👑', musicDesc: 'Gamelan Keraton' },
    { type: 'sunda', label: 'Adat Sunda', icon: '🌿', musicDesc: 'Kacapi Suling' },
    { type: 'minang', label: 'Minangkabau', icon: '🏛️', musicDesc: 'Talempong Saluang' },
    { type: 'batak', label: 'Adat Batak', icon: '🧣', musicDesc: 'Gondang & Hasapi' },
    { type: 'bali', label: 'Adat Bali', icon: '🌺', musicDesc: 'Rindik Dewata' },
    { type: 'islami', label: 'Islami Syar\'i', icon: '🌙', musicDesc: 'Gambus Oud' },
    { type: 'modern', label: 'Modern Vogue', icon: '✨', musicDesc: 'Romantic Piano' },
  ];

  const renderCulturalLayout = () => {
    switch (selectedCulture) {
      case 'jawa':
        return <JawaLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
      case 'sunda':
        return <SundaLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
      case 'minang':
        return <MinangLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
      case 'batak':
        return <BatakLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
      case 'bali':
        return <BaliLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
      case 'islami':
        return <IslamiLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
      case 'modern':
      default:
        return <ModernLayout invitation={invitation} config={config} primaryEvent={primaryEvent} />;
    }
  };

  return (
    <div className={`relative min-h-screen ${config.mainBgClass} ${config.mainTextClass} selection:bg-[#B59A62] selection:text-white transition-colors duration-700 overflow-x-hidden`}>
      
      {/* 1. TOP SCROLL PROGRESS BAR */}
      {isOpened && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
          style={{ 
            scaleX,
            background: `linear-gradient(90deg, ${config.accentGold}, #FCEBB6, ${config.accentGold})`
          }}
        />
      )}

      {/* 2. CULTURAL PARTICLES (Ambient floating/falling particles) */}
      <CulturalParticles type={selectedCulture} />

      {/* 3. BACKGROUND AUDIO (Plays continuously without turn-off button) */}
      <AudioPlayer 
        musicUrl={config.musicUrl} 
        musicTitle={config.musicTitle}
        autoPlay={isOpened} 
      />

      {/* 4. QUICK THEME DEMO PREVIEW FLOATING BAR */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-[#1A1412]/92 backdrop-blur-md border border-[#C5A059]/40 rounded-full px-3 py-1.5 shadow-2xl flex items-center justify-between gap-2 text-xs text-[#FAF7F0]"
        >
          <div className="flex items-center gap-1.5 pl-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline text-[11px] font-semibold text-[#E8D8B8]">Tema Budaya:</span>
            <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider">{config.name}</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {cultureTabs.map((tab) => {
              const active = selectedCulture === tab.type;
              return (
                <button
                  key={tab.type}
                  onClick={() => setSelectedCulture(tab.type)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#E8D8B8] text-[#1A1412] font-bold shadow-md scale-105'
                      : 'text-[#E8D8B8]/80 hover:text-white hover:bg-white/10'
                  }`}
                  title={`${tab.label} — ${tab.musicDesc}`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden md:inline">{tab.label.replace('Adat ', '')}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 5. FLOATING LOVE / RESTU REACTION BUTTON (Bottom-Left) */}
      {isOpened && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="fixed bottom-6 left-6 z-40"
        >
          <button
            onClick={handleSendLove}
            className={`py-2.5 px-4 rounded-full bg-[#1A1412]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#FAF7F0] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group ${hasLoved ? 'ring-2 ring-rose-400' : ''}`}
            title="Kirim Doa & Cinta untuk Mempelai"
          >
            <Heart className={`w-4 h-4 text-rose-500 fill-rose-500 transition-transform ${hasLoved ? 'scale-125' : 'group-hover:scale-110'}`} />
            <span className="text-xs font-semibold">{loveCount}</span>
            <span className="hidden sm:inline text-[10px] text-stone-300">Doa Restu</span>
          </button>
        </motion.div>
      )}

      {/* 6. CULTURAL COVER SCREEN OVERLAY (Until opened) */}
      {!isOpened && (
        <div className={`fixed inset-0 z-30 flex items-center justify-center p-4 bg-gradient-to-b ${config.coverBgClass} ${config.coverTextClass} transition-all duration-700 overflow-y-auto`}>
          <motion.div 
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`max-w-md w-full text-center space-y-5 p-8 sm:p-10 rounded-3xl bg-black/45 backdrop-blur-xl border ${config.coverBorderClass} shadow-[0_20px_60px_rgba(0,0,0,0.65)] relative overflow-hidden my-auto`}
          >
            {/* Cultural frame corner accents */}
            <CulturalCornerOrnaments type={selectedCulture} />

            {/* Glowing Ring & Cultural Wax Seal */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C5A059]/50 animate-spin-slow pointer-events-none" />
              <div className="wax-seal shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-transform hover:scale-110 duration-300">
                <span className="font-serif-cormorant text-2xl font-bold tracking-tighter text-[#2A1D17]">
                  {config.waxSealMonogram}
                </span>
              </div>
            </div>

            {/* Cultural Headings */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#E8D8B8]/90 font-medium">
                {config.subHonorific}
              </p>
              <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0] drop-shadow-md">
                {content.groomNickname} & {content.brideNickname}
              </h1>
              <p className="text-xs text-[#E8D8B8]/80 italic font-serif">
                {config.honorificTitle}
              </p>
            </div>

            {/* Authentic Cultural Motif with gentle breathing animation */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CulturalMotif type={selectedCulture} className="w-24 h-24" />
            </motion.div>

            {/* Personalized Guest Badge */}
            <div className={`p-4 rounded-2xl ${config.coverBadgeClass} backdrop-blur-md text-center space-y-1 relative overflow-hidden`}>
              <p className="text-[11px] text-[#E8D8B8]/80 font-light">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="font-serif-cormorant text-2xl font-bold text-white tracking-wide">
                {guestName}
              </p>
              <p className="text-[10px] text-[#E8D8B8]/70 italic">Mohon maaf bila ada kesalahan penulisan nama atau gelar</p>
            </div>

            {/* Music Info Pill with Continuous Playback Indicator */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-black/40 border border-[#C5A059]/30 text-[11px] text-[#E8D8B8]/95 shadow-inner">
              <Music className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              <span className="truncate max-w-[220px]">Lagu: {config.musicTitle}</span>
            </div>

            {/* Open CTA with light sweep shimmer */}
            <button
              onClick={handleOpenInvitation}
              className={`w-full py-4 px-6 rounded-full bg-gradient-to-r ${config.buttonGradientClass} font-bold text-xs tracking-[0.18em] uppercase shadow-2xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 group cursor-pointer relative overflow-hidden`}
            >
              <span className="absolute inset-0 w-1/3 bg-white/30 skew-x-12 animate-shimmer-sweep pointer-events-none" />
              <Sparkles className="w-4 h-4 text-[#1A1412] animate-spin" style={{ animationDuration: '4s' }} />
              <span className="relative z-10 font-extrabold">Buka Undangan Resmi</span>
              <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      )}

      {/* 7. THEMATIC CULTURAL MAIN CONTENT (Customized Architecture per Culture) */}
      <main className="max-w-2xl mx-auto px-4 pt-24 pb-20 space-y-16 relative z-20">
        
        {/* Render the specialized cultural layout for Hero, Quote, Mempelai, and Acara */}
        {renderCulturalLayout()}

        <CulturalDivider type={selectedCulture} />

        {/* Countdown Timer with Floating Animation */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`p-8 rounded-3xl ${config.cardBgClass} text-center space-y-6 shadow-sm`}
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: config.accentGold }}>
              Menghitung Hari Bahagia
            </p>
            <h3 className="font-serif-cormorant text-3xl font-bold" style={{ color: config.headingColor }}>
              Waktu Menuju Hari H
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
            {[
              { label: 'Hari', val: timeLeft.days },
              { label: 'Jam', val: timeLeft.hours },
              { label: 'Menit', val: timeLeft.minutes },
              { label: 'Detik', val: timeLeft.seconds },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.08 }}
                className="p-3.5 rounded-2xl bg-white shadow-md border border-stone-200 text-center"
              >
                <span className="font-serif-cormorant text-3xl font-bold block" style={{ color: config.headingColor }}>
                  {item.val}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Digital Gift & Amplop Digital */}
        {invitation.gifts && invitation.gifts.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl ${config.cardBgClass} text-center space-y-6 shadow-sm`}
          >
            <div className="space-y-1">
              <Gift className="w-7 h-7 mx-auto animate-bounce" style={{ color: config.accentGold }} />
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: config.accentGold }}>
                Tanda Kasih & Hadiah
              </p>
              <h3 className="font-serif-cormorant text-3xl font-bold" style={{ color: config.headingColor }}>
                Amplop Digital & Kado
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang berkenan memberikan tanda kasih:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {invitation.gifts.map((g, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                  <span className="font-bold text-sm tracking-wider uppercase text-stone-800">{g.bankName}</span>
                  <p className="font-mono text-base font-bold text-stone-900 tracking-wider select-all">{g.accountNumber}</p>
                  <p className="text-xs text-stone-500">a.n. {g.accountHolder}</p>
                  <button
                    onClick={() => handleCopy(g.accountNumber, g.id || i.toString())}
                    className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedBank === (g.id || i.toString()) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" />
                        <span className="text-emerald-700 font-semibold">Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* RSVP & Ucapan Doa Restu */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 rounded-3xl ${config.cardBgClass} space-y-6 shadow-sm`}
        >
          <div className="text-center space-y-1">
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: config.accentGold }}>
              Buku Tamu & Kehadiran
            </p>
            <h3 className="font-serif-cormorant text-3xl font-bold" style={{ color: config.headingColor }}>
              Konfirmasi RSVP & Doa Restu
            </h3>
          </div>

          <form onSubmit={handleRsvpSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Contoh: Bapak Prof. Bagus Triyanto"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Konfirmasi Hadir</label>
                <select
                  value={rsvpAttendance}
                  onChange={(e) => setRsvpAttendance(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                >
                  <option value="ATTENDING">Hadir</option>
                  <option value="NOT_ATTENDING">Tidak Hadir</option>
                  <option value="MAYBE">Masih Ragu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Jumlah Orang</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rsvpPax}
                  onChange={(e) => setRsvpPax(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Ucapan & Doa Restu</label>
              <textarea
                required
                rows={3}
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat dan doa restu terbaik untuk kedua mempelai..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingRsvp}
              className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${config.buttonGradientClass} font-semibold text-xs tracking-wider uppercase shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingRsvp ? 'Mengirim...' : 'Kirim Konfirmasi & Doa Restu'}</span>
            </button>

            {rsvpSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Terima kasih! Konfirmasi kehadiran dan doa restu Anda telah tersimpan.</span>
              </motion.div>
            )}
          </form>

          {/* Messages list with Staggered Fade */}
          <div className="space-y-3 pt-4 border-t border-stone-300/50 max-h-72 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-stone-700">Doa Restu dari Sahabat & Kerabat ({rsvpsList.length})</p>
            {rsvpsList.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{item.guestName}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    item.attendance === 'ATTENDING' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : item.attendance === 'NOT_ATTENDING' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.attendance === 'ATTENDING' ? 'Hadir' : item.attendance === 'NOT_ATTENDING' ? 'Berhalangan' : 'Ragu'}
                  </span>
                </div>
                <p className="text-stone-700 text-xs leading-relaxed">{item.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Closing Greetings & Footer */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 pt-4 pb-8"
        >
          <CulturalMotif type={selectedCulture} className="w-16 h-16" />
          <p className="text-xs leading-relaxed max-w-md mx-auto opacity-80">
            {content.closingGreeting || config.closingSalutation}
          </p>
          <p className="font-serif-cormorant text-2xl font-bold" style={{ color: config.headingColor }}>
            {content.groomNickname} & {content.brideNickname}
          </p>
          <p className="text-[10px] text-stone-500 uppercase tracking-widest pt-4">
            Digital Invitation by Janji Digital Marketplace
          </p>
        </motion.section>
      </main>
    </div>
  );
}
