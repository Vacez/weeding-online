'use client';

import React, { useEffect, useState } from 'react';
import { CulturalType } from '@/lib/culturalThemes';

interface Particle {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

export default function CulturalParticles({ type }: { type: CulturalType }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 25 ambient particles
    const items: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 8, // 8px - 24px
      duration: Math.random() * 8 + 6, // 6s - 14s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.25,
      rotation: Math.random() * 360,
    }));
    setParticles(items);
  }, [type]);

  const renderParticleContent = (p: Particle) => {
    switch (type) {
      case 'jawa':
        // Golden fireflies / kunang-kunang keraton with radiant glow
        return (
          <div
            className="rounded-full bg-radial from-[#FCEBB6] via-[#C5A059] to-transparent shadow-[0_0_12px_#E2CB96] animate-pulse"
            style={{ width: p.size * 0.7, height: p.size * 0.7 }}
          />
        );

      case 'sunda':
        // White Jasmine / Ronce Melati falling petals
        return (
          <svg width={p.size} height={p.size} viewBox="0 0 30 30" fill="none">
            <path
              d="M15 2 C22 8 28 15 24 22 C20 28 10 28 6 22 C2 15 8 8 15 2 Z"
              fill="#FFFFFF"
              fillOpacity={0.85}
              stroke="#DFCEAC"
              strokeWidth="0.8"
            />
            <circle cx="15" cy="15" r="2.5" fill="#E8D8B8" />
          </svg>
        );

      case 'minang':
        // Golden Suntiang glitter diamonds
        return (
          <svg width={p.size * 0.8} height={p.size * 0.8} viewBox="0 0 20 20" fill="none">
            <polygon points="10,0 20,10 10,20 0,10" fill="#E0B338" fillOpacity={0.8} />
            <polygon points="10,4 16,10 10,16 4,10" fill="#FFE899" />
          </svg>
        );

      case 'batak':
        // Sacred embers of Dalihan Na Tolu
        return (
          <div
            className="rounded-full bg-radial from-[#E5BF65] via-[#8B1414] to-transparent shadow-[0_0_10px_#8B1414]"
            style={{ width: p.size * 0.65, height: p.size * 0.65 }}
          />
        );

      case 'bali':
        // Bunga Kamboja / Frangipani petals (white and yellow center)
        return (
          <svg width={p.size * 1.1} height={p.size * 1.1} viewBox="0 0 40 40" fill="none">
            <g transform="translate(20,20)">
              {[0, 72, 144, 216, 288].map((deg) => (
                <path
                  key={deg}
                  d="M0 0 C4 -8 10 -14 0 -18 C-10 -14 -4 -8 0 0 Z"
                  fill="#FFFDF7"
                  stroke="#E8D5A0"
                  strokeWidth="0.5"
                  transform={`rotate(${deg})`}
                />
              ))}
              <circle cx="0" cy="0" r="4.5" fill="#F0CA60" />
            </g>
          </svg>
        );

      case 'islami':
        // Starry 8-pointed star & glowing crescents
        return (
          <svg width={p.size * 0.75} height={p.size * 0.75} viewBox="0 0 24 24" fill="none">
            <rect x="5" y="5" width="14" height="14" fill="#D4AF37" fillOpacity={0.65} />
            <rect x="5" y="5" width="14" height="14" fill="#D4AF37" fillOpacity={0.65} transform="rotate(45 12 12)" />
            <circle cx="12" cy="12" r="3" fill="#FFF8E0" />
          </svg>
        );

      default:
        // Modern romantic golden bokeh orbs
        return (
          <div
            className="rounded-full bg-gradient-to-tr from-[#E8D8B8]/40 to-white/60 blur-[1px] shadow-[0_0_8px_rgba(232,216,184,0.5)]"
            style={{ width: p.size, height: p.size }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => {
        const isFalling = type === 'sunda' || type === 'bali';
        const animClass = isFalling ? 'animate-fall' : 'animate-float-drift';

        return (
          <div
            key={p.id}
            className={`absolute ${animClass}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {renderParticleContent(p)}
          </div>
        );
      })}
    </div>
  );
}
