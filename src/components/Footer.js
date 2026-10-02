import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-sage-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Wave */}
      <div className="footer-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <path
            d="M0 30L48 25C96 20 192 10 288 8.3C384 6.7 480 13.3 576 21.7C672 30 768 40 864 41.7C960 43.3 1056 36.7 1152 31.7C1248 26.7 1344 23.3 1392 21.7L1440 20V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V30Z"
            fill="#F5F3ED"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-sage-400/30 flex items-center justify-center text-white font-bold text-sm font-[family-name:var(--font-heading)]">
                K2
              </div>
              <div>
                <p className="font-semibold text-base leading-tight">
                  Kakaskasen Dua
                </p>
                <p className="text-sage-300/60 text-xs">
                  Kota Tomohon, Sulawesi Utara
                </p>
              </div>
            </div>
            <p className="text-sage-300/70 text-sm leading-relaxed">
              Portal resmi Kelurahan Kakaskasen Dua — menyediakan informasi
              layanan publik, pariwisata, dan pelaporan warga di Kota Tomohon,
              Sulawesi Utara.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Profil Kelurahan', href: '/profil' },
                { label: 'Pariwisata', href: '/wisata' },
                { label: 'Produk Unggulan', href: '/produk' },
                { label: 'Pelaporan Warga', href: '/pelaporan' },
                { label: 'Kontak', href: '/kontak' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-300/70 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              Kontak
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-400 mt-0.5 shrink-0" />
                <p className="text-sage-300/70 text-sm">
                  Kel. Kakaskasen Dua, Kec. Tomohon Utara, Kota Tomohon, Sulawesi Utara 95416
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <p className="text-sage-300/70 text-sm">(0431) xxx-xxxx</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sage-400 shrink-0" />
                <p className="text-sage-300/70 text-sm">
                  kelurahan.kakaskasendua@tomohon.go.id
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-sage-700/50 hover:bg-sage-400/50 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-sage-700/50 hover:bg-sage-400/50 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-sage-700/50 hover:bg-sage-400/50 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-sage-700/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sage-300/50 text-xs text-center md:text-left">
            &copy; {currentYear} Kelurahan Kakaskasen Dua. Hak cipta
            dilindungi.
          </p>
          <p className="text-sage-300/50 text-xs text-center md:text-right">
            Kecamatan Tomohon Utara, Kota Tomohon, Sulawesi Utara
          </p>
        </div>
      </div>
    </footer>
  );
}
