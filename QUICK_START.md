# Quick Start Guide

Get your photography portfolio running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd photography-portfolio
npm install
```

## Step 2: Update Your Information

Open `src/data/siteData.ts` and update:

```typescript
// 1. Your basic info
export const siteSettings: SiteSettings = {
  siteName: 'Your Photography',           // ← Change this
  photographerName: 'Your Name',           // ← Change this
  tagline: 'Your tagline',                // ← Change this
  description: 'Your description',        // ← Change this
  email: 'your@email.com',               // ← Change this
  social: {
    instagram: 'https://instagram.com/yourhandle', // ← Change this
  },
};
```

## Step 3: Add Your Images

### Required images to add:

1. **Hero image:** `public/images/hero/hero-main.jpg`
   - Your best landscape photo (2400×1600px)

2. **Gallery images:** `public/images/gallery/`
   - Add at least 6 photos
   - Name them: `street-1.jpg`, `portrait-1.jpg`, etc.

3. **Portrait:** `public/images/about/portrait.jpg`
   - Your headshot or portrait (1200×1600px)

### Update photo data in `siteData.ts`:

```typescript
export const photos: Photo[] = [
  {
    id: 'street-1',
    src: '/images/gallery/street-1.jpg',
    alt: 'Description of photo',
    title: 'Photo Title',
    category: 'street',
    width: 1600,
    height: 1200,
    featured: true, // Shows on homepage
  },
  // Add more photos...
];
```

## Step 4: Update Your Bio

In `siteData.ts`, update:

```typescript
export const aboutContent: AboutContent = {
  bio: `Your bio here...`,              // ← Write your story
  philosophy: `Your philosophy...`,      // ← Your approach
  portraitImage: '/images/about/portrait.jpg',
  gear: [                                // ← Optional: list your gear
    'Your camera',
    'Your lenses',
  ],
};
```

## Step 5: Run the Site

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 6: Customize Categories (Optional)

Edit categories in `siteData.ts`:

```typescript
export const categories: Category[] = [
  {
    id: '1',
    name: 'Street',              // Category name
    slug: 'street',              // URL slug
    description: 'Urban life',    // Short description
    count: 3,                    // Number of photos
  },
  // Add/remove categories as needed
];
```

Make sure photo `category` values match these `slug` values!

## Common First-Time Issues

### "Image not found" error?
- Check that images are in `public/images/` folder
- Paths should be `/images/...` not `public/images/...`
- Check spelling and case (image-1.jpg vs Image-1.jpg)

### Categories not working?
- Photo `category` must match category `slug`
- Example: photo has `category: 'street'`, category must have `slug: 'street'`

### Hero image not showing?
- Make sure it's named exactly: `hero-main.jpg`
- Place in: `public/images/hero/hero-main.jpg`

## What's Next?

1. **Add more photos** - Aim for 20-30 for a full portfolio
2. **Customize colors** - Edit `tailwind.config.ts` if desired
3. **Test on mobile** - Open on your phone to check responsiveness
4. **Deploy** - Follow `DEPLOYMENT.md` when ready to go live

## Need Help?

- **Images:** See `IMAGE_GUIDE.md`
- **Full docs:** See `README.md`
- **Deployment:** See `DEPLOYMENT.md`

---

**You're all set!** Your portfolio should be running locally. Start adding your photos and customizing the content.
