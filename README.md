# Janji Digital — Premium Digital Wedding Invitation Marketplace 💍✨

> Platform marketplace undangan pernikahan digital premium khusus pasar Indonesia dengan sentuhan adat Nusantara autentik (Jawa, Sunda, Minangkabau, Batak, Bali, Bugis, Betawi, dll) dan estetika modern editorial.

---

## 🌟 Fitur Utama (Core Features)

### 1. Desain & Keaslian Budaya Nusantara (Cultural Authenticity)
- **24+ Desain Tematik Autentik**:
  - **Adat Jawa** (6 Desain): Jawa Keraton Adiningrat, Joglo Ukir Kencana, Paes Ageng Basahan, Gebyok Ukir Jepara, Jawa Modern Kahuripan, Batik Parang Kencana.
  - **Adat Sunda** (4 Desain): Sunda Siger Mahkota Kencana, Parahyangan Klasik Suci, Batik Rereng Sunda Kahuripan, Sunda Modern Botanical.
  - **Adat Minangkabau** (3 Desain): Minangkabau Rumah Gadang Marawa, Songket Balapak Sutan Nan Rajo, Ranah Minang Kemilau Kontemporer.
  - **Adat Batak** (3 Desain): Batak Ulos Ragi Hotang Nauli, Gorga Batak Toba Mandailing, Toba Samosir Royal Elegance.
  - **Adat Bali** (3 Desain): Puri Agung Dewata Emas, Paduraksa Kencana Tirta, Balinese Tropical Romance.
  - **Modern, Floral, Islamic & Luxury** (5 Desain): The Royal Ivory & Champagne, Emerald Botanical Garden, Akad Suci Madinah Nur, Monochrome Vogue Editorial, Midnight Velvet & Starlight.
- **Palet Warna Editorial Mewah**:
  - Warm Ivory: `#FAF7F0`
  - Champagne Gold: `#E8D8B8`
  - Deep Forest Green: `#24382E`
  - Muted Gold: `#B59A62`
  - Soft Charcoal: `#292929`
- **Tipografi Berkelas**: Serif (Cormorant Garamond, Playfair Display), Sans-serif (Plus Jakarta Sans), dan Script (Alex Brush).

### 2. Mesin Undangan Interaktif (Invitation Rendering Engine)
- **Animasi Buka Cover & Wax Seal (Segel Lilin Emas)** dengan semburan konfeti perayaan.
- **Personalisasi Tamu Otomatis**: Menampilkan nama tamu khusus di cover (`/invitation/[slug]?to=Nama+Tamu`).
- **Pemutar Musik Latar Romantis (Floating Audio Player)** yang otomatis menyala saat amplop dibuka.
- **Profil Lengkap Kedua Mempelai** (Groom & Bride, nama orang tua, akun Instagram).
- **Hitung Mundur Waktu Acara (Countdown Timer)**.
- **Jadwal Acara Multi-Event** (Akad Nikah / Pemberkatan & Resepsi) dengan tautan langsung ke **Google Maps** dan **Simpan ke Kalender**.
- **Kisah Perjalanan Cinta (Our Love Story Timeline)**.
- **Galeri Foto Prewedding HD** dengan pratinjau Lightbox.
- **Formulir Konfirmasi Kehadiran Tamu (Live RSVP)** terhubung langsung ke database.
- **Buku Tamu Doa Restu Real-Time (Wishes Wall)**.
- **Tanda Kasih Digital (Amplop Angpao)** dengan tombol 1-klik "Salin Nomor Rekening" (BCA, Mandiri, QRIS).

### 3. Wizard Kustomisasi 8 Langkah (Multi-Step Customization Wizard)
- Langkah 1: Pilih Tema & Tradisi.
- Langkah 2: Informasi Kedua Mempelai & Orang Tua.
- Langkah 3: Rincian Akad & Resepsi (Waktu, Tempat, Maps).
- Langkah 4: Kutipan Doa, Ayat Suci, & Kata Sambutan.
- Langkah 5: Unggah Foto Prewedding & Pemilihan Lagu.
- Langkah 6: Fitur Tambahan, Rekening Angpao, & Kustom Slug URL.
- Langkah 7: Live Interactive Preview (Tampilan HP & Desktop).
- Langkah 8: Pilih Paket (Basic, Premium, Exclusive) & Lanjut ke Checkout.

### 4. Integrasi Pembayaran Midtrans (Sandbox & Simulator)
- Pembuatan transaksi token Midtrans Snap di sisi server (`/api/payments/create-snap`).
- Endpoint Webhook resmi (`/api/payments/webhook`) dengan validasi tanda tangan SHA-512.
- **Midtrans Sandbox One-Click Simulator**: Memungkinkan penguji menguji verifikasi pembayaran instan tanpa perlu transfer bank nyata.
- Aktivasi otomatis: Begitu order berstatus `PAID`, undangan langsung berstatus `PUBLISHED` dengan URL publik siap sebar dan QR code!

### 5. Dashboard Pelanggan & Admin
- **Dashboard Pelanggan (`/dashboard`)**:
  - Pantau total views, status undangan aktif, dan jumlah RSVP masuk.
  - Generator Link Tamu Khusus WhatsApp Blast (`/dashboard/guests`) dengan pesan sopan otomatis.
  - Riwayat pesanan dan invoice (`/dashboard/orders`).
