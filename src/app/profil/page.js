'use client';

import Image from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  Users,
  MapPin,
  Plane,
  Trophy,
  Clock,
  Compass,
  Building2,
} from 'lucide-react';

export default function ProfilPage() {
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
            Profil
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Profil Kelurahan
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Mengenal lebih dekat Kelurahan Kakaskasen Dua, Kecamatan Tomohon
            Utara, Kota Tomohon, Sulawesi Utara.
          </p>
        </div>
      </section>

      {/* Sejarah & Gambaran */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
            <div className="fade-left">
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-sage-400/15">
                <Image
                  src="/images/hero-bg.jpg"
                  alt="Panorama Desa Kakaskasen Dua"
                  width={700}
                  height={450}
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </div>

            <div className="fade-right">
              <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
                Gambaran Umum
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-sage-900 mt-2 mb-4">
                Desa di Antara Dua Gunung
              </h2>
              <p className="text-sage-600 leading-relaxed mb-4 text-sm">
                Kakaskasen Dua adalah kelurahan yang berlokasi strategis di
                dataran tinggi Tomohon, diapit oleh dua gunung berapi aktif —
                <strong> Gunung Lokon</strong> di sisi barat dan{' '}
                <strong>Gunung Mahawu</strong> di sisi timur.
              </p>
              <p className="text-sage-600 leading-relaxed mb-4 text-sm">
                Dengan udara sejuk khas pegunungan pada ketinggian 600 meter di
                atas permukaan laut dan pemandangan alam yang memukau, desa ini
                telah diakui sebagai salah satu desa wisata terbaik di Indonesia
                melalui nominasi 75 besar ADWI 2023.
              </p>
              <p className="text-sage-600 leading-relaxed text-sm">
                Selain pesona alamnya, Kakaskasen Dua juga dikenal sebagai
                <strong> sentra bunga utama</strong> yang mendukung kesuksesan
                Tomohon International Flower Festival (TIFF), serta kaya akan
                seni budaya Minahasa seperti Tari Kabasaran dan musik
                Kolintang.
              </p>
            </div>
          </div>

          {/* Sejarah Kelurahan */}
          <div className="fade-up">
            <div className="text-center mb-10">
              <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
                Asal Usul
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
                Sejarah Kelurahan
              </h2>
              <div className="section-divider mb-4" />
              <p className="text-sage-600 text-sm max-w-2xl mx-auto">
                Perjalanan panjang Kelurahan Kakaskasen Dua dari masa ke masa, mencerminkan semangat dan identitas masyarakat Minahasa yang kaya budaya.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* Narasi Sejarah */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-sage-100/50 shadow-sm mb-8">
                <p className="text-sage-700 leading-relaxed text-sm mb-4">
                  Kelurahan Kakaskasen Dua merupakan bagian dari kawasan Kakaskasen yang secara historis didiami oleh masyarakat Minahasa sejak zaman pra-kolonial. Nama <strong>"Kakaskasen"</strong> berasal dari bahasa Tombulu (salah satu sub-etnis Minahasa) yang berarti kawasan yang subur dan makmur.
                </p>
                <p className="text-sage-700 leading-relaxed text-sm mb-4">
                  Pada masa pemerintahan kolonial Belanda, wilayah ini berkembang menjadi pusat pertanian dan perkebunan bunga, seiring dibangunnya jalur transportasi yang menghubungkan Tomohon dengan Manado. Potensi tanah yang subur di lereng gunung berapi menjadikan daerah ini sangat produktif.
                </p>
                <p className="text-sage-700 leading-relaxed text-sm">
                  Setelah kemerdekaan Indonesia, wilayah Kakaskasen dimekarkan menjadi tiga kelurahan yakni Kakaskasen Satu, Kakaskasen Dua, dan Kakaskasen Tiga, sebagai upaya untuk meningkatkan efektivitas pelayanan dan pemerintahan kepada masyarakat setempat.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {[
                  {
                    tahun: 'Pra-1945',
                    judul: 'Era Pra-Kemerdekaan',
                    desc: 'Kawasan Kakaskasen telah didiami masyarakat Minahasa. Berkembang sebagai sentra pertanian dan perkebunan bunga di bawah pengaruh budaya Tombulu.',
                  },
                  {
                    tahun: '1945',
                    judul: 'Kemerdekaan Indonesia',
                    desc: 'Kawasan Kakaskasen menjadi bagian dari Republik Indonesia. Masyarakat aktif berpartisipasi dalam perjuangan dan pembangunan nasional.',
                  },
                  {
                    tahun: '1990-an',
                    judul: 'Pemekaran Wilayah',
                    desc: 'Wilayah Kakaskasen dimekarkan menjadi tiga kelurahan: Kakaskasen Satu, Kakaskasen Dua, dan Kakaskasen Tiga, dalam rangka peningkatan pelayanan publik.',
                  },
                  {
                    tahun: '2022',
                    judul: 'Desa Wisata Unggulan',
                    desc: 'Kelurahan Kakaskasen Dua meraih pengakuan nasional sebagai salah satu desa wisata terbaik, masuk nominasi 75 besar Anugerah Desa Wisata Indonesia (ADWI) 2023.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center shrink-0 text-white text-xs font-bold z-10">
                        {i + 1}
                      </div>
                      {i < 3 && <div className="w-0.5 flex-1 bg-sage-200 my-1" />}
                    </div>
                    <div className={`pb-8 ${i === 3 ? 'pb-0' : ''}`}>
                      <span className="text-sage-400 text-xs font-bold uppercase tracking-widest">
                        {item.tahun}
                      </span>
                      <h4 className="font-[family-name:var(--font-heading)] font-bold text-sage-900 mt-1 mb-1">
                        {item.judul}
                      </h4>
                      <p className="text-sage-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Data Kelurahan */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
              Data
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
              Data Kelurahan
            </h2>
            <div className="section-divider mb-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Users, label: 'Penduduk', value: '4.290', sub: 'jiwa' },
              { icon: MapPin, label: 'Lingkungan', value: '13', sub: 'lingkungan' },
              { icon: Plane, label: 'Dari Bandara', value: '~90', sub: 'menit' },
              { icon: Trophy, label: 'Prestasi', value: 'Top 75', sub: 'ADWI 2023' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-sage-50 rounded-xl p-5 border border-sage-100/50 text-center fade-up"
              >
                <div className="w-11 h-11 rounded-lg bg-sage-400/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-sage-500" />
                </div>
                <p className="text-sage-500 text-xs font-medium mb-1">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-sage-900">{item.value}</p>
                <p className="text-sage-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Batas Wilayah */}
          <div className="bg-sage-50 rounded-xl p-6 border border-sage-100/50 fade-up">
            <h3 className="font-semibold text-sage-900 mb-4 flex items-center gap-2 text-base">
              <Compass className="w-4 h-4 text-sage-400" />
              Batas Wilayah
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {batasWilayah.map((b) => (
                <div key={b.arah} className="bg-white rounded-lg px-4 py-3">
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
      </section>

      {/* Visi Misi */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <span className="text-sage-400 font-semibold text-xs uppercase tracking-widest">
              Arah Pembangunan
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-sage-900 mt-2 mb-3">
              Visi & Misi
            </h2>
            <div className="section-divider mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-sage-100/50 fade-left">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-900 mb-3">
                Visi
              </h3>
              <p className="text-sage-600 text-sm leading-relaxed">
                Mewujudkan Kelurahan Kakaskasen Dua yang mandiri, berdaya saing,
                dan sejahtera melalui pemanfaatan potensi alam, pariwisata, dan
                budaya lokal berlandaskan semangat gotong royong.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-sage-100/50 fade-right">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-900 mb-3">
                Misi
              </h3>
              <ul className="space-y-2">
                {[
                  'Meningkatkan pelayanan publik yang transparan dan akuntabel.',
                  'Mengembangkan potensi wisata alam dan budaya berbasis masyarakat.',
                  'Mendorong pertumbuhan UMKM dan ekonomi kreatif lokal.',
                  'Melestarikan kearifan lokal dan budaya Minahasa.',
                  'Membangun infrastruktur yang mendukung kesejahteraan warga.',
                ].map((misi, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sage-600 text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-sage-400/15 flex items-center justify-center text-sage-500 text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {misi}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Jam Operasional */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <div className="w-11 h-11 rounded-lg bg-sage-400/10 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-5 h-5 text-sage-500" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-sage-900 mb-2">
            Jam Pelayanan
          </h2>
          <p className="text-sage-600 text-sm mb-1">
            Senin — Jumat: 08.00 — 16.00 WITA
          </p>
          <p className="text-sage-500 text-xs">Sabtu — Minggu: Tutup</p>

          <div className="mt-6 bg-sage-50 rounded-xl p-4 border border-sage-100/50 inline-block">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sage-400" />
              <p className="text-sage-700 text-sm">
                Kantor Kelurahan Kakaskasen Dua, Kecamatan Tomohon Utara
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
