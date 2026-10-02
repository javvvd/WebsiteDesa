'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`back-to-top fixed bottom-6 right-6 z-50 w-11 h-11 bg-sage-500 hover:bg-sage-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors cursor-pointer ${
        show ? 'show' : ''
      }`}
      aria-label="Kembali ke atas"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
