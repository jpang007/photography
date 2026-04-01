'use client';

import { Trip } from '@/types';

interface TripFilterProps {
  trips: Trip[];
  activeTrip: string | null;
  onSelectTrip: (slug: string | null) => void;
}

export default function TripFilter({ trips, activeTrip, onSelectTrip }: TripFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onSelectTrip(null)}
        className={`px-6 py-2 text-sm tracking-wide transition-smooth ${
          activeTrip === null
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
        }`}
      >
        All
      </button>

      {trips.map((trip) => (
        <button
          key={trip.id}
          onClick={() => onSelectTrip(trip.slug)}
          className={`px-6 py-2 text-sm tracking-wide transition-smooth ${
            activeTrip === trip.slug
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          {trip.name} {trip.year}
        </button>
      ))}
    </div>
  );
}
