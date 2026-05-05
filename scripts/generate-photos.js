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

function getS3ObjectUrl(key) {
  return `${S3_BASE_URL}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

function getPhotoKey(tripSlug, filename) {
  return `${tripSlug}/${filename}`;
}

function loadPortfolioLayout() {
  const layoutPath = path.join(__dirname, 'portfolio-layout.json');
  if (fs.existsSync(layoutPath)) {
    try {
      const layout = JSON.parse(fs.readFileSync(layoutPath, 'utf-8'));
      console.log('✓ Loaded portfolio layout from portfolio-layout.json\n');
      return layout;
    } catch (error) {
      console.warn('⚠ Error reading portfolio-layout.json, using filename order');
    }
  }

  return {
    tripOrder: [],
    photoOrder: {},
    allPhotoOrder: [],
    dimensions: {},
  };
}

function compareByOrder(order, getKey) {
  const rank = new Map(order.map((key, index) => [key, index]));

  return (a, b) => {
    const aRank = rank.get(getKey(a));
    const bRank = rank.get(getKey(b));

    if (aRank !== undefined && bRank !== undefined) return aRank - bRank;
    if (aRank !== undefined) return -1;
    if (bRank !== undefined) return 1;

    return a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' });
  };
}

// Optional: Load custom trip metadata from trips-config.json
function loadTripConfig() {
  const configPath = path.join(__dirname, 'trips-config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      console.log('✓ Loaded custom trip metadata from trips-config.json\n');
      return config;
    } catch (error) {
      console.warn('⚠ Error reading trips-config.json, using auto-generated metadata');
      return {};
    }
  }
  return {};
}

// Auto-generate trip metadata from folder name
function generateTripMetadata(tripSlug) {
  const parts = tripSlug.split('-');

  // Special case: 'random' folder
  if (tripSlug === 'random') {
    return {
      name: 'Moments',
      year: '',
      description: 'Random captures and everyday moments',
    };
  }

  // Parse location-year format (e.g., "italy-2025" or "newzealand-2024")
  const year = parts[parts.length - 1].match(/^\d{4}$/) ? parts.pop() : '';
  const location = parts.join(' ');

  // Capitalize location name
  const name = location
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    name,
    year,
    description: `${name} ${year}`.trim(),
  };
}

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

  // Load optional custom metadata
  const customMetadata = loadTripConfig();
  const portfolioLayout = loadPortfolioLayout();

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

    const dimensions = portfolioLayout.dimensions?.[getPhotoKey(tripSlug, filename)] || {};

    tripPhotos[tripSlug].push({
      id: generatePhotoId(tripSlug, filename),
      src: getS3ObjectUrl(obj.Key),
      alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      trip: tripSlug,
      filename: filename,
      ...dimensions,
    });
  });

  // Sort photos within each trip by curated sequence, falling back to filename.
  Object.keys(tripPhotos).forEach((slug) => {
    tripPhotos[slug].sort(compareByOrder(portfolioLayout.photoOrder?.[slug] || [], (photo) => photo.filename));
  });

  // Generate trips array with auto-detection and custom overrides
  const trips = Object.entries(tripPhotos).map(([slug, photos]) => {
    // Use custom metadata if available, otherwise auto-generate
    const metadata = customMetadata[slug] || generateTripMetadata(slug);

    return {
      id: slug,
      slug: slug,
      name: metadata.name,
      year: metadata.year,
      description: metadata.description,
      count: photos.length,
      coverImage: photos[0]?.src || '',
    };
  }).sort((a, b) => {
    const order = portfolioLayout.tripOrder || [];
    const aRank = order.indexOf(a.slug);
    const bRank = order.indexOf(b.slug);

    if (aRank !== -1 && bRank !== -1) return aRank - bRank;
    if (aRank !== -1) return -1;
    if (bRank !== -1) return 1;

    return `${b.year}${b.name}`.localeCompare(`${a.year}${a.name}`);
  });

  // Generate hero images array
  const heroImages = heroObjects
    .filter((obj) => isImageFile(obj.Key))
    .map((obj) => getS3ObjectUrl(obj.Key));

  // Generate all photos array with an optional cross-trip editorial sequence.
  const allPhotos = Object.values(tripPhotos)
    .flat()
    .sort(compareByOrder(portfolioLayout.allPhotoOrder || [], (photo) => getPhotoKey(photo.trip, photo.filename)));

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
