'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { photos, categories } from '@/data/siteData';

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Set initial category from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter photos by category
  const filteredPhotos = activeCategory
    ? photos.filter(photo => photo.category === activeCategory)
    : photos;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Portfolio</h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Explore my photography collection across different genres and styles
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
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
