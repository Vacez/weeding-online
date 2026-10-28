import React from 'react';

export type CulturalType = 'jawa' | 'sunda' | 'minang' | 'batak' | 'bali' | 'islami' | 'modern';

export interface CulturalThemeConfig {
  type: CulturalType;
  name: string;
  region: string;
  musicTitle: string;
  musicUrl: string;
  waxSealMonogram: string;
  honorificTitle: string;
  subHonorific: string;
  salutation: string;
  closingSalutation: string;
  quoteFallback: string;
  quoteSourceFallback: string;
  // Iconic Landmark & Gate Opening
  landmarkName: string;
  landmarkSubtitle: string;
  landmarkImage: string;
  gateTitle: string;
  gateSubtitle: string;
  welcomeAksara: string;
  welcomeGreeting: string;
  gateColorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  // Styles
  coverBgClass: string;
  coverBorderClass: string;
  coverTextClass: string;
  coverBadgeClass: string;
  mainBgClass: string;
  mainTextClass: string;
  headingColor: string;
  accentGold: string;
  cardBgClass: string;
  cardBorderClass?: string;
  buttonGradientClass: string;
}

export function detectCulturalType(themeSlug: string, traditionSlug?: string | null): CulturalType {
  const combined = `${themeSlug || ''} ${traditionSlug || ''}`.toLowerCase();
  if (combined.includes('jawa') || combined.includes('joglo') || combined.includes('paes') || combined.includes('gebyok') || combined.includes('parang')) {
    return 'jawa';
  }
  if (combined.includes('sunda') || combined.includes('parahyangan') || combined.includes('siger') || combined.includes('rereng')) {
    return 'sunda';
  }
  if (combined.includes('minang') || combined.includes('gadang') || combined.includes('suntiang') || combined.includes('songket') || combined.includes('marawa')) {
    return 'minang';
  }
  if (combined.includes('batak') || combined.includes('ulos') || combined.includes('gorga') || combined.includes('toba') || combined.includes('mandailing')) {
    return 'batak';
  }
  if (combined.includes('bali') || combined.includes('dewata') || combined.includes('paduraksa') || combined.includes('rindik')) {
    return 'bali';
  }
  if (combined.includes('madinah') || combined.includes('akad-suci') || combined.includes('islami')) {
    return 'islami';
  }
  return 'modern';
}

