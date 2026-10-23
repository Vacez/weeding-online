import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { invitationId, name, phone, email } = await req.json();

    if (!invitationId || !name) {
      return NextResponse.json({ message: 'Nama tamu dan ID undangan wajib diisi' }, { status: 400 });
    }

    const slug = slugify(name);

    const guest = await prisma.guest.upsert({
      where: {
        invitationId_slug: { invitationId, slug },
      },
      update: { name, phone, email },
      create: {
        invitationId,
        name,
        slug,
        phone,
        email,
      },
    });

    return NextResponse.json(guest);
  } catch (error) {
    console.error('Guest error:', error);
    return NextResponse.json({ message: 'Gagal menyimpan data tamu' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const invitationId = searchParams.get('invitationId');

  if (!invitationId) {
    return NextResponse.json({ message: 'invitationId is required' }, { status: 400 });
  }

  const guests = await prisma.guest.findMany({
    where: { invitationId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(guests);
}
