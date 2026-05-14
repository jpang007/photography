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
    <section className="bg-white px-4 pb-12 pt-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-3 border-b border-neutral-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl leading-none tracking-tight text-neutral-950 md:text-5xl">
              {siteSettings.photographerName}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600 md:text-base">
              Travel, street, landscape, and quiet everyday frames.
            </p>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
            Seattle based
          </p>
        </div>

        <div className="relative h-[70svh] min-h-[440px] w-full overflow-hidden bg-neutral-50">
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