export const CULTURAL_CONFIGS: Record<CulturalType, CulturalThemeConfig> = {
  jawa: {
    type: 'jawa',
    name: 'Adat Jawa Keraton',
    region: 'Jawa Tengah & DI Yogyakarta',
    musicTitle: 'Gamelan Jawa Keraton — Ladrang Wilujeng Ageng',
    musicUrl: '/audio/jawa-gamelan-keraton.wav',
    waxSealMonogram: 'ꦗꦢ',
    honorificTitle: 'Pawiwahan Ageng Keraton',
    subHonorific: 'Serat Ulem Pawiwahan Dalem',
    salutation: 'Nuwun sewu, kanti nyenyuwun rumentahing sih wilasa dalem Gusti Ingkang Murbeng Dumadi...',
    closingSalutation: 'Mugi Gusti Allah tansah maringi berkah katentreman lan kawilujengan dumateng kita sedaya.',
    quoteFallback: 'Ngluruk tanpa bala, menang tanpa ngasorake, sekti tanpa aji-aji, sugih tanpa bandha. Memayu hayuning bawana.',
    quoteSourceFallback: 'Filosofi Luhur Jawa & Serat Centhini',
    landmarkName: 'Candi Agung Borobudur & Keraton Mataram',
    landmarkSubtitle: 'Kemegahan Stupa Candi Sakral & Wibawa Pusaka Keraton',
    landmarkImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'Gapura Kori Ageng Bangsal Kencana',
    gateSubtitle: 'Serat Ulem Pawiwahan Dalem Hadiningrat',
    welcomeAksara: 'ꦱꦸꦒꦼꦁꦫꦮꦸꦃ',
    welcomeGreeting: 'Sugeng Rawuh Para Rawuh Ingkang Minulyo',
    gateColorTheme: {
      primary: '#2A1D17',
      secondary: '#1A1412',
      accent: '#C5A059',
      border: '#C5A059',
    },
    coverBgClass: 'from-[#1A1412] via-[#2A1D17] to-[#120D0B]',
    coverBorderClass: 'border-[#C5A059]/40',
    coverTextClass: 'text-[#F5EAD4]',
    coverBadgeClass: 'bg-[#C5A059]/15 text-[#E8D8B8] border-[#C5A059]/40',
    mainBgClass: 'bg-[#FBF7F0]',
    mainTextClass: 'text-[#2D1F18]',
    headingColor: '#2D1F18',
    accentGold: '#C5A059',
    cardBgClass: 'bg-[#F4ECE1] border-[#C5A059]/30',
    buttonGradientClass: 'from-[#C5A059] via-[#E2CB96] to-[#A88238] text-[#1A1412]',
  },
  sunda: {
    type: 'sunda',
    name: 'Adat Sunda Parahyangan',
    region: 'Jawa Barat & Tatar Sunda',
    musicTitle: 'Degung Sunda & Kacapi Suling Parahyangan',
    musicUrl: '/audio/sunda-kacapi-suling.wav',
    waxSealMonogram: 'ᮞᮥ',
    honorificTitle: 'Wawar Uleman Walimatul Ursy',
    subHonorific: 'Pesona Parahyangan Siger Kencana',
    salutation: 'Sampurasun. Kalayan ngalap berkah ti Gusti Nu Maha Suci, seja nyuhunkeun pidu\'a ti para wargi sadaya...',
    closingSalutation: 'Hatur nuhun kana sagala perhatosan sareng kasumpingan wargi sadaya. Mugia ginuluran karahayuan.',
    quoteFallback: 'Silih asih, silih asah, silih asuh. Kanyaah salawasna nyangcang dina rasa, nyaangan jalan kahirupan kulawarga.',
    quoteSourceFallback: 'Kearifan Luhur Parahyangan',
    landmarkName: 'Perbukitan Asri Parahyangan & Tangkuban Perahu',
    landmarkSubtitle: 'Kesejukan Lembah Hijau Priangan & Sejuta Pesona Pasundan',
    landmarkImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'Bale Kencana Kujang Parahyangan',
    gateSubtitle: 'Wawar Uleman Walimatul Ursy Pasundan',
    welcomeAksara: 'ᮝᮤᮜᮥᮏᮨᮀ ᮞᮥᮙ᮪ᮕᮤᮀ',
    welcomeGreeting: 'Wilujeng Sumping ka Bale Kanyaah',
    gateColorTheme: {
      primary: '#153222',
      secondary: '#0E2217',
      accent: '#D4B26F',
      border: '#DFCEAC',
    },
    coverBgClass: 'from-[#12281D] via-[#1A3828] to-[#0A1811]',
    coverBorderClass: 'border-[#DFCEAC]/40',
    coverTextClass: 'text-[#FDFBF7]',
    coverBadgeClass: 'bg-[#DFCEAC]/15 text-[#E2D1B3] border-[#DFCEAC]/40',
    mainBgClass: 'bg-[#FCFDFB]',
    mainTextClass: 'text-[#192B20]',
    headingColor: '#1A3828',
    accentGold: '#D4B26F',
    cardBgClass: 'bg-[#F0F5F1] border-[#D4B26F]/30',
    buttonGradientClass: 'from-[#DFCEAC] via-[#F4E8D1] to-[#BAA070] text-[#12281D]',
  },
  minang: {
    type: 'minang',
    name: 'Adat Minangkabau',
    region: 'Sumatera Barat — Ranah Minang',
    musicTitle: 'Saluang & Talempong Pacik Baralek Gadang',
    musicUrl: '/audio/minang-talempong-saluang.wav',
    waxSealMonogram: 'MG',
    honorificTitle: 'Pesta Adat Baralek Gadang',
    subHonorific: 'Siriah Sakapua Pinang Sabungka',
    salutation: 'Assalamu\'alaikum Wr. Wb. Bulek aia dek pambuluah, bulek kato dek mupakaik. Siriah sakapua pinang sabungka...',
    closingSalutation: 'Katampek duduak nan jo baselo, kapulang mambaok rido. Tarimo kasih ateh kadatangan sarato do\'a restu dunsanak.',
    quoteFallback: 'Anak dipangku kamanakan dibimbing, adaik basandi syarak, syarak basandi Kitabullah. Sabiduak sadayuang ka tapian bahagia.',
    quoteSourceFallback: 'Pepatah Petitih Adat Minangkabau',
    landmarkName: 'Kemegahan Rumah Gadang & Lembah Harau Minang',
    landmarkSubtitle: 'Atap Gonjong Runcing Menjulang Nan Sakral di Ranah Minang',
    landmarkImage: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'Pintu Tabir Baralek Gadang Ranah Minang',
    gateSubtitle: 'Adaik Basandi Syarak, Syarak Basandi Kitabullah',
    welcomeAksara: 'سلاويك داتڠ',
    welcomeGreeting: 'Salamaik Datang di Pesta Baralek Gadang',
    gateColorTheme: {
      primary: '#4A0E18',
      secondary: '#2C060D',
      accent: '#E0B338',
      border: '#E0B338',
    },
    coverBgClass: 'from-[#3A0A12] via-[#54121D] to-[#200408]',
    coverBorderClass: 'border-[#E0B338]/40',
    coverTextClass: 'text-[#FFF7E8]',
    coverBadgeClass: 'bg-[#E0B338]/15 text-[#F5CF68] border-[#E0B338]/40',
    mainBgClass: 'bg-[#FAF5EF]',
    mainTextClass: 'text-[#300C13]',
    headingColor: '#6B1624',
    accentGold: '#E0B338',
    cardBgClass: 'bg-[#F6EDE2] border-[#E0B338]/30',
    buttonGradientClass: 'from-[#E0B338] via-[#F7D87E] to-[#B88A16] text-[#3A0A12]',
  },
  batak: {
    type: 'batak',
    name: 'Adat Batak Toba',
    region: 'Sumatera Utara — Toba & Mandailing',
    musicTitle: 'Gondang Sabangunan & Hasapi Batak Toba',
    musicUrl: '/audio/batak-gondang-hasapi.wav',
    waxSealMonogram: 'ᯅ',
    honorificTitle: 'Gokhon Dohot Jou-jou Parsangapan',
    subHonorific: 'Ulaon Unjuk Pamasu-masuon Adat Batak',
    salutation: 'Horas Jala Gabe Ma Di Hita Saluhutna! Marhite gokhon dohot jou-jou on, ro do hami manggokhon hamu angka na pinarsangapan...',
    closingSalutation: 'Mauliate godang di saluhut panuturion, tangiang, dohot haroromuna. Sai dipasupasu Tuhanta ma pardalananta.',
    quoteFallback: 'Tombak gurgur tu dolok ni purbatua. Sai torkis ma hita on saluhutna, tubuan anak dohot boru, marpanumpak Tuhanta.',
    quoteSourceFallback: 'Umpasa Batak Toba & Dalihan Na Tolu',
    landmarkName: 'Danau Toba Nan Sakral & Pusuk Buhit',
    landmarkSubtitle: 'Kaldera Abadi Nan Megah & Rumah Adat Bolon Gorga',
    landmarkImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'Gerbang Gorga Singa-singa Ruma Bolon',
    gateSubtitle: 'Gokhon Dohot Jou-jou Pamasu-masuon',
    welcomeAksara: 'ᯂᯬᯒᯘ᯲',
    welcomeGreeting: 'Horas Jala Gabe Ma Di Hita Saluhutna',
    gateColorTheme: {
      primary: '#2A0E0E',
      secondary: '#190707',
      accent: '#C89D3C',
      border: '#C89D3C',
    },
    coverBgClass: 'from-[#1F0C0C] via-[#331111] to-[#140808]',
    coverBorderClass: 'border-[#C89D3C]/40',
    coverTextClass: 'text-[#F9F5EC]',
    coverBadgeClass: 'bg-[#C89D3C]/15 text-[#E5BF65] border-[#C89D3C]/40',
    mainBgClass: 'bg-[#FAF6F2]',
    mainTextClass: 'text-[#231515]',
    headingColor: '#781515',
    accentGold: '#C89D3C',
    cardBgClass: 'bg-[#F3EBE3] border-[#C89D3C]/30',
    buttonGradientClass: 'from-[#C89D3C] via-[#E8C56E] to-[#9E751F] text-[#1F0C0C]',
  },
  bali: {
    type: 'bali',
    name: 'Adat Bali Dewata',
    region: 'Bali — Pulau Dewata',
    musicTitle: 'Rindik Bambu Dewata & Semar Pagulingan',
    musicUrl: '/audio/bali-rindik-dewata.wav',
    waxSealMonogram: 'ᬑᬁ',
    honorificTitle: 'Pawiwahan Ageng Suci Dharma',
    subHonorific: 'Puri Agung Dewata Emas & Tri Hita Karana',
    salutation: 'Om Swastyastu. Dumogi samian sane kapiarsayang polih karahayuan. Melarapan antuk paswecan Ida Sang Hyang Widhi Wasa...',
    closingSalutation: 'Suksma kalintang mantuka ring rasa tresna, pituut miwah pemargi semeton sami. Om Shanti, Shanti, Shanti Om.',
    quoteFallback: 'Asih, asah, asuh ring sajroning suadarma pawiwahan. Mogi Ida Sang Hyang Widhi Wasa ngicenin karahayuan langgeng.',
    quoteSourceFallback: 'Sloka Manawa Dharmasastra IX.101',
    landmarkName: 'Pura Ulun Danu Beratan & Candi Bentar Dewata',
    landmarkSubtitle: 'Pesona Danau Suci Beratan & Gapura Megah Kori Agung',
    landmarkImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'Gapura Kori Agung Candi Bentar Bali',
    gateSubtitle: 'Pawiwahan Suci Karahayuan Tri Hita Karana',
    welcomeAksara: 'ᬑᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ',
    welcomeGreeting: 'Om Swastyastu — Rahajeng Rauh Semeton',
    gateColorTheme: {
      primary: '#331B13',
      secondary: '#1F0F0A',
      accent: '#D4A836',
      border: '#D4A836',
    },
    coverBgClass: 'from-[#281813] via-[#3D2118] to-[#180E0B]',
    coverBorderClass: 'border-[#D4A836]/40',
    coverTextClass: 'text-[#FDF7ED]',
    coverBadgeClass: 'bg-[#D4A836]/15 text-[#F0CA60] border-[#D4A836]/40',
    mainBgClass: 'bg-[#FAF6EE]',
    mainTextClass: 'text-[#281A16]',
    headingColor: '#8C3827',
    accentGold: '#D4A836',
    cardBgClass: 'bg-[#F4ECE0] border-[#D4A836]/30',
    buttonGradientClass: 'from-[#D4A836] via-[#F0CB63] to-[#A87E1D] text-[#281813]',
  },
  islami: {
    type: 'islami',
    name: 'Nuansa Islami Syar\'i',
    region: 'Akad Suci Madinah Nur',
    musicTitle: 'Gambus Oud & Sholawat Instrumental Syahdu',
    musicUrl: '/audio/islami-gambus-oud.wav',
    waxSealMonogram: 'الله',
    honorificTitle: 'Walimatul Ursy Syar\'i',
    subHonorific: 'Mitsaqan Ghalidza — Menuju Keluarga Sakinah',
    salutation: 'Bismillaahirrohmaanirrohiim. Assalamu\'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT...',
    closingSalutation: 'Jazakumullahu khairan katsiran atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian. Wassalamu\'alaikum Wr. Wb.',
    quoteFallback: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    quoteSourceFallback: 'Surah Ar-Rum Ayat 21',
    landmarkName: 'Masjid Nabawi Madinah & Kubah Emas Bercahaya',
    landmarkSubtitle: 'Payung Megah Madinah Munawwarah & Keindahan Lengkung Arabesque',
    landmarkImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'Bawwabah Nur Madinah Walimatul Ursy',
    gateSubtitle: 'Mitsaqan Ghalidza Menuju Sakinah Mawaddah Warahmah',
    welcomeAksara: 'أهلاً وسهلاً',
    welcomeGreeting: 'Ahlan Wa Sahlan fi Walimatil Ursy Al-Mubarak',
    gateColorTheme: {
      primary: '#0F2C20',
      secondary: '#091A13',
      accent: '#D4AF37',
      border: '#D4AF37',
    },
    coverBgClass: 'from-[#0A1F16] via-[#133526] to-[#06150E]',
    coverBorderClass: 'border-[#D4AF37]/40',
    coverTextClass: 'text-[#F6FAF7]',
    coverBadgeClass: 'bg-[#D4AF37]/15 text-[#E6C962] border-[#D4AF37]/40',
    mainBgClass: 'bg-[#F9FCFA]',
    mainTextClass: 'text-[#12261C]',
    headingColor: '#14422D',
    accentGold: '#D4AF37',
    cardBgClass: 'bg-[#EBF3EE] border-[#D4AF37]/30',
    buttonGradientClass: 'from-[#D4AF37] via-[#F3D574] to-[#A3811C] text-[#0A1F16]',
  },
  modern: {
    type: 'modern',
    name: 'Modern Luxury Editorial',
    region: 'The Royal Ivory & Champagne',
    musicTitle: 'Romantic Classical Piano & Strings (Canon in D Style)',
    musicUrl: '/audio/modern-romantic-piano.wav',
    waxSealMonogram: 'JD',
    honorificTitle: 'The Wedding Celebration',
    subHonorific: 'A Timeless Union of Two Hearts',
    salutation: 'Together with our beloved families, we joyfully invite you to share our happiest moment...',
    closingSalutation: 'Your presence, prayers, and warm wishes mean the world to us as we begin our new journey together.',
    quoteFallback: 'Two souls with but a single thought, two hearts that beat as one. A love that endures and grows through every season of life.',
    quoteSourceFallback: 'Timeless Romance & 1 Corinthians 13:13',
    landmarkName: 'The Grand Cathedral Glasshouse & Floral Ballroom',
    landmarkSubtitle: 'Arsitektur Kaca Kontemporer Bertabur Chandelier Kristal Mewah',
    landmarkImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85',
    gateTitle: 'The Royal Velvet & Crystal Portal',
    gateSubtitle: 'A Timeless & Elegant Celebration of Love',
    welcomeAksara: 'ETERNAL LOVE',
    welcomeGreeting: 'Welcome to Our New Beginning',
    gateColorTheme: {
      primary: '#1C1C1E',
      secondary: '#101012',
      accent: '#B59A62',
      border: '#B59A62',
    },
    coverBgClass: 'from-[#171717] via-[#262626] to-[#0D0D0D]',
    coverBorderClass: 'border-[#C5A059]/40',
    coverTextClass: 'text-[#FAF8F5]',
    coverBadgeClass: 'bg-[#C5A059]/15 text-[#E8D8B8] border-[#C5A059]/40',
    mainBgClass: 'bg-[#FAF8F5]',
    mainTextClass: 'text-[#242424]',
    headingColor: '#1F1F1F',
    accentGold: '#B59A62',
    cardBgClass: 'bg-[#F0ECE1] border-[#B59A62]/30',
    buttonGradientClass: 'from-[#D8C7A5] via-[#F2E6CD] to-[#B0996D] text-[#1A1A1A]',
  },
};

