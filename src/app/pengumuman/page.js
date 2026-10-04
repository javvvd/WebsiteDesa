'use client';

import { useState, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Megaphone, Pin, Calendar, Loader2, ImageIcon, Paperclip, ExternalLink } from 'lucide-react';

import Link from 'next/link';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PengumumanPage() {
  const scrollRef = useScrollAnimation();
  const [pengumuman, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pengumuman')
      .then((res) => res.json())
      .then((data) => setPengumuman(Array.isArray(data) ? data : []))
      .catch(() => setPengumuman([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={scrollRef}>
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Informasi
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Pengumuman
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Informasi terbaru dan pengumuman resmi dari Kelurahan Kakaskasen Dua
            untuk warga dan masyarakat umum.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-20 bg-sage-50 min-h-[50vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-sage-400 animate-spin" />
              <span className="ml-2 text-sage-500 text-sm">Memuat pengumuman...</span>
            </div>
          ) : pengumuman.length === 0 ? (
            <div className="text-center py-20 animate-in">
              <Megaphone className="w-12 h-12 text-sage-300 mx-auto mb-4" />
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-700 mb-2">
                Belum Ada Pengumuman
              </h3>
              <p className="text-sage-500 text-sm">
                Pengumuman dari kelurahan akan ditampilkan di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pengumuman.map((item, i) => (
                <Link
                  href={`/pengumuman/${item.id}`}
                  key={item.id}
                  className={`block bg-white rounded-xl p-5 md:p-6 border shadow-sm transition-all hover:shadow-md hover:-translate-y-1 animate-in ${
                    item.is_pinned
                      ? 'border-sage-300 ring-1 ring-sage-200'
                      : 'border-sage-100/50'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        item.is_pinned ? 'bg-sage-400/15' : 'bg-sage-50 border border-sage-100'
                      }`}
                    >
                      {item.is_pinned ? (
                        <Pin className="w-6 h-6 text-sage-500" />
                      ) : (
                        <Megaphone className="w-6 h-6 text-sage-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        {item.is_pinned && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sage-500 bg-sage-400/10 px-2 py-0.5 rounded-full border border-sage-200">
                            Disematkan
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-sage-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-sage-900 mb-2 line-clamp-1 group-hover:text-sage-700">
                        {item.judul}
                      </h3>
                      <p className="text-sage-500 text-sm line-clamp-2">
                        {item.isi}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
