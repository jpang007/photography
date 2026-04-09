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
      <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-neutral-200"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {photo.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-serif">{photo.title}</h3>
              </div>
            )}
          </div>
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