// ------------------------------------------------------------------
// CULTURAL SVG MOTIFS
// ------------------------------------------------------------------

export function CulturalMotif({ type, className = 'w-24 h-24' }: { type: CulturalType; className?: string }) {
  if (type === 'jawa') {
    return (
      <div className="flex flex-col items-center justify-center my-3 group">
        {/* Gunungan Wayang Kulit Keraton */}
        <svg className={`${className} text-[#C5A059] filter drop-shadow-[0_2px_8px_rgba(197,160,89,0.35)]`} viewBox="0 0 160 200" fill="none" stroke="currentColor">
          {/* Outer Gunungan arch shape */}
          <path d="M80 8 C95 40 145 105 145 155 C145 185 115 192 80 192 C45 192 15 185 15 155 C15 105 65 40 80 8 Z" strokeWidth="2.5" fill="currentColor" fillOpacity="0.08" />
          {/* Inner sacred gateway / Gapura Keraton */}
          <path d="M50 192 L50 145 Q80 130 110 145 L110 192" strokeWidth="2" strokeDasharray="3 3" />
          <rect x="62" y="152" width="36" height="40" strokeWidth="1.5" />
          <path d="M80 152 L80 192" strokeWidth="1.5" />
          {/* Kalpataru / Tree of Life branches */}
          <path d="M80 135 L80 40" strokeWidth="2.5" />
          <path d="M80 65 Q115 50 120 75 Q100 85 80 80" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12" />
          <path d="M80 65 Q45 50 40 75 Q60 85 80 80" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12" />
          <path d="M80 95 Q130 80 135 110 Q105 118 80 110" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12" />
          <path d="M80 95 Q30 80 25 110 Q55 118 80 110" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12" />
          {/* Top finial / Makuta */}
          <circle cx="80" cy="18" r="4" fill="currentColor" />
          <path d="M75 14 L85 14" strokeWidth="1.5" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-serif-cormorant mt-2 font-medium">
          Gunungan Wayang & Keraton Hadiningrat
        </span>
        <span className="text-[9px] tracking-widest text-[#B59A62]/80 mt-0.5 font-sans">
          ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀ꦥꦮꦶꦮꦲꦤ꧀
        </span>
      </div>
    );
  }

  if (type === 'sunda') {
    return (
      <div className="flex flex-col items-center justify-center my-3 group">
        {/* Mahkota Siger Sunda Kencana */}
        <svg className={`${className} text-[#D4B26F] filter drop-shadow-[0_2px_8px_rgba(212,178,111,0.35)]`} viewBox="0 0 180 120" fill="none" stroke="currentColor">
          {/* Base crown band */}
          <path d="M20 95 Q90 110 160 95 Q140 85 90 88 Q40 85 20 95 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
          {/* Siger peaks (7 points) */}
          <path d="M20 95 L30 55 L45 80 L65 40 L80 75 L90 20 L100 75 L115 40 L135 80 L150 55 L160 95" strokeWidth="2.2" strokeLinejoin="round" />
          {/* Jewels on peaks */}
          {[
            { cx: 30, cy: 52 },
            { cx: 65, cy: 37 },
            { cx: 90, cy: 17, main: true },
            { cx: 115, cy: 37 },
            { cx: 150, cy: 52 },
          ].map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r={pt.main ? 5 : 3.5} fill="currentColor" />
          ))}
          {/* Hanging Ronce Melati (jasmine tendrils) */}
          <path d="M35 98 Q30 115 32 118" strokeWidth="1.5" strokeDasharray="2 3" />
          <path d="M145 98 Q150 115 148 118" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="32" cy="118" r="2.5" fill="currentColor" />
          <circle cx="148" cy="118" r="2.5" fill="currentColor" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#D4B26F] uppercase font-serif-cormorant mt-2 font-medium">
          Mahkota Siger Sunda & Ronce Melati
        </span>
        <span className="text-[9px] tracking-widest text-[#BAA070]/80 mt-0.5 font-sans">
          ᮝᮃᮝᮁ ᮅᮜᮨᮙᮔ᮪ ᮕᮛᮠᮡᮍᮔ᮪
        </span>
      </div>
    );
  }

  if (type === 'minang') {
    return (
      <div className="flex flex-col items-center justify-center my-3 group">
        {/* Atap Gonjong Rumah Gadang & Suntiang */}
        <svg className={`${className} text-[#E0B338] filter drop-shadow-[0_2px_8px_rgba(224,179,56,0.35)]`} viewBox="0 0 180 120" fill="none" stroke="currentColor">
          {/* Soaring Curved Gonjong Horns (4 horns) */}
          <path d="M10 30 Q25 70 50 65 Q70 20 90 10 Q110 20 130 65 Q155 70 170 30" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 45 Q35 75 55 70 L125 70 Q145 75 158 45" strokeWidth="1.8" />
          {/* Lower House Body with carved window partitions */}
          <path d="M35 70 L40 105 L140 105 L145 70 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
          <line x1="65" y1="70" x2="65" y2="105" strokeWidth="1.5" />
          <line x1="90" y1="70" x2="90" y2="105" strokeWidth="1.5" />
          <line x1="115" y1="70" x2="115" y2="105" strokeWidth="1.5" />
          {/* Rangkiang center detail */}
          <rect x="78" y="80" width="24" height="25" strokeWidth="1.5" />
          {/* Horn finials */}
          <circle cx="10" cy="28" r="3" fill="currentColor" />
          <circle cx="170" cy="28" r="3" fill="currentColor" />
          <circle cx="90" cy="9" r="3.5" fill="currentColor" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#E0B338] uppercase font-serif-cormorant mt-2 font-medium">
          Gonjong Rumah Gadang & Suntiang Ameh
        </span>
        <span className="text-[9px] tracking-widest text-[#E8A020]/90 mt-0.5 font-sans">
          Baralek Gadang Ranah Minang
        </span>
      </div>
    );
  }

  if (type === 'batak') {
    return (
      <div className="flex flex-col items-center justify-center my-3 group">
        {/* Gorga Batak Toba & Dalihan Na Tolu */}
        <svg className={`${className} text-[#C89D3C] filter drop-shadow-[0_2px_8px_rgba(200,157,60,0.35)]`} viewBox="0 0 160 140" fill="none" stroke="currentColor">
          {/* Dalihan Na Tolu Triangle */}
          <polygon points="80,15 145,115 15,115" strokeWidth="2.5" fill="currentColor" fillOpacity="0.08" />
          {/* Gorga spirals inside */}
          <circle cx="80" cy="75" r="22" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M80 60 A15 15 0 0 1 95 75 A10 10 0 0 1 85 85" strokeWidth="2" strokeLinecap="round" />
          <path d="M80 90 A15 15 0 0 1 65 75 A10 10 0 0 1 75 65" strokeWidth="2" strokeLinecap="round" />
          {/* 3 nodes of Dalihan Na Tolu */}
          <circle cx="80" cy="15" r="5" fill="#8B1414" stroke="#C89D3C" strokeWidth="1.5" />
          <circle cx="145" cy="115" r="5" fill="#171212" stroke="#C89D3C" strokeWidth="1.5" />
          <circle cx="15" cy="115" r="5" fill="#C89D3C" stroke="#8B1414" strokeWidth="1.5" />
          {/* Ulos weaving border tassels */}
          <line x1="25" y1="125" x2="135" y2="125" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="30" y1="130" x2="130" y2="130" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#C89D3C] uppercase font-serif-cormorant mt-2 font-medium">
          Gorga Batak Toba & Ulos Ragi Hotang
        </span>
        <span className="text-[9px] tracking-widest text-[#E5BF65]/80 mt-0.5 font-sans">
          ᯅᯖᯂ᯲ ᯖᯬᯅ — Dalihan Na Tolu
        </span>
      </div>
    );
  }

  if (type === 'bali') {
    return (
      <div className="flex flex-col items-center justify-center my-3 group">
        {/* Candi Bentar & Kori Agung Bali */}
        <svg className={`${className} text-[#D4A836] filter drop-shadow-[0_2px_8px_rgba(212,168,54,0.35)]`} viewBox="0 0 160 140" fill="none" stroke="currentColor">
          {/* Left Gateway Pillar (Stepped Candi Bentar) */}
          <path d="M30 130 L30 30 L45 30 L45 45 L55 45 L55 65 L65 65 L65 95 L72 95 L72 130 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
          {/* Right Gateway Pillar */}
          <path d="M130 130 L130 30 L115 30 L115 45 L105 45 L105 65 L95 65 L95 95 L88 95 L88 130 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
          {/* Central Sacred Void / Sacred Gateway Axis */}
          <line x1="80" y1="20" x2="80" y2="130" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          {/* Frangipani / Bunga Kamboja centerpiece */}
          <circle cx="80" cy="50" r="4" fill="#D4A836" />
          <circle cx="80" cy="42" r="3" fill="#D4A836" fillOpacity="0.6" />
          <circle cx="80" cy="58" r="3" fill="#D4A836" fillOpacity="0.6" />
          <circle cx="73" cy="50" r="3" fill="#D4A836" fillOpacity="0.6" />
          <circle cx="87" cy="50" r="3" fill="#D4A836" fillOpacity="0.6" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#D4A836] uppercase font-serif-cormorant mt-2 font-medium">
          Candi Bentar & Payas Agung Bali
        </span>
        <span className="text-[9px] tracking-widest text-[#F0CA60]/80 mt-0.5 font-sans">
          ᬑᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ — Pawiwahan Ageng
        </span>
      </div>
    );
  }

  if (type === 'islami') {
    return (
      <div className="flex flex-col items-center justify-center my-3 group">
        {/* Arabesque Islamic Arch & 8-Pointed Star */}
        <svg className={`${className} text-[#D4AF37] filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]`} viewBox="0 0 160 140" fill="none" stroke="currentColor">
          {/* Moorish Horseshoe / Pointed Arch */}
          <path d="M30 130 L30 75 Q30 35 80 18 Q130 35 130 75 L130 130" strokeWidth="2.2" fill="currentColor" fillOpacity="0.08" />
          <path d="M42 130 L42 80 Q42 48 80 34 Q118 48 118 80 L118 130" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Khatam 8-pointed star in arch peak */}
          <g transform="translate(80, 52) scale(0.65)">
            <rect x="-18" y="-18" width="36" height="36" strokeWidth="2" />
            <rect x="-18" y="-18" width="36" height="36" strokeWidth="2" transform="rotate(45)" />
            <circle cx="0" cy="0" r="4" fill="currentColor" />
          </g>
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-serif-cormorant mt-2 font-medium">
          Akad Suci Madinah & Mashrabiya
        </span>
        <span className="text-[11px] tracking-widest text-[#E6C962] mt-0.5 font-serif">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
      </div>
    );
  }

  // Modern
  return (
    <div className="flex flex-col items-center justify-center my-3 group">
      <svg className={`${className} text-[#B59A62] filter drop-shadow-[0_2px_8px_rgba(181,154,98,0.3)]`} viewBox="0 0 140 100" fill="none" stroke="currentColor">
        <rect x="25" y="15" width="90" height="70" rx="35" strokeWidth="1.5" />
        <rect x="35" y="25" width="70" height="50" rx="25" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="70" cy="50" r="5" fill="currentColor" />
        <path d="M50 50 L90 50" strokeWidth="1" opacity="0.6" />
      </svg>
      <span className="text-[10px] tracking-[0.3em] text-[#B59A62] uppercase font-serif-cormorant mt-2 font-medium">
        Vogue Editorial Elegance
      </span>
    </div>
  );
}

