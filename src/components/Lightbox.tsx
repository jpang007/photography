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
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl leading-none z-10"
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute left-6 text-white/70 hover:text-white text-5xl z-10"
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-6 text-white/70 hover:text-white text-5xl z-10"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center p-12 md:p-20">
        <div className="relative max-w-7xl max-h-full w-full">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className="w-full h-auto max-h-[80vh] object-contain"
            priority
          />
        </div>
      </div>

      {/* Image Info */}
      {currentPhoto.title && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white text-lg font-serif">{currentPhoto.title}</p>
          <p className="text-white/60 text-sm mt-1">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
