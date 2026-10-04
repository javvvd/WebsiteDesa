'use client';

import { useState, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { ImageIcon, Loader2, Calendar, X } from 'lucide-react';
import Image from 'next/image';

export default function GaleriPage() {
  const scrollRef = useScrollAnimation();
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('/api/galeri')
      .then((res) => res.json())
      .then((data) => setGaleri(Array.isArray(data) ? data : []))
      .catch(() => setGaleri([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={scrollRef}>
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Dokumentasi
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Galeri Kelurahan
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Kumpulan foto dan dokumentasi kegiatan masyarakat serta pesona Kelurahan Kakaskasen Dua.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20 bg-sage-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-sage-400 animate-spin" />
            </div>
          ) : galeri.length === 0 ? (
            <div className="text-center py-20 animate-in">
              <ImageIcon className="w-12 h-12 text-sage-300 mx-auto mb-4" />
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-700 mb-2">
                Belum Ada Foto
              </h3>
              <p className="text-sage-500 text-sm">
                Foto-foto galeri akan segera ditambahkan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galeri.map((item, i) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sage-100 group animate-in"
                  style={{ animationDelay: `${(i % 6) * 100}ms` }}
                >
                  <div 
                    className="relative w-full aspect-video overflow-hidden bg-sage-100 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-medium tracking-wider text-sm bg-black/40 px-3 py-1.5 rounded-lg transition-opacity backdrop-blur-sm">
                        Lihat Penuh
                      </span>
                    </div>
                    <img
                      src={item.gambar_url}
                      alt={item.judul}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400/e8e6d8/8e9e70?text=Gambar+Tidak+Tersedia';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-heading)] font-bold text-sage-900 text-lg mb-2">
                      {item.judul}
                    </h3>
                    {item.deskripsi && (
                      <p className="text-sage-600 text-sm line-clamp-2 mb-4">
                        {item.deskripsi}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-sage-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          {/* Tombol Silang (Close) - Fixed Top Right */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            title="Tutup Modal"
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div 
            className="relative max-w-6xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={selectedImage.gambar_url} 
              alt={selectedImage.judul}
              className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 md:mt-6 text-center max-w-3xl">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{selectedImage.judul}</h3>
              {selectedImage.deskripsi && (
                <p className="text-white/80 text-sm md:text-base leading-relaxed">{selectedImage.deskripsi}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
