'use client';

import { useState, useMemo } from 'react';
import { Trip } from '@/types';

interface TripFilterProps {
  trips: Trip[];
  activeTrip: string | null;
  onSelectTrip: (slug: string | null) => void;
}

export default function TripFilter({ trips, activeTrip, onSelectTrip }: TripFilterProps) {
  // Group trips by year
  const tripsByYear = useMemo(() => {
    const grouped: { [year: string]: Trip[] } = {};

    trips.forEach((trip) => {
      const year = trip.year || 'Other';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(trip);
    });

    // Sort years in descending order (newest first)
    const sortedYears = Object.keys(grouped).sort((a, b) => {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return parseInt(b) - parseInt(a);
    });

    return sortedYears.map(year => ({
      year,
      trips: grouped[year]
    }));
  }, [trips]);

  // Track which years are expanded (all expanded by default)
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set(tripsByYear.map(g => g.year))
  );

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
          Browse by trip
        </p>
        <button
          onClick={() => onSelectTrip(null)}
          className={`min-h-10 border px-4 text-xs font-medium uppercase tracking-[0.16em] transition-smooth ${
            activeTrip === null
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
          }`}
        >
          All
        </button>
      </div>

      <div className="space-y-3">
        {tripsByYear.map(({ year, trips: yearTrips }) => (
          <div key={year} className="border-t border-neutral-200 pt-3">
            <button
              onClick={() => toggleYear(year)}
              className="flex w-full items-center justify-between py-2 text-left transition-smooth hover:text-neutral-600"
            >
              <span className="text-sm font-medium text-neutral-900">
                {year === 'Other' ? 'Other' : year}
                <span className="ml-2 text-xs font-normal text-neutral-500">
                  ({yearTrips.length} {yearTrips.length === 1 ? 'trip' : 'trips'})
                </span>
              </span>
              <span className="text-xl leading-none text-neutral-400">
                {expandedYears.has(year) ? '−' : '+'}
              </span>
            </button>

            {expandedYears.has(year) && (
              <div className="flex flex-wrap gap-2 pb-2 pt-1">
                {yearTrips.map((trip) => (
                  <button
                    key={trip.id}
                    onClick={() => onSelectTrip(trip.slug)}
                    className={`min-h-10 border px-4 text-sm transition-smooth ${
                      activeTrip === trip.slug
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                    }`}
                  >
                    {trip.name}{trip.year ? ` ${trip.year}` : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
