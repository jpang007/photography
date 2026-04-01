'use client';

import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-6 py-2 text-sm tracking-wide transition-smooth ${
          activeCategory === null
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          className={`px-6 py-2 text-sm tracking-wide transition-smooth ${
            activeCategory === category.slug
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
