export interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
  trip: string;
  width?: number;
  height?: number;
  featured?: boolean;
  filename?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  coverImage: string;
  images: Photo[];
  date: string;
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface Trip {
  id: string;
  slug: string;
  name: string;
  year: string;
  description: string;
  count: number;
  coverImage: string;
}

export interface SiteSettings {
  siteName: string;
  photographerName: string;
  tagline: string;
  description: string;
  email: string;
  social: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface AboutContent {
  bio: string;
  philosophy: string;
  portraitImage: string;
  gear?: string[];
}
