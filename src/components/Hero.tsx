'use client';

import Image from 'next/image';
import { useState } from 'react';
import { heroImages } from '@/data/generatedPhotos';
import { siteSettings } from '@/data/siteData';

export default function Hero() {
  // Pick one random image on load
  const [randomImage] = useState<string>(() => {
    if (heroImages.length === 0) return '';
    return heroImages[Math.floor(Math.random() * heroImages.length)];
  });

  if (!randomImage) return null;

  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-white">
      <div className="absolute inset-0 px-4 pb-24 pt-28 md:px-8 lg:px-12">
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

      <div className="relative z-10 flex min-h-[88svh] items-end px-6 pb-10 md:px-12 lg:px-24">
        <div className="max-w-3xl [text-shadow:0_1px_18px_rgba(255,255,255,0.9)]">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
            Seattle based
          </p>
          <h1 className="max-w-2xl text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            {siteSettings.photographerName}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            Travel, street, landscape, and quiet everyday frames.
          </p>
        </div>
      </div>
    </section>
  );
}
