import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      themeId,
      packageId,
      slug,
      title,
      content,
      events,
      galleries,
      gifts,
    } = body;

    let user = await getCurrentUser();
    if (!user) {
      // Find or assign demo customer for seamless checkout
      user = await prisma.user.findFirst({
        where: { role: 'CUSTOMER' },
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: content?.groomName ? `${content.groomNickname} & ${content.brideNickname}` : 'Customer Demo',
            email: `customer-${Date.now()}@example.com`,
            password: 'demo_password',
            role: 'CUSTOMER',
          },
        });
      }
    }

    const selectedPackage = await prisma.package.findUnique({
      where: { id: packageId },
    });
    const selectedTheme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!selectedPackage || !selectedTheme) {
      return NextResponse.json({ message: 'Tema atau paket tidak ditemukan' }, { status: 404 });
    }

    const orderNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalSlug = (slug || `undangan-${Date.now()}`).toLowerCase().replace(/[^a-z0-9\-]/g, '');

    // Check slug uniqueness
    const existingSlug = await prisma.invitation.findUnique({
      where: { slug: finalSlug },
    });
    const resolvedSlug = existingSlug ? `${finalSlug}-${Math.floor(100 + Math.random() * 900)}` : finalSlug;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        packageId: selectedPackage.id,
        themeId: selectedTheme.id,
        grossAmount: selectedPackage.price,
        discountAmount: 0,
        netAmount: selectedPackage.price,
        status: 'PENDING',
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || '081234567890',
      },
    });

    // Create Draft Invitation
    const invitation = await prisma.invitation.create({
      data: {
        slug: resolvedSlug,
        title: title || `Pernikahan ${content?.groomNickname} & ${content?.brideNickname}`,
        userId: user.id,
        orderId: order.id,
        themeId: selectedTheme.id,
        packageId: selectedPackage.id,
        status: 'DRAFT',
      },
    });

    // Create Content
    if (content) {
      await prisma.invitationContent.create({
        data: {
          invitationId: invitation.id,
          groomName: content.groomName || 'Mempelai Pria',
          groomNickname: content.groomNickname || 'Pria',
          groomFather: content.groomFather || '-',
          groomMother: content.groomMother || '-',
          groomPhoto: content.groomPhoto || null,
          groomInstagram: content.groomInstagram || null,
          brideName: content.brideName || 'Mempelai Wanita',
          brideNickname: content.brideNickname || 'Wanita',
          brideFather: content.brideFather || '-',
          brideMother: content.brideMother || '-',
          bridePhoto: content.bridePhoto || null,
          brideInstagram: content.brideInstagram || null,
          quote: content.quote || null,
          quoteSource: content.quoteSource || null,
          openingGreeting: content.openingGreeting || null,
          closingGreeting: content.closingGreeting || null,
        },
      });
    }

    // Create Events
    if (events && Array.isArray(events)) {
      for (const ev of events) {
        await prisma.invitationEvent.create({
          data: {
            invitationId: invitation.id,
            title: ev.title || 'Acara',
            eventType: ev.eventType || 'CEREMONY',
            date: ev.date || '2026-11-20',
            startTime: ev.startTime || '08:00',
            endTime: ev.endTime || '11:00',
            timezone: ev.timezone || 'WIB',
            venueName: ev.venueName || 'Lokasi Acara',
            venueAddress: ev.venueAddress || 'Alamat Lokasi',
            mapsUrl: ev.mapsUrl || null,
            isPrimary: !!ev.isPrimary,
          },
        });
      }
    }

    // Create Galleries
    if (galleries && Array.isArray(galleries)) {
      for (let i = 0; i < galleries.length; i++) {
        await prisma.invitationGallery.create({
          data: {
            invitationId: invitation.id,
            imageUrl: galleries[i].imageUrl,
            caption: galleries[i].caption || null,
            sortOrder: i,
          },
        });
      }
    }

    // Create Gifts
    if (gifts && Array.isArray(gifts)) {
      for (const g of gifts) {
        await prisma.digitalGift.create({
          data: {
            invitationId: invitation.id,
            bankName: g.bankName || 'BCA',
            accountNumber: g.accountNumber || '-',
            accountHolder: g.accountHolder || '-',
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      invitationSlug: invitation.slug,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ message: 'Gagal membuat pesanan' }, { status: 500 });
  }
}
