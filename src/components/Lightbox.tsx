'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentPhoto = photos[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : photos.length - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex < photos.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 text-white">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl leading-none text-white transition-smooth hover:bg-white hover:text-neutral-950 md:right-6 md:top-6"
        aria-label="Close lightbox"
      >
        ×
      </button>

      <button
        onClick={handlePrevious}
        className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-4xl leading-none text-white transition-smooth hover:bg-white hover:text-neutral-950 md:left-6"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-4xl leading-none text-white transition-smooth hover:bg-white hover:text-neutral-950 md:right-6"
        aria-label="Next image"
      >
        ›
      </button>

      <div className="relative flex h-full w-full items-center justify-center px-12 py-16 md:px-24 md:py-20">
        <div className="relative w-full h-full">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
        {currentPhoto.title && (
          <p className="mb-1 text-lg font-serif text-white">{currentPhoto.title}</p>
        )}
        <p className="text-sm text-neutral-400">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