// ------------------------------------------------------------------
// CULTURAL CORNER ORNAMENTS
// ------------------------------------------------------------------

export function CulturalCornerOrnaments({ type }: { type: CulturalType }) {
  const color = CULTURAL_CONFIGS[type]?.accentGold || '#C5A059';

  return (
    <>
      {/* Top-Left */}
      <div className="absolute top-3 left-3 pointer-events-none opacity-80">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={color}>
          <path d="M2 38 L2 2 L38 2" strokeWidth="2" />
          <path d="M7 38 L7 7 L38 7" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="2" cy="2" r="2.5" fill={color} />
          {type === 'jawa' && <path d="M8 8 Q16 12 14 20 Q12 16 8 8" fill={color} opacity="0.5" />}
          {type === 'sunda' && <circle cx="12" cy="12" r="2" fill={color} />}
          {type === 'minang' && <polygon points="3,3 12,3 3,12" fill={color} opacity="0.5" />}
        </svg>
      </div>

      {/* Top-Right */}
      <div className="absolute top-3 right-3 pointer-events-none opacity-80">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={color}>
          <path d="M38 38 L38 2 L2 2" strokeWidth="2" />
          <path d="M33 38 L33 7 L2 7" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="38" cy="2" r="2.5" fill={color} />
          {type === 'jawa' && <path d="M32 8 Q24 12 26 20 Q28 16 32 8" fill={color} opacity="0.5" />}
          {type === 'sunda' && <circle cx="28" cy="12" r="2" fill={color} />}
          {type === 'minang' && <polygon points="37,3 28,3 37,12" fill={color} opacity="0.5" />}
        </svg>
      </div>

      {/* Bottom-Left */}
      <div className="absolute bottom-3 left-3 pointer-events-none opacity-80">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={color}>
          <path d="M2 2 L2 38 L38 38" strokeWidth="2" />
          <path d="M7 2 L7 33 L38 33" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="2" cy="38" r="2.5" fill={color} />
        </svg>
      </div>

      {/* Bottom-Right */}
      <div className="absolute bottom-3 right-3 pointer-events-none opacity-80">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={color}>
          <path d="M38 2 L38 38 L2 38" strokeWidth="2" />
          <path d="M33 2 L33 33 L2 33" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="38" cy="38" r="2.5" fill={color} />
        </svg>
      </div>
    </>
  );
}

