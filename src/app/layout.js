import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export const metadata = {
  title: {
    default: 'Portal Kelurahan Kakaskasen Dua — Kota Tomohon',
    template: '%s | Kelurahan Kakaskasen Dua',
  },
  description:
    'Portal resmi Kelurahan Kakaskasen Dua, Kecamatan Tomohon Utara, Kota Tomohon, Sulawesi Utara. Layanan publik, informasi wisata, produk unggulan, dan pelaporan warga.',
  keywords: [
    'Kakaskasen Dua',
    'Kelurahan',
    'Tomohon',
    'Sulawesi Utara',
    'Portal Desa',
    'Pelaporan',
    'Wisata',
  ],
  authors: [{ name: 'Kelurahan Kakaskasen Dua' }],
  openGraph: {
    title: 'Portal Kelurahan Kakaskasen Dua — Kota Tomohon',
    description:
      'Portal resmi Kelurahan Kakaskasen Dua, Kota Tomohon — Layanan publik, wisata, dan pelaporan warga.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sage-50 text-sage-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
