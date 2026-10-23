'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, ArrowRight, ArrowLeft, Sparkles, Heart, Calendar, 
  MapPin, Image as ImageIcon, Music, Gift, Eye, ShieldCheck 
} from 'lucide-react';
import { Theme, Package } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import InvitationRenderer from '../invitation/InvitationRenderer';

interface CustomizationWizardProps {
  themes: Theme[];
  packages: Package[];
  initialThemeSlug?: string;
  initialData?: any;
}

export default function CustomizationWizard({
  themes,
  packages,
  initialThemeSlug,
  initialData,
}: CustomizationWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  // Selected Theme & Package
  const defaultTheme = themes.find((t) => t.slug === initialThemeSlug) || themes[0];
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultTheme);
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages.find((p) => p.isPopular) || packages[0]);

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 2: Couple
    groomName: initialData?.content?.groomName || 'Andi Pratama, S.T.',
    groomNickname: initialData?.content?.groomNickname || 'Andi',
    groomFather: initialData?.content?.groomFather || 'Bpk. H. Bambang Sudiro',
    groomMother: initialData?.content?.groomMother || 'Ibu Hj. Sri Rahayu',
    groomPhoto: initialData?.content?.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    groomInstagram: initialData?.content?.groomInstagram || 'andipratama',
    brideName: initialData?.content?.brideName || 'Siti Nur Aisyah, S.Farm.',
    brideNickname: initialData?.content?.brideNickname || 'Siti',
    brideFather: initialData?.content?.brideFather || 'Bpk. Dr. H. Ahmad Fauzi',
    brideMother: initialData?.content?.brideMother || 'Ibu Hj. Siti Maemunah',
    bridePhoto: initialData?.content?.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    brideInstagram: initialData?.content?.brideInstagram || 'sitianuraisyiah',

    // Step 3: Event
    ceremonyTitle: 'Akad Nikah',
    ceremonyDate: '2026-11-20',
    ceremonyTime: '08:00 - 10:00 WIB',
    ceremonyVenue: 'Masjid Agung Jawa Tengah',
    ceremonyAddress: 'Jl. Gajah Raya, Sambirejo, Gayamsari, Kota Semarang',
    ceremonyMaps: 'https://maps.google.com/?q=Masjid+Agung+Jawa+Tengah',
    receptionTitle: 'Resepsi Pernikahan',
    receptionDate: '2026-11-20',
    receptionTime: '11:00 - 14:00 WIB',
    receptionVenue: 'Grand Ballroom Hotel Ciputra Semarang',
    receptionAddress: 'Kawasan Simpang Lima, Jl. Simpang Lima No.1, Kota Semarang',
    receptionMaps: 'https://maps.google.com/?q=Hotel+Ciputra+Semarang',

    // Step 4: Content
    quote: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    quoteSource: 'QS. Ar-Rum Ayat 21',
    openingGreeting: 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan dalam ikatan pernikahan suci.',
    closingGreeting: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kedua mempelai.',

    // Step 5: Media & Music
    musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=traditional-acoustic-112191.mp3',
    gallery1: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    gallery3: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    gallery4: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',

    // Step 6: Features
    enableRsvp: true,
    enableGift: true,
    bankName: 'BCA',
    accountNumber: '8830129384',
    accountHolder: 'Andi Pratama',
    customSlug: initialData?.slug || `${initialThemeSlug ? initialThemeSlug.split('-')[0] : 'andi'}-siti-${Date.now().toString().slice(-4)}`,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const stepsHeader = [
    'Pilih Tema',
    'Info Mempelai',
    'Waktu & Lokasi',
    'Kutipan & Doa',
    'Media & Musik',
    'Fitur & Angpao',
    'Live Preview',
    'Paket & Checkout',
  ];
  // Build mock full invitation for live preview
  const previewInvitation: any = {
    id: 'preview-invitation',
    slug: formData.customSlug,
    title: `Pernikahan ${formData.groomNickname} & ${formData.brideNickname}`,
    status: 'PUBLISHED',
    musicUrl: formData.musicUrl,
    theme: selectedTheme,
    package: selectedPackage,
    content: {
      groomName: formData.groomName,
      groomNickname: formData.groomNickname,
      groomFather: formData.groomFather,
      groomMother: formData.groomMother,
      groomPhoto: formData.groomPhoto,
      groomInstagram: formData.groomInstagram,
      brideName: formData.brideName,
      brideNickname: formData.brideNickname,
      brideFather: formData.brideFather,
      brideMother: formData.brideMother,
      bridePhoto: formData.bridePhoto,
      brideInstagram: formData.brideInstagram,
      quote: formData.quote,
      quoteSource: formData.quoteSource,
      openingGreeting: formData.openingGreeting,
      closingGreeting: formData.closingGreeting,
    },
    events: [
      {
        id: 'ev-1',
        title: formData.ceremonyTitle,
        eventType: 'CEREMONY',
        date: formData.ceremonyDate,
        startTime: '08:00',
        endTime: '10:00',
        timezone: 'WIB',
        venueName: formData.ceremonyVenue,
        venueAddress: formData.ceremonyAddress,
        mapsUrl: formData.ceremonyMaps,
        isPrimary: true,
      },
      {
        id: 'ev-2',
        title: formData.receptionTitle,
        eventType: 'RECEPTION',
        date: formData.receptionDate,
        startTime: '11:00',
        endTime: '14:00',
        timezone: 'WIB',
        venueName: formData.receptionVenue,
        venueAddress: formData.receptionAddress,
        mapsUrl: formData.receptionMaps,
        isPrimary: false,
      },
    ],
    galleries: [
      { id: 'g1', imageUrl: formData.gallery1 },
      { id: 'g2', imageUrl: formData.gallery2 },
      { id: 'g3', imageUrl: formData.gallery3 },
      { id: 'g4', imageUrl: formData.gallery4 },
    ],
    gifts: formData.enableGift
      ? [
          {
            id: 'gift-1',
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            accountHolder: formData.accountHolder,
          },
        ]
      : [],
    rsvps: [
      {
        id: 'r1',
        guestName: 'Bapak Prof. H. Bagus Triyanto',
        attendance: 'ATTENDING',
        pax: 2,
        message: 'Barakallah, selamat menempuh hidup baru!',
        createdAt: new Date(),
      },
    ],
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          themeId: selectedTheme.id,
          packageId: selectedPackage.id,
          slug: formData.customSlug,
          title: `Pernikahan ${formData.groomNickname} & ${formData.brideNickname}`,
          content: {
            groomName: formData.groomName,
            groomNickname: formData.groomNickname,
            groomFather: formData.groomFather,
            groomMother: formData.groomMother,
            groomPhoto: formData.groomPhoto,
            groomInstagram: formData.groomInstagram,
            brideName: formData.brideName,
            brideNickname: formData.brideNickname,
            brideFather: formData.brideFather,
            brideMother: formData.brideMother,
            bridePhoto: formData.bridePhoto,
            brideInstagram: formData.brideInstagram,
            quote: formData.quote,
            quoteSource: formData.quoteSource,
            openingGreeting: formData.openingGreeting,
            closingGreeting: formData.closingGreeting,
          },
          events: [
            {
              title: formData.ceremonyTitle,
              eventType: 'CEREMONY',
              date: formData.ceremonyDate,
              startTime: '08:00',
              endTime: '10:00',
              timezone: 'WIB',
              venueName: formData.ceremonyVenue,
              venueAddress: formData.ceremonyAddress,
              mapsUrl: formData.ceremonyMaps,
              isPrimary: true,
            },
            {
              title: formData.receptionTitle,
              eventType: 'RECEPTION',
              date: formData.receptionDate,
              startTime: '11:00',
              endTime: '14:00',
              timezone: 'WIB',
              venueName: formData.receptionVenue,
              venueAddress: formData.receptionAddress,
              mapsUrl: formData.receptionMaps,
              isPrimary: false,
            },
          ],
          galleries: [
            { imageUrl: formData.gallery1, caption: 'Prewedding 1' },
            { imageUrl: formData.gallery2, caption: 'Prewedding 2' },
          ],
          gifts: formData.enableGift
            ? [
                {
                  bankName: formData.bankName,
                  accountNumber: formData.accountNumber,
                  accountHolder: formData.accountHolder,
                },
              ]
            : [],
        }),
      });

      const data = await res.json();
      if (res.ok && data.orderId) {
        router.push(`/checkout/${data.orderId}`);
      } else {
        alert(data.message || 'Terjadi kesalahan saat membuat pesanan.');
      }
    } catch {
      alert('Gagal memproses pesanan. Pastikan server aktif.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Progress Bar & Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#24382E]">
          <span>Langkah {currentStep} dari {totalSteps}: {stepsHeader[currentStep - 1]}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Selesai</span>
        </div>
        <div className="w-full bg-[#E8D8B8]/40 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#24382E] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Select Theme */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Pilih Tema Undangan Anda</h2>
            <p className="text-xs text-stone-500">Pilih dari katalog desain adat tradisional maupun modern eksklusif</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {themes.map((th) => (
              <div
                key={th.id}
                onClick={() => setSelectedTheme(th)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTheme.id === th.id
                    ? 'border-[#24382E] bg-[#E8D8B8]/20 shadow-md ring-2 ring-[#B59A62]'
                    : 'border-stone-200 bg-white hover:border-[#B59A62]/60'
                }`}
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-3 relative">
                  <img src={th.coverImage} alt={th.name} className="w-full h-full object-cover" />
                  {selectedTheme.id === th.id && (
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#24382E] text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <h4 className="font-serif-cormorant font-bold text-lg text-[#24382E] line-clamp-1">{th.name}</h4>
                <p className="text-xs text-stone-500 line-clamp-1">{th.shortDesc}</p>
                <div className="mt-2 text-sm font-bold text-[#24382E]">{formatRupiah(th.price)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Couple Info */}
      {currentStep === 2 && (
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#B59A62]/30 shadow-sm">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Informasi Kedua Mempelai</h2>
            <p className="text-xs text-stone-500">Masukkan nama lengkap, nama panggilan, dan nama orang tua</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Mempelai Pria</h3>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => updateField('groomName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={formData.groomNickname}
                    onChange={(e) => updateField('groomNickname', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Instagram (@username)</label>
                  <input
                    type="text"
                    value={formData.groomInstagram}
                    onChange={(e) => updateField('groomInstagram', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={formData.groomFather}
                    onChange={(e) => updateField('groomFather', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={formData.groomMother}
                    onChange={(e) => updateField('groomMother', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Mempelai Wanita</h3>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => updateField('brideName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={formData.brideNickname}
                    onChange={(e) => updateField('brideNickname', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Instagram (@username)</label>
                  <input
                    type="text"
                    value={formData.brideInstagram}
                    onChange={(e) => updateField('brideInstagram', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={formData.brideFather}
                    onChange={(e) => updateField('brideFather', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={formData.brideMother}
                    onChange={(e) => updateField('brideMother', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Event Details */}
      {currentStep === 3 && (
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#B59A62]/30 shadow-sm">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Jadwal & Lokasi Acara</h2>
            <p className="text-xs text-stone-500">Atur rincian akad nikah / pemberkatan dan resepsi</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Acara 1: Akad Nikah / Pemberkatan</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={formData.ceremonyDate}
                    onChange={(e) => updateField('ceremonyDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={formData.ceremonyTime}
                    onChange={(e) => updateField('ceremonyTime', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Tempat / Gedung</label>
                <input
                  type="text"
                  value={formData.ceremonyVenue}
                  onChange={(e) => updateField('ceremonyVenue', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={formData.ceremonyAddress}
                  onChange={(e) => updateField('ceremonyAddress', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Link Google Maps</label>
                <input
                  type="text"
                  value={formData.ceremonyMaps}
                  onChange={(e) => updateField('ceremonyMaps', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Acara 2: Resepsi Pernikahan</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={formData.receptionDate}
                    onChange={(e) => updateField('receptionDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={formData.receptionTime}
                    onChange={(e) => updateField('receptionTime', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Tempat / Gedung</label>
                <input
                  type="text"
                  value={formData.receptionVenue}
                  onChange={(e) => updateField('receptionVenue', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={formData.receptionAddress}
                  onChange={(e) => updateField('receptionAddress', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Link Google Maps</label>
                <input
                  type="text"
                  value={formData.receptionMaps}
                  onChange={(e) => updateField('receptionMaps', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Quotes & Greetings */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#B59A62]/30 shadow-sm">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Kutipan & Kata Sambutan</h2>
            <p className="text-xs text-stone-500">Sesuaikan kalimat pembuka, doa restu, atau ayat suci pilihan Anda</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Kutipan / Ayat Suci</label>
              <textarea
                rows={3}
                value={formData.quote}
                onChange={(e) => updateField('quote', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Sumber Kutipan</label>
              <input
                type="text"
                value={formData.quoteSource}
                onChange={(e) => updateField('quoteSource', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Kata Sambutan Pembuka</label>
              <textarea
                rows={3}
                value={formData.openingGreeting}
                onChange={(e) => updateField('openingGreeting', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Kalimat Penutup</label>
              <textarea
                rows={2}
                value={formData.closingGreeting}
                onChange={(e) => updateField('closingGreeting', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Media & Music */}
      {currentStep === 5 && (
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#B59A62]/30 shadow-sm">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Galeri Foto & Musik</h2>
            <p className="text-xs text-stone-500">Pilih foto prewedding dan musik latar romantis yang menyentuh hati</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">URL Musik Latar (MP3)</label>
              <input
                type="text"
                value={formData.musicUrl}
                onChange={(e) => updateField('musicUrl', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
              />
              <p className="text-[11px] text-stone-500 mt-1">Gunakan link MP3 langsung atau pilih instrumen bawaan bertema tradisi</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Foto Galeri 1 (URL)</label>
                <input
                  type="text"
                  value={formData.gallery1}
                  onChange={(e) => updateField('gallery1', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Foto Galeri 2 (URL)</label>
                <input
                  type="text"
                  value={formData.gallery2}
                  onChange={(e) => updateField('gallery2', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Foto Galeri 3 (URL)</label>
                <input
                  type="text"
                  value={formData.gallery3}
                  onChange={(e) => updateField('gallery3', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Foto Galeri 4 (URL)</label>
                <input
                  type="text"
                  value={formData.gallery4}
                  onChange={(e) => updateField('gallery4', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Optional Features & Digital Gift */}
      {currentStep === 6 && (
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#B59A62]/30 shadow-sm">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Fitur & Rekening Angpao</h2>
            <p className="text-xs text-stone-500">Atur URL unik undangan dan data transfer hadiah pernikahan</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Kustom Slug URL Undangan</label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-stone-100 border border-r-0 border-stone-300 rounded-l-lg text-xs text-stone-500 font-mono">
                  janjidigital.com/invitation/
                </span>
                <input
                  type="text"
                  value={formData.customSlug}
                  onChange={(e) => updateField('customSlug', e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, ''))}
                  className="flex-1 px-3 py-2 text-sm rounded-r-lg border border-stone-300 focus:border-[#B59A62] outline-none font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/20 space-y-3">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">Rekening Amplop Digital</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Bank / Dompet</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => updateField('bankName', e.target.value)}
                    placeholder="BCA"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor Rekening</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => updateField('accountNumber', e.target.value)}
                    placeholder="1234567890"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  value={formData.accountHolder}
                  onChange={(e) => updateField('accountHolder', e.target.value)}
                  placeholder="Andi Pratama"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: Live Interactive Preview */}
      {currentStep === 7 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Pratinjau Langsung (Live Preview)</h2>
              <p className="text-xs text-stone-500">Lihat simulasi undangan yang akan dilihat oleh tamu Anda</p>
            </div>
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-stone-200">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  previewDevice === 'mobile' ? 'bg-[#24382E] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                Tampilan HP (Mobile)
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  previewDevice === 'desktop' ? 'bg-[#24382E] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                Tampilan Layar Penuh
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {previewDevice === 'mobile' ? (
              <div className="w-[380px] h-[720px] rounded-[40px] border-[10px] border-stone-800 shadow-2xl overflow-y-auto bg-[#FAF7F0] relative">
                <InvitationRenderer invitation={previewInvitation} guestName="Bapak Budi Santoso" isDemo={true} />
              </div>
            ) : (
              <div className="w-full max-w-4xl h-[700px] rounded-2xl border-2 border-stone-300 shadow-xl overflow-y-auto bg-[#FAF7F0]">
                <InvitationRenderer invitation={previewInvitation} guestName="Bapak Budi Santoso" isDemo={true} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 8: Select Package & Checkout */}
      {currentStep === 8 && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">Pilih Paket & Selesaikan Pesanan</h2>
            <p className="text-xs text-stone-500">Pilih paket terbaik yang sesuai dengan kebutuhan pernikahan Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedPackage.id === pkg.id
                    ? 'border-[#24382E] bg-white shadow-xl ring-2 ring-[#B59A62]'
                    : 'border-stone-200 bg-[#FAF7F0] hover:border-[#B59A62]/60'
                }`}
              >
                <div>
                  {pkg.isPopular && (
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#C5A059] text-white uppercase tracking-wider mb-2 inline-block">
                      Paling Populer
                    </span>
                  )}
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E]">{pkg.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-2xl font-bold text-[#24382E]">{formatRupiah(pkg.price)}</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-4">{pkg.description}</p>

                  <div className="border-t border-stone-100 pt-3 space-y-2">
                    {JSON.parse(pkg.features || '[]').map((f: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className={`w-full py-2.5 rounded-lg text-center text-xs font-semibold ${
                    selectedPackage.id === pkg.id ? 'bg-[#24382E] text-white' : 'border border-[#24382E] text-[#24382E]'
                  }`}>
                    {selectedPackage.id === pkg.id ? 'Paket Terpilih' : 'Pilih Paket Ini'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout CTA */}
          <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-500 block">Total Investasi Undangan Digital</span>
              <span className="font-serif-cormorant text-3xl font-bold text-[#24382E]">
                {formatRupiah(selectedPackage.price)}
              </span>
              <span className="text-xs text-emerald-700 block font-medium">✓ Pembayaran aman via Midtrans Sandbox Simulator</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="py-3.5 px-8 rounded-full bg-[#24382E] text-[#FAF7F0] font-semibold text-sm hover:bg-[#192821] transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>{isSubmitting ? 'Memproses Pesanan...' : 'Lanjut ke Pembayaran'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Prev / Next) */}
      <div className="mt-8 pt-6 border-t border-[#B59A62]/20 flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className={`px-5 py-2.5 rounded-full border border-stone-300 text-xs font-semibold flex items-center gap-2 ${
            currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-100 text-[#24382E]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            className="px-6 py-2.5 rounded-full bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
