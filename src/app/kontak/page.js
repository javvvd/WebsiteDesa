'use client';

import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Compass,
} from 'lucide-react';

export default function KontakPage() {
  const scrollRef = useScrollAnimation();

  const batasWilayah = [
    { arah: 'Utara', wilayah: 'Kakaskasen Satu' },
    { arah: 'Timur', wilayah: 'Gunung Mahawu' },
    { arah: 'Selatan', wilayah: 'Kakaskasen Tiga' },
    { arah: 'Barat', wilayah: 'Gunung Lokon' },
  ];

  return (
    <div ref={scrollRef}>
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Hubungi Kami
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Kontak & Lokasi
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang layanan Kelurahan
            Kakaskasen Dua.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Contact Info */}
            <div className="fade-left">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-sage-100/50 h-full">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-900 mb-5">
                  Kantor Kelurahan Kakaskasen Dua
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-sage-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sage-900 text-sm mb-0.5">
                        Alamat
                      </p>
                      <p className="text-sage-600 text-sm leading-relaxed">
                        Kelurahan Kakaskasen Dua, Kecamatan Tomohon Utara, Kota
                        Tomohon, Sulawesi Utara 95416
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-sage-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sage-900 text-sm mb-0.5">
                        Jam Operasional
                      </p>
                      <p className="text-sage-600 text-sm">
                        Senin — Jumat: 08.00 — 16.00 WITA
                      </p>
                      <p className="text-sage-500 text-sm">
                        Sabtu — Minggu: Tutup
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-sage-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sage-900 text-sm mb-0.5">
                        Telepon
                      </p>
                      <p className="text-sage-600 text-sm">(0431) xxx-xxxx</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-sage-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sage-900 text-sm mb-0.5">
                        Email
                      </p>
                      <p className="text-sage-600 text-sm">
                        kelurahan.kakaskasendua@tomohon.go.id
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-6 pt-5 border-t border-sage-100">
                  <p className="text-sage-700 text-sm font-medium mb-3">
                    Media Sosial
                  </p>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-lg bg-sage-50 hover:bg-sage-100 flex items-center justify-center transition-colors text-sage-500"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-lg bg-sage-50 hover:bg-sage-100 flex items-center justify-center transition-colors text-sage-500"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-lg bg-sage-50 hover:bg-sage-100 flex items-center justify-center transition-colors text-sage-500"
                      aria-label="YouTube"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Batas Wilayah */}
                <div className="mt-6 pt-5 border-t border-sage-100">
                  <h3 className="font-medium text-sage-900 mb-3 flex items-center gap-2 text-sm">
                    <Compass className="w-4 h-4 text-sage-400" />
                    Batas Wilayah
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {batasWilayah.map((b) => (
                      <div
                        key={b.arah}
                        className="bg-sage-50 rounded-lg px-3 py-2.5"
                      >
                        <p className="text-sage-400 text-xs font-medium uppercase">
                          {b.arah}
                        </p>
                        <p className="text-sage-800 text-sm font-medium">
                          {b.wilayah}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="fade-right">
              <div className="map-container h-full min-h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.276!2d124.8!3d1.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287056c2e16bb03%3A0x7d35d4eb7dd50c54!2sKakaskasen%20Dua%2C%20Tomohon%20Utara%2C%20Kota%20Tomohon%2C%20Sulawesi%20Utara!5e0!3m2!1sid!2sid!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '450px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kakaskasen Dua di Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
