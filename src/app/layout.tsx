import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Janji Digital — Premium Digital Wedding Invitation Marketplace',
  description: 'Platform undangan pernikahan digital mewah Indonesia. Temukan ratusan tema adat Nusantara (Jawa, Sunda, Minang, Batak, Bali) dan modern eksklusif dengan musik, RSVP, dan amplop digital.',
  keywords: [
    'undangan digital',
    'undangan pernikahan online',
    'wedding invitation indonesia',
    'undangan adat jawa',
    'undangan adat sunda',
    'undangan minang',
    'undangan batak',
    'undangan bali',
    'janji digital'
  ],
  openGraph: {
    title: 'Janji Digital — Your Love Story, Beautifully Invited',
    description: 'Ratusan desain undangan digital pernikahan adat & modern nusantara dengan live preview, RSVP, dan amplop digital.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAF7F0] text-[#292929] antialiased selection:bg-[#B59A62] selection:text-white">
        {children}
      </body>
    </html>
  );
}
