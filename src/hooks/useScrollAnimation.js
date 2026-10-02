'use client';

import { useEffect, useRef } from 'react';

export default function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current || document;
    const elements = container.querySelectorAll('.fade-up, .fade-left, .fade-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
