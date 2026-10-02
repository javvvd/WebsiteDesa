'use client';

import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Grid3X3, Flame, Coffee, Cookie, Store } from 'lucide-react';
import Link from 'next/link';

const produkData = [
  {
    icon: Grid3X3,
    category: 'Kerajinan',
    title: 'Kerajinan Bambu',
    desc: 'Anyaman dan kerajinan dari bambu khas Tomohon, dibuat dengan teknik tradisional turun-temurun.',
  },
  {
    icon: Flame,
    category: 'Kuliner',
    title: 'Ikan Rica-Rica',
    desc: 'Hidangan ikan bakar dengan bumbu rica-rica khas Minahasa yang pedas dan menggugah selera.',
  },
  {
    icon: Coffee,
    category: 'Minuman',
    title: 'Kopi Arabika Tomohon',
    desc: 'Kopi arabika dataran tinggi Tomohon dengan cita rasa khas — ditanam di ketinggian 600 mdpl.',
  },
  {
    icon: Cookie,
    category: 'Oleh-Oleh',
    title: 'Kue Kering Tradisional',
    desc: 'Berbagai kue kering khas Minahasa — panada, halua kenari, dan bagea sebagai oleh-oleh favorit.',
  },
];

export default function ProdukPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Produk Lokal
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Produk Unggulan
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Dukung ekonomi lokal melalui produk-produk unggulan UMKM dan
            masyarakat Kakaskasen Dua.
          </p>
        </div>
      </section>

      {/* Produk Grid */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {produkData.map((item, i) => (
              <div
                key={item.title}
                className={`glass-card rounded-xl overflow-hidden border border-sage-100 fade-up stagger-${
                  i + 1
                }`}
              >
                <div className="placeholder-img h-44">
                  <item.icon className="w-10 h-10 text-white/45" />
                </div>
                <div className="p-5">
                  <span className="text-sage-400 text-xs font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-sage-900 mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sage-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10 fade-up">
            <div className="inline-flex items-center gap-2.5 bg-white rounded-xl px-5 py-3 border border-sage-100">
              <Store className="w-4 h-4 text-sage-400" />
              <p className="text-sage-600 text-sm">
                Tertarik dengan produk kami?{' '}
                <Link
                  href="/kontak"
                  className="text-sage-500 font-semibold hover:underline"
                >
                  Hubungi kami
                </Link>{' '}
                untuk pemesanan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
