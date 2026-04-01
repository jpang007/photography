# Photo Workflow

## Adding New Photos

### 1. Upload to S3

Upload your photos to the appropriate trip folder in your S3 bucket:

```
jeremyjpangphotos/
├── gallery/
│   ├── china-2023/
│   │   ├── any-filename-1.jpg
│   │   ├── any-filename-2.jpg
│   │   └── ...
│   ├── japan-2023/
│   ├── newzealand-2024/
│   ├── vancouver-2024/
│   └── random/
└── hero/
    ├── hero-image-1.jpg
    ├── hero-image-2.jpg
    └── ...
```

**You can use ANY filename** - the script automatically picks up all images.

### 2. Regenerate Photo Data

After uploading, run:

```bash
bash scripts/update-photos.sh
```

This will:
- Fetch the latest file list from S3
- Automatically generate photo data
- Update `src/data/generatedPhotos.ts`

The site will automatically reload with your new photos.

### 3. Add New Trips

To add a new trip folder:

1. Create the folder in S3: `gallery/paris-2025/`
2. Upload photos to it
3. Edit `scripts/parse-s3-list.js` and add trip metadata:

```javascript
const TRIP_METADATA = {
  // ... existing trips
  'paris-2025': {
    name: 'Paris',
    year: '2025',
    description: 'Spring in the City of Light',
  },
};
```

4. Run `bash scripts/update-photos.sh`

## Trip Metadata

Edit trip names, years, and descriptions in `scripts/parse-s3-list.js`:

```javascript
const TRIP_METADATA = {
  'china-2023': {
    name: 'China',
    year: '2023',
    description: 'Exploring the ancient and modern landscapes of China',
  },
  // Add more trips here
};
```

## Quick Commands

```bash
# Update photos from S3
bash scripts/update-photos.sh

# Start dev server
npm run dev

# Build for production
npm run build
```

## Notes

- No need to name files specifically - any JPG/PNG/JPEG works
- Hero images rotate randomly every 5 seconds
- Trip cover images use the first photo in the folder
- All photos are automatically optimized by Next.js
