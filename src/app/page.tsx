import Hero from "@/components/Hero";
import GalleryGrid from "@/components/GalleryGrid";
import { photos, categories } from "@/data/siteData";
import Link from "next/link";

export default function Home() {
  // Get featured photos for homepage
  const featuredPhotos = photos.filter(photo => photo.featured).slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Work */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Featured Work</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              A curated selection of recent projects and favorite captures
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

      {/* Categories Preview */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Explore by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/portfolio?category=${category.slug}`}
                className="group"
              >
                <div className="bg-white p-8 hover:shadow-lg transition-smooth">
                  <h3 className="text-2xl mb-2 group-hover:text-neutral-600 transition-smooth">
                    {category.name}
                  </h3>
                  <p className="text-neutral-600 mb-4">{category.description}</p>
                  <div className="text-sm text-neutral-500">
                    {category.count} photos
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
