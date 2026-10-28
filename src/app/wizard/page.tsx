import React from 'react';
import Navbar from '@/components/Navbar';
import CustomizationWizard from '@/components/wizard/CustomizationWizard';
import prisma from '@/lib/prisma';

import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Kustomisasi Undangan Digital | Janji Digital',
  description: 'Wizard pembuatan undangan pernikahan digital langkah demi langkah.',
};

interface Props {
  searchParams: Promise<{ theme?: string; package?: string }>;
}

export default async function WizardPage({ searchParams }: Props) {
  const { theme, package: pkgSlug } = await searchParams;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    const params = new URLSearchParams();
    if (theme) params.set('theme', theme);
    if (pkgSlug) params.set('package', pkgSlug);
    const qs = params.toString();
    const callbackUrl = `/wizard${qs ? `?${qs}` : ''}`;
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const themes = await prisma.theme.findMany({
    where: { active: true },
    include: { category: true, tradition: true },
    orderBy: { salesCount: 'desc' },
  });

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { price: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />
      <div className="pt-24 pb-16">
        <CustomizationWizard
          themes={themes as any}
          packages={packages as any}
          initialThemeSlug={theme}
          initialPackageSlug={pkgSlug}
        />
      </div>
    </div>
  );
}