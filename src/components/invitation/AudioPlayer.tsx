'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fallbackUrl = '/audio/jawa-gamelan-keraton.wav';
  const effectiveUrl = musicUrl || fallbackUrl;

  useEffect(() => {
    if (audioRef.current && autoPlay) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without gesture
          setIsPlaying(false);
        });
    }
  }, [autoPlay, effectiveUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        })
        .catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={effectiveUrl} 
        loop 
        preload="auto"
      />

      {/* Floating Audio Toast Indicator */}
      {showToast && (
        <div className="fixed bottom-20 right-6 z-50 animate-fade-in bg-[#1A1412]/95 text-[#E8D8B8] backdrop-blur-md border border-[#C5A059]/40 py-2 px-4 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-xs text-xs pointer-events-none">
          <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="truncate">
            <p className="font-semibold text-[11px] text-[#C5A059]">Musik Khas Bertema Aktif</p>
            <p className="text-[10px] text-white/90 truncate">{musicTitle}</p>
          </div>
        </div>
      )}

      {/* Floating Audio Control Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-[#1A1412]/80 text-[#E8D8B8] backdrop-blur-md border border-[#C5A059]/40 shadow-lg hover:scale-105 active:scale-95 transition-all text-xs"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            aria-label="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
          </button>
        )}

        <button
          onClick={togglePlay}
          className="p-3.5 px-4 rounded-full bg-[#1A1412]/95 text-[#E8D8B8] backdrop-blur-md border border-[#C5A059] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group cursor-pointer"
          aria-label={isPlaying ? 'Jeda Musik Tradisional' : 'Putar Musik Tradisional'}
          title={musicTitle}
        >
          <div className={`relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
            <Disc3 className="w-5 h-5 text-[#C5A059]" />
          </div>

          {/* Animated soundwave equalizer bars */}
          <div className="flex items-end gap-1 h-5 px-0.5">
            {[0.4, 0.8, 0.3, 0.9, 0.5].map((delay, idx) => (
              <span
                key={idx}
                className="w-1 rounded-full bg-gradient-to-t from-[#C5A059] to-[#FAF7F0] transition-all"
                style={{
                  height: isPlaying ? '100%' : '4px',
                  animation: isPlaying ? `soundwaveBounce 0.8s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>

          <span className="hidden sm:inline text-[11px] font-semibold text-[#E8D8B8] max-w-[130px] truncate">
            {isPlaying ? 'Memutar Musik' : 'Putar Musik'}
          </span>
        </button>
      </div>
    </>
  );
}