// ------------------------------------------------------------------
// CULTURAL SECTION DIVIDER
// ------------------------------------------------------------------

export function CulturalDivider({ type }: { type: CulturalType }) {
  const color = CULTURAL_CONFIGS[type]?.accentGold || '#C5A059';

  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <span className="w-16 sm:w-24 h-px opacity-60" style={{ backgroundColor: color }} />
      {type === 'jawa' && (
        <svg className="w-6 h-6 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" opacity="0.9" />
        </svg>
      )}
      {type === 'sunda' && (
        <svg className="w-6 h-4 text-[#D4B26F]" viewBox="0 0 30 20" fill="currentColor">
          <circle cx="15" cy="8" r="4" />
          <circle cx="7" cy="14" r="3" opacity="0.7" />
          <circle cx="23" cy="14" r="3" opacity="0.7" />
        </svg>
      )}
      {type === 'minang' && (
        <svg className="w-8 h-4 text-[#E0B338]" viewBox="0 0 40 20" fill="currentColor">
          <path d="M2 4 Q10 16 20 12 Q30 16 38 4 L20 18 Z" />
        </svg>
      )}
      {type === 'batak' && (
        <div className="flex gap-1.5 items-center">
          <span className="w-2.5 h-2.5 rotate-45 bg-[#8B1414] inline-block" />
          <span className="w-3 h-3 rotate-45 bg-[#C89D3C] inline-block shadow-sm" />
          <span className="w-2.5 h-2.5 rotate-45 bg-[#171212] inline-block" />
        </div>
      )}
      {type === 'bali' && (
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-[#D4A836]" />
          <span className="w-3 h-3 rounded-full bg-[#8C3827]" />
          <span className="w-2 h-2 rounded-full bg-[#D4A836]" />
        </div>
      )}
      {type === 'islami' && (
        <div className="text-xs text-[#D4AF37] font-serif font-bold tracking-widest">
          ۞
        </div>
      )}
      {type === 'modern' && (
        <span className="w-2 h-2 rotate-45 bg-[#B59A62] inline-block" />
      )}
      <span className="w-16 sm:w-24 h-px opacity-60" style={{ backgroundColor: color }} />
    </div>
  );
}
