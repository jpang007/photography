'use client';

import Image from 'next/image';
import { useState } from 'react';
import { heroImages } from '@/data/generatedPhotos';

export default function Hero() {
  // Pick one random image on load
  const [randomImage] = useState<string>(() => {
    if (heroImages.length === 0) return '';
    return heroImages[Math.floor(Math.random() * heroImages.length)];
  });

  if (!randomImage) return null;

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={randomImage}
            alt="Photography"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
