'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { Theme } from '@/lib/types';

interface ThemeCardProps {
  theme: Theme;
  onPreview?: (theme: Theme) => void;
}

export default function ThemeCard({ theme, onPreview }: ThemeCardProps) {
  const [isFav, setIsFav] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(!isFav);
  };

  const badgeColor = {
    BESTSELLER: 'bg-[#B83B5E] text-white',
    EXCLUSIVE: 'bg-[#24382E] text-[#E8D8B8] border border-[#C5A059]',
    POPULAR: 'bg-[#C5A059] text-white',
    NEW: 'bg-[#1C3A27] text-white',
  }[theme.badge || ''] || 'bg-[#24382E] text-white';

  return (
    <div className="group relative bg-[#FAF7F0] rounded-xl overflow-hidden border border-[#B59A62]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
        <img
          src={theme.coverImage}
          alt={theme.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {theme.badge && (
            <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-sm ${badgeColor}`}>
              {theme.badge}
            </span>
          )}
          {theme.tradition && (
            <span className="text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF7F0]/90 text-[#24382E] backdrop-blur-sm shadow-sm border border-[#B59A62]/30">
              {theme.tradition.name}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFav
              ? 'bg-rose-50 text-rose-600 shadow'
              : 'bg-[#FAF7F0]/80 text-[#292929] hover:bg-[#FAF7F0] hover:text-rose-500'
          }`}
          aria-label="Simpan Favorit"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24382E]/90 via-[#24382E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/themes/${theme.slug}`}
              className="flex-1 text-center py-2 bg-[#FAF7F0] text-[#24382E] text-xs font-semibold rounded-lg hover:bg-[#E8D8B8] transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#B59A62]" />
              Lihat Detail
            </Link>
            <Link
              href={`/wizard?theme=${theme.slug}`}
              className="flex-1 text-center py-2 bg-[#C5A059] text-[#FAF7F0] text-xs font-semibold rounded-lg hover:bg-[#A88344] transition-colors shadow-sm flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Kustomisasi
            </Link>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#FAF7F0]">
        <div>
          <div className="flex items-center justify-between text-xs text-[#292929]/70 mb-1">
            <span>{theme.category?.name || 'Undangan Pernikahan'}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{theme.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({theme.salesCount})</span>
            </div>
          </div>

          <Link href={`/themes/${theme.slug}`} className="block group-hover:text-[#B59A62] transition-colors">
            <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E] leading-snug line-clamp-1">
              {theme.name}
            </h3>
          </Link>

          <p className="text-xs text-[#292929]/70 line-clamp-2 mt-1 leading-relaxed">
            {theme.shortDesc}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#B59A62]/15 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-stone-500 font-medium">
              Mulai Paket Basic:
            </div>
            <div className="text-base font-bold text-[#24382E]">
              {formatRupiah(theme.price)}
            </div>
          </div>

          <Link
            href={`/themes/${theme.slug}`}
            className="p-2 rounded-full border border-[#B59A62]/30 text-[#24382E] hover:bg-[#24382E] hover:text-[#FAF7F0] transition-colors"
            title="Buka Undangan"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