- **Dashboard Administrator (`/admin`)**:
  - Rekap total omzet penjualan, jumlah pesanan lunas vs menunggu, dan jumlah undangan aktif.
  - Daftar tema paling laris.
  - Manajemen katalog tema (`/admin/themes`) dan pesanan (`/admin/orders`).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) dengan TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, CSS Keyframe Animations
- **Database & ORM**: SQLite (`dev.db`) out-of-the-box untuk demo instan lokal, 100% kompatibel dengan PostgreSQL untuk production
- **Prisma ORM**: 6.4.1 (Schema, Client, Seed Scripts)
- **Payment Gateway**: Midtrans Snap Sandbox Integration + Server Webhook Validation

---

## 🚀 Panduan Menjalankan Proyek (Quick Start)

### 1. Buka Direktori Proyek
```bash
cd D:\wedding-marketplace
```

### 2. Jalankan Mode Pengembangan (Development Server)
```bash
npm run dev
```
Akses aplikasi melalui browser di: `http://localhost:3000`

### 3. Akun Uji Coba (Demo Accounts)

Tersedia akun bawaan yang telah di-seed ke database:

| Tipe Akun | Email | Kata Sandi | Halaman Akses |
|---|---|---|---|
| **Administrator** | `admin@janji-digital.com` | `admin123` | `/admin` |
| **Customer** | `budi@example.com` | `password123` | `/dashboard` |

### 4. Halaman Demo Langsung (Ready-to-Test Routes)
- Halaman Utama: `http://localhost:3000/`
- Katalog Tema: `http://localhost:3000/themes`
- Detail Tema: `http://localhost:3000/themes/jawa-keraton-adiningrat`
- Koleksi Adat: `http://localhost:3000/traditional`
- Undangan Publik Live: `http://localhost:3000/invitation/andi-siti`
- Undangan Tamu Personal: `http://localhost:3000/invitation/andi-siti?to=Bapak+Prof.+Bagus+Triyanto`
- Wizard Pembuatan Undangan: `http://localhost:3000/wizard`
- Dashboard Pelanggan: `http://localhost:3000/dashboard`
- Dashboard Admin: `http://localhost:3000/admin`

---

## 📦 Struktur Folder (Folder Structure)

```
D:\wedding-marketplace/
├── prisma/
│   ├── schema.prisma          # Model relasional (User, Theme, Order, Invitation, RSVP, dll)
│   └── dev.db                 # Database SQLite aktif dengan 24 tema & sample data
├── src/
│   ├── app/
│   │   ├── admin/             # Panel Administrator (Overview, Themes, Orders)
│   │   ├── api/               # Server API (Auth, Orders, Midtrans Webhook, RSVPs, Guests)
│   │   ├── checkout/          # Checkout page & Sandbox Payment Simulator
│   │   ├── dashboard/         # Customer Dashboard & WhatsApp Guest Generator
│   │   ├── how-it-works/      # Panduan cara pesan
│   │   ├── invitation/[slug]/ # Halaman publik undangan digital interaktif
│   │   ├── login/ & register/ # Autentikasi pelanggan & admin
│   │   ├── pricing/           # Perbandingan paket & harga
│   │   ├── themes/            # Marketplace tema lengkap dengan filter & pencarian
│   │   ├── traditional/       # Halaman khusus adat Nusantara
│   │   ├── wizard/            # 8-Step Customization Wizard
│   │   ├── globals.css        # Palet warna editorial, font, & styling wax seal
│   │   ├── layout.tsx         # Root layout dengan SEO metadata & OpenGraph
│   │   └── page.tsx           # Editorial luxury landing page
│   ├── components/
│   │   ├── invitation/        # AudioPlayer, InvitationRenderer
│   │   ├── wizard/            # CustomizationWizard
│   │   ├── Footer.tsx         # Editorial luxury footer
│   │   ├── Navbar.tsx         # Navigation bar responsif & multi-language
│   │   ├── ThemeCard.tsx      # Komponen kartu tema dengan badges & preview
│   │   └── ThemeMarketplace.tsx # Filter tradisi, kategori, sortir, & search
│   └── lib/
│       ├── auth.ts            # Hashing password & session management
│       ├── midtrans.ts        # Client Midtrans Snap & verifikasi signature
│       ├── prisma.ts          # Singleton Prisma Client
│       ├── types.ts           # TypeScript interfaces lengkap
│       └── utils.ts           # Format Rupiah, format tanggal Indonesia, slugify
├── .env                       # Environment variables aktif
├── .env.example               # Contoh konfigurasi environment
├── package.json
└── README.md
```

---

## 🔒 Konfigurasi Produksi PostgreSQL & Midtrans

Untuk beralih ke PostgreSQL produksi:
1. Perbarui `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Isi `DATABASE_URL` di file `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/wedding_marketplace?schema=public"
   ```
3. Jalankan migrasi:
   ```bash
   npx prisma db push
   node scripts/seed-database.js
   ```

Selamat menggunakan **Janji Digital**! 💍✨