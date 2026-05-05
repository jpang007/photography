import Hero from "@/components/Hero";
import { photos, trips } from "@/data/generatedPhotos";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const recentTrips = [...trips].slice(0, 6);

  return (
    <>
      <Hero />

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-10 border-y border-neutral-200 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
              Portfolio
            </p>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-5xl">
              A personal archive of {photos.length} photographs across places, walks, and small moments.
            </h2>
          </div>
          <div className="md:text-right">
            <Link
              href="/portfolio"
              className="inline-flex min-h-12 items-center border border-neutral-900 px-6 text-sm font-medium uppercase tracking-[0.16em] text-neutral-900 transition-smooth hover:bg-neutral-900 hover:text-white"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {trips.length > 0 && (
        <section className="px-6 pb-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
                  Recent trips
                </p>
                <h2 className="text-3xl md:text-5xl">Travels & Adventures</h2>
              </div>
              <Link href="/portfolio" className="text-sm text-neutral-500 transition-smooth hover:text-neutral-900">
                All photographs
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {recentTrips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/portfolio?trip=${trip.slug}`}
                  className="group"
                >
                  <article>
                    {trip.coverImage && (
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={trip.coverImage}
                          alt={trip.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="mt-4 flex items-start justify-between gap-4 border-t border-neutral-200 pt-4">
                      <div>
                        <h3 className="text-2xl transition-smooth group-hover:text-neutral-600">
                        {trip.name} {trip.year}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">{trip.description}</p>
                      </div>
                      <div className="shrink-0 text-sm text-neutral-500">
                        {trip.count} photos
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
