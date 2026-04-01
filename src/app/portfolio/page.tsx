'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import TripFilter from '@/components/TripFilter';
import { photos, trips } from '@/data/generatedPhotos';

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const [activeTrip, setActiveTrip] = useState<string | null>(null);

  // Set initial trip from URL
  useEffect(() => {
    const tripParam = searchParams.get('trip');
    if (tripParam) {
      setActiveTrip(tripParam);
    }
  }, [searchParams]);

  // Filter photos by trip
  const filteredPhotos = activeTrip
    ? photos.filter(photo => photo.trip === activeTrip)
    : photos;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Portfolio</h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Explore my photography collection from travels and adventures
          </p>
        </div>

        {/* Trip Filter */}
        <TripFilter
          trips={trips}
          activeTrip={activeTrip}
          onSelectTrip={setActiveTrip}
        />

        {/* Photo Count */}
        <div className="text-center text-sm text-neutral-500 mb-8">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
        </div>

        {/* Gallery */}
        <GalleryGrid photos={filteredPhotos} />
      </div>
    </div>
  );
}
