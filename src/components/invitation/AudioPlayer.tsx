'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc3, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  musicUrl?: string | null;
  musicTitle?: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ 
  musicUrl, 
  musicTitle = 'Alunan Musik Pernikahan Tradisional', 
  autoPlay = false 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fallbackUrl = '/audio/jawa-gamelan-keraton.wav';
  const effectiveUrl = musicUrl || fallbackUrl;

  const startPlayback = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    audioRef.current.loop = true;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4500);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  useEffect(() => {
    if (autoPlay) {
      startPlayback();
    }
  }, [autoPlay, effectiveUrl]);

  // Click on the widget triggers song info and ensures continuous playback
  const handleBadgeClick = () => {
    startPlayback();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={effectiveUrl} 
        loop 
        preload="auto"
        onEnded={startPlayback}
        onPause={() => {
          // Keep continuous music playing if opened
          if (autoPlay && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        }}
      />

      {/* Floating Audio Toast Indicator */}
      {showToast && (
        <div className="fixed bottom-20 right-6 z-50 animate-fade-in bg-[#1A1412]/95 text-[#E8D8B8] backdrop-blur-md border border-[#C5A059]/40 py-2.5 px-4 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-xs text-xs pointer-events-none">
          <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="truncate">
            <p className="font-semibold text-[11px] text-[#C5A059]">Musik Khas Bertema Mengalun</p>
            <p className="text-[10px] text-white/95 truncate">{musicTitle}</p>
          </div>
        </div>
      )}

      {/* Floating Continuous Audio Visualizer Widget (Cannot be paused) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleBadgeClick}
          className="p-3 px-4 rounded-full bg-[#1A1412]/95 text-[#E8D8B8] backdrop-blur-md border border-[#C5A059] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
          aria-label="Musik Pengiring Bertema"
          title={`${musicTitle} (Memutar Otomatis)`}
        >
          {/* Rotating vinyl disc */}
          <div className="relative animate-spin" style={{ animationDuration: '7s' }}>
            <Disc3 className="w-5 h-5 text-[#C5A059]" />
          </div>

          {/* Animated soundwave equalizer bars */}
          <div className="flex items-end gap-1 h-5 px-0.5">
            {[0.4, 0.8, 0.3, 0.9, 0.5].map((delay, idx) => (
              <span
                key={idx}
                className="w-1 rounded-full bg-gradient-to-t from-[#C5A059] to-[#FAF7F0] transition-all"
                style={{
                  height: isPlaying ? '100%' : '60%',
                  animation: 'soundwaveBounce 0.8s ease-in-out infinite alternate',
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>

          <span className="hidden sm:inline text-[11px] font-semibold text-[#E8D8B8] max-w-[130px] truncate">
            {isPlaying ? 'Memutar Musik' : 'Audio Aktif'}
          </span>
        </button>
      </div>
    </>
  );
}
