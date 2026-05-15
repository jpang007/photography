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
    <section className="bg-white px-4 pb-12 pt-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="relative h-[78svh] min-h-[460px] w-full overflow-hidden bg-neutral-50">
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
