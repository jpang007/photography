# Trip Management Guide

## What Changed?

Your photography app now **auto-detects** trips from S3 folders. No more manual JavaScript updates!

### Before (Old Way)
```javascript
// Had to edit scripts/generate-photos.js every time
const TRIP_METADATA = {
  'china-2023': { name: 'China', year: '2023', ... },
  'japan-2023': { name: 'Japan', year: '2023', ... },
  'italy-2025': { name: 'Italy', year: '2025', ... },
  // ... manually add each new trip
};
```

### After (New Way)
```bash
# Just upload photos to S3
aws s3 sync ./my-photos/ s3://jeremyjpangphotos/gallery/spain-2026/

# Run the generator
npm run generate-photos

# Done! "Spain 2026" automatically appears on your site
```

---

## How It Works

### Auto-Detection
The script scans `s3://jeremyjpangphotos/gallery/` and automatically parses folder names:

| S3 Folder | Auto-Generated Name | Year |
|-----------|-------------------|------|
| `italy-2025` | Italy | 2025 |
| `japan-2023` | Japan | 2023 |
| `new-zealand-2024` | New Zealand | 2024 |
| `costa-rica-2026` | Costa Rica | 2026 |
| `random` | Moments | — |

### Custom Labels (Optional)

If you want custom descriptions or special names, create/edit `scripts/trips-config.json`:

```json
{
  "italy-2025": {
    "name": "Italy",
    "year": "2025",
    "description": "Pasta, wine, and Renaissance art"
  },
  "spain-2026": {
    "name": "España",
    "year": "2026",
    "description": "Flamenco and Gaudí"
  }
}
```

**Key Points:**
- Only add entries for trips you want to customize
- Unlisted trips use auto-generated metadata
- You can delete this file entirely to use 100% auto-generation

---

## Adding New Photos

### Option 1: Fully Automatic (Recommended)

1. Upload to S3:
   ```bash
   aws s3 sync ./thailand-photos/ s3://jeremyjpangphotos/gallery/thailand-2026/
   ```

2. Regenerate:
   ```bash
   npm run generate-photos
   ```

3. Deploy:
   ```bash
   npm run build
   # or push to trigger auto-deploy
   ```

Result: "Thailand 2026" automatically appears with all photos.

### Option 2: With Custom Labels

1. Upload to S3 (same as above)

2. Add custom metadata to `scripts/trips-config.json`:
   ```json
   {
     "thailand-2026": {
       "name": "Thailand",
       "year": "2026",
       "description": "Temples, beaches, and street food"
     }
   }
   ```

3. Regenerate and deploy (same as above)

---

## Folder Naming Tips

**Format:** `location-year`

**Good Examples:**
- `france-2026` → France 2026
- `costa-rica-2026` → Costa Rica 2026
- `new-york-2025` → New York 2025

**Special Cases:**
- `random` → "Moments" (hardcoded special case)
- `phone-2025` → Phone 2025 (any name works)

**Multi-word locations:** Use hyphens between words
- `costa-rica-2026` → "Costa Rica 2026"
- `new-zealand-2024` → "New Zealand 2024"

---

## Commands

```bash
# Generate photo data from S3
npm run generate-photos

# Or use the direct script
node scripts/generate-photos.js

# Legacy update script (uses different approach)
bash scripts/update-photos.sh
```

---

## Migration Notes

Your existing trips in `trips-config.json` preserve all your custom labels. New trips added to S3 will be auto-detected without needing config entries.

If you want to remove custom labels and use auto-generation, just delete that trip's entry from `trips-config.json`.
