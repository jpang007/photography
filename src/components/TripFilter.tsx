'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const activeTripData = activeTrip
    ? trips.find((trip) => trip.slug === activeTrip)
    : null;

  const activeYear = activeTripData?.year || (activeTripData ? 'Other' : null);

  // Keep the browser closed by default so linked albums show photos immediately.
  const [isOpen, setIsOpen] = useState(false);

  // Track which years are expanded. Start with the active trip's year only.
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set(activeYear ? [activeYear] : [])
  );

  useEffect(() => {
    if (!activeYear) return;
    setExpandedYears((current) => {
      if (current.has(activeYear)) return current;
      const next = new Set(current);
      next.add(activeYear);
      return next;
    });
  }, [activeYear]);

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
    <div className="mb-8 border-y border-neutral-200">
      <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center justify-between gap-4 text-left transition-smooth hover:text-neutral-600 md:min-w-80"
          aria-expanded={isOpen}
        >
          <span>
            <span className="block text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Albums
            </span>
            <span className="mt-1 block text-sm text-neutral-900">
              {activeTripData
                ? `${activeTripData.name}${activeTripData.year ? ` ${activeTripData.year}` : ''}`
                : 'All photographs'}
            </span>
          </span>
          <span className="text-lg leading-none text-neutral-400" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {activeTrip !== null && (
            <button
              onClick={() => onSelectTrip(null)}
              className="min-h-9 border border-neutral-300 bg-white px-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-600 transition-smooth hover:border-neutral-900 hover:text-neutral-900"
            >
              View all
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="min-h-9 border border-neutral-900 px-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-900 transition-smooth hover:bg-neutral-900 hover:text-white"
          >
            {isOpen ? 'Hide albums' : 'Change album'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 py-3">
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              onClick={() => onSelectTrip(null)}
              className={`min-h-9 border px-3 text-xs font-medium uppercase tracking-[0.14em] transition-smooth ${
                activeTrip === null
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              All photographs
            </button>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {tripsByYear.map(({ year, trips: yearTrips }) => (
              <div key={year} className="border border-neutral-200">
                <button
                  onClick={() => toggleYear(year)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left transition-smooth hover:bg-neutral-50"
                  aria-expanded={expandedYears.has(year)}
                >
                  <span className="text-sm font-medium text-neutral-900">
                    {year === 'Other' ? 'Other' : year}
                    <span className="ml-2 text-xs font-normal text-neutral-500">
                      {yearTrips.length} {yearTrips.length === 1 ? 'album' : 'albums'}
                    </span>
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {expandedYears.has(year) ? 'Collapse' : 'Expand'}
                  </span>
                </button>

                {expandedYears.has(year) && (
                  <div className="flex flex-wrap gap-2 border-t border-neutral-200 p-3">
                    {yearTrips.map((trip) => (
                      <button
                        key={trip.id}
                        onClick={() => {
                          onSelectTrip(trip.slug);
                          setIsOpen(false);
                        }}
                        className={`min-h-9 border px-3 text-sm transition-smooth ${
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
      )}
    </div>
  );
}
