'use client';

import Image from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  Mountain,
  Church,
  Flower,
  Trees,
  ChefHat,
} from 'lucide-react';

const wisataData = [
  {
    title: 'Taman Kelong',
    category: 'Wisata Kuliner & Rekreasi',
    desc: 'Nikmati suasana santai dengan pemandangan alam sambil menikmati hidangan khas di tengah taman yang asri.',
    icon: Trees,
  },
  {
    title: 'Taman Wisata Pelangi',
    category: 'Wisata Keluarga',
    desc: 'Destinasi rekreasi keluarga yang penuh warna dengan berbagai spot foto menarik dan fasilitas bermain.',
    icon: Flower,
  },
  {
    title: 'Tomohon Show Window',
    category: 'Agrowisata',
    desc: 'Pusat pameran dan percontohan pertanian unggulan, menampilkan keindahan budidaya bunga dan tanaman khas Tomohon.',
    icon: Mountain,
  },
];

export default function WisataPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* Header */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sage-300/60 font-semibold text-xs uppercase tracking-widest">
            Destinasi
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Pariwisata
          </h1>
          <p className="text-sage-300/70 text-base max-w-xl mx-auto">
            Dari pendakian gunung berapi hingga agrowisata bunga, Kakaskasen Dua
            menawarkan pengalaman wisata yang tak terlupakan.
          </p>
        </div>
      </section>

      {/* Wisata Grid */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wisataData.map((item, i) => (
              <div
                key={item.title}
                className={`img-card relative group rounded-2xl shadow-md overflow-hidden fade-up stagger-${
                  (i % 4) + 1
                }`}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="placeholder-img w-full h-72">
                    {item.icon && (
                      <item.icon className="w-14 h-14 text-white/50" />
                    )}
                  </div>
                )}
                <div className="card-overlay absolute inset-0 flex flex-col justify-end p-5">
                  <span className="bg-sage-400/80 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full self-start mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white text-lg font-bold font-[family-name:var(--font-heading)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
