#!/usr/bin/env node

/**
 * Parse AWS CLI output and generate photo data
 * Run: node scripts/parse-s3-list.js <s3-list-file>
 */

const fs = require('fs');
const path = require('path');

const BUCKET_NAME = 'jeremyjpangphotos';
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com`;
const GALLERY_PREFIX = 'gallery/';
const HERO_PREFIX = 'hero/';

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
  'china-2025': {
    name: 'China',
    year: '2025',
    description: 'Exploring the ancient and modern landscapes of China',
  },
  'italy-2025': {
    name: 'Italy',
    year: '2025',
    description: 'Discovering art, culture, and cuisine in Italy',
  },
  'random': {
    name: 'Moments',
    year: '',
    description: 'Random captures and everyday moments',
  },
};

function isImageFile(key) {
  const ext = path.extname(key).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
}

function generatePhotoId(tripSlug, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  return `${tripSlug}-${nameWithoutExt}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

function parseS3List(inputFile) {
  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  const files = [];

  lines.forEach(line => {
    // Parse AWS CLI output: "2026-04-01 12:57:24   14481439 hero/DSCF4767.jpeg"
    const match = line.match(/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+(\d+)\s+(.+)$/);
    if (match) {
      const size = parseInt(match[1]);
      const key = match[2];

      // Skip folders (size 0) and non-images
      if (size > 0 && isImageFile(key)) {
        files.push(key);
      }
    }
  });

  return files;
}

function generateData(files) {
  console.log(`Processing ${files.length} images...\n`);

  // Separate gallery and hero images
  const galleryFiles = files.filter(f => f.startsWith(GALLERY_PREFIX));
  const heroFiles = files.filter(f => f.startsWith(HERO_PREFIX));

  // Group gallery images by trip
  const tripPhotos = {};

  galleryFiles.forEach((key) => {
    const relativePath = key.replace(GALLERY_PREFIX, '');
    const parts = relativePath.split('/');

    if (parts.length < 2) return; // Skip files not in a trip folder

    const tripSlug = parts[0];
    const filename = parts[parts.length - 1];

    if (!tripPhotos[tripSlug]) {
      tripPhotos[tripSlug] = [];
    }

    tripPhotos[tripSlug].push({
      id: generatePhotoId(tripSlug, filename),
      src: `${S3_BASE_URL}/${key}`,
      alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      trip: tripSlug,
      filename: filename,
    });
  });

  // Generate trips array from metadata (show all trips even if empty)
  const trips = Object.entries(TRIP_METADATA).map(([slug, metadata]) => {
    const photos = tripPhotos[slug] || [];

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
  const heroImages = heroFiles.map((key) => `${S3_BASE_URL}/${key}`);

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
// Run 'bash scripts/update-photos.sh' to regenerate

import { Trip, Photo } from '@/types';

export const S3_BASE_URL = '${S3_BASE_URL}';

export const heroImages: string[] = ${JSON.stringify(heroImages, null, 2)};

export const trips: Trip[] = ${JSON.stringify(trips, null, 2)};

export const photos: Photo[] = ${JSON.stringify(allPhotos, null, 2)};
`;

  const outputPath = path.join(__dirname, '../src/data/generatedPhotos.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`\n✓ Generated ${outputPath}`);
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node parse-s3-list.js <s3-list-file>');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: File not found: ${inputFile}`);
  process.exit(1);
}

const files = parseS3List(inputFile);
generateData(files);
