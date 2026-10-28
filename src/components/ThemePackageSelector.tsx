'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { Check, Sparkles, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

interface ThemePackageSelectorProps {
  themeSlug: string;
  themeName: string;
  packages: Package[];
  previewUrl: string;
}

export default function ThemePackageSelector({
  themeSlug,
  themeName,
  packages,
  previewUrl,
}: ThemePackageSelectorProps) {
  // Default to popular package (Premium 100k) or first package (Basic 50k)
  const defaultPkg = packages.find((p) => p.isPopular) || packages[0] || {
    id: 'pkg-basic',
    code: 'BASIC',
    name: 'Paket Basic',
    slug: 'paket-basic',
    price: 50000,
    originalPrice: 99000,
    description: 'Pilihan hemat untuk pernikahan intim dengan template elegan.',
    features: '[]',
  };

  const [selectedPackage, setSelectedPackage] = useState<Package>(defaultPkg);

  let selectedFeatures: string[] = [];
  try {
    selectedFeatures = JSON.parse(selectedPackage.features || '[]');
  } catch {
    selectedFeatures = [];
  }

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#B59A62]/30 shadow-lg space-y-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-[#B59A62] font-bold">
            Pilihan Paket Undangan
          </span>
          <span className="text-[11px] text-stone-500">Pilih paket untuk tema ini</span>
        </div>
        <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">
          Mulai Kustomisasi {themeName}
        </h3>
      </div>

      {/* Package Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {packages.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#24382E] bg-[#24382E]/5 shadow-md ring-2 ring-[#B59A62]'
                  : 'border-stone-200 bg-[#FAF7F0]/60 hover:border-[#B59A62]/60 hover:bg-[#FAF7F0]'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-2.5 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C5A059] text-white uppercase tracking-wider shadow-sm">
                  Populer
                </span>
              )}
              {pkg.code === 'EXCLUSIVE' && (
                <span className="absolute -top-2.5 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#24382E] text-[#FAF7F0] uppercase tracking-wider shadow-sm">
                  VIP
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="font-serif-cormorant font-bold text-base text-[#24382E]">
                    {pkg.name.replace('Paket ', '')}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? 'border-[#24382E] bg-[#24382E] text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-1">
                  <span className="text-base sm:text-lg font-bold text-[#24382E] block">
                    {formatRupiah(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-[10px] text-stone-400 line-through">
                      {formatRupiah(pkg.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Package Details & Feature Highlights */}
      <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-[#24382E]">
              Paket Terpilih: {selectedPackage.name}
            </span>
            <span className="text-xs font-bold text-[#C5A059]">
              {formatRupiah(selectedPackage.price)}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Aktivasi Instan
          </span>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed font-light">
          {selectedPackage.description}
        </p>

        {/* Feature List for Selected Package */}
        <div className="pt-2 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
          {selectedFeatures.slice(0, 6).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-tight">{feat}</span>
            </div>
          ))}
          {selectedFeatures.length > 6 && (
            <div className="col-span-full text-[10px] text-stone-500 italic pt-1">
              + {selectedFeatures.length - 6} fitur premium lainnya
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <Link
          href={`/wizard?theme=${themeSlug}&package=${selectedPackage.slug}`}
          className="w-full py-3.5 rounded-full bg-[#24382E] text-[#FAF7F0] font-semibold text-xs sm:text-sm hover:bg-[#192821] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Kustomisasi Tema Ini ({formatRupiah(selectedPackage.price)})</span>
          <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href={previewUrl}
          className="w-full py-3 rounded-full border border-[#B59A62]/40 text-[#24382E] font-semibold text-xs hover:bg-[#FAF7F0] transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-3.5 h-3.5 text-[#B59A62]" />
          <span>Pratinjau Layar Penuh Bertema</span>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Garansi Kepuasan
        </span>
        <span>•</span>
        <span>Bebas Revisi Data</span>
        <span>•</span>
        <span>Bayar Mudah via QRIS/Transfer</span>
      </div>
    </div>
  );
}
