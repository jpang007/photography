'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import TripFilter from '@/components/TripFilter';
import { photos, trips } from '@/data/generatedPhotos';
import { Photo } from '@/types';

export default function PortfolioPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTrip, setActiveTrip] = useState<string | null>(null);

  // Set initial trip from URL
  useEffect(() => {
    const tripParam = searchParams.get('trip');
    setActiveTrip(tripParam);
  }, [searchParams]);

  // Filter photos by trip
  const filteredPhotos: Photo[] = activeTrip
    ? photos.filter((photo) => photo.trip === activeTrip)
    : photos;
  const activeTripData = activeTrip
    ? trips.find((trip) => trip.slug === activeTrip)
    : null;

  const handleSelectTrip = (slug: string | null) => {
    setActiveTrip(slug);
    router.replace(slug ? `${pathname}?trip=${slug}` : pathname, { scroll: false });
  };

  return (
    <div className="px-4 pb-24 pt-28 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 grid gap-6 border-b border-neutral-200 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
              Portfolio
            </p>
            <h1 className="text-5xl md:text-7xl">
              {activeTripData ? `${activeTripData.name} ${activeTripData.year}` : 'All Photographs'}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
              {activeTripData
                ? activeTripData.description
                : 'A collected view of travel, street, landscape, and everyday photography.'}
            </p>
          </div>
          <div className="text-sm text-neutral-500 md:text-right">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photograph' : 'photographs'}
          </div>
        </div>

        <TripFilter
          trips={trips}
          activeTrip={activeTrip}
          onSelectTrip={handleSelectTrip}
        />

        {activeTrip ? (
          <GalleryGrid key={activeTrip} photos={filteredPhotos} />
        ) : (
          <div className="space-y-16 md:space-y-20">
            {trips.map((trip) => {
              const albumPhotos = photos.filter((photo) => photo.trip === trip.slug);
              if (albumPhotos.length === 0) return null;

              return (
                <section key={trip.slug} aria-labelledby={`album-${trip.slug}`}>
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 pb-4">
                    <h2 id={`album-${trip.slug}`} className="text-2xl md:text-3xl">
                      {trip.name}{trip.year ? ` ${trip.year}` : ''}
                    </h2>
                    <span className="text-sm text-neutral-500">
                      {albumPhotos.length} {albumPhotos.length === 1 ? 'photograph' : 'photographs'}
                    </span>
                  </div>
                  <GalleryGrid photos={albumPhotos} />
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
