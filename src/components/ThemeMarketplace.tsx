'use client';

import React, { useState, useMemo } from 'react';
import ThemeCard from './ThemeCard';
import { Theme, CulturalTradition, ThemeCategory } from '@/lib/types';
import { Search, Filter, SlidersHorizontal, Sparkles, X } from 'lucide-react';

interface ThemeMarketplaceProps {
  initialThemes: Theme[];
  traditions: CulturalTradition[];
  categories: ThemeCategory[];
}

export default function ThemeMarketplace({ initialThemes, traditions, categories }: ThemeMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTradition, setSelectedTradition] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredThemes = useMemo(() => {
    return initialThemes
      .filter((theme) => {
        // Search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = theme.name.toLowerCase().includes(q);
          const matchDesc = theme.description.toLowerCase().includes(q);
          const matchTrad = theme.tradition?.name.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTrad) return false;
        }
        // Tradition
        if (selectedTradition !== 'all') {
          if (theme.tradition?.slug !== selectedTradition) return false;
        }
        // Category
        if (selectedCategory !== 'all') {
          if (theme.category?.slug !== selectedCategory) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.salesCount - a.salesCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [initialThemes, searchQuery, selectedTradition, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Top Filter Bar */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#B59A62]/20 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tema, adat, atau gaya desain..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 text-xs sm:text-sm focus:border-[#B59A62] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-stone-300 bg-white text-[#24382E] focus:border-[#B59A62] outline-none"
              >
                <option value="popular">Paling Populer</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi ke Terendah</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden p-2 rounded-lg border border-stone-300 text-[#24382E]"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Traditions Filter Pills */}
        <div className="border-t border-stone-100 pt-3">
          <div className="text-xs font-semibold text-[#24382E] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Pilih Adat Nusantara:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedTradition('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTradition === 'all'
                  ? 'bg-[#24382E] text-white shadow-sm'
                  : 'bg-[#FAF7F0] text-stone-600 hover:bg-[#E8D8B8]/30 border border-stone-200'
              }`}
            >
              Semua Adat & Modern
            </button>
            {traditions.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTradition(t.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTradition === t.slug
                    ? 'bg-[#24382E] text-white shadow-sm'
                    : 'bg-[#FAF7F0] text-stone-600 hover:bg-[#E8D8B8]/30 border border-stone-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Filter Pills */}
        <div className="border-t border-stone-100 pt-3">
          <div className="text-xs font-semibold text-[#24382E] mb-2">Gaya Desain:</div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#C5A059] text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Semua Gaya
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c.slug
                    ? 'bg-[#C5A059] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Results */}
      <div>
        <div className="flex items-center justify-between mb-4 text-xs text-stone-500">
          <span>Menampilkan {filteredThemes.length} desain undangan pernikahan</span>
        </div>

        {filteredThemes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredThemes.map((th) => (
              <ThemeCard key={th.id} theme={th} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 bg-white rounded-2xl border border-stone-200 space-y-3">
            <Sparkles className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">
              Tidak Ada Tema yang Sesuai
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Coba gunakan kata kunci pencarian lain atau reset filter tradisi untuk menemukan desain terbaik Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTradition('all');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#24382E] text-white text-xs font-semibold rounded-full hover:bg-[#192821]"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
