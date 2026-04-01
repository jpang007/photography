import { SiteSettings, Category, Photo, Project, AboutContent } from '@/types';

// REPLACE: Update with your actual information
export const siteSettings: SiteSettings = {
  siteName: 'Jeremy Pang Photography',
  photographerName: 'Jeremy Pang',
  tagline: 'Visual Stories Through Light',
  description: 'Amateur photography from Seattle',
  email: 'hello@yourphotography.com',
  social: {
    instagram: 'https://instagram.com/yourhandle',
    // twitter: 'https://twitter.com/yourhandle',
    // facebook: 'https://facebook.com/yourpage',
    // linkedin: 'https://linkedin.com/in/yourprofile',
  },
};

// REPLACE: Define your photography categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Street',
    slug: 'street',
    description: 'Urban life and candid moments',
    count: 0,
  },
  {
    id: '2',
    name: 'Travel',
    slug: 'travel',
    description: 'Places and cultures',
    count: 0,
  },
  {
    id: '3',
    name: 'Landscape',
    slug: 'landscape',
    description: 'Nature and scenery',
    count: 0,
  },
  {
    id: '4',
    name: 'Architecture',
    slug: 'architecture',
    description: 'Buildings and structures',
    count: 0,
  },
];

// REPLACE: Update with your S3 bucket URL
// After creating your S3 bucket, replace YOUR-BUCKET-NAME below
const S3_BASE_URL = 'https://jeremyjpangphotos.s3.us-east-2.amazonaws.com';
// OR use CloudFront: 'https://YOUR-CLOUDFRONT-ID.cloudfront.net'

// REPLACE: Add your hero images (they will rotate randomly)
export const heroImages = [
  `${S3_BASE_URL}/hero/hero-1.jpg`,
  `${S3_BASE_URL}/hero/hero-2.jpg`,
  `${S3_BASE_URL}/hero/hero-3.jpg`,
  `${S3_BASE_URL}/hero/hero-4.jpg`,
  `${S3_BASE_URL}/hero/hero-5.jpg`,
  // Add more hero images as you upload them
];

export const photos: Photo[] = [
  // Street
  {
    id: 'street-1',
    src: `${S3_BASE_URL}/gallery/street-1.jpg`,
    alt: 'City street scene',
    title: 'Urban Rhythm',
    category: 'street',
    width: 1600,
    height: 1200,
    featured: true,
  },
  {
    id: 'street-2',
    src: `${S3_BASE_URL}/gallery/street-2.jpg`,
    alt: 'Person walking in rain',
    title: 'Rainy Days',
    category: 'street',
    width: 1200,
    height: 1600,
  },
  {
    id: 'street-3',
    src: `${S3_BASE_URL}/gallery/street-3.jpg`,
    alt: 'Market scene',
    title: 'Market Life',
    category: 'street',
    width: 1600,
    height: 1200,
  },

  // Travel
  {
    id: 'travel-1',
    src: `${S3_BASE_URL}/gallery/travel-1.jpg`,
    alt: 'Mountain landscape',
    title: 'Alpine Morning',
    category: 'travel',
    width: 1600,
    height: 900,
    featured: true,
  },
  {
    id: 'travel-2',
    src: `${S3_BASE_URL}/gallery/travel-2.jpg`,
    alt: 'Temple architecture',
    title: 'Sacred Spaces',
    category: 'travel',
    width: 1200,
    height: 1600,
  },
  {
    id: 'travel-3',
    src: `${S3_BASE_URL}/gallery/travel-3.jpg`,
    alt: 'Coastal scene',
    title: 'Ocean Views',
    category: 'travel',
    width: 1600,
    height: 1200,
  },

  // Landscape
  {
    id: 'landscape-1',
    src: `${S3_BASE_URL}/gallery/landscape-1.jpg`,
    alt: 'Mountain peaks at sunset',
    title: 'Golden Hour',
    category: 'landscape',
    width: 1600,
    height: 900,
    featured: true,
  },
  {
    id: 'landscape-2',
    src: `${S3_BASE_URL}/gallery/landscape-2.jpg`,
    alt: 'Forest path',
    title: 'Into the Woods',
    category: 'landscape',
    width: 1200,
    height: 1600,
  },

  // Architecture
  {
    id: 'architecture-1',
    src: `${S3_BASE_URL}/gallery/architecture-1.jpg`,
    alt: 'Modern building',
    title: 'Lines and Curves',
    category: 'architecture',
    width: 1200,
    height: 1600,
  },
  {
    id: 'architecture-2',
    src: `${S3_BASE_URL}/gallery/architecture-2.jpg`,
    alt: 'Historic structure',
    title: 'Timeless Design',
    category: 'architecture',
    width: 1600,
    height: 1200,
  },
];

// REPLACE: Add your featured projects/series
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Seattle Streets',
    slug: 'seattle-streets',
    description: 'A visual exploration of Seattle street life, capturing the rhythm of the city.',
    category: 'street',
    coverImage: '/images/projects/seattle-streets-cover.jpg',
    date: '2024',
    location: 'Seattle, WA',
    images: [
      {
        id: 'urban-1',
        src: '/images/projects/seattle-streets/01.jpg',
        alt: 'Street scene',
        category: 'street',
        width: 1600,
        height: 1200,
      },
      {
        id: 'urban-2',
        src: '/images/projects/seattle-streets/02.jpg',
        alt: 'City lights',
        category: 'street',
        width: 1200,
        height: 1600,
      },
      // Add more project images
    ],
  },
  {
    id: 'project-2',
    title: 'Pacific Northwest',
    slug: 'pacific-northwest',
    description: 'Natural beauty of the Pacific Northwest, from mountains to coastlines.',
    category: 'landscape',
    coverImage: '/images/projects/pnw-cover.jpg',
    date: '2024',
    location: 'Washington State',
    images: [
      {
        id: 'pnw-1',
        src: '/images/projects/pacific-northwest/01.jpg',
        alt: 'Mountain vista',
        category: 'landscape',
        width: 1600,
        height: 1200,
      },
      // Add more project images
    ],
  },
];

// REPLACE: Update your about content
export const aboutContent: AboutContent = {
  bio: `I'm based in Seattle and enjoy taking photos for fun. Photography is my creative outlet and a way to explore the world around me.`,

  philosophy: ``,

  portraitImage: `${S3_BASE_URL}/about/portrait.jpg`,

  gear: [],
};
