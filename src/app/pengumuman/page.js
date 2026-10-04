'use client';

import { useState, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  Megaphone,
  Pin,
  Calendar,
  Tag,
  Loader2,
} from 'lucide-react';

const kategoriColors = {
  Umum: 'bg-sage-400/15 text-sage-600',
  Penting: 'bg-red-100 text-red-700',
  Kegiatan: 'bg-blue-100 text-blue-700',
  Pembangunan: 'bg-amber-100 text-amber-700',
  Kesehatan: 'bg-green-100 text-green-700',
  Pendidikan: 'bg-purple-100 text-purple-700',
};

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
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-sage-400 animate-spin" />
              <span className="ml-2 text-sage-500 text-sm">
                Memuat pengumuman...
              </span>
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
                <article
                  key={item.id}
                  className={`bg-white rounded-xl p-5 md:p-6 border shadow-sm transition-all hover:shadow-md animate-in ${
                    item.is_pinned
                      ? 'border-sage-300 ring-1 ring-sage-200'
                      : 'border-sage-100/50'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        item.is_pinned ? 'bg-sage-400/15' : 'bg-sage-50'
                      }`}
                    >
                      {item.is_pinned ? (
                        <Pin className="w-5 h-5 text-sage-500" />
                      ) : (
                        <Megaphone className="w-5 h-5 text-sage-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {item.is_pinned && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sage-500 bg-sage-400/10 px-2 py-0.5 rounded-full">
                            Disematkan
                          </span>
                        )}
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            kategoriColors[item.kategori] ||
                            kategoriColors.Umum
                          }`}
                        >
                          {item.kategori}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-sage-900 mb-2">
                        {item.judul}
                      </h3>
                      <p className="text-sage-600 text-sm leading-relaxed whitespace-pre-line">
                        {item.isi}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sage-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.created_at)}
                        </span>
                        {item.created_by && (
                          <span className="flex items-center gap-1">
                            Oleh: {item.created_by}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
