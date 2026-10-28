const { PrismaClient } = require('@prisma/client');

process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';
const prisma = new PrismaClient();

async function updatePackages() {
  console.log('Updating packages to 50k, 100k, 150k and aligning features with templates...');

  const packagesData = [
    {
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
    const existing = await prisma.package.findUnique({ where: { code: p.code } });
    if (existing) {
      await prisma.package.update({
        where: { code: p.code },
        data: {
          name: p.name,
          slug: p.slug,
          price: p.price,
          originalPrice: p.originalPrice,
          description: p.description,
          isPopular: p.isPopular,
          features: p.features,
          active: true,
        },
      });
      console.log(`Updated package: ${p.name} -> Rp ${p.price}`);
    } else {
      await prisma.package.create({
        data: {
          id: `pkg-${p.code.toLowerCase()}`,
          ...p,
          active: true,
        },
      });
      console.log(`Created package: ${p.name} -> Rp ${p.price}`);
    }
  }

  // Also adjust themes to align with starting pricing (50k for basic, 100k for popular/bestseller, 150k for exclusive)
  const themes = await prisma.theme.findMany();
  for (const t of themes) {
    let price = 100000;
    let originalPrice = 199000;
    if (t.badge === 'EXCLUSIVE') {
      price = 150000;
      originalPrice = 299000;
    } else if (t.badge === 'NEW' || t.format === 'standard') {
      price = 50000;
      originalPrice = 99000;
    }
    await prisma.theme.update({
      where: { id: t.id },
      data: { price, originalPrice },
    });
  }
  console.log(`Updated ${themes.length} themes with aligned pricing tiers!`);

  console.log('All packages updated successfully!');
}

updatePackages()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
