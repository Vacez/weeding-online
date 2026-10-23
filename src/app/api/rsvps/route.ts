import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { invitationId, guestName, attendance, pax, message } = await req.json();

    if (!invitationId || !guestName || !message) {
      return NextResponse.json({ message: 'Semua kolom wajib diisi' }, { status: 400 });
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        invitationId,
        guestName,
        attendance: attendance || 'ATTENDING',
        pax: parseInt(pax) || 1,
        message,
      },
    });

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json({ message: 'Gagal mengirim RSVP' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const invitationId = searchParams.get('invitationId');

  if (!invitationId) {
    return NextResponse.json({ message: 'invitationId is required' }, { status: 400 });
  }

  const rsvps = await prisma.rSVP.findMany({
    where: { invitationId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(rsvps);
}
