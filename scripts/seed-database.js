const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

const SECRET = process.env.NEXTAUTH_SECRET || 'janji-digital-secret-key-super-secure-production-ready-2026';
function hashPassword(password) {
  return crypto.createHmac('sha256', SECRET).update(password).digest('hex');
}

async function main() {
  console.log('Seeding Janji Digital Database...');
  await prisma.rSVP.deleteMany();
  await prisma.digitalGift.deleteMany();
  await prisma.invitationGallery.deleteMany();
  await prisma.invitationEvent.deleteMany();
  await prisma.invitationContent.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.order.deleteMany();
  await prisma.package.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.culturalTradition.deleteMany();
  await prisma.themeCategory.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.user.deleteMany();

  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrator Janji Digital',
      email: 'admin@janji-digital.com',
      password: hashPassword('admin123'),
      role: 'ADMIN',
      phone: '081299998888',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      name: 'Budi Santoso & Siti Rahayu',
      email: 'budi@example.com',
      password: hashPassword('password123'),
      role: 'CUSTOMER',
      phone: '081234567890',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  });

  console.log('Created Users: Admin & Customer');
  const traditionsData = [
    {
      id: 'trad-jawa',
      name: 'Adat Jawa',
      slug: 'adat-jawa',
      region: 'Jawa Tengah & DI Yogyakarta',
      description: 'Keanggunan tradisi Jawa dengan sentuhan keraton, ornamen joglo ukir, paes ageng kencana, gebyok ukir, dan motif batik klasik parang & kawung.',
      bannerUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Paes Ageng, Gebyok, Batik Parang, Keraton, Janur Kuning, Kembar Mayang',
      colorPalette: JSON.stringify([
        { name: 'Keraton Gold', hex: '#C5A059' },
        { name: 'Deep Forest', hex: '#24382E' },
        { name: 'Ivory Royal', hex: '#FAF7F0' }
      ]),
    },
    {
      id: 'trad-sunda',
      name: 'Adat Sunda',
      slug: 'adat-sunda',
      region: 'Jawa Barat & Banten',
      description: 'Kemewahan pesona Parahyangan dengan mahkota Siger Sunda yang berkilau, rangkaian kembang melati ronce, ornamen rereng, dan nuansa putih perak nan suci.',
      bannerUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Siger Sunda, Ronce Melati, Kebaya Parahyangan, Merak Ngibing, Harupat',
      colorPalette: JSON.stringify([
        { name: 'Pure Pearl', hex: '#FDFBF7' },
        { name: 'Champagne Siger', hex: '#E2D1B3' },
        { name: 'Emerald Parahyangan', hex: '#1C3A27' }
      ]),
    },
    {
      id: 'trad-minang',
      name: 'Adat Minangkabau',
      slug: 'adat-minangkabau',
      region: 'Sumatera Barat',
      description: 'Kemegahan Ranah Minang terinspirasi dari atap gonjong Rumah Gadang, gemerlap suntiang emas, tenun songket Pandai Sikek, dan paduan marun-emas nan megah.',
      bannerUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Rumah Gadang, Suntiang Emas, Songket Pandai Sikek, Marawa, Carano',
      colorPalette: JSON.stringify([
        { name: 'Merah Marawa', hex: '#6B1D2F' },
        { name: 'Suntiang Gold', hex: '#D4AF37' },
        { name: 'Warm Cream', hex: '#FAF5EE' }
      ]),
    },
    {
      id: 'trad-batak',
      name: 'Adat Batak',
      slug: 'adat-batak',
      region: 'Sumatera Utara (Toba, Mandailing, Karo)',
      description: 'Kesakralan budaya Batak berhias tenun ulos ragi hotang, ornamen gorga ukir khas Toba berfilosofi Dalihan Na Tolu dengan palet tegas merah, hitam, dan emas.',
      bannerUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Ulos Ragi Hotang, Gorga Batak, Dalihan Na Tolu, Tandok, Sortali',
      colorPalette: JSON.stringify([
        { name: 'Batak Crimson', hex: '#8B0000' },
        { name: 'Charcoal Black', hex: '#1F1F1F' },
        { name: 'Gold Accent', hex: '#CBA135' }
      ]),
    },
    {
      id: 'trad-bali',
      name: 'Adat Bali',
      slug: 'adat-bali',
      region: 'Bali',
      description: 'Kearifan Pulau Dewata bernuansa arsitektur candi bentar, mahkota agung payas, taburan bunga kamboja kencana, serta harmoni sakral Tri Hita Karana.',
      bannerUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Payas Agung, Candi Bentar, Janur Bali, Kamboja, Poleng Emas',
      colorPalette: JSON.stringify([
        { name: 'Dewata Gold', hex: '#CCA43B' },
        { name: 'Terracotta Coral', hex: '#9C4131' },
        { name: 'Sacred Cream', hex: '#FBF9F1' }
      ]),
    },
    {
      id: 'trad-bugis',
      name: 'Adat Bugis-Makassar',
      slug: 'adat-bugis-makassar',
      region: 'Sulawesi Selatan',
      description: 'Keagungan bangsawan Bugis Makassar berbalut kemewahan Baju Bodo, perhiasan emas kote-kote, dan motif tenun sutera Lagosi yang memukau.',
      bannerUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Baju Bodo, Sutera Lagosi, Saloko Bunga, Bosara',
      colorPalette: JSON.stringify([
        { name: 'Royal Emerald', hex: '#1B4931' },
        { name: 'Bugis Gold', hex: '#D4AF37' },
        { name: 'Flamingo Pink', hex: '#B83B5E' }
      ]),
    },
    {
      id: 'trad-betawi',
      name: 'Adat Betawi',
      slug: 'adat-betawi',
      region: 'DKI Jakarta',
      description: 'Keceriaan dan kehangatan tradisi Betawi berhias Siangko bercadar emas, ornamen gigi balang rumah kebaya, dan kesenian palang pintu nan meriah.',
      bannerUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      culturalElements: 'Siangko Cadar Emas, Gigi Balang, Palang Pintu, Kembang Kelapa',
      colorPalette: JSON.stringify([
        { name: 'Betawi Amber', hex: '#D97706' },
        { name: 'Deep Wine', hex: '#4A0E17' },
        { name: 'Warm Parchment', hex: '#FEF3C7' }
      ]),
    },
  ];

  for (const t of traditionsData) {
    await prisma.culturalTradition.create({ data: t });
  }

  const categoriesData = [
    { id: 'cat-tradisional', name: 'Tradisional & Adat Nusantara', slug: 'tradisional', description: 'Koleksi eksklusif terinspirasi dari warisan budaya sakral Indonesia', icon: 'Sparkles' },
    { id: 'cat-modern', name: 'Modern & Minimalis', slug: 'modern-minimalis', description: 'Tipografi bersih, layout editorial kontemporer, dan estetika berkelas', icon: 'Layout' },
    { id: 'cat-luxury', name: 'Luxury & Elegant', slug: 'luxury-elegant', description: 'Sentuhan emas murni, font serif klasik bergengsi, dan detail velvet megah', icon: 'Crown' },
    { id: 'cat-floral', name: 'Floral & Botanical', slug: 'floral-botanical', description: 'Ilustrasi botani lembut, cat air flora romantis, dan nuansa taman asri', icon: 'Flower' },
    { id: 'cat-islamic', name: 'Islamic Wedding', slug: 'islamic-wedding', description: 'Ornamen islami geometris moroccan, kaligrafi anggun, dan doa sakinah', icon: 'Moon' },
    { id: 'cat-rustic', name: 'Rustic & Outdoor', slug: 'rustic-outdoor', description: 'Kayu hangat, tanaman pampas, nuansa senja hangat, dan pesta kebun kasual', icon: 'Compass' },
    { id: 'cat-dark', name: 'Dark & Dramatic', slug: 'dark-dramatic', description: 'Latar gelap elegan, kontras emas mawar bercahaya, dan mood sinematik', icon: 'Eye' },
  ];

  for (const c of categoriesData) {
    await prisma.themeCategory.create({ data: c });
  }

  const packagesData = [
    {
      id: 'pkg-basic',
      code: 'BASIC',
      name: 'Paket Basic',
      slug: 'paket-basic',
      price: 50000,
      originalPrice: 99000,
      description: 'Pilihan hemat untuk pernikahan intim dengan template elegan, informasi esensial lengkap, dan navigasi acara.',
      isPopular: false,
      features: JSON.stringify([
        '1 Pilihan Template Undangan (Modern / Adat)',
        'Informasi Profil Kedua Mempelai & Orang Tua',
        'Detail Susunan Acara Akad & Resepsi',
        'Petunjuk Arah & Navigasi Langsung Google Maps',
        'Hitung Mundur Waktu Acara (Countdown Timer)',
        'Galeri Foto Prewedding (Hingga 5 Foto)',
        'Musik Latar Otomatis (Autoplay Audio)',
        'Tombol Kirim WhatsApp & Share Medsos',
        'Desain Responsif Semua HP & Tablet',
        'Masa Aktif Undangan 6 Bulan'
      ]),
    },
    {
      id: 'pkg-premium',
      code: 'PREMIUM',
      name: 'Paket Premium',
      slug: 'paket-premium',
      price: 100000,
      originalPrice: 199000,
      description: 'Paket paling diminati! Lengkap dengan semua template adat & modern, live RSVP, amplop digital QRIS, dan galeri foto.',
      isPopular: true,
      features: JSON.stringify([
        'Semua Fitur Paket Basic',
        'Bebas Akses Seluruh Template Adat Nusantara & Modern',
        'Galeri Foto Prewedding (Hingga 15 Foto)',
        'Amplop Digital & Tanda Kasih (Bank & QRIS)',
        'Konfirmasi Kehadiran Tamu (Live RSVP Interaktif)',
        'Buku Tamu Ucapan & Doa Restu Realtime',
        'Personalisasi Nama Tamu Tak Terbatas (?to=Nama)',
        'Fitur Salin Nomor Rekening Otomatis',
        'Partikel Animasi & Efek Budaya Nusantara',
        'Masa Aktif Undangan 1 Tahun Penuh'
      ]),
    },
    {
      id: 'pkg-exclusive',
      code: 'EXCLUSIVE',
      name: 'Paket Exclusive VIP',
      slug: 'paket-exclusive-vip',
      price: 150000,
      originalPrice: 299000,
      description: 'Solusi paripurna tanpa batas. Akses ke seluruh template eksklusif, love story timeline, video teaser, QR check-in, dan masa aktif selamanya.',
      isPopular: false,
      features: JSON.stringify([
        'Semua Fitur Paket Premium',
        'Akses Bebas Semua Template VIP & Eksklusif',
        'Galeri Foto Tanpa Batas (Unlimited) + Video Embed Teaser',
        'Kisah Perjalanan Cinta (Love Story Timeline)',
        'QR Code Check-In Tamu Meja Resepsi',
        'Manajemen Buku Tamu & Ekspor Data Excel',
        'Kustom Slug URL Unik Pilihan Sendiri',
        'Bebas Ganti Musik Latar Pilihan Sendiri',
        'Bebas Watermark Janji Digital',
        'Masa Aktif Selamanya (Lifetime)'
      ]),
    },
  ];

  for (const p of packagesData) {
    await prisma.package.create({ data: p });
  }
  const themesSeed = [
    // 6 Adat Jawa
    {
      id: 'theme-jawa-keraton',
      name: 'Jawa Keraton Adiningrat',
      slug: 'jawa-keraton-adiningrat',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-jawa',
      price: 199000,
      originalPrice: 299000,
      badge: 'BESTSELLER',
      rating: 4.98,
      salesCount: 428,
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kemegahan keraton Mataram dengan ukiran emas, gunungan wayang, dan aksara Jawa halus.',
      description: 'Desain bertema Keraton Jawa Adiningrat menghadirkan aura agung bangsawan Mataram. Dihiasi ornamen gunungan wayang kulit klasik, lis emas tempa, dan palet hijau zamrud keraton.',
      features: JSON.stringify(['Amplop Digital & QRIS', 'Live RSVP & Buku Tamu', 'Navigasi Google Maps', 'Galeri Foto & Video', 'Musik Latar Gamelan Suci', 'Countdown Timer']),
      colorPalette: JSON.stringify([{ name: 'Hijau Keraton', hex: '#24382E' }, { name: 'Kuningan Emas', hex: '#C5A059' }, { name: 'Krem Gading', hex: '#FAF7F0' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-jawa-joglo',
      name: 'Joglo Ukir Kencana',
      slug: 'joglo-ukir-kencana',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-jawa',
      price: 199000,
      originalPrice: 289000,
      badge: 'POPULAR',
      rating: 4.94,
      salesCount: 312,
      coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Filosofi tumpangsari rumah Joglo dengan ukiran kayu jati dan janur kuning.',
      description: 'Menghadirkan kehangatan arsitektur Joglo Jawa dengan representasi soko guru, atap tumpangsari, dan ornamen janur kuning kembar mayang yang penuh restu.',
      features: JSON.stringify(['Amplop Digital', 'Live RSVP', 'Google Maps Interaktif', 'Galeri Prewedding', 'Musik Gamelan Lembut']),
      colorPalette: JSON.stringify([{ name: 'Cokelat Kayu Jati', hex: '#5A3825' }, { name: 'Emas Kencana', hex: '#B59A62' }, { name: 'Ivory Hangat', hex: '#FAF7F0' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-jawa-paes',
      name: 'Paes Ageng Basahan',
      slug: 'paes-ageng-basahan',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-jawa',
      price: 249000,
      originalPrice: 349000,
      badge: 'EXCLUSIVE',
      rating: 5.0,
      salesCount: 289,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Aura sakral tata rias Paes Ageng basahan khas Kasultanan Yogyakarta.',
      description: 'Terinspirasi oleh keanggunan busana dan riasan Paes Ageng Basahan dengan dodot kencana, hiasan cunduk mentul sembilan, dan melati tibo dodo nan suci.',
      features: JSON.stringify(['Fitur VIP Tamu', 'Amplop Digital Multi Rekening', 'Galeri Fullscreen', 'Musik Tradisional Instrumen', 'Kutipan Doa Khusus']),
      colorPalette: JSON.stringify([{ name: 'Hijau Lumut Basahan', hex: '#1C3124' }, { name: 'Emas Mentul', hex: '#E0B859' }, { name: 'Champagne Soft', hex: '#F4ECE1' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-jawa-gebyok',
      name: 'Gebyok Ukir Jepara',
      slug: 'gebyok-ukir-jepara',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-jawa',
      price: 189000,
      originalPrice: 269000,
      rating: 4.91,
      salesCount: 195,
      coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Detail ukiran 3D gebyok Jawa klasik sebagai lambang pintu gerbang mahligai rumah tangga.',
      description: 'Karya visual terinspirasi dari gebyok ukiran Jepara 3 dimensi dengan relief bunga teratai dan dedaunan jati yang mengelilingi nama kedua mempelai.',
      features: JSON.stringify(['Amplop Digital', 'Buku Tamu Interaktif', 'Peta Lokasi Acara', 'Galeri Foto Slider']),
      colorPalette: JSON.stringify([{ name: 'Kayu Tua Jepara', hex: '#42281D' }, { name: 'Kuningan Antik', hex: '#A88344' }, { name: 'Krem Klasik', hex: '#F9F6EE' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-jawa-modern',
      name: 'Jawa Modern Kahuripan',
      slug: 'jawa-modern-kahuripan',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-jawa',
      price: 219000,
      originalPrice: 319000,
      badge: 'NEW',
      rating: 4.96,
      salesCount: 164,
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Perpaduan estetika modern minimalis dengan aksen ornamen Jawa kontemporer.',
      description: 'Bagi pasangan yang menginginkan keseimbangan antara tradisi luhur leluhur dan gaya hidup modern yang simpel, bersih, dan elegan tanpa menghilangkan esensi budaya Jawa.',
      features: JSON.stringify(['QR Code Tamu', 'Kustom URL Undangan', 'Live RSVP & Ucapan', 'Streaming YouTube Embed']),
      colorPalette: JSON.stringify([{ name: 'Olive Jawa', hex: '#3B4D3C' }, { name: 'Sand Khaki', hex: '#D8C3A5' }, { name: 'Soft Charcoal', hex: '#292929' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-jawa-batik',
      name: 'Batik Parang Kencana',
      slug: 'batik-parang-kencana',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-jawa',
      price: 189000,
      originalPrice: 279000,
      rating: 4.89,
      salesCount: 220,
      coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Filosofi keteguhan cinta berlatar motif sakral Batik Parang Rusak kencana.',
      description: 'Motif batik Parang melambangkan ombak samudera yang tak pernah berhenti, perlambang keteguhan janji suci pernikahan yang pantang menyerah dalam mengarungi biduk rumah tangga.',
      features: JSON.stringify(['Amplop Digital', 'RSVP & Doa', 'Integrasi Google Calendar', 'Audio Autoplay']),
      colorPalette: JSON.stringify([{ name: 'Cokelat Soga Batik', hex: '#52321E' }, { name: 'Emas Prada', hex: '#C29B38' }, { name: 'Gading Lembut', hex: '#FBF9F4' }]),
      format: 'standard',
      featured: false,
    },
    // 4 Adat Sunda
    {
      id: 'theme-sunda-siger',
      name: 'Sunda Siger Mahkota Kencana',
      slug: 'sunda-siger-mahkota-kencana',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-sunda',
      price: 229000,
      originalPrice: 329000,
      badge: 'BESTSELLER',
      rating: 4.97,
      salesCount: 387,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kilauan Siger Sunda bertatahkan permata dengan ronce melati wangi semerbak.',
      description: 'Mahakarya undangan bertemakan adat Sunda dengan visualisasi Siger perak dan emas, untaian bunga melati suci, ornamen daun sirih, dan lantunan suling kecapi yang menenangkan jiwa.',
      features: JSON.stringify(['Musik Suling Kecapi Parahyangan', 'Amplop Digital QRIS', 'Live RSVP & Ucapan Tamu', 'Galeri Foto HD', 'Countdown Timer']),
      colorPalette: JSON.stringify([{ name: 'Krem Parahyangan', hex: '#FDFBF7' }, { name: 'Champagne Emas', hex: '#E2D1B3' }, { name: 'Hijau Zamrud Sunda', hex: '#1C3A27' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-sunda-parahyangan',
      name: 'Parahyangan Klasik Suci',
      slug: 'parahyangan-klasik-suci',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-sunda',
      price: 189000,
      originalPrice: 289000,
      rating: 4.93,
      salesCount: 241,
      coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Nuansa putih suci kebaya Sunda dipadu ornamen alam priangan nan sejuk.',
      description: 'Desain yang mengangkat kemurnian tradisi Sunda dengan palet monokromatik putih gading dan aksen emas perak halus, mencerminkan ketulusan cinta kedua mempelai.',
      features: JSON.stringify(['Amplop Digital', 'Google Maps Direct', 'RSVP Realtime', 'Background Music']),
      colorPalette: JSON.stringify([{ name: 'Putih Melati', hex: '#FFFFFF' }, { name: 'Perak Siger', hex: '#D6D3D1' }, { name: 'Gold Trim', hex: '#B89758' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-sunda-rereng',
      name: 'Batik Rereng Sunda Kahuripan',
      slug: 'batik-rereng-sunda-kahuripan',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-sunda',
      price: 199000,
      originalPrice: 299000,
      badge: 'NEW',
      rating: 4.92,
      salesCount: 156,
      coverImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Motif batik Rereng garutan yang anggun berpadu ornamen sulur flora Sunda.',
      description: 'Batik Rereng khas Tatar Sunda melambangkan keanggunan garis pegunungan Priangan yang menawan, dipadukan tipografi serif berkelas internasional.',
      features: JSON.stringify(['Amplop Digital BCA & Mandiri', 'Live Guestbook', 'Hitung Mundur Acara', 'Custom Nama Tamu']),
      colorPalette: JSON.stringify([{ name: 'Biru Priangan', hex: '#1E293B' }, { name: 'Emas Rereng', hex: '#CBA135' }, { name: 'Krem Sutra', hex: '#FAF8F5' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-sunda-modern',
      name: 'Sunda Modern Botanical',
      slug: 'sunda-modern-botanical',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-sunda',
      price: 219000,
      originalPrice: 309000,
      rating: 4.95,
      salesCount: 204,
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Harmonisasi Siger Sunda garis minimalis dengan bunga krisan dan eucalyptus.',
      description: 'Konsep kontemporer bagi pernikahan modern yang ingin menampilkan mahkota Siger Sunda dalam bentuk line-art estetik berlatar dedaunan botani segar.',
      features: JSON.stringify(['Line Art Siger Interaktif', 'Buku Tamu Doa', 'Integrasi QR Code', 'Galeri Foto Masonry']),
      colorPalette: JSON.stringify([{ name: 'Sage Green', hex: '#4A5B4C' }, { name: 'Rose Gold Accent', hex: '#C79D8A' }, { name: 'Ivory Soft', hex: '#FDFBF7' }]),
      format: 'interactive',
      featured: false,
    },
    // 3 Adat Minangkabau
    {
      id: 'theme-minang-marawa',
      name: 'Minangkabau Rumah Gadang Marawa',
      slug: 'minangkabau-rumah-gadang-marawa',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-minang',
      price: 239000,
      originalPrice: 349000,
      badge: 'BESTSELLER',
      rating: 4.99,
      salesCount: 342,
      coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Atap gonjong Rumah Gadang nan megah dengan rona Marawa merah marun dan emas.',
      description: 'Lambang kehormatan dan kebesaran suku Minang. Menampilkan siluet atap gonjong Rumah Gadang berukir kayu warna-warni, mahkota Suntiang Minang bertingkat, dan kain songket Pandai Sikek.',
      features: JSON.stringify(['Musik Talempong & Saluang Suci', 'Amplop Digital QRIS & Bank', 'Ucapan & Doa Tamu Realtime', 'Peta Lokasi Gedung', 'Timeline Kisah Cinta']),
      colorPalette: JSON.stringify([{ name: 'Merah Marawa', hex: '#6B1D2F' }, { name: 'Kuning Suntiang', hex: '#D4AF37' }, { name: 'Hitam Marawa', hex: '#1C1917' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-minang-songket',
      name: 'Songket Balapak Sutan Nan Rajo',
      slug: 'songket-balapak-sutan-nan-rajo',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-minang',
      price: 209000,
      originalPrice: 299000,
      rating: 4.94,
      salesCount: 188,
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Tekstur tenun songket Balapak berbenang emas tebal berwibawa raja-raja.',
      description: 'Tema yang terfokus pada keagungan tenun pusaka songket Balapak dengan tata ornamen pucuak rabuang yang melambangkan kematangan moral dan kepemimpinan dalam keluarga.',
      features: JSON.stringify(['Amplop Digital', 'RSVP & Tamu Hadir', 'Kutipan Pepatah Minang', 'Galeri Kenangan']),
      colorPalette: JSON.stringify([{ name: 'Ruby Deep Red', hex: '#7F1D1D' }, { name: 'Antique Gold', hex: '#C59B27' }, { name: 'Sand Cream', hex: '#FDFBF7' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-minang-luxury',
      name: 'Ranah Minang Kemilau Kontemporer',
      slug: 'ranah-minang-kemilau-kontemporer',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-minang',
      price: 229000,
      originalPrice: 329000,
      badge: 'EXCLUSIVE',
      rating: 4.96,
      salesCount: 175,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kemewahan Minangkabau modern dengan aksen suntiang geometris emas murni.',
      description: 'Estetika editorial pernikahan Minang kelas atas. Menyatukan siluet arsitektur khas Bukittinggi dengan tata letak majalah mode pernikahan modern yang berwibawa tinggi.',
      features: JSON.stringify(['Preview Mobile & Desktop Khusus', 'Personalized Guest Links', 'Live RSVP & Doa', 'Amplop Digital Lengkap']),
      colorPalette: JSON.stringify([{ name: 'Burgundy Suntiang', hex: '#581C28' }, { name: 'Pure Gold Leaf', hex: '#DFB15B' }, { name: 'Ivory Royal', hex: '#FBF9F5' }]),
      format: 'interactive',
      featured: false,
    },
    // 3 Adat Batak
    {
      id: 'theme-batak-ulos',
      name: 'Batak Ulos Ragi Hotang Nauli',
      slug: 'batak-ulos-ragi-hotang-nauli',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-batak',
      price: 219000,
      originalPrice: 319000,
      badge: 'POPULAR',
      rating: 4.96,
      salesCount: 298,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kesakralan tenun ulos ragi hotang pembawa berkat dan kehangatan ikatan kasih.',
      description: 'Ulos Ragi Hotang melambangkan ikatan cinta yang kokoh dan tak mudah putus laksana rotan. Berhiaskan ornamen tenun Batak Toba, sortali keemasan, dan warna sakral benang tiga benua.',
      features: JSON.stringify(['Musik Gondang Sabangunan Suci', 'Amplop Digital Hadiah Parjambaran', 'Live RSVP', 'Pemberkatan & Resepsi', 'Galeri Martumpol']),
      colorPalette: JSON.stringify([{ name: 'Merah Batak', hex: '#8B0000' }, { name: 'Hitam Gorga', hex: '#1A1A1A' }, { name: 'Emas Sortali', hex: '#CBA135' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-batak-gorga',
      name: 'Gorga Batak Toba Mandailing',
      slug: 'gorga-batak-toba-mandailing',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-batak',
      price: 189000,
      originalPrice: 289000,
      rating: 4.91,
      salesCount: 167,
      coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Ukiran motif Gorga Simataniari yang memancarkan berkah kemakmuran dan perlindungan.',
      description: 'Motif ukiran Gorga Batak sarat makna perlindungan Illahi dan falsafah hidup luhur Dalihan Na Tolu: Somba marhula-hula, Elek marboru, Manat mardongan tubu.',
      features: JSON.stringify(['Amplop Digital', 'Buku Tamu Martumpol', 'Peta Lokasi Gereja & Wisma', 'Countdown']),
      colorPalette: JSON.stringify([{ name: 'Batak Red', hex: '#7A1315' }, { name: 'Dark Slate', hex: '#23272A' }, { name: 'Gold Leaf', hex: '#D1A153' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-batak-samosir',
      name: 'Toba Samosir Royal Elegance',
      slug: 'toba-samosir-royal-elegance',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-batak',
      price: 229000,
      originalPrice: 329000,
      badge: 'NEW',
      rating: 4.95,
      salesCount: 143,
      coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Pemandangan panorama Danau Toba dengan keanggunan busana modern Batak.',
      description: 'Perpaduan megah antara lanskap Danau Toba nan legendaris dengan ornamen tenun kontemporer, sangat ideal bagi pasangan yang bangga akan akar budaya Toba.',
      features: JSON.stringify(['Background Video Panorama', 'Amplop Digital Multi Rekening', 'Live RSVP & Ucapan', 'Integrasi WhatsApp']),
      colorPalette: JSON.stringify([{ name: 'Deep Toba Lake', hex: '#1E3A4C' }, { name: 'Crimson Ulos', hex: '#991B1B' }, { name: 'Gold Royal', hex: '#CA8A04' }]),
      format: 'interactive',
      featured: false,
    },
    // 3 Adat Bali
    {
      id: 'theme-bali-puri',
      name: 'Puri Agung Dewata Emas',
      slug: 'puri-agung-dewata-emas',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-bali',
      price: 239000,
      originalPrice: 339000,
      badge: 'BESTSELLER',
      rating: 4.98,
      salesCount: 318,
      coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kemegahan istana Puri Bali dengan relief ukiran candi bentar dan emas prada.',
      description: 'Tema agung bernuansa keraton istana Puri Bali. Berhias ornamen candi bentar, mahkota Payas Agung berhias bunga cempaka kuning dan melati kencana, serta taburan doa suci Tri Hita Karana.',
      features: JSON.stringify(['Musik Rindik Bambu Suci', 'Amplop Digital QRIS & Bank', 'Live RSVP & Doa Restu', 'Galeri Foto Bali', 'Petunjuk Maps ke Puri/Gedung']),
      colorPalette: JSON.stringify([{ name: 'Emas Dewata Prada', hex: '#CCA43B' }, { name: 'Merah Bata Candi', hex: '#8B3A2B' }, { name: 'Krem Kamboja', hex: '#FBF9F1' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-bali-paduraksa',
      name: 'Paduraksa Kencana Tirta',
      slug: 'paduraksa-kencana-tirta',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-bali',
      price: 199000,
      originalPrice: 289000,
      rating: 4.92,
      salesCount: 201,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Pintu gerbang Paduraksa bertatahkan ukiran bunga teratai dan dedaunan suci.',
      description: 'Paduraksa sebagai gerbang sakral menuju ruang utama melambangkan langkah awal kedua mempelai menuju kehidupan baru yang suci, berkah, dan harmonis seumur hidup.',
      features: JSON.stringify(['Amplop Digital', 'RSVP Online', 'Kutipan Weda Suci', 'Galeri Foto Interaktif']),
      colorPalette: JSON.stringify([{ name: 'Golden Sand', hex: '#D4AF37' }, { name: 'Warm Terracotta', hex: '#A0522D' }, { name: 'Pure Linen', hex: '#FAF8F5' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-bali-tropical',
      name: 'Balinese Tropical Romance',
      slug: 'balinese-tropical-romance',
      categoryId: 'cat-tradisional',
      traditionId: 'trad-bali',
      price: 219000,
      originalPrice: 319000,
      badge: 'POPULAR',
      rating: 4.95,
      salesCount: 265,
      coverImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Pesta pernikahan pulau dewata bertabur kamboja putih dan daun palem eksotis.',
      description: 'Sangat cocok untuk wedding destination di pantai atau villa Bali. Menggabungkan pesona alam tropis Pulau Dewata dengan kemewahan tipografi modern bertaraf internasional.',
      features: JSON.stringify(['RSVP Tamu Luar Kota', 'Amplop Digital', 'Rekomendasi Akomodasi', 'Hitung Mundur Sunset']),
      colorPalette: JSON.stringify([{ name: 'Palm Leaf Green', hex: '#2D4A3E' }, { name: 'Champagne Sunset', hex: '#E6D3B3' }, { name: 'Off White', hex: '#FCFAF7' }]),
      format: 'interactive',
      featured: false,
    },
    // 5 Modern, Floral, Islamic, Luxury & Editorial
    {
      id: 'theme-royal-ivory',
      name: 'The Royal Ivory & Champagne',
      slug: 'the-royal-ivory-champagne',
      categoryId: 'cat-luxury',
      traditionId: null,
      price: 249000,
      originalPrice: 359000,
      badge: 'EXCLUSIVE',
      rating: 5.0,
      salesCount: 462,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kemewahan monarki klasik berbalut gading hangat, garis emas tempa, dan lilin malam.',
      description: 'Koleksi mahakarya paling diminati untuk pernikahan mewah berstandar hotel bintang lima. Tipografi serif elegan berpadu aksen foil emas murni dengan kartu amplop lilin segel digital.',
      features: JSON.stringify(['Animasi Buka Amplop Wax Seal Emas', 'Amplop Digital Multi Bank & QRIS', 'Buku Tamu Doa Realtime', 'Background Song Romantis Populer', 'Desain Responsif Ultra HD']),
      colorPalette: JSON.stringify([{ name: 'Warm Ivory', hex: '#FAF7F0' }, { name: 'Champagne Gold', hex: '#E8D8B8' }, { name: 'Muted Gold', hex: '#B59A62' }, { name: 'Soft Charcoal', hex: '#292929' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-emerald-botanical',
      name: 'Emerald Botanical Garden',
      slug: 'emerald-botanical-garden',
      categoryId: 'cat-floral',
      traditionId: null,
      price: 189000,
      originalPrice: 279000,
      badge: 'POPULAR',
      rating: 4.94,
      salesCount: 380,
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Ilustrasi cat air daun eucalyptus segar, mawar putih, dan nuansa kebun rimbun.',
      description: 'Sempurna untuk pernikahan garden party outdoor maupun ballroom berkonsep alam lestari. Menghadirkan kesejukan warna hijau zamrud dengan ilustrasi botani tangan yang artistik.',
      features: JSON.stringify(['Amplop Digital', 'RSVP & Jumlah Kursi', 'Integrasi Google Maps', 'Audio Player Alami']),
      colorPalette: JSON.stringify([{ name: 'Deep Forest Green', hex: '#24382E' }, { name: 'Eucalyptus Sage', hex: '#607D6D' }, { name: 'Cream Linen', hex: '#F9F8F3' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-akad-madinah',
      name: 'Akad Suci Madinah Nur',
      slug: 'akad-suci-madinah-nur',
      categoryId: 'cat-islamic',
      traditionId: null,
      price: 199000,
      originalPrice: 289000,
      badge: 'BESTSELLER',
      rating: 4.98,
      salesCount: 410,
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Kaligrafi Ar-Rum 21 yang anggun dengan ornamen geometri arabesque islami keemasan.',
      description: 'Dirancang khusus untuk pernikahan syari yang penuh berkah dan kesakralan. Menampilkan petikan ayat suci Al-Quran, ornamen kubah masjid megah, dan doa ikatan sakinah mawaddah warahmah.',
      features: JSON.stringify(['Kutipan Ayat & Terjemahan', 'Amplop Digital Syariah', 'Buku Doa Tamu Khidmat', 'Jadwal Akad & Walimah', 'Peta Navigasi']),
      colorPalette: JSON.stringify([{ name: 'Emerald Syar i', hex: '#1B4D3E' }, { name: 'Emas Kaligrafi', hex: '#D4AF37' }, { name: 'Putih Bersih', hex: '#FDFBF7' }]),
      format: 'interactive',
      featured: true,
    },
    {
      id: 'theme-monochrome-editorial',
      name: 'Monochrome Vogue Editorial',
      slug: 'monochrome-vogue-editorial',
      categoryId: 'cat-modern',
      traditionId: null,
      price: 179000,
      originalPrice: 259000,
      rating: 4.91,
      salesCount: 234,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Tata letak majalah mode editorial dengan tipografi berani dan foto hitam putih abadi.',
      description: 'Estetika minimalis murni untuk pasangan urban kontemporer. Memanfaatkan kekuatan tipografi sans-serif modern, whitespace luas, dan layout editorial layaknya majalah fashion dunia.',
      features: JSON.stringify(['Foto Galeri Minimalis HD', 'Live RSVP Simpel', 'Amplop Digital Cashless', 'Countdown Hitung Mundur']),
      colorPalette: JSON.stringify([{ name: 'Pitch Black', hex: '#121212' }, { name: 'Pure White', hex: '#FFFFFF' }, { name: 'Muted Taupe', hex: '#A8A29E' }]),
      format: 'standard',
      featured: false,
    },
    {
      id: 'theme-midnight-velvet',
      name: 'Midnight Velvet & Starlight',
      slug: 'midnight-velvet-starlight',
      categoryId: 'cat-dark',
      traditionId: null,
      price: 239000,
      originalPrice: 349000,
      badge: 'EXCLUSIVE',
      rating: 4.97,
      salesCount: 285,
      coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      previewImages: JSON.stringify(['https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80']),
      shortDesc: 'Nuansa malam gemerlap bintang dengan latar biru malam tua dan partikel emas berkilau.',
      description: 'Pengalaman visual sinematik dramatis bagi pesta pernikahan malam hari (evening banquet). Menghadirkan atmosfer magis bertabur bintang dengan aksen gold dust bercahaya.',
      features: JSON.stringify(['Efek Partikel Kilau Emas', 'Amplop Digital & QRIS', 'Galeri Foto Night Mode', 'Buku Doa Tamu Glamour', 'Musik Klasik Orkestra']),
      colorPalette: JSON.stringify([{ name: 'Midnight Navy', hex: '#0F172A' }, { name: 'Starlight Gold', hex: '#F59E0B' }, { name: 'Soft Moonlight', hex: '#E2E8F0' }]),
      format: 'interactive',
      featured: true,
    },
  ];

  for (const th of themesSeed) {
    await prisma.theme.create({ data: th });
  }
  await prisma.coupon.create({
    data: {
      code: 'WEDDINGBARU',
      discountPercent: 15,
      discountAmount: null,
      minPurchase: 100000,
      maxUsage: 500,
      usedCount: 42,
      active: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'IKATANJANJI',
      discountPercent: null,
      discountAmount: 50000,
      minPurchase: 200000,
      maxUsage: 200,
      usedCount: 18,
      active: true,
    },
  });

  const testData = [
    {
      coupleName: 'Raden Mas Arya & Sekar Ayu',
      weddingDate: '12 September 2026',
      themeName: 'Jawa Keraton Adiningrat',
      rating: 5,
      reviewText: 'Keluarga besar kami sangat terkesan dengan ornamen keraton dan lantunan gamelannya yang sangat sakral. Tamu-tamu sepuh memuji betapa sopan dan berwibawanya undangan digital ini!',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
    {
      coupleName: 'Fahri & Nabila Az-Zahra',
      weddingDate: '4 Oktober 2026',
      themeName: 'Akad Suci Madinah Nur',
      rating: 5,
      reviewText: 'Alhamdulillah, fitur amplop digital dan RSVP-nya sangat membantu pendataan katering kami. Desain islaminya sangat anggun dengan kaligrafi yang indah.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
    {
      coupleName: 'Sutan Bagindo & Puti Renjana',
      weddingDate: '18 Oktober 2026',
      themeName: 'Minangkabau Rumah Gadang Marawa',
      rating: 5,
      reviewText: 'Kemegahan Suntiang dan atap Rumah Gadangnya luar biasa detail! Tamu perantau dari Jakarta sampai Padang memuji kemewahan undangan pernikahan kami.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
  ];

  for (const t of testData) {
    await prisma.testimonial.create({ data: t });
  }

  const sampleOrder = await prisma.order.create({
    data: {
      orderNumber: 'INV-2026-0001',
      userId: customerUser.id,
      packageId: 'pkg-premium',
      themeId: 'theme-jawa-keraton',
      grossAmount: 249000,
      discountAmount: 0,
      netAmount: 249000,
      status: 'PAID',
      customerName: 'Budi Santoso',
      customerEmail: 'budi@example.com',
      customerPhone: '081234567890',
      paymentMethod: 'Midtrans QRIS',
      paidAt: new Date(),
    },
  });

  const sampleInvitation = await prisma.invitation.create({
    data: {
      id: 'inv-andi-siti',
      slug: 'andi-siti',
      title: 'Pernikahan Suci Andi & Siti',
      userId: customerUser.id,
      orderId: sampleOrder.id,
      themeId: 'theme-jawa-keraton',
      packageId: 'pkg-premium',
      status: 'PUBLISHED',
      viewCount: 1542,
      publishedAt: new Date(),
      musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=traditional-acoustic-112191.mp3',
    },
  });

  await prisma.invitationContent.create({
    data: {
      invitationId: sampleInvitation.id,
      groomName: 'Andi Pratama, S.T.',
      groomNickname: 'Andi',
      groomFather: 'Bpk. H. Bambang Sudiro',
      groomMother: 'Ibu Hj. Sri Rahayu',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      groomInstagram: 'andipratama',
      brideName: 'Siti Nur Aisyah, S.Farm.',
      brideNickname: 'Siti',
      brideFather: 'Bpk. Dr. H. Ahmad Fauzi',
      brideMother: 'Ibu Hj. Siti Maemunah',
      bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      brideInstagram: 'sitianuraisyiah',
      quote: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      quoteSource: 'QS. Ar-Rum Ayat 21',
      openingGreeting: 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan dalam ikatan pernikahan suci.',
      closingGreeting: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kedua mempelai.',
      loveStoryJson: JSON.stringify([
        { year: '2021', title: 'Pertemuan Pertama', story: 'Berawal dari rekan satu organisasi kampus di Yogyakarta, takdir mempertemukan obrolan sederhana yang penuh makna.' },
        { year: '2024', title: 'Ikatan Lamaran', story: 'Dengan restu kedua orang tua dan niat suci beribadah, kami memantapkan langkah menuju jenjang yang lebih serius.' },
        { year: '2026', title: 'Menuju Janji Suci', story: 'Kini saatnya menyatukan dua hati dan dua keluarga besar dalam ikatan suci pernikahan yang diridhoi-Nya.' }
      ]),
    },
  });

  await prisma.invitationEvent.create({
    data: {
      invitationId: sampleInvitation.id,
      title: 'Akad Nikah',
      eventType: 'CEREMONY',
      date: '2026-11-20',
      startTime: '08:00',
      endTime: '10:00',
      timezone: 'WIB',
      venueName: 'Masjid Agung Jawa Tengah',
      venueAddress: 'Jl. Gajah Raya, Sambirejo, Kec. Gayamsari, Kota Semarang',
      mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Jawa+Tengah',
      isPrimary: true,
    },
  });

  await prisma.invitationEvent.create({
    data: {
      invitationId: sampleInvitation.id,
      title: 'Resepsi Pernikahan',
      eventType: 'RECEPTION',
      date: '2026-11-20',
      startTime: '11:00',
      endTime: '14:00',
      timezone: 'WIB',
      venueName: 'Grand Ballroom Hotel Ciputra Semarang',
      venueAddress: 'Kawasan Simpang Lima, Jl. Simpang Lima No.1, Pekunden, Kota Semarang',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Ciputra+Semarang',
      isPrimary: false,
    },
  });

  const galleryPhotos = [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', caption: 'Momen Prewedding Kasunanan' },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', caption: 'Keanggunan Paes Ageng' },
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', caption: 'Kebersamaan Menatap Masa Depan' },
    { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', caption: 'Janji Suci Dua Insan' },
  ];

  for (let i = 0; i < galleryPhotos.length; i++) {
    await prisma.invitationGallery.create({
      data: {
        invitationId: sampleInvitation.id,
        imageUrl: galleryPhotos[i].url,
        caption: galleryPhotos[i].caption,
        sortOrder: i,
      },
    });
  }

  await prisma.digitalGift.create({
    data: {
      invitationId: sampleInvitation.id,
      bankName: 'BCA',
      accountNumber: '8830129384',
      accountHolder: 'Andi Pratama',
      qrisImageUrl: null,
    },
  });

  await prisma.digitalGift.create({
    data: {
      invitationId: sampleInvitation.id,
      bankName: 'Mandiri',
      accountNumber: '1370019283746',
      accountHolder: 'Siti Nur Aisyah',
      qrisImageUrl: null,
    },
  });

  const sampleGuests = [
    { name: 'Bapak Prof. H. Bagus Triyanto', slug: 'bagus-triyanto', status: 'CONFIRMED' },
    { name: 'Ibu Dr. Ratna Kusuma Wardhani', slug: 'ratna-kusuma', status: 'CONFIRMED' },
    { name: 'Keluarga Besar Alm. H. Darsono', slug: 'keluarga-darsono', status: 'INVITED' },
    { name: 'Dimas Wicaksono & Partner', slug: 'dimas-wicaksono', status: 'CONFIRMED' },
  ];

  for (const g of sampleGuests) {
    await prisma.guest.create({
      data: {
        invitationId: sampleInvitation.id,
        name: g.name,
        slug: g.slug,
      },
    });
  }

  const sampleRsvps = [
    {
      guestName: 'Bapak Prof. H. Bagus Triyanto',
      attendance: 'ATTENDING',
      pax: 2,
      message: 'Selamat menempuh hidup baru untuk ananda Andi dan ananda Siti. Semoga sakinah mawaddah warahmah, dilimpahkan keturunan yang sholeh dan sholehah.',
    },
    {
      guestName: 'Ibu Dr. Ratna Kusuma Wardhani',
      attendance: 'ATTENDING',
      pax: 2,
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama a bainakuma fii khair. Turut berbahagia untuk kedua keluarga besar!',
    },
    {
      guestName: 'Dimas Wicaksono & Partner',
      attendance: 'ATTENDING',
      pax: 1,
      message: 'Happy wedding bro Andi & Siti! Akhirnya sah juga setelah perjalanan panjang. Lancar acaranya sampai hari H ya!',
    },
  ];

  for (const r of sampleRsvps) {
    await prisma.rSVP.create({
      data: {
        invitationId: sampleInvitation.id,
        guestName: r.guestName,
        attendance: r.attendance,
        pax: r.pax,
        message: r.message,
      },
    });
  }

  console.log('Seeded sample live invitation: /invitation/andi-siti');
  console.log('Janji Digital Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
