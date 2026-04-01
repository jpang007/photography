#!/usr/bin/env node

/**
 * Script to automatically generate photo data from S3 bucket
 * Run: node scripts/generate-photos.js
 */

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const BUCKET_NAME = 'jeremyjpangphotos';
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com`;
const GALLERY_PREFIX = 'gallery/';
const HERO_PREFIX = 'hero/';

const s3Client = new S3Client({ region: 'us-east-2' });

// Trip metadata (update this as you add trips)
const TRIP_METADATA = {
  'china-2023': {
    name: 'China',
    year: '2023',
    description: 'Exploring the ancient and modern landscapes of China',
  },
  'japan-2023': {
    name: 'Japan',
    year: '2023',
    description: 'A journey through Japanese culture and tradition',
  },
  'newzealand-2024': {
    name: 'New Zealand',
    year: '2024',
    description: 'Adventures across the breathtaking landscapes of New Zealand',
  },
  'vancouver-2024': {
    name: 'Vancouver',
    year: '2024',
    description: 'Urban exploration in beautiful Vancouver',
  },
  'random': {
    name: 'Moments',
    year: '',
    description: 'Random captures and everyday moments',
  },
};

async function listS3Objects(prefix) {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });

  const response = await s3Client.send(command);
  return response.Contents || [];
}

function isImageFile(key) {
  const ext = path.extname(key).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
}

function generatePhotoId(tripSlug, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  return `${tripSlug}-${nameWithoutExt}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

async function generatePhotosData() {
  console.log('Fetching images from S3...\n');

  // Get all gallery images
  const galleryObjects = await listS3Objects(GALLERY_PREFIX);
  const heroObjects = await listS3Objects(HERO_PREFIX);

  // Group gallery images by trip
  const tripPhotos = {};

  galleryObjects.forEach((obj) => {
    if (!isImageFile(obj.Key)) return;

    const relativePath = obj.Key.replace(GALLERY_PREFIX, '');
    const parts = relativePath.split('/');

    if (parts.length < 2) return; // Skip files not in a trip folder

    const tripSlug = parts[0];
    const filename = parts[parts.length - 1];

    if (!tripPhotos[tripSlug]) {
      tripPhotos[tripSlug] = [];
    }

    tripPhotos[tripSlug].push({
      id: generatePhotoId(tripSlug, filename),
      src: `${S3_BASE_URL}/${obj.Key}`,
      alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      trip: tripSlug,
      filename: filename,
    });
  });

  // Generate trips array
  const trips = Object.entries(tripPhotos).map(([slug, photos]) => {
    const metadata = TRIP_METADATA[slug] || {
      name: slug.split('-')[0].charAt(0).toUpperCase() + slug.split('-')[0].slice(1),
      year: slug.split('-')[1] || '',
      description: '',
    };

    return {
      id: slug,
      slug: slug,
      name: metadata.name,
      year: metadata.year,
      description: metadata.description,
      count: photos.length,
      coverImage: photos[0]?.src || '',
    };
  });

  // Generate hero images array
  const heroImages = heroObjects
    .filter((obj) => isImageFile(obj.Key))
    .map((obj) => `${S3_BASE_URL}/${obj.Key}`);

  // Generate all photos array
  const allPhotos = Object.values(tripPhotos).flat();

  console.log(`Found ${allPhotos.length} photos across ${trips.length} trips`);
  console.log(`Found ${heroImages.length} hero images\n`);

  trips.forEach((trip) => {
    console.log(`  ${trip.name} ${trip.year}: ${trip.count} photos`);
  });

  // Generate TypeScript file
  const output = `// AUTO-GENERATED - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Run 'node scripts/generate-photos.js' to regenerate

export const S3_BASE_URL = '${S3_BASE_URL}';

export const heroImages = ${JSON.stringify(heroImages, null, 2)};

export const trips = ${JSON.stringify(trips, null, 2)};

export const photos = ${JSON.stringify(allPhotos, null, 2)};
`;

  const outputPath = path.join(__dirname, '../src/data/generatedPhotos.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`\n✓ Generated ${outputPath}`);
  console.log('\nNext: Import from generatedPhotos.ts in your components');
}

generatePhotosData().catch((error) => {
  console.error('Error generating photos:', error);
  process.exit(1);
});
