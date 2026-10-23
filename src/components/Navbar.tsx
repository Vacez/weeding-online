'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, User, Crown, LogOut, Heart, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch user status
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { label: lang === 'ID' ? 'Koleksi Tema' : 'Themes', href: '/themes' },
    { label: lang === 'ID' ? 'Adat Nusantara' : 'Traditional', href: '/traditional' },
    { label: lang === 'ID' ? 'Paket & Harga' : 'Pricing', href: '/pricing' },
    { label: lang === 'ID' ? 'Cara Pesan' : 'How It Works', href: '/how-it-works' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-b border-[#B59A62]/20 py-3'
          : 'bg-[#FAF7F0] border-b border-[#B59A62]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#24382E] flex items-center justify-center text-[#E8D8B8] shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-cormorant text-2xl font-bold tracking-wider text-[#24382E] leading-none">
                JANJI DIGITAL
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#B59A62] font-medium">
                Wedding Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#24382E] font-semibold'
                      : 'text-[#292929]/80 hover:text-[#24382E]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B59A62] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
              className="text-xs font-semibold px-2.5 py-1 rounded border border-[#B59A62]/40 text-[#24382E] hover:bg-[#E8D8B8]/30 transition-colors"
              title="Ganti Bahasa / Switch Language"
            >
              {lang === 'ID' ? '🇮🇩 ID' : '🇬🇧 EN'}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs font-semibold bg-[#24382E] text-[#E8D8B8] px-3 py-1.5 rounded-full hover:bg-[#192821] transition-colors"
                  >
                    <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#24382E] bg-[#E8D8B8]/30 hover:bg-[#E8D8B8]/60 px-3.5 py-1.5 rounded-full transition-colors border border-[#B59A62]/30"
                >
                  <User className="w-3.5 h-3.5 text-[#B59A62]" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-[#292929]/60 hover:text-red-700 transition-colors"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-[#24382E] hover:text-[#B59A62] px-2 py-1.5 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/themes"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#24382E] text-[#FAF7F0] px-4 py-2 rounded-full hover:bg-[#192821] transition-all shadow-sm hover:shadow"
                >
                  <span>Mulai Desain</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
              className="text-xs font-semibold px-2 py-0.5 rounded border border-[#B59A62]/40 text-[#24382E]"
            >
              {lang}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#24382E] hover:bg-[#E8D8B8]/20 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#24382E]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#B59A62]/20 pb-4 space-y-2 bg-[#FAF7F0] rounded-b-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-[#E8D8B8]/40 text-[#24382E] font-semibold'
                    : 'text-[#292929]/80 hover:bg-[#E8D8B8]/20 text-[#24382E]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-[#B59A62]/10 space-y-2 px-3">
              {currentUser ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full py-2 bg-[#E8D8B8]/30 rounded-lg text-sm font-semibold text-[#24382E]"
                  >
                    Dashboard Saya
                  </Link>
                  {currentUser.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block text-center w-full py-2 bg-[#24382E] text-[#E8D8B8] rounded-lg text-sm font-semibold"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="block text-center w-full py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium"
                  >
                    Keluar Akun
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2 border border-[#B59A62]/40 rounded-lg text-sm font-semibold text-[#24382E]"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/themes"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2 bg-[#24382E] text-[#FAF7F0] rounded-lg text-sm font-semibold"
                  >
                    Pilih Tema
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
