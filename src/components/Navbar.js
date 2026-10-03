'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import {
  Menu,
  X,
  ChevronRight,
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
} from 'lucide-react';

const navItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Pengumuman', href: '/pengumuman' },
  { label: 'Wisata', href: '/wisata' },
  { label: 'Produk', href: '/produk' },
  { label: 'Pelaporan', href: '/pelaporan' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Close user menu on click outside
  useEffect(() => {
    const handleClick = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [userMenuOpen]);

  const isHome = pathname === '/';
  const bgClass =
    scrolled || !isHome
      ? 'bg-sage-900/95 backdrop-blur-md shadow-md'
      : 'bg-transparent';

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

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
            <div className="hidden lg:flex items-center gap-6">
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

              {/* Separator */}
              <div className="w-px h-5 bg-white/20" />

              {/* Auth Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-sage-400/60 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.nama}</span>
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-sage-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-sage-100">
                        <p className="text-sage-900 text-sm font-semibold">
                          {user.nama}
                        </p>
                        <p className="text-sage-500 text-xs">
                          @{user.username}
                        </p>
                      </div>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sage-700 text-sm hover:bg-sage-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard Admin
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-red-600 text-sm hover:bg-red-50 transition-colors w-full cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>

            {/* Mobile: Login + Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              {user ? (
                <Link
                  href="/admin"
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <LogIn className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setMobileOpen(true)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Buka menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
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
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
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

          {/* Mobile Auth Links */}
          <div className="border-t border-white/10 pt-5 mt-2 w-full flex flex-col items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="text-sage-300 text-lg font-medium flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Admin
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-red-400 text-lg font-medium flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setLoginOpen(true);
                }}
                className="text-white text-lg font-medium flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Login Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
