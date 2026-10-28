'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, ArrowRight, Lock, Mail, User, Phone, ShieldAlert, UserCheck } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message || 'Pendaftaran gagal, periksa kelengkapan data.');
      }
    } catch {
      setError('Terjadi kesalahan koneksi server.');
    } finally {
      setLoading(false);
    }
  };

  const loginHref = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/login';

  return (
    <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 mx-auto rounded-full bg-[#24382E] text-[#E8D8B8] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#C5A059]" />
        </div>
        <h1 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">
          Daftar Akun Baru
        </h1>
        <p className="text-xs text-stone-500">Mulai perjalanan mengabadikan janji suci pernikahan Anda</p>
      </div>

      {callbackUrl && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
          <UserCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-900">Daftar untuk Menyimpan Desain Anda</p>
            <p className="text-[11px] text-amber-800 leading-relaxed font-light">
              Setelah mendaftar, Anda akan langsung dialihkan kembali ke kustomisasi tema pilihan Anda. Sudah punya akun?{' '}
              <Link href={loginHref} className="font-semibold underline text-[#24382E]">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap</label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Andi Pratama"
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#B59A62] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#B59A62] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor WhatsApp</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08123456789"
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#B59A62] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Kata Sandi</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#B59A62] outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#24382E] text-white font-semibold text-xs hover:bg-[#192821] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
        </button>
      </form>

      <div className="text-center pt-2">
        <span className="text-xs text-stone-500">Sudah punya akun? </span>
        <Link href={loginHref} className="text-xs font-semibold text-[#B59A62] hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-md mx-auto px-4 pt-36 pb-24 space-y-6">
        <Suspense fallback={<div className="p-8 text-center text-xs text-stone-500">Memuat formulir...</div>}>
          <RegisterForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}