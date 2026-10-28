'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, UserPlus, Share2, Copy, Check, MessageSquare, 
  ExternalLink, ChevronLeft, Sparkles, Send, FileSpreadsheet,
  FileText, Upload, Download, Trash2, Search, CheckCircle2,
  AlertCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function GuestManagementPage() {
  const [activeTab, setActiveTab] = useState<'excel' | 'word' | 'manual'>('excel');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [invitationSlug, setInvitationSlug] = useState('andi-siti');
  const [searchQuery, setSearchQuery] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<Array<{ name: string; phone?: string }>>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const [guests, setGuests] = useState<any[]>([
    { id: '1', name: 'Bapak Prof. H. Bagus Triyanto', slug: 'bagus-triyanto', phone: '081234567890' },
    { id: '2', name: 'Ibu Dr. Ratna Kusuma Wardhani', slug: 'ratna-kusuma', phone: '081298765432' },
    { id: '3', name: 'Keluarga Besar Alm. H. Darsono', slug: 'keluarga-darsono', phone: '081355556666' },
    { id: '4', name: 'Sahabat SMA Angkatan 2018', slug: 'sahabat-sma-2018', phone: '' },
    { id: '5', name: 'Rekan Kerja PT Digital Solusi', slug: 'rekan-pt-digital', phone: '' },
  ]);

  // URL generators
  const getGuestUrl = (name: string) => {
    const encoded = encodeURIComponent(name);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/invitation/${invitationSlug}?to=${encoded}`;
  };

  const getWhatsAppLink = (name: string, phone?: string) => {
    const url = getGuestUrl(name);
    const message = encodeURIComponent(
      `Halo Bapak/Ibu/Saudara/i *${name}*.\n\nDengan penuh kebahagiaan dan rasa syukur, kami mengundang Anda untuk hadir di acara pernikahan kami.\n\nInformasi lengkap mengenai jadwal dan lokasi acara dapat dilihat melalui tautan resmi berikut:\n${url}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nSalam hangat,\nKeluarga Besar Mempelai`
    );
    const targetPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    return `https://api.whatsapp.com/send?text=${message}${targetPhone ? `&phone=${targetPhone}` : ''}`;
  };

  // Add Single Guest
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const slug = guestName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    const newGuest = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: guestName.trim(),
      slug,
      phone: guestPhone.trim() || '',
    };
    setGuests((prev) => [newGuest, ...prev]);
    setGuestName('');
    setGuestPhone('');
    setImportMessage(`Berhasil menambahkan "${guestName}"!`);
    setTimeout(() => setImportMessage(null), 3000);
  };

  // Excel File Parser
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1 });

        if (!data || data.length === 0) {
          alert('File Excel kosong atau tidak terbaca.');
          return;
        }

        const parsedList: Array<{ name: string; phone?: string }> = [];

        // Determine if first row is header
        let startIdx = 0;
        let nameColIdx = 0;
        let phoneColIdx = 1;

        const firstRow = data[0] as any[];
        if (firstRow && firstRow.some((cell) => typeof cell === 'string' && /nama|name|tamu|guest/i.test(cell))) {
          startIdx = 1;
          nameColIdx = firstRow.findIndex((c) => /nama|name|tamu|guest/i.test(String(c)));
          if (nameColIdx === -1) nameColIdx = 0;
          const foundPhone = firstRow.findIndex((c) => /tel|hp|phone|wa|whatsapp|nomor/i.test(String(c)));
          if (foundPhone !== -1) phoneColIdx = foundPhone;
        }

        for (let i = startIdx; i < data.length; i++) {
          const row = data[i] as any[];
          if (!row || !row[nameColIdx]) continue;
          const rawName = String(row[nameColIdx]).trim();
          if (!rawName) continue;

          let rawPhone = row[phoneColIdx] ? String(row[phoneColIdx]).trim() : '';
          rawPhone = rawPhone.replace(/[^0-9+]/g, '');

          parsedList.push({ name: rawName, phone: rawPhone });
        }

        setParsedPreview(parsedList);
        setImportMessage(`Ditemukan ${parsedList.length} nama dari Excel. Klik tombol di bawah untuk men-generate.`);
      } catch (err) {
        console.error('Error parsing excel:', err);
        alert('Gagal membaca file Excel. Pastikan format .xlsx atau .csv');
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  // Parse Text / Word / WhatsApp Paste
  const handleParseText = (text: string) => {
    setBulkText(text);
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }

    const lines = text.split('\n');
    const results: Array<{ name: string; phone?: string }> = [];

    for (const rawLine of lines) {
      let line = rawLine.trim();
      if (!line) continue;

      // Strip bullet points or numbers (e.g. "1. ", "1) ", "- ", "• ")
      line = line.replace(/^[\d]+[\.\)\-]\s*/, '').replace(/^[\-\*•]\s*/, '').trim();

      // Check if line contains phone number at the end or separated by comma/dash
      let name = line;
      let phone = '';

      const phoneMatch = line.match(/(?:[-–,]|\s)\s*(\+?62|08)[0-9\s\-]{8,15}$/);
      if (phoneMatch) {
        phone = phoneMatch[0].replace(/[^0-9]/g, '');
        name = line.substring(0, line.lastIndexOf(phoneMatch[0])).trim();
      }

      if (name) {
        results.push({ name, phone });
      }
    }

    setParsedPreview(results);
  };

  // Handle Text/Word File Upload (.txt / .doc / .docx)
  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        handleParseText(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Commit Parsed Preview to Guests
  const handleCommitBulk = () => {
    if (parsedPreview.length === 0) return;

    const newEntries = parsedPreview.map((item, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
      name: item.name,
      slug: item.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
      phone: item.phone || '',
    }));

    setGuests((prev) => [...newEntries, ...prev]);
    const count = newEntries.length;
    setParsedPreview([]);
    setBulkText('');
    setImportMessage(`🎉 Berhasil men-generate ${count} link undangan tamu sekaligus!`);
    setTimeout(() => setImportMessage(null), 5000);
  };

  // Download Sample Excel Template
  const handleDownloadTemplate = () => {
    const sampleData = [
      ['Nama Tamu', 'Nomor WhatsApp (Opsional)'],
      ['Bpk. H. Bambang Sudiro & Keluarga', '081234567890'],
      ['Ibu Hj. Siti Aminah, S.Pd', '081298765432'],
      ['Dr. Andi Pratama & Rekan', '081377778888'],
      ['Keluarga Besar Alm. Bpk. Suryo', ''],
      ['Sahabat Alumni SMAN 1 Jakarta', ''],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    // Column widths
    ws['!cols'] = [{ wch: 35 }, { wch: 25 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daftar Tamu');
    XLSX.writeFile(wb, 'Template_Daftar_Tamu_Undangan.xlsx');
  };

  // Export current guest list to Excel with links
  const handleExportToExcel = () => {
    if (guests.length === 0) {
      alert('Daftar tamu masih kosong.');
      return;
    }

    const exportData = [
      ['No', 'Nama Tamu', 'Nomor WhatsApp', 'Link Undangan Personal', 'Pesan WhatsApp Siap Kirim'],
      ...guests.map((g, idx) => [
        idx + 1,
        g.name,
        g.phone || '-',
        getGuestUrl(g.name),
        getWhatsAppLink(g.name, g.phone),
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(exportData);
    ws['!cols'] = [{ wch: 5 }, { wch: 35 }, { wch: 18 }, { wch: 45 }, { wch: 60 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Undangan Tamu');
    XLSX.writeFile(wb, `Undangan_Tamu_${invitationSlug}.xlsx`);
  };

  // Copy Single Link
  const copyUrl = (name: string, id: string) => {
    const url = getGuestUrl(name);
    navigator.clipboard.writeText(url);
    setCopiedSlug(id);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  // Copy All Links
  const copyAllLinks = () => {
    if (guests.length === 0) return;
    const textToCopy = guests
      .map((g, i) => `${i + 1}. ${g.name}\n${getGuestUrl(g.name)}`)
      .join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopyAllStatus(true);
    setTimeout(() => setCopyAllStatus(false), 3000);
  };

  // Delete Guest
  const handleDeleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  // Clear All
  const handleClearAll = () => {
    if (confirm('Yakin ingin mengosongkan seluruh daftar tamu saat ini?')) {
      setGuests([]);
    }
  };

  // Filtered Guests
  const filteredGuests = guests.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.phone && g.phone.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#292929]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/dashboard" className="hover:text-[#24382E] flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span>/</span>
          <span className="text-[#24382E] font-medium">Manajemen Tamu & WhatsApp Blast</span>
        </div>

        {/* Page Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#24382E]">
                Generator Undangan Tamu Personal
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mt-1">
                Generate link nama tamu secara massal dari Excel atau Word, lengkap dengan tautan unik dan pesan WhatsApp blast instan.
              </p>
            </div>
            
            {/* Slug Configuration */}
            <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-[#B59A62]/20 flex flex-col gap-1 sm:w-64 flex-shrink-0">
              <label className="text-[11px] font-semibold text-stone-700">Slug Undangan Aktif:</label>
              <div className="flex items-center">
                <span className="text-[11px] text-stone-400 font-mono">/invitation/</span>
                <input
                  type="text"
                  value={invitationSlug}
                  onChange={(e) => setInvitationSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, ''))}
                  className="w-full text-xs font-mono font-bold text-[#24382E] bg-transparent outline-none pl-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        {importMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{importMessage}</span>
          </div>
        )}

        {/* Main Generator Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-6">
          {/* Tab Selector */}
          <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('excel')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'excel'
                  ? 'border-b-2 border-[#24382E] text-[#24382E] bg-[#FAF7F0]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Import dari Excel / CSV</span>
            </button>
            <button
              onClick={() => setActiveTab('word')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'word'
                  ? 'border-b-2 border-[#24382E] text-[#24382E] bg-[#FAF7F0]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Salin dari Word / WA (Teks)</span>
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'manual'
                  ? 'border-b-2 border-[#24382E] text-[#24382E] bg-[#FAF7F0]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <UserPlus className="w-4 h-4 text-[#B59A62]" />
              <span>Tambah Manual (Satu-satu)</span>
            </button>
          </div>

          {/* TAB 1: EXCEL IMPORT */}
          {activeTab === 'excel' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                    Upload File Excel atau CSV
                  </h3>
                  <p className="text-xs text-stone-500">
                    Sistem otomatis membaca kolom Nama Tamu dan Nomor WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3.5 py-1.5 rounded-lg border border-[#B59A62] text-[#24382E] text-xs font-semibold hover:bg-[#FAF7F0] flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#B59A62]" />
                  <span>Download Template Excel</span>
                </button>
              </div>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-[#B59A62]/40 hover:border-[#24382E] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#FAF7F0]/40 transition-colors">
                <FileSpreadsheet className="w-10 h-10 text-emerald-600" />
                <div className="text-center">
                  <span className="text-sm font-semibold text-[#24382E] block">
                    Pilih File Excel dari HP atau Laptop
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    Mendukung format .xlsx, .xls, .csv
                  </span>
                </div>
                <span className="px-4 py-2 rounded-xl bg-[#24382E] text-white text-xs font-semibold shadow-sm mt-1">
                  Pilih File Excel
                </span>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                  onChange={handleExcelUpload}
                />
              </label>
            </div>
          )}

          {/* TAB 2: WORD / WHATSAPP TEXT IMPORT */}
          {activeTab === 'word' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                    Salin & Tempel Daftar Nama dari Word / WhatsApp
                  </h3>
                  <p className="text-xs text-stone-500">
                    Tempel teks langsung di bawah, 1 nama per baris. Nomor penomoran otomatis dibersihkan.
                  </p>
                </div>
                <label className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-stone-500" />
                  <span>Upload File .txt / .doc</span>
                  <input
                    type="file"
                    accept=".txt,.doc,.docx"
                    className="hidden"
                    onChange={handleTextFileUpload}
                  />
                </label>
              </div>

              <textarea
                rows={6}
                value={bulkText}
                onChange={(e) => handleParseText(e.target.value)}
                placeholder={`Contoh teks dari Word / WhatsApp:\n1. Bpk. Hendra Pratama & Keluarga - 081234567890\n2. Ibu Hj. Maryam, S.Pd\n3. dr. Kevin Wijaya (081298765432)\n4. Keluarga Besar Bani Hasyim\n5. Teman-teman Kantor Divisi IT`}
                className="w-full p-4 text-xs sm:text-sm font-mono rounded-xl border border-stone-300 focus:border-[#B59A62] outline-none"
              />
            </div>
          )}

          {/* TAB 3: MANUAL INPUT */}
          {activeTab === 'manual' && (
            <form onSubmit={handleAddGuest} className="space-y-4">
              <h3 className="font-serif-cormorant text-xl font-bold text-[#24382E]">
                Tambah Nama Tamu Satuan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Tamu & Gelar</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Contoh: Bpk. H. Bambang & Keluarga"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor WhatsApp (Opsional)</label>
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#B59A62] outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#24382E] text-white text-xs font-semibold hover:bg-[#192821] flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Simpan Tamu Ini</span>
              </button>
            </form>
          )}

          {/* BULK PREVIEW & GENERATE BUTTON */}
          {parsedPreview.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#E8D8B8]/20 border border-[#B59A62]/40 space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#B59A62]" />
                  <div>
                    <h4 className="font-serif-cormorant text-lg font-bold text-[#24382E]">
                      Pratinjau Hasil Impor: {parsedPreview.length} Tamu Ditemukan
                    </h4>
                    <p className="text-xs text-stone-500">Periksa daftar sebelum men-generate link undangan</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCommitBulk}
                  className="px-6 py-2.5 rounded-full bg-[#24382E] text-white text-xs sm:text-sm font-semibold hover:bg-[#192821] shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Generate {parsedPreview.length} Link Tamu Sekaligus</span>
                </button>
              </div>

              {/* Scrollable Preview Table */}
              <div className="max-h-56 overflow-y-auto rounded-xl border border-stone-200 bg-white divide-y divide-stone-100 text-xs">
                {parsedPreview.slice(0, 100).map((item, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between">
                    <span className="font-medium text-stone-800">
                      {idx + 1}. {item.name}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px]">
                      {item.phone || 'Tanpa no. WA'}
                    </span>
                  </div>
                ))}
                {parsedPreview.length > 100 && (
                  <div className="p-2 text-center text-stone-400 italic">
                    ...dan {parsedPreview.length - 100} nama lainnya
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* GUESTS LIST SECTION */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#B59A62]/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#24382E] flex items-center gap-2">
                <span>Daftar Undangan Tamu</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#B59A62]/30 text-xs font-sans text-[#24382E]">
                  {guests.length} Tamu
                </span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Semua link sudah terpersonalisasi dengan nama tamu.</p>
            </div>

            {/* Bulk Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={copyAllLinks}
                className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copyAllStatus ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B59A62]" />}
                <span>{copyAllStatus ? 'Semua Tersalin!' : 'Salin Semua Link'}</span>
              </button>
              <button
                type="button"
                onClick={handleExportToExcel}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor ke Excel</span>
              </button>
              {guests.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                  title="Kosongkan daftar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tamu atau nomor WhatsApp..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#B59A62] outline-none"
            />
          </div>

          {/* Guests List Items */}
          <div className="divide-y divide-stone-100">
            {filteredGuests.length === 0 ? (
              <div className="py-12 text-center text-stone-400 text-xs space-y-2">
                <Users className="w-8 h-8 mx-auto text-stone-300 stroke-1" />
                <p>Tidak ada tamu yang cocok dengan pencarian.</p>
              </div>
            ) : (
              filteredGuests.map((g) => (
                <div key={g.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-serif-cormorant font-bold text-[#24382E] block">{g.name}</strong>
                      {g.phone && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono">
                          {g.phone}
                        </span>
                      )}
                    </div>
                    <span className="text-stone-400 font-mono text-[11px] truncate block max-w-sm">
                      {getGuestUrl(g.name)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => copyUrl(g.name, g.id)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 text-[#24382E] hover:bg-stone-50 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      {copiedSlug === g.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#B59A62]" />
                      )}
                      <span>{copiedSlug === g.id ? 'Tersalin' : 'Salin'}</span>
                    </button>

                    <a
                      href={getWhatsAppLink(g.name, g.phone)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim WA</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(g.id)}
                      className="p-1.5 text-stone-300 hover:text-red-600 transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}