'use client';

import { useState, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Users, User, ArrowDown, Loader2 } from 'lucide-react';

function StaffCard({ jabatan, nama, nip, isMain = false, isKepala = false }) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 ${
        isMain
          ? 'border-sage-300 ring-2 ring-sage-100 shadow-md'
          : isKepala
          ? 'border-sage-200 ring-1 ring-sage-50 shadow-sm'
          : 'border-sage-100'
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-sage-50 mb-3 border-2 border-sage-200 overflow-hidden flex items-center justify-center shrink-0">
        <User className="w-7 h-7 text-sage-300" />
      </div>
      <h3 className="font-[family-name:var(--font-heading)] font-bold text-sage-900 text-base mb-1 leading-tight">
        {nama}
      </h3>
      <p className="text-sage-500 text-xs font-medium">{jabatan === 'Anggota' ? '' : jabatan}</p>
      {nip && (
        <span className="mt-2 text-xs text-sage-400 bg-sage-50 px-3 py-1 rounded-full">
          NIP. {nip}
        </span>
      )}
    </div>
  );
}

function DivisiSection({ title, members }) {
  const kepala = members.find((m) => m.is_kepala);
  const anggota = members.filter((m) => !m.is_kepala);

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sage-100 shadow-sm p-6 md:p-8 w-full">
      <div className="text-center mb-6">
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-900 mb-2">
          {title}
        </h3>
        <div className="section-divider mx-auto" />
      </div>

      {kepala && (
        <div className="flex flex-col items-center mb-5">
          <div className="w-full max-w-xs">
            <StaffCard {...kepala} isKepala={true} />
          </div>
          {anggota.length > 0 && (
            <div className="mt-3 mb-1">
              <ArrowDown className="w-5 h-5 text-sage-300" />
            </div>
          )}
        </div>
      )}

      {anggota.length > 0 && (
        <div
          className={`grid gap-4 ${
            anggota.length === 1
              ? 'grid-cols-1 max-w-xs mx-auto'
              : anggota.length === 2
              ? 'grid-cols-2 max-w-sm mx-auto'
              : 'grid-cols-2 md:grid-cols-3'
          }`}
        >
          {anggota.map((a) => (
            <StaffCard key={a.id} {...a} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StrukturPage() {
  const scrollRef = useScrollAnimation();
  const [data, setData] = useState({ lurah: null, sekretariat: [], divisiKasie: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/aparatur')
      .then((res) => res.json())
      .then((aparatur) => {
        if (!Array.isArray(aparatur)) return;

        const kasieEntries = aparatur.filter((a) => a.kategori === 'kasie');
        const divisiKasie = {};
        kasieEntries.forEach((a) => {
          const div = a.jabatan_divisi || 'Seksi';
          if (!divisiKasie[div]) divisiKasie[div] = [];
          divisiKasie[div].push(a);
        });

        setData({
          lurah: aparatur.find((a) => a.kategori === 'lurah'),
          sekretariat: aparatur.filter((a) => a.kategori === 'sekretariat'),
          divisiKasie,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={scrollRef}>
      {/* HEADER */}
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

      {/* BAGAN STRUKTUR */}
      <section className="py-16 md:py-24 bg-sage-50 min-h-[50vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-sage-400 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">

              {/* Lurah */}
              {data.lurah && (
                <div className="w-full max-w-sm relative">
                  <StaffCard {...data.lurah} isMain={true} />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <ArrowDown className="w-5 h-5 text-sage-300" />
                  </div>
                </div>
              )}

              {/* Kesekretariatan */}
              {data.sekretariat.length > 0 && (
                <div className="w-full mt-2">
                  <DivisiSection title="Kesekretariatan" members={data.sekretariat} />
                </div>
              )}

              {/* Label seksi */}
              {Object.keys(data.divisiKasie).length > 0 && (
                <div className="flex flex-col items-center gap-1 py-2">
                  <ArrowDown className="w-5 h-5 text-sage-300" />
                  <p className="text-sage-400 text-xs font-semibold tracking-widest uppercase">Seksi-Seksi</p>
                </div>
              )}

              {/* Setiap Kasie sebagai blok terpisah */}
              {Object.entries(data.divisiKasie).map(([divisiName, members]) => (
                <div key={divisiName} className="w-full">
                  <DivisiSection title={divisiName} members={members} />
                </div>
              ))}

            </div>
          )}
        </div>
      </section>
    </div>
  );
}
