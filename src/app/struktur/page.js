'use client';

import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Users, User, ArrowDown } from 'lucide-react';
import Image from 'next/image';

const struktur = {
  lurah: {
    jabatan: 'Lurah Kakaskasen Dua',
    nama: 'Nama Lurah, S.IP',
    nip: '19801231 200501 1 001',
  },
  sekretaris: {
    jabatan: 'Sekretaris Kelurahan',
    nama: 'Nama Sekretaris, S.E.',
    nip: '19851231 201001 2 002',
  },
  seksi: [
    {
      jabatan: 'Kasi Pemerintahan & Trantib',
      nama: 'Nama Kasi Pem',
      nip: '19901231 201501 1 003',
    },
    {
      jabatan: 'Kasi Pembangunan & Kesra',
      nama: 'Nama Kasi Pembangunan',
      nip: '19881231 201301 2 004',
    },
    {
      jabatan: 'Kasi Pelayanan Umum',
      nama: 'Nama Kasi Pelayanan',
      nip: '19921231 201801 2 005',
    },
  ],
  lingkungan: [
    'Kepala Lingkungan I',
    'Kepala Lingkungan II',
    'Kepala Lingkungan III',
    'Kepala Lingkungan IV',
    'Kepala Lingkungan V',
    'Kepala Lingkungan VI',
    'Kepala Lingkungan VII',
    'Kepala Lingkungan VIII',
    'Kepala Lingkungan IX',
    'Kepala Lingkungan X',
    'Kepala Lingkungan XI',
    'Kepala Lingkungan XII',
    'Kepala Lingkungan XIII',
  ],
};

function StaffCard({ jabatan, nama, nip, isMain = false }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 ${
        isMain ? 'border-sage-300 ring-2 ring-sage-100 shadow-md' : 'border-sage-100'
      }`}
    >
      <div className="w-20 h-20 rounded-full bg-sage-50 mb-4 border-2 border-sage-200 overflow-hidden flex items-center justify-center shrink-0">
        <User className="w-8 h-8 text-sage-300" />
        {/* Uncomment jika ingin pakai foto sungguhan */}
        {/* <Image src="/path-to-photo.jpg" alt={nama} width={80} height={80} className="object-cover w-full h-full" /> */}
      </div>
      <h3 className="font-[family-name:var(--font-heading)] font-bold text-sage-900 text-lg mb-1 leading-tight">
        {nama}
      </h3>
      <p className="text-sage-500 text-sm font-medium mb-2">{jabatan}</p>
      {nip && (
        <span className="text-xs text-sage-400 bg-sage-50 px-3 py-1 rounded-full">
          NIP. {nip}
        </span>
      )}
    </div>
  );
}

export default function StrukturPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* ─── HEADER ─── */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-sage-800/50 hero-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-sage-200" />
          </div>
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Pemerintahan
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Struktur Organisasi
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Susunan kelembagaan dan aparatur pemerintah Kelurahan Kakaskasen Dua
            dalam melayani masyarakat secara profesional dan transparan.
          </p>
        </div>
        
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none rotate-180 text-sage-50">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
          </svg>
        </div>
      </section>

      {/* ─── BAGAN STRUKTUR ─── */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center fade-up">
            {/* Lurah */}
            <div className="w-full max-w-sm mb-6 relative">
              <StaffCard {...struktur.lurah} isMain={true} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex justify-center">
                <ArrowDown className="w-5 h-5 text-sage-300" />
              </div>
            </div>

            {/* Sekretaris */}
            <div className="w-full max-w-sm mb-12 relative fade-up stagger-1">
              <StaffCard {...struktur.sekretaris} />
            </div>

            {/* Garis Horizontal Penghubung Seksi */}
            <div className="hidden md:block w-2/3 h-px bg-sage-300 mb-6 fade-up stagger-2" />
            <div className="hidden md:flex w-2/3 justify-between px-10 mb-2 fade-up stagger-2">
              <ArrowDown className="w-5 h-5 text-sage-300" />
              <ArrowDown className="w-5 h-5 text-sage-300" />
              <ArrowDown className="w-5 h-5 text-sage-300" />
            </div>

            {/* Seksi-seksi */}
            <div className="grid md:grid-cols-3 gap-6 w-full mb-16 fade-up stagger-3">
              {struktur.seksi.map((seksi, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="md:hidden w-px h-6 bg-sage-300 mb-2" />
                  <div className="md:hidden flex justify-center mb-4">
                    <ArrowDown className="w-5 h-5 text-sage-300" />
                  </div>
                  <StaffCard {...seksi} />
                </div>
              ))}
            </div>

            {/* Kepala Lingkungan */}
            <div className="w-full fade-up stagger-4">
              <div className="text-center mb-8">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-sage-900 mb-2">
                  Kepala Lingkungan (Pala)
                </h3>
                <div className="section-divider mx-auto" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {struktur.lingkungan.map((pala, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-sage-100 text-center shadow-sm">
                    <div className="w-12 h-12 mx-auto rounded-full bg-sage-50 flex items-center justify-center mb-3">
                      <User className="w-5 h-5 text-sage-400" />
                    </div>
                    <p className="text-sage-900 font-semibold text-sm leading-tight">Nama Pala</p>
                    <p className="text-sage-500 text-xs mt-1">{pala}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </section>
    </div>
  );
}
