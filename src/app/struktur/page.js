'use client';

import { useState, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Users, User, ArrowDown, Loader2 } from 'lucide-react';

function StaffCard({ jabatan, nama, nip, isMain = false }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 ${
        isMain ? 'border-sage-300 ring-2 ring-sage-100 shadow-md' : 'border-sage-100'
      }`}
    >
      <div className="w-20 h-20 rounded-full bg-sage-50 mb-4 border-2 border-sage-200 overflow-hidden flex items-center justify-center shrink-0">
        <User className="w-8 h-8 text-sage-300" />
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
  const [data, setData] = useState({ lurah: null, sekretaris: null, seksi: [], lingkungan: [], wakil_lingkungan: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/aparatur')
      .then((res) => res.json())
      .then((aparatur) => {
        if (!Array.isArray(aparatur)) return;
        const parsed = {
          lurah: aparatur.find(a => a.kategori === 'lurah'),
          sekretaris: aparatur.find(a => a.kategori === 'sekretaris'),
          seksi: aparatur.filter(a => a.kategori === 'seksi'),
          lingkungan: aparatur.filter(a => a.kategori === 'lingkungan'),
          wakil_lingkungan: aparatur.filter(a => a.kategori === 'wakil_lingkungan')
        };
        setData(parsed);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
      <section className="py-16 md:py-24 bg-sage-50 min-h-[50vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-sage-400 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Lurah */}
              {data.lurah && (
                <div className="w-full max-w-sm mb-6 relative">
                  <StaffCard {...data.lurah} isMain={true} />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex justify-center">
                    <ArrowDown className="w-5 h-5 text-sage-300" />
                  </div>
                </div>
              )}

              {/* Sekretaris */}
              {data.sekretaris && (
                <div className="w-full max-w-sm mb-12 relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
                  <StaffCard {...data.sekretaris} />
                </div>
              )}

              {/* Garis Horizontal Penghubung Seksi */}
              {data.seksi.length > 0 && (
                <>
                  <div className="hidden md:block w-2/3 h-px bg-sage-300 mb-6 animate-in fade-in duration-700 delay-200 fill-mode-both" />
                  <div className="hidden md:flex w-2/3 justify-between px-10 mb-2 animate-in fade-in duration-700 delay-200 fill-mode-both">
                    <ArrowDown className="w-5 h-5 text-sage-300" />
                    <ArrowDown className="w-5 h-5 text-sage-300" />
                    <ArrowDown className="w-5 h-5 text-sage-300" />
                  </div>
                  {/* Seksi-seksi */}
                  <div className="grid md:grid-cols-3 gap-6 w-full mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
                    {data.seksi.map((seksi) => (
                      <div key={seksi.id} className="flex flex-col items-center">
                        <div className="md:hidden w-px h-6 bg-sage-300 mb-2" />
                        <div className="md:hidden flex justify-center mb-4">
                          <ArrowDown className="w-5 h-5 text-sage-300" />
                        </div>
                        <StaffCard {...seksi} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Kepala Lingkungan */}
              {data.lingkungan.length > 0 && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
                  <div className="text-center mb-8">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-sage-900 mb-2">
                      Kepala Lingkungan (Pala)
                    </h3>
                    <div className="section-divider mx-auto" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {data.lingkungan.map((pala) => (
                      <div key={pala.id} className="bg-white rounded-xl p-4 border border-sage-100 text-center shadow-sm">
                        <div className="w-12 h-12 mx-auto rounded-full bg-sage-50 flex items-center justify-center mb-3">
                          <User className="w-5 h-5 text-sage-400" />
                        </div>
                        <p className="text-sage-900 font-semibold text-sm leading-tight">{pala.nama || 'Nama Pala'}</p>
                        <p className="text-sage-500 text-xs mt-1">{pala.jabatan}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wakil Kepala Lingkungan */}
              {data.wakil_lingkungan.length > 0 && (
                <div className="w-full mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
                  <div className="text-center mb-8">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-sage-900 mb-2">
                      Wakil Kepala Lingkungan (Wakil Pala)
                    </h3>
                    <div className="section-divider mx-auto" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {data.wakil_lingkungan.map((wakil) => (
                      <div key={wakil.id} className="bg-white rounded-xl p-4 border border-sage-100 text-center shadow-sm">
                        <div className="w-12 h-12 mx-auto rounded-full bg-sage-50 flex items-center justify-center mb-3">
                          <User className="w-5 h-5 text-sage-400" />
                        </div>
                        <p className="text-sage-900 font-semibold text-sm leading-tight">{wakil.nama || 'Nama Wakil Pala'}</p>
                        <p className="text-sage-500 text-xs mt-1">{wakil.jabatan}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
