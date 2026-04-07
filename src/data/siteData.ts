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

const S3_BASE_URL = 'https://jeremyjpangphotos.s3.us-east-2.amazonaws.com';

// REPLACE: Update your about content
export const aboutContent: AboutContent = {
  bio: `I grew up in Southern California and studied computer science at the University of California, Riverside. Since 2020, I've been interested in photography and have been taking amateur photos for pleasure. Currently based in Seattle, I enjoy exploring the world through my lens.

When I'm not behind the camera, I'm studying French and Spanish, and practicing jiu jitsu.

*Vivre l'instant présent.*`,

  philosophy: ``,

  portraitImage: `${S3_BASE_URL}/about/portrait.jpg`,

  gear: [],
};
