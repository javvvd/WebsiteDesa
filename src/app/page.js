'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  Compass,
  Info,
  Award,
  Flower2,
  CloudSun,
  Music,
  Mountain,
  Users,
  MapPin,
  Plane,
  Trophy,
  ChevronDown,
  FileText,
  ShieldCheck,
  Heart,
  Landmark,
  ArrowRight,
  Megaphone,
  Pin,
  Calendar,
} from 'lucide-react';

/* ─── Animated counter ─── */
function StatNumber({ value, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const target = parseInt(value, 10);
        const duration = 1800;
        const start = performance.now();

        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('id-ID');
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div>
      <p className="text-2xl font-bold stat-number" ref={ref}>
        0
      </p>
      <p className="text-sage-500 text-xs mt-1">{label}</p>
    </div>
  );
}

/* ─── Hero particles ─── */
function HeroParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = `${Math.random() * 100}%`;
      const size = `${Math.random() * 3 + 2}px`;
      p.style.width = size;
      p.style.height = size;
      p.style.animationDuration = `${Math.random() * 10 + 8}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      c.appendChild(p);
    }
  }, []);

  return <div ref={containerRef} className="hero-particles" />;
}

export default function HomePage() {
  const scrollRef = useScrollAnimation();
  const [pengumuman, setPengumuman] = useState([]);

  useEffect(() => {
    fetch('/api/pengumuman')
      .then((res) => res.json())
      .then((data) => setPengumuman(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setPengumuman([]));
  }, []);

  const features = [
    {
      icon: Award,
      title: 'Nominasi ADWI 2023',
      desc: 'Masuk dalam 75 besar nominasi Anugerah Desa Wisata Indonesia (ADWI) 2023.',
    },
    {
      icon: Flower2,
      title: 'Sentra Bunga TIFF',
      desc: 'Sumber utama tanaman bunga untuk Tomohon International Flower Festival.',
    },
    {
      icon: CloudSun,
      title: 'Udara Sejuk 600 mdpl',
      desc: 'Berada di dataran tinggi dengan udara segar sepanjang tahun.',
    },
    {
      icon: Music,
      title: 'Kekayaan Budaya',
      desc: 'Kaya akan seni budaya Minahasa — Tari Kabasaran, musik Kolintang.',
    },
  ];

  const services = [
    {
      icon: FileText,
      title: 'Pelaporan Warga',
      desc: 'Sampaikan laporan, keluhan, atau aspirasi langsung ke kelurahan.',
      href: '/pelaporan',
    },
    {
      icon: Compass,
      title: 'Wisata & Destinasi',
      desc: 'Jelajahi destinasi alam, budaya, dan agrowisata desa kami.',
      href: '/wisata',
    },
    {
      icon: ShieldCheck,
      title: 'Layanan Publik',
      desc: 'Informasi pelayanan administrasi dan kependudukan kelurahan.',
      href: '/profil',
    },
    {
      icon: Heart,
      title: 'Produk Unggulan',
      desc: 'Dukung UMKM lokal melalui produk-produk unggulan desa.',
      href: '/produk',
    },
  ];

  return (
    <div ref={scrollRef}>
      {/* ─── HERO ─── */}
      <section className="hero-section">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/hero-image.jpg')" }}
        />
        <div className="hero-overlay" />
        <HeroParticles />

        <div className="hero-content text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 hero-subtitle">
            <div className="pulse-dot" />
            <span className="text-white/90 text-sm font-medium">
              Portal Resmi Kelurahan
            </span>
          </div>

          <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5">
            Kakaskasen{' '}
            <span className="text-sage-200">Dua</span>
          </h1>

          <p className="hero-desc text-white/75 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Portal resmi Kelurahan Kakaskasen Dua, Kecamatan Tomohon Utara,
            Kota Tomohon — layanan publik, pariwisata, dan pelaporan warga.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pelaporan"
              className="btn-primary text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-sage-500/25"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Buat Laporan
              </span>
            </Link>
            <Link
              href="/profil"
              className="btn-outline text-white px-7 py-3.5 rounded-full text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Profil Kelurahan
              </span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/40 text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </div>
      </section>

      {/* ─── LAYANAN CEPAT ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
              Layanan
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
              Layanan Kelurahan
            </h2>
            <div className="section-divider mb-4" />
            <p className="text-sage-600 text-base max-w-xl mx-auto">
              Akses cepat ke layanan yang disediakan oleh Kelurahan Kakaskasen
              Dua untuk masyarakat.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className={`feature-card bg-sage-50 rounded-xl p-6 border border-sage-100/50 group fade-up stagger-${i + 1
                  }`}
              >
                <div className="feature-icon w-12 h-12 rounded-lg bg-sage-400/12 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-sage-500" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-sage-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <span className="text-sage-400 text-xs font-medium flex items-center gap-1 group-hover:text-sage-600 transition-colors">
                  Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TENTANG SINGKAT ─── */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image */}
            <div className="fade-left">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-sage-400/15">
                  <Image
                    src="/images/hero-bg.jpg"
                    alt="Panorama Desa Kakaskasen Dua"
                    width={700}
                    height={400}
                    className="w-full h-[350px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-3 md:-right-6 bg-white rounded-xl shadow-lg p-4 border border-sage-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-sage-400/10 flex items-center justify-center">
                      <Mountain className="w-5 h-5 text-sage-500" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-sage-900">600</p>
                      <p className="text-sage-500 text-xs">meter dpl</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="fade-right">
              <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
                Mengenal Kami
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-4">
                Desa Wisata di Kaki{' '}
                <span className="text-sage-500">Gunung Lokon</span> &{' '}
                <span className="text-sage-500">Mahawu</span>
              </h2>
              <p className="text-sage-600 leading-relaxed mb-4 text-sm">
                Kakaskasen Dua adalah kelurahan di dataran tinggi Tomohon,
                diapit oleh dua gunung berapi aktif — Gunung Lokon di sisi
                barat dan Gunung Mahawu di sisi timur. Dengan udara sejuk dan
                pemandangan alam memukau, desa ini diakui sebagai salah satu
                desa wisata terbaik.
              </p>
              <p className="text-sage-600 leading-relaxed mb-6 text-sm">
                Sebagai sentra bunga utama yang mendukung Tomohon International
                Flower Festival (TIFF), desa ini juga kaya akan seni budaya
                Minahasa.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3.5 border border-sage-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-500 text-xs font-medium">
                      Penduduk
                    </span>
                  </div>
                  <StatNumber value="4290" label="jiwa" />
                </div>
                <div className="bg-white rounded-lg p-3.5 border border-sage-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-500 text-xs font-medium">
                      Lingkungan
                    </span>
                  </div>
                  <StatNumber value="13" label="lingkungan" />
                </div>
                <div className="bg-white rounded-lg p-3.5 border border-sage-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Plane className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-500 text-xs font-medium">
                      Dari Bandara
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-sage-900">~90</p>
                    <p className="text-sage-500 text-xs mt-1">
                      menit berkendara
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3.5 border border-sage-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Trophy className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-500 text-xs font-medium">
                      Prestasi
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-sage-900">Top 75</p>
                    <p className="text-sage-500 text-xs mt-1">ADWI 2023</p>
                  </div>
                </div>
              </div>

              <Link
                href="/profil"
                className="inline-flex items-center gap-2 mt-6 text-sage-500 font-semibold text-sm hover:text-sage-600 transition-colors"
              >
                Selengkapnya tentang desa kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEUNGGULAN ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
              Mengapa Istimewa
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
              Keunggulan Desa Kami
            </h2>
            <div className="section-divider mb-4" />
            <p className="text-sage-600 text-base max-w-xl mx-auto">
              Kakaskasen Dua memiliki keunggulan yang menjadikannya destinasi
              terbaik di Sulawesi Utara.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, i) => (
              <div
                key={item.title}
                className={`feature-card bg-sage-50 rounded-xl p-6 border border-sage-100/50 fade-up stagger-${i + 1
                  }`}
              >
                <div className="feature-icon w-12 h-12 rounded-lg bg-sage-400/12 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-sage-500" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-sage-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PENGUMUMAN TERBARU ─── */}
      {pengumuman.length > 0 && (
        <section className="py-16 md:py-20 bg-sage-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 fade-up">
              <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
                Informasi
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
                Pengumuman Terbaru
              </h2>
              <div className="section-divider mb-4" />
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {pengumuman.map((item, i) => (
                <article
                  key={item.id}
                  className={`bg-white rounded-xl p-5 border shadow-sm fade-up stagger-${i + 1} ${item.is_pinned ? 'border-sage-300' : 'border-sage-100/50'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {item.is_pinned && <Pin className="w-3 h-3 text-sage-500" />}
                    <span className="text-xs font-medium text-sage-400 bg-sage-50 px-2 py-0.5 rounded-full">
                      {item.kategori}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-sage-900 mb-2">
                    {item.judul}
                  </h3>
                  <p className="text-sage-600 text-sm leading-relaxed line-clamp-3">
                    {item.isi}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-sage-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center fade-up">
              <Link
                href="/pengumuman"
                className="inline-flex items-center gap-2 text-sage-500 font-semibold text-sm hover:text-sage-600 transition-colors"
              >
                Lihat semua pengumuman
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── PETA LOKASI ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
              Lokasi
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
              Kakaskasen Dua
            </h2>
            <div className="section-divider mb-4" />
          </div>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-sage-100 shadow-sm fade-up">
            <iframe
              src="https://maps.google.com/maps?q=Kakaskasen+Dua,+Tomohon+Utara,+Sulawesi+Utara&t=h&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Wilayah Kakaskasen Dua di Google Maps"
            />
          </div>
        </div>
      </section>

      {/* ─── CTA PELAPORAN ─── */}
      <section className="py-16 md:py-20 bg-sage-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <Landmark className="w-10 h-10 text-sage-300/60 mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
            Sampaikan Aspirasi Anda
          </h2>
          <p className="text-sage-300/70 text-base max-w-lg mx-auto mb-8">
            Kelurahan Kakaskasen Dua membuka kanal pelaporan untuk menampung
            aspirasi, keluhan, dan masukan dari seluruh warga.
          </p>
          <Link
            href="/pelaporan"
            className="btn-primary text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-sage-500/20 inline-flex items-center gap-2"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Buat Laporan Sekarang
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
