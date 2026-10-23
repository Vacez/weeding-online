import React from 'react';
import { notFound } from 'next/navigation';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';
import prisma from '@/lib/prisma';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string; theme?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const { to } = await searchParams;
  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: { content: true },
  });

  if (!invitation) return { title: 'Undangan Pernikahan' };

  const couple = invitation.content
    ? `${invitation.content.groomNickname} & ${invitation.content.brideNickname}`
    : invitation.title;

  return {
    title: to ? `Undangan Pernikahan ${couple} untuk ${to}` : `Undangan Pernikahan ${couple}`,
    description: invitation.content?.openingGreeting || 'Dengan penuh rasa syukur kami mengundang Anda hadir pada hari bahagia kami.',
    openGraph: {
      title: `Undangan Pernikahan ${couple}`,
      description: 'Klik untuk membuka undangan pernikahan digital resmi.',
      images: invitation.content?.groomPhoto ? [invitation.content.groomPhoto] : [],
    },
  };
}

export default async function InvitationPublicPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { to, theme: themeQuery } = await searchParams;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      theme: { include: { tradition: true } },
      package: true,
      content: true,
      events: { orderBy: { date: 'asc' } },
      galleries: { orderBy: { sortOrder: 'asc' } },
      gifts: true,
      rsvps: { orderBy: { createdAt: 'desc' } },
      guests: true,
    },
  });

  if (!invitation) notFound();

  // If theme query is passed, override theme for demo preview
  if (themeQuery) {
    const overrideTheme = await prisma.theme.findFirst({
      where: {
        OR: [
          { slug: themeQuery },
          { tradition: { slug: themeQuery } },
        ],
      },
      include: { tradition: true },
    });
    if (overrideTheme) {
      invitation.theme = overrideTheme;
      if (overrideTheme.musicUrl) {
        invitation.musicUrl = overrideTheme.musicUrl;
      }
    }
  }

  const allThemes = await prisma.theme.findMany({
    where: { active: true },
    include: { tradition: true },
    take: 12,
  });

  // Increment view count asynchronously
  prisma.invitation.update({
    where: { id: invitation.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  const guestName = to ? decodeURIComponent(to.replace(/\+/g, ' ')) : 'Tamu Undangan Terhormat';

  return (
    <InvitationRenderer
      invitation={invitation as any}
      guestName={guestName}
      allThemes={allThemes as any}
    />
  );
}