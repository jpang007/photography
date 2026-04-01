# Image Placement Guide

## Required Images to Add

### 1. Hero Image (Required)
**Location:** `public/images/hero/hero-main.jpg`
**Dimensions:** 2400×1600px (3:2 ratio) or larger
**Purpose:** Main homepage hero image
**Notes:** This is the first thing visitors see - make it your best shot

### 2. About Portrait (Required)
**Location:** `public/images/about/portrait.jpg`
**Dimensions:** 1200×1600px (3:4 portrait ratio)
**Purpose:** Your portrait on the About page
**Notes:** Professional headshot or environmental portrait

### 3. Gallery Images (Required - at least 6)
**Location:** `public/images/gallery/`
**Naming:** `category-number.jpg` (e.g., `street-1.jpg`, `portrait-1.jpg`)
**Dimensions:** 1600×1200px or larger
**Purpose:** Main portfolio gallery
**Notes:** These are your showcase photos that appear in the portfolio

#### Example Gallery Structure:
```
public/images/gallery/
├── street-1.jpg
├── street-2.jpg
├── street-3.jpg
├── portrait-1.jpg
├── portrait-2.jpg
├── travel-1.jpg
├── travel-2.jpg
├── travel-3.jpg
├── landscape-1.jpg
├── landscape-2.jpg
├── editorial-1.jpg
└── editorial-2.jpg
```

### 4. Project Images (Optional)
**Location:** `public/images/projects/project-name/`
**Purpose:** For featured project series
**Example:**
```
public/images/projects/
├── urban-stories/
│   ├── cover.jpg (Project cover image)
│   ├── 01.jpg
│   ├── 02.jpg
│   └── 03.jpg
└── faces-of-the-world/
    ├── cover.jpg
    ├── 01.jpg
    └── 02.jpg
```

## Image Preparation Checklist

### Before Uploading:
- [ ] Export images at appropriate size (don't upload 10MB files)
- [ ] Use JPEG format for photos (PNG for graphics with transparency)
- [ ] Compress images (aim for 200-500KB per image)
- [ ] Rename files with descriptive, lowercase names
- [ ] Check that orientation is correct
- [ ] Ensure images look good on both desktop and mobile

### Recommended Tools:
- **Lightroom/Photoshop:** For export and optimization
- **ImageOptim (Mac):** Lossless compression
- **Squoosh.app:** Web-based image optimizer
- **TinyPNG.com:** Quick online compression

## Image Optimization Settings

### For Hero Images (2400×1600px):
- Quality: 85%
- Format: JPEG
- Target size: 300-600KB

### For Gallery Images (1600×1200px):
- Quality: 80-85%
- Format: JPEG
- Target size: 200-400KB

### For Portrait Images (1200×1600px):
- Quality: 80-85%
- Format: JPEG
- Target size: 200-400KB

## Using Placeholder Images During Development

If you want to test the site before adding your real photos:

1. **Use Unsplash:**
   - Visit [unsplash.com](https://unsplash.com)
   - Download royalty-free images
   - Place in appropriate folders

2. **Use Lorem Picsum:**
   - Placeholder service for testing
   - Example: `https://picsum.photos/1600/1200`
   - **Note:** Replace before going live!

3. **Generate Solid Colors:**
   - Use online tools to create colored rectangles
   - Good for testing layout without distracting imagery

## After Adding Images

1. **Update `src/data/siteData.ts`:**
   - Add each photo to the `photos` array
   - Make sure category slugs match
   - Set correct dimensions
   - Add descriptive alt text

2. **Mark Featured Images:**
   - Set `featured: true` for 3-6 best photos
   - These appear on the homepage

3. **Test the Site:**
   ```bash
   npm run dev
   ```
   - Check that all images load
   - Verify lightbox works
   - Test on mobile view

## Quick Start Template

Copy this into `siteData.ts` and modify:

```typescript
{
  id: 'street-1',
  src: '/images/gallery/street-1.jpg',
  alt: 'Person walking through city street during golden hour',
  title: 'Urban Sunset',
  category: 'street',
  width: 1600,
  height: 1200,
  featured: true,
}
```

## Common Issues

### Image not showing?
- Check file path (case-sensitive!)
- Verify file is in `public/` folder
- Image paths should start with `/images/...` not `public/images/...`

### Image too large/slow?
- Compress your images before upload
- Target: under 500KB per image
- Use JPEG quality 80-85%

### Wrong aspect ratio?
- Check recommended dimensions above
- Crop/resize in Lightroom or Photoshop before upload
- Gallery uses 4:3 ratio by default (modify in GalleryGrid.tsx if needed)

## Pro Tips

1. **Export for web** in Lightroom:
   - Use "Limit File Size" option
   - Set to 400KB for most images
   - Use sRGB color space

2. **Batch export** all images at once:
   - Maintain consistent dimensions
   - Apply same export settings
   - Speeds up workflow

3. **Keep original full-res files** elsewhere:
   - Don't upload full-resolution originals
   - Web-optimized versions only
   - Store originals in cloud backup

4. **Alt text matters:**
   - Write descriptive alt text for accessibility
   - Helps with SEO
   - Useful for screen readers

---

**Ready to start?** Add your hero image first, then at least 6 gallery images, then your portrait. The site will work with just those!
