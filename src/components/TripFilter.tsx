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
    <div className="mb-12 max-w-4xl mx-auto">
      {/* All Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => onSelectTrip(null)}
          className={`px-8 py-2.5 text-sm tracking-wide transition-smooth ${
            activeTrip === null
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          All Photos
        </button>
      </div>

      {/* Grouped by Year */}
      <div className="space-y-4">
        {tripsByYear.map(({ year, trips: yearTrips }) => (
          <div key={year} className="border border-neutral-200 bg-white">
            {/* Year Header */}
            <button
              onClick={() => toggleYear(year)}
              className="w-full px-6 py-3 flex items-center justify-between hover:bg-neutral-50 transition-smooth"
            >
              <span className="font-medium text-neutral-900">
                {year === 'Other' ? 'Other' : year}
                <span className="ml-2 text-sm text-neutral-500">
                  ({yearTrips.length} {yearTrips.length === 1 ? 'trip' : 'trips'})
                </span>
              </span>
              <span className="text-neutral-400 text-xl">
                {expandedYears.has(year) ? '−' : '+'}
              </span>
            </button>

            {/* Trip Buttons */}
            {expandedYears.has(year) && (
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {yearTrips.map((trip) => (
                  <button
                    key={trip.id}
                    onClick={() => onSelectTrip(trip.slug)}
                    className={`px-5 py-2 text-sm tracking-wide transition-smooth ${
                      activeTrip === trip.slug
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {trip.name}
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
