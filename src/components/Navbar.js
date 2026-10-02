'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Wisata', href: '/wisata' },
  { label: 'Produk', href: '/produk' },
  { label: 'Pelaporan', href: '/pelaporan' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const bgClass = scrolled || !isHome
    ? 'bg-sage-900/95 backdrop-blur-md shadow-md'
    : 'bg-transparent';

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-sage-400/80 flex items-center justify-center text-white font-bold text-sm font-[family-name:var(--font-heading)] group-hover:bg-sage-500 transition-colors">
                K2
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm leading-tight">
                  Kakaskasen Dua
                </p>
                <p className="text-white/60 text-xs">Kota Tomohon</p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-white active'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-0 z-[60] bg-sage-900/98 backdrop-blur-lg flex flex-col ${
          mobileOpen ? 'open' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-white font-semibold font-[family-name:var(--font-heading)] text-lg">
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-xl font-medium transition-colors flex items-center gap-2 ${
                pathname === item.href
                  ? 'text-sage-300'
                  : 'text-white hover:text-sage-300'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
