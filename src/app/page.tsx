import Hero from "@/components/Hero";
import GalleryGrid from "@/components/GalleryGrid";
import { photos, trips } from "@/data/generatedPhotos";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Get featured photos for homepage (first 6 photos)
  const featuredPhotos = photos.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Work */}
      {featuredPhotos.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4">Featured Work</h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                A curated selection of recent captures
              </p>
            </div>

            <GalleryGrid photos={featuredPhotos} />

            <div className="text-center mt-16">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-smooth"
              >
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trips Preview */}
      {trips.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-neutral-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-center mb-16">Travels & Adventures</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/portfolio?trip=${trip.slug}`}
                  className="group"
                >
                  <div className="bg-white overflow-hidden hover:shadow-lg transition-smooth">
                    {trip.coverImage && (
                      <div className="relative h-64 w-full">
                        <Image
                          src={trip.coverImage}
                          alt={trip.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl mb-2 group-hover:text-neutral-600 transition-smooth">
                        {trip.name} {trip.year}
                      </h3>
                      <p className="text-neutral-600 mb-4">{trip.description}</p>
                      <div className="text-sm text-neutral-500">
                        {trip.count} photos
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
