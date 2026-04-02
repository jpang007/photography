'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { heroImages } from '@/data/generatedPhotos';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Initialize with shuffled images immediately
  const [shuffledImages] = useState<string[]>(() => {
    return [...heroImages].sort(() => Math.random() - 0.5);
  });

  // Rotate images every 7 seconds
  useEffect(() => {
    if (shuffledImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [shuffledImages]);

  if (shuffledImages.length === 0) return null;

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Hero Images Slideshow */}
      {shuffledImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 p-8 md:p-16 lg:p-24 flex items-center justify-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt="Photography"
              fill
              className="object-contain animate-ken-burns"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

    </section>
  );
}
