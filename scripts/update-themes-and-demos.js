const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating themes with authentic music & creating cultural demo invitations...');

  // 1. Update music URLs on themes based on tradition / slug
  const themes = await prisma.theme.findMany({ include: { tradition: true } });

  for (const t of themes) {
    let music = '/audio/modern-romantic-piano.wav';
    const tradSlug = t.tradition?.slug || '';
    const themeSlug = t.slug;

    if (tradSlug.includes('jawa') || themeSlug.includes('jawa') || themeSlug.includes('joglo') || themeSlug.includes('paes') || themeSlug.includes('gebyok') || themeSlug.includes('batik-parang')) {
      music = '/audio/jawa-gamelan-keraton.wav';
    } else if (tradSlug.includes('sunda') || themeSlug.includes('sunda') || themeSlug.includes('parahyangan') || themeSlug.includes('rereng')) {
      music = '/audio/sunda-kacapi-suling.wav';
    } else if (tradSlug.includes('minang') || themeSlug.includes('minang') || themeSlug.includes('songket') || themeSlug.includes('gadang')) {
      music = '/audio/minang-talempong-saluang.wav';
    } else if (tradSlug.includes('batak') || themeSlug.includes('batak') || themeSlug.includes('ulos') || themeSlug.includes('gorga') || themeSlug.includes('toba')) {
      music = '/audio/batak-gondang-hasapi.wav';
    } else if (tradSlug.includes('bali') || themeSlug.includes('bali') || themeSlug.includes('dewata') || themeSlug.includes('paduraksa')) {
      music = '/audio/bali-rindik-dewata.wav';
    } else if (themeSlug.includes('madinah') || themeSlug.includes('akad') || themeSlug.includes('islami')) {
      music = '/audio/islami-gambus-oud.wav';
    }

    await prisma.theme.update({
      where: { id: t.id },
      data: { musicUrl: music },
    });
  }
  console.log(`Updated musicUrl for ${themes.length} themes!`);

  // 2. Update Andi & Siti (Jawa) invitation musicUrl
  const andiSiti = await prisma.invitation.findUnique({ where: { slug: 'andi-siti' } });
  if (andiSiti) {
    await prisma.invitation.update({
      where: { slug: 'andi-siti' },
      data: { musicUrl: '/audio/jawa-gamelan-keraton.wav' },
    });
  }

  // 3. Ensure we have customer and package for demos
  const customer = await prisma.user.findFirst({ where: { role: 'CUSTOMER' } });
  const pkg = await prisma.package.findFirst({ where: { code: 'EXCLUSIVE' } }) || await prisma.package.findFirst();

  if (!customer || !pkg) {
    console.log('Customer or package missing, skipping demo generation.');
    return;
  }

  // Helper to upsert invitation
  async function upsertDemo({
    slug,
    title,
    themeSlug,
    musicUrl,
    groom,
    bride,
    quote,
    quoteSource,
    openingGreeting,
    closingGreeting,
    events,
    gifts
  }) {
    const theme = await prisma.theme.findUnique({ where: { slug: themeSlug } });
    if (!theme) return;

    let inv = await prisma.invitation.findUnique({ where: { slug } });
    if (inv) {
      // delete existing relations to re-create cleanly
      await prisma.invitationContent.deleteMany({ where: { invitationId: inv.id } });
      await prisma.invitationEvent.deleteMany({ where: { invitationId: inv.id } });
      await prisma.digitalGift.deleteMany({ where: { invitationId: inv.id } });
      await prisma.invitationGallery.deleteMany({ where: { invitationId: inv.id } });
      await prisma.rSVP.deleteMany({ where: { invitationId: inv.id } });
      
      inv = await prisma.invitation.update({
        where: { id: inv.id },
        data: {
          title,
          themeId: theme.id,
          musicUrl,
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
      });
    } else {
      inv = await prisma.invitation.create({
        data: {
          slug,
          title,
          userId: customer.id,
          packageId: pkg.id,
          themeId: theme.id,
          musicUrl,
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
      });
    }

    // Create content
    await prisma.invitationContent.create({
      data: {
        invitationId: inv.id,
        groomName: groom.name,
        groomNickname: groom.nick,
        groomFather: groom.father,
        groomMother: groom.mother,
        groomPhoto: groom.photo,
        groomInstagram: groom.instagram,
        brideName: bride.name,
        brideNickname: bride.nick,
        brideFather: bride.father,
        brideMother: bride.mother,
        bridePhoto: bride.photo,
        brideInstagram: bride.instagram,
        quote,
        quoteSource,
        openingGreeting,
        closingGreeting,
      },
    });

    // Create events
    for (const ev of events) {
      await prisma.invitationEvent.create({
        data: {
          invitationId: inv.id,
          title: ev.title,
          eventType: ev.type,
          date: ev.date,
          startTime: ev.start,
          endTime: ev.end,
          timezone: ev.timezone || 'WIB',
          venueName: ev.venue,
          venueAddress: ev.address,
          mapsUrl: 'https://maps.google.com',
          isPrimary: ev.isPrimary || false,
        },
      });
    }

    // Create digital gifts
    for (const g of gifts) {
      await prisma.digitalGift.create({
        data: {
          invitationId: inv.id,
          bankName: g.bank,
          accountNumber: g.number,
          accountHolder: g.holder,
        },
      });
    }

    // Add some sample RSVPs
    await prisma.rSVP.createMany({
      data: [
        {
          invitationId: inv.id,
          guestName: 'Bapak Prof. Bagus Triyanto',
          attendance: 'ATTENDING',
          pax: 2,
          message: 'Selamat berbahagia untuk kedua mempelai. Semoga menjadi keluarga sakinah, mawaddah, warahmah serta senantiasa dilimpahi keberkahan.',
        },
        {
          invitationId: inv.id,
          guestName: 'Keluarga Besar dr. Hendra & Rina',
          attendance: 'ATTENDING',
          pax: 3,
          message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Selamat menempuh lembaran baru yang penuh cinta!',
        }
      ]
    });

    console.log(`Demo invitation ready: /invitation/${slug}`);
  }

  // Demo 1: Jawa Keraton (Andi & Siti)
  await upsertDemo({
    slug: 'andi-siti',
    title: 'Pernikahan Suci Andi & Siti — Adat Jawa Keraton',
    themeSlug: 'jawa-keraton-adiningrat',
    musicUrl: '/audio/jawa-gamelan-keraton.wav',
    groom: {
      name: 'Raden Mas Andi Pratama, S.T., M.Eng.',
      nick: 'Andi',
      father: 'Bpk. K.R.T. Bambang Sudiro Hadiningrat',
      mother: 'Ibu Hj. Raden Ayu Sri Rahayu',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      instagram: 'andipratama',
    },
    bride: {
      name: 'Raden Ajeng Siti Nur Aisyah, S.Farm., Apt.',
      nick: 'Siti',
      father: 'Bpk. Dr. H. Ahmad Fauzi Hadikusumo',
      mother: 'Ibu Hj. Siti Maemunah Murti',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      instagram: 'sitianuraisyiah',
    },
    quote: 'Ngluruk tanpa bala, menang tanpa ngasorake, sekti tanpa aji-aji, sugih tanpa bandha. Memayu hayuning bawana, tresna sejati ingkang suci.',
    quoteSource: 'Filosofi Luhur Jawa Serat Centhini & QS. Ar-Rum: 21',
    openingGreeting: 'Nuwun sewu, kanti nyenyuwun rumentahing sih wilasa dalem Gusti Ingkang Murbeng Dumadi, lumantar serat ulem punika...',
    closingGreeting: 'Mugi Gusti Allah tansah maringi berkah katentreman, bagya mulya, lan kawilujengan dumateng kita sedaya. Nuwun.',
    events: [
      {
        title: 'Ijab Qobul & Panggih Keraton',
        type: 'CEREMONY',
        date: '2026-12-12',
        start: '08:00',
        end: '10:00',
        venue: 'Bale Keraton Bangsal Pagelaran',
        address: 'Jl. Rotowijayan No. 1, Panembahan, Kraton, Kota Yogyakarta',
        isPrimary: true,
      },
      {
        title: 'Resepsi Pahargyan Ageng',
        type: 'RECEPTION',
        date: '2026-12-12',
        start: '11:00',
        end: '14:00',
        venue: 'Pendopo Agung Royal Ambarrukmo',
        address: 'Jl. Laksda Adisucipto No. 81, Caturtunggal, Sleman, DI Yogyakarta',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BCA', number: '8735123991', holder: 'Andi Pratama' },
      { bank: 'Mandiri', number: '137001928374', holder: 'Siti Nur Aisyah' }
    ]
  });

  // Demo 2: Sunda Siger (Asep & Neng)
  await upsertDemo({
    slug: 'asep-neng',
    title: 'Pernikahan Asep & Neng Ghina — Adat Sunda Parahyangan',
    themeSlug: 'sunda-siger-mahkota-kencana',
    musicUrl: '/audio/sunda-kacapi-suling.wav',
    groom: {
      name: 'Asep Ridwan Nugraha, S.Kom.',
      nick: 'Asep',
      father: 'Bpk. H. Dedi Suryana, M.Si.',
      mother: 'Ibu Hj. Neneng Sartika',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      instagram: 'asepnugraha',
    },
    bride: {
      name: 'Neng Ghina Larasati, S.Pd.',
      nick: 'Ghina',
      father: 'Bpk. Drs. H. Cecep Gunawan',
      mother: 'Ibu Hj. Imas Rohayati',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      instagram: 'ghinalaras',
    },
    quote: 'Silih asih, silih asah, silih asuh. Kanyaah salawasna nyangcang dina rasa, nyaangan jalan kahirupan kulawarga anu barokah.',
    quoteSource: 'Kearifan Luhur Tatar Sunda & QS. An-Nur: 32',
    openingGreeting: 'Sampurasun. Kalayan ngalap berkah ti Gusti Nu Maha Suci, seja nyuhunkeun pidu\'a ti para wargi sadaya...',
    closingGreeting: 'Hatur nuhun kana sagala perhatosan, kaweningan galih sareng kasumpingan wargi sadaya. Mugia ginuluran karahayuan.',
    events: [
      {
        title: 'Akad Nikah & Sawer Panganten',
        type: 'CEREMONY',
        date: '2026-11-28',
        start: '08:30',
        end: '10:30',
        venue: 'Gedong Bodas Parahyangan',
        address: 'Jl. Sersan Bajuri No. 88, Cihideung, Parongpong, Bandung Barat',
        isPrimary: true,
      },
      {
        title: 'Resepsi Uleman Walimatul Ursy',
        type: 'RECEPTION',
        date: '2026-11-28',
        start: '11:00',
        end: '14:30',
        venue: 'Grand Ballroom Sudirman Bandung',
        address: 'Jl. Jend. Sudirman No. 620, Dungus Cariang, Andir, Kota Bandung',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BCA', number: '7720912833', holder: 'Asep Ridwan Nugraha' },
      { bank: 'BSI', number: '7192837461', holder: 'Neng Ghina Larasati' }
    ]
  });

  // Demo 3: Minang Rumah Gadang (Rizki & Puti)
  await upsertDemo({
    slug: 'rizki-siti',
    title: 'Baralek Gadang Rizki & Puti — Adat Minangkabau',
    themeSlug: 'minangkabau-rumah-gadang-marawa',
    musicUrl: '/audio/minang-talempong-saluang.wav',
    groom: {
      name: 'Rizki Ilham Sutan Rajo Mudo, S.E.',
      nick: 'Rizki',
      father: 'Bpk. H. Syamsul Bahri Dt. Marajo',
      mother: 'Ibu Hj. Rosmawarni',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      instagram: 'rizkiilham',
    },
    bride: {
      name: 'Puti Annisa Meutia, S.T.',
      nick: 'Puti',
      father: 'Bpk. Dr. H. Zulkifli Rangkayo Basa',
      mother: 'Ibu Hj. Nurlela Elok',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      instagram: 'putiannisa',
    },
    quote: 'Anak dipangku kamanakan dibimbing, adaik basandi syarak, syarak basandi Kitabullah. Sabiduak sadayuang ka tapian bahagia.',
    quoteSource: 'Pepatah Petitih Adat Minangkabau & QS. Ar-Rum: 21',
    openingGreeting: 'Assalamu\'alaikum Wr. Wb. Bulek aia dek pambuluah, bulek kato dek mupakaik. Siriah sakapua pinang sabungka...',
    closingGreeting: 'Katampek duduak nan jo baselo, kapulang mambaok rido. Tarimo kasih ateh kadatangan sarato do\'a restu dunsanak kasadonyo.',
    events: [
      {
        title: 'Akad Ijab Qobul & Pasang Deta',
        type: 'CEREMONY',
        date: '2026-12-20',
        start: '09:00',
        end: '11:00',
        venue: 'Masjid Raya Sumatera Barat',
        address: 'Jl. Khatib Sulaiman, Alai Parak Kopi, Padang Utara, Kota Padang',
        isPrimary: true,
      },
      {
        title: 'Pesta Adat Baralek Gadang',
        type: 'RECEPTION',
        date: '2026-12-20',
        start: '12:00',
        end: '16:00',
        venue: 'Balairung Rumah Gadang Sutan Nan Tongga',
        address: 'Kawasan Wisata Budaya Minangkabau, Padang',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BCA', number: '3428901234', holder: 'Rizki Ilham Sutan' },
      { bank: 'Bank Nagari', number: '210020192837', holder: 'Puti Annisa Meutia' }
    ]
  });

  // Demo 4: Batak Ulos Toba (Parlin & Tiurma)
  await upsertDemo({
    slug: 'parlin-tiurma',
    title: 'Gokhon Dohot Jou-jou Parlin & Tiurma — Adat Batak Toba',
    themeSlug: 'batak-ulos-ragi-hotang-nauli',
    musicUrl: '/audio/batak-gondang-hasapi.wav',
    groom: {
      name: 'Parlin Hotmartua Simanjuntak, S.T.',
      nick: 'Parlin',
      father: 'Bpk. St. T. Simanjuntak (+)',
      mother: 'Ibu R. br. Hutapea',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      instagram: 'parlinsimanjuntak',
    },
    bride: {
      name: 'Tiurma Morina br. Nainggolan, S.Ak.',
      nick: 'Tiurma',
      father: 'Bpk. Ir. M. Nainggolan',
      mother: 'Ibu E. br. Sitompul',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      instagram: 'tiurmanainggolan',
    },
    quote: 'Tombak gurgur tu dolok ni purbatua. Sai torkis ma hita on saluhutna, tubuan anak dohot boru, jala gabe na saur matua marpanumpak Tuhanta.',
    quoteSource: 'Umpasa Batak Toba & Pengkhotbah 4:12',
    openingGreeting: 'Horas Jala Gabe Ma Di Hita Saluhutna! Marhite gokhon dohot jou-jou on, ro do hami manggokhon hamu angka na pinarsangapan...',
    closingGreeting: 'Mauliate godang di saluhut panuturion, tangiang, dohot haroromuna. Sai dipasupasu Tuhanta ma pardalanan ni keluarganta.',
    events: [
      {
        title: 'Pamasu-masuon (Pemberkatan Gereja)',
        type: 'CEREMONY',
        date: '2026-11-14',
        start: '09:00',
        end: '11:00',
        venue: 'Gereja HKBP Sudirman',
        address: 'Jl. Setiabudi Tengah No. 1, Jakarta Selatan',
        isPrimary: true,
      },
      {
        title: 'Ulaon Unjuk / Pesta Adat Batak',
        type: 'RECEPTION',
        date: '2026-11-14',
        start: '12:00',
        end: '17:00',
        venue: 'Gedung Mulia & Raja Jakarta',
        address: 'Jl. Kebon Nanas No. 17, Cipinang Cempedak, Jatinegara, Jakarta Timur',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BCA', number: '5271829301', holder: 'Parlin Simanjuntak' },
      { bank: 'Mandiri', number: '122009182736', holder: 'Tiurma Nainggolan' }
    ]
  });

  // Demo 5: Bali Puri Agung (Wayan & Ketut)
  await upsertDemo({
    slug: 'wayan-ketut',
    title: 'Pawiwahan Ageng Wayan & Ketut — Adat Bali Dewata',
    themeSlug: 'puri-agung-dewata-emas',
    musicUrl: '/audio/bali-rindik-dewata.wav',
    groom: {
      name: 'I Wayan Gede Dharmawan, S.Sn.',
      nick: 'Wayan',
      father: 'Bpk. I Made Suardana',
      mother: 'Ibu Ni Wayan Sukerti',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
      instagram: 'wayandharma',
    },
    bride: {
      name: 'Ni Ketut Ayu Saraswati, S.E.',
      nick: 'Ayu',
      father: 'Bpk. I Nyoman Wardana',
      mother: 'Ibu Ni Made Candrawati',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      instagram: 'ayusaraswati',
    },
    quote: 'Asih, asah, asuh ring sajroning suadarma pawiwahan. Mogi Ida Sang Hyang Widhi Wasa ngicenin karahayuan miwah karahajengan langgeng selawasnyane.',
    quoteSource: 'Sloka Manawa Dharmasastra IX.101',
    openingGreeting: 'Om Swastyastu. Dumogi samian sane kapiarsayang polih karahayuan. Melarapan antuk paswecan Ida Sang Hyang Widhi Wasa...',
    closingGreeting: 'Suksma kalintang mantuka ring rasa tresna, pituut miwah pemargi semeton sami. Om Shanti, Shanti, Shanti Om.',
    events: [
      {
        title: 'Upacara Pawiwahan & Mebyala-byala',
        type: 'CEREMONY',
        date: '2026-11-20',
        start: '09:00',
        end: '12:00',
        venue: 'Puri Ageng Blahbatuh Gianyar',
        address: 'Jl. Raya Blahbatuh, Gianyar, Bali',
        isPrimary: true,
      },
      {
        title: 'Resepsi Sunset Tropical Bali',
        type: 'RECEPTION',
        date: '2026-11-20',
        start: '16:30',
        end: '20:30',
        venue: 'The Royal Purnama Cliffside Sanur',
        address: 'Jl. Pantai Purnama, Sukawati, Gianyar, Bali',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BCA', number: '7700192831', holder: 'I Wayan Gede Dharmawan' },
      { bank: 'BPD Bali', number: '010020192837', holder: 'Ni Ketut Ayu Saraswati' }
    ]
  });

  // Demo 6: Islami (Farhan & Aisyah)
  await upsertDemo({
    slug: 'farhan-aisyah',
    title: 'Akad Suci Farhan & Aisyah — Nuansa Islami Madinah',
    themeSlug: 'akad-suci-madinah-nur',
    musicUrl: '/audio/islami-gambus-oud.wav',
    groom: {
      name: 'Muhammad Farhan Robbani, Lc., M.A.',
      nick: 'Farhan',
      father: 'Bpk. KH. Abdullah Syakir',
      mother: 'Ibu Hj. Halimah As-Sa\'diyyah',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      instagram: 'farhanrobbani',
    },
    bride: {
      name: 'Aisyah Humaira Zahra, S.Hum.',
      nick: 'Aisyah',
      father: 'Bpk. H. Lukman Hakim, M.Ag.',
      mother: 'Ibu Hj. Siti Maryam',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      instagram: 'aisyahhumaira',
    },
    quote: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    quoteSource: 'QS. Ar-Rum: 21',
    openingGreeting: 'Bismillaahirrohmaanirrohiim. Assalamu\'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT...',
    closingGreeting: 'Jazakumullahu khairan katsiran atas doa restu dan keikhlasan Bapak/Ibu/Saudara/i sekalian. Wassalamu\'alaikum Wr. Wb.',
    events: [
      {
        title: 'Akad Nikah Syar\'i',
        type: 'CEREMONY',
        date: '2026-12-05',
        start: '08:00',
        end: '10:00',
        venue: 'Masjid Agung At-Tin TMII',
        address: 'Jl. Taman Mini I No. 3, Pinang Ranti, Makasar, Jakarta Timur',
        isPrimary: true,
      },
      {
        title: 'Walimatul Ursy',
        type: 'RECEPTION',
        date: '2026-12-05',
        start: '11:00',
        end: '14:00',
        venue: 'Auditorium Sasana Kriya TMII',
        address: 'Kompleks Taman Mini Indonesia Indah, Jakarta Timur',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BSI', number: '7100293847', holder: 'Muhammad Farhan Robbani' },
      { bank: 'BCA Syariah', number: '0981283746', holder: 'Aisyah Humaira' }
    ]
  });

  // Demo 7: Modern Luxury Ivory (Kevin & Clarissa)
  await upsertDemo({
    slug: 'kevin-clarissa',
    title: 'The Wedding of Kevin & Clarissa — Vogue Editorial',
    themeSlug: 'the-royal-ivory-champagne',
    musicUrl: '/audio/modern-romantic-piano.wav',
    groom: {
      name: 'Kevin Alexander, B.Arch.',
      nick: 'Kevin',
      father: 'Mr. David Alexander',
      mother: 'Mrs. Linda Alexander',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      instagram: 'kevinalex',
    },
    bride: {
      name: 'Clarissa Victoria, B.Des.',
      nick: 'Clarissa',
      father: 'Mr. Robertus Tanuwijaya',
      mother: 'Mrs. Evelyn Tanuwijaya',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      instagram: 'clarissavictoria',
    },
    quote: 'Two souls with but a single thought, two hearts that beat as one. A modern love story, celebrated in timeless grace.',
    quoteSource: '1 Corinthians 13:13 & John Keats',
    openingGreeting: 'Together with our families, we joyfully invite you to celebrate the beginning of our forever...',
    closingGreeting: 'Your presence, prayers, and warm wishes mean the world to us as we begin our new journey together.',
    events: [
      {
        title: 'Holy Matrimony',
        type: 'CEREMONY',
        date: '2026-12-19',
        start: '10:00',
        end: '12:00',
        venue: 'The Glass House at Plataran Dharmawangsa',
        address: 'Jl. Dharmawangsa Raya No. 6, Kebayoran Baru, Jakarta Selatan',
        isPrimary: true,
      },
      {
        title: 'Evening Gala & Dinner Reception',
        type: 'RECEPTION',
        date: '2026-12-19',
        start: '18:30',
        end: '22:00',
        venue: 'Grand Ballroom The Langham Jakarta',
        address: 'District 8, SCBD Lot 28, Senayan, Jakarta Selatan',
        isPrimary: false,
      }
    ],
    gifts: [
      { bank: 'BCA', number: '5270918273', holder: 'Kevin Alexander' },
      { bank: 'Bank Mandiri', number: '137009182736', holder: 'Clarissa Victoria' }
    ]
  });

  console.log('Finished updating all themes and demo invitations successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
