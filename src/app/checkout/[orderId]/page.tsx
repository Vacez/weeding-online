'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatRupiah } from '@/lib/utils';
import { 
  ShieldCheck, Check, Sparkles, QrCode, CreditCard, 
  Building2, ExternalLink, Copy, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState('');

  useEffect(() => {
    if (orderId) {
      // Fetch or use demo mock order
      fetch('/api/orders/' + orderId)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.order) {
            setOrder(data.order);
            if (data.order.status === 'PAID') {
              setPaidSuccess(true);
              if (data.order.invitations?.[0]) {
                setPublishedSlug(data.order.invitations[0].slug);
              }
            }
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const res = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, amount: order?.grossAmount || 100000 }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setDiscountAmount(data.discountAmount);
        setCouponMsg({ type: 'success', text: data.message });
      } else {
        setCouponMsg({ type: 'error', text: data.message || 'Kupon tidak valid' });
      }
    } catch {
      setCouponMsg({ type: 'error', text: 'Gagal memeriksa kupon' });
    }
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/payments/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          paymentMethod: selectedMethod.toUpperCase(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPaidSuccess(true);
        setPublishedSlug(data.invitationSlug || 'andi-siti');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A059', '#24382E', '#E8D8B8'],
        });
      } else {
        alert(data.message || 'Gagal memproses pembayaran sandbox');
      }
    } catch {
      alert('Terjadi kesalahan koneksi server');
    } finally {
      setIsProcessing(false);
    }
  };

  const gross = order?.grossAmount || 100000;
  const net = Math.max(0, gross - discountAmount);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        {paidSuccess ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#B59A62]/30 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#B59A62] font-semibold">Pembayaran Terverifikasi</span>
              <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#24382E]">
                Selamat! Undangan Anda Telah Aktif
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Pesanan Anda telah berhasil diverifikasi oleh Midtrans Sandbox. Undangan digital Anda siap dibagikan ke seluruh tamu!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#B59A62]/30 max-w-md mx-auto space-y-2 text-left">
              <span className="text-[11px] font-semibold text-stone-500 block">Link Undangan Publik Anda:</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-mono font-bold text-[#24382E] truncate">
                  /invitation/{publishedSlug || 'andi-siti'}
                </span>
                <button
                  onClick={() => {
                    const url = window.location.origin + '/invitation/' + (publishedSlug || 'andi-siti');
                    navigator.clipboard.writeText(url);
                    alert('Link berhasil disalin ke clipboard!');
                  }}
                  className="p-2 rounded-lg bg-white border border-stone-200 text-[#24382E] hover:bg-stone-50"
                  title="Salin Link"
                >
                  <Copy className="w-4 h-4 text-[#B59A62]" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={'/invitation/' + (publishedSlug || 'andi-siti')}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>Buka Undangan Saya</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3 rounded-full border border-stone-300 text-[#24382E] text-xs font-semibold hover:bg-white transition-colors"
              >
                Ke Dashboard Tamu
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-1">
                <h1 className="font-serif-cormorant text-3xl font-bold text-[#24382E]">
                  Penyelesaian Pembayaran
                </h1>
                <p className="text-xs text-stone-500">
                  Transaksi diproses secara aman menggunakan protokol Midtrans Payment Sandbox.
                </p>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setSelectedMethod('qris')}
                  className={'p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ' + (
                    selectedMethod === 'qris'
                      ? 'border-[#24382E] bg-white shadow-sm ring-1 ring-[#B59A62]'
                      : 'border-stone-200 bg-[#FAF7F0] hover:border-stone-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#B59A62]" />
                    <div>
                      <strong className="block text-sm text-[#24382E]">QRIS (GoPay, OVO, ShopeePay, Dana)</strong>
                      <span className="text-[11px] text-stone-500">Scan instan lewat aplikasi e-wallet apa saja</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Instan</span>
                </label>

                <label
                  onClick={() => setSelectedMethod('bca_va')}
                  className={'p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ' + (
                    selectedMethod === 'bca_va'
                      ? 'border-[#24382E] bg-white shadow-sm ring-1 ring-[#B59A62]'
                      : 'border-stone-200 bg-[#FAF7F0] hover:border-stone-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#B59A62]" />
                    <div>
                      <strong className="block text-sm text-[#24382E]">BCA Virtual Account</strong>
                      <span className="text-[11px] text-stone-500">Transfer otomatis via m-BCA atau KlikBCA</span>
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setSelectedMethod('mandiri_va')}
                  className={'p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ' + (
                    selectedMethod === 'mandiri_va'
                      ? 'border-[#24382E] bg-white shadow-sm ring-1 ring-[#B59A62]'
                      : 'border-stone-200 bg-[#FAF7F0] hover:border-stone-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#B59A62]" />
                    <div>
                      <strong className="block text-sm text-[#24382E]">Mandiri Livin Virtual Account</strong>
                      <span className="text-[11px] text-stone-500">Transfer otomatis via Livin by Mandiri</span>
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setSelectedMethod('credit_card')}
                  className={'p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ' + (
                    selectedMethod === 'credit_card'
                      ? 'border-[#24382E] bg-white shadow-sm ring-1 ring-[#B59A62]'
                      : 'border-stone-200 bg-[#FAF7F0] hover:border-stone-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#B59A62]" />
                    <div>
                      <strong className="block text-sm text-[#24382E]">Kartu Kredit / Debit Online</strong>
                      <span className="text-[11px] text-stone-500">Visa, Mastercard, JCB berlisensi 3D Secure</span>
                    </div>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#B59A62]/30 space-y-2">
                <span className="text-xs font-semibold text-[#24382E] block">Punya Kode Promo / Kupon?</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: WEDDINGBARU"
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 outline-none uppercase font-mono"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#24382E] text-white text-xs font-semibold rounded-lg hover:bg-[#192821] cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>
                {couponMsg && (
                  <p className={'text-[11px] ' + (couponMsg.type === 'success' ? 'text-emerald-700' : 'text-rose-600')}>
                    {couponMsg.text}
                  </p>
                )}
                <p className="text-[11px] text-stone-400">Tips: Gunakan kode <strong>WEDDINGBARU</strong> untuk diskon 15%</p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#B59A62]/30 shadow-sm space-y-4">
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E] border-b border-stone-100 pb-3">
                  Ringkasan Pesanan
                </h3>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>No. Pesanan:</span>
                    <span className="font-mono font-bold text-[#24382E]">{order?.orderNumber || 'INV-2026-DEMO'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nama Paket:</span>
                    <span className="font-semibold text-[#24382E]">{order?.package?.name || 'Paket Premium'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tema Terpilih:</span>
                    <span className="font-semibold text-[#24382E]">{order?.theme?.name || 'Jawa Keraton Adiningrat'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">MENUNGGU PEMBAYARAN</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Harga Paket:</span>
                    <span>{formatRupiah(gross)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Diskon Kupon:</span>
                      <span>-{formatRupiah(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#24382E] pt-2 border-t border-stone-100">
                    <span>Total Pembayaran:</span>
                    <span>{formatRupiah(net)}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-full bg-[#24382E] text-[#FAF7F0] font-semibold text-xs hover:bg-[#192821] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>{isProcessing ? 'Memproses Verifikasi...' : 'Bayar Sekarang (Sandbox Simulator)'}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mode Sandbox Midtrans Aktif (Uji Coba Langsung)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}