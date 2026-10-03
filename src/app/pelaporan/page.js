'use client';

import { useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  Tag,
  MessageSquare,
} from 'lucide-react';

const kategoriOptions = [
  'Infrastruktur & Jalan',
  'Kebersihan & Lingkungan',
  'Keamanan & Ketertiban',
  'Pelayanan Publik',
  'Kesehatan',
  'Pendidikan',
  'Ekonomi & UMKM',
  'Bencana Alam',
  'Lainnya',
];

const initialForm = {
  nama_pelapor: '',
  no_telepon: '',
  email: '',
  alamat: '',
  kategori: '',
  judul: '',
  deskripsi: '',
  lokasi_kejadian: '',
};

export default function PelaporanPage() {
  const scrollRef = useScrollAnimation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // Basic validation
    if (!form.nama_pelapor || !form.kategori || !form.judul || !form.deskripsi) {
      setStatus('error');
      setErrorMsg('Mohon lengkapi semua field yang wajib diisi (*).');
      return;
    }

    try {
      const res = await fetch('/api/laporan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal mengirim laporan');
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.message || 'Gagal mengirim laporan. Silakan coba lagi nanti.'
      );
    }
  };

  return (
    <div ref={scrollRef}>
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Layanan Warga
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Pelaporan Warga
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Sampaikan laporan, keluhan, atau aspirasi Anda kepada Kelurahan
            Kakaskasen Dua. Setiap laporan akan ditindaklanjuti.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          {status === 'success' && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-5 flex items-start gap-3 toast">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 text-sm">
                  Laporan Berhasil Dikirim!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Terima kasih atas laporan Anda. Tim kelurahan akan segera
                  menindaklanjuti.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-3 text-green-600 text-sm font-medium hover:underline"
                >
                  Buat laporan baru
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3 toast">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm">
                  Gagal Mengirim Laporan
                </p>
                <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          {status !== 'success' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-sage-100/50 fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-sage-400/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-sage-500" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-900">
                    Formulir Laporan
                  </h2>
                  <p className="text-sage-500 text-xs">
                    Tanda (*) wajib diisi
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama & Telepon */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-sage-400" />
                        Nama Pelapor *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="nama_pelapor"
                      value={form.nama_pelapor}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Nama lengkap Anda"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-sage-400" />
                        No. Telepon
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="no_telepon"
                      value={form.no_telepon}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                {/* Email & Alamat */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sage-400" />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="email@contoh.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sage-400" />
                        Alamat
                      </span>
                    </label>
                    <input
                      type="text"
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Alamat Anda"
                    />
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sage-700 text-sm font-medium mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-sage-400" />
                      Kategori Laporan *
                    </span>
                  </label>
                  <select
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Pilih kategori...</option>
                    {kategoriOptions.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Judul */}
                <div>
                  <label className="block text-sage-700 text-sm font-medium mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-sage-400" />
                      Judul Laporan *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={form.judul}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ringkasan singkat masalah"
                    required
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sage-700 text-sm font-medium mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-sage-400" />
                      Deskripsi Laporan *
                    </span>
                  </label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Jelaskan detail laporan Anda secara lengkap..."
                    rows={5}
                    required
                  />
                </div>

                {/* Lokasi Kejadian */}
                <div>
                  <label className="block text-sage-700 text-sm font-medium mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sage-400" />
                      Lokasi Kejadian
                    </span>
                  </label>
                  <input
                    type="text"
                    name="lokasi_kejadian"
                    value={form.lokasi_kejadian}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Alamat / patokan lokasi kejadian"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Kirim Laporan
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-white rounded-xl p-5 border border-sage-100/50 fade-up">
            <h3 className="font-semibold text-sage-900 text-sm mb-3">
              Informasi Pelaporan
            </h3>
            <ul className="space-y-2">
              {[
                'Laporan yang masuk akan diverifikasi oleh petugas kelurahan.',
                'Identitas pelapor dijaga kerahasiaannya.',
                'Tindak lanjut laporan akan diinformasikan melalui kontak yang diberikan.',
                'Untuk laporan darurat, segera hubungi kantor kelurahan di (0431) xxx-xxxx.',
              ].map((info, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sage-600 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0 mt-1.5" />
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
