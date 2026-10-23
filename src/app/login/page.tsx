'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, ArrowRight, Lock, Mail, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.user?.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message || 'Login gagal, periksa email dan kata sandi.');
      }
    } catch {
      setError('Terjadi kesalahan koneksi server.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (type: 'admin' | 'customer') => {
    if (type === 'admin') {
      setEmail('admin@janji-digital.com');
      setPassword('admin123');
    } else {
      setEmail('budi@example.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-md mx-auto px-4 pt-36 pb-24 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#24382E] text-[#E8D8B8] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h1 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">
              Masuk ke Akun Anda
            </h1>
            <p className="text-xs text-stone-500">Kelola pesanan dan sesuaikan undangan digital Anda</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-xs font-semibold text-stone-700 mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#B59A62] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#24382E] text-white font-semibold text-xs hover:bg-[#192821] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk Sekarang'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="pt-4 border-t border-stone-100 text-center space-y-2">
            <span className="text-[11px] text-stone-400 block font-medium">Uji Coba Cepat (Akun Demo):</span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-stone-200 text-xs text-[#24382E] hover:bg-[#E8D8B8]/30 font-medium"
              >
                Akun Customer
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-stone-200 text-xs text-[#24382E] hover:bg-[#E8D8B8]/30 font-medium"
              >
                Akun Administrator
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-stone-500">Belum punya akun? </span>
            <Link href="/register" className="text-xs font-semibold text-[#B59A62] hover:underline">
              Daftar di sini
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}