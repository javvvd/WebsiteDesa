'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Paperclip, ExternalLink, Megaphone, Loader2 } from 'lucide-react';
import Link from 'next/link';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function PengumumanDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pengumuman/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setData(data))
      .catch(() => router.push('/pengumuman'))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-sage-50">
        <Loader2 className="w-8 h-8 text-sage-400 animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/pengumuman"
          className="inline-flex items-center gap-2 text-sage-500 hover:text-sage-700 font-medium text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Pengumuman
        </Link>

        {/* Content Card */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sage-100/50 animate-in">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-sage-100/50 bg-sage-50/30">
            <div className="flex flex-wrap items-center gap-4 text-sage-500 text-sm mb-4">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-sage-200">
                <Calendar className="w-4 h-4 text-sage-400" />
                {formatDate(data.created_at)}
              </span>
              {data.created_by && (
                <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-sage-200">
                  <User className="w-4 h-4 text-sage-400" />
                  Admin: {data.created_by}
                </span>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-4xl font-bold text-sage-900 leading-tight">
              {data.judul}
            </h1>
          </div>

          {/* Gambar */}
          {data.gambar_url && (
            <div className="w-full h-[300px] md:h-[450px] overflow-hidden bg-sage-100">
              <img
                src={data.gambar_url}
                alt={data.judul}
                className="w-full h-full object-contain bg-sage-900/5"
                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="prose prose-sage max-w-none">
              <p className="text-sage-700 leading-relaxed whitespace-pre-wrap text-[15px] md:text-base">
                {data.isi}
              </p>
            </div>

            {/* Lampiran file */}
            {data.file_url && (
              <div className="mt-8 pt-8 border-t border-sage-100">
                <h3 className="text-sage-900 font-semibold mb-3 flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-sage-400" />
                  Lampiran Dokumen
                </h3>
                <a
                  href={data.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-sage-50 hover:bg-sage-100 border border-sage-200 px-5 py-3 rounded-xl text-sm font-medium text-sage-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-sage-200 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-sage-400" />
                  </div>
                  <span className="flex-1 truncate max-w-[200px] md:max-w-md">
                    {data.file_nama || 'Unduh Lampiran'}
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )}
          </div>
        </article>

      </div>
    </div>
  );
}

// Dummy icon for file
function FileText({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
