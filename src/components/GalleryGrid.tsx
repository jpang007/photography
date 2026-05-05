'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';
import Lightbox from './Lightbox';

interface GalleryGridProps {
  photos: Photo[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="columns-2 gap-1.5 md:columns-3 md:gap-2 lg:gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className="group mb-1.5 block w-full break-inside-avoid overflow-hidden bg-neutral-100 text-left md:mb-2 lg:mb-3"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width || 1280}
              height={photo.height || 900}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 6}
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={photos}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentIndex}
        />
      )}
    </>
  );
}
