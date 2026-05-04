# Photo Generation Scripts

## Overview

This directory contains scripts to automatically generate photo data from your S3 bucket.

## How It Works

The `generate-photos.js` script:

1. **Auto-detects** all folders in `s3://jeremyjpangphotos/gallery/`
2. **Auto-generates** trip metadata from folder names (e.g., `italy-2025` → "Italy" + "2025")
3. **Optionally loads** custom metadata from `trips-config.json` to override defaults

## Adding New Photos

### Simple Approach (No Configuration)

1. Upload photos to S3 in a folder like: `s3://jeremyjpangphotos/gallery/spain-2026/`
2. Run: `npm run generate-photos` (or `node scripts/generate-photos.js`)
3. Done! The trip will automatically appear with:
   - Name: "Spain"
   - Year: "2026"
   - Description: "Spain 2026"

### Custom Labels (Optional)

If you want custom names or descriptions, edit `trips-config.json`:

```json
{
  "spain-2026": {
    "name": "Spain",
    "year": "2026",
    "description": "Flamenco, tapas, and stunning architecture"
  }
}
```

Only add entries for trips you want to customize. All others will use auto-generated metadata.

## Folder Naming Convention

The script parses folder names as: `location-year`

Examples:
- `italy-2025` → Italy 2025
- `japan-2023` → Japan 2023
- `newzealand-2024` → New Zealand 2024
- `random` → Moments (special case)

Multi-word locations work too:
- `costa-rica-2026` → Costa Rica 2026
- `new-york-2026` → New York 2026

## trips-config.json

Optional configuration file for custom trip metadata.

**Structure:**
```json
{
  "folder-name": {
    "name": "Display Name",
    "year": "2025",
    "description": "Custom description here"
  }
}
```

**Notes:**
- Only include trips you want to customize
- Auto-detected trips don't need entries
- The file is optional - delete it to use 100% auto-generation

## Commands

```bash
# Generate photo data from S3
npm run generate-photos

# Or directly
node scripts/generate-photos.js
```
