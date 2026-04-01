# Photography Portfolio Website

A modern, minimal photography portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Clean, editorial design that puts your photos first
- 📱 Fully responsive across mobile, tablet, and desktop
- ⚡ Optimized image loading and performance
- 🖼️ Interactive lightbox for viewing photos
- 🎯 Category-based gallery filtering
- 📧 Contact form
- ♿ Accessibility-friendly navigation
- 🔍 SEO optimized

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
photography-portfolio/
├── public/
│   └── images/
│       ├── hero/              # Hero/banner images
│       ├── gallery/           # Portfolio gallery images
│       ├── projects/          # Project series images
│       └── about/             # About page images (portrait)
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── portfolio/         # Portfolio page
│   │   ├── about/             # About page
│   │   └── contact/           # Contact page
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Lightbox.tsx
│   │   └── ContactForm.tsx
│   ├── data/
│   │   └── siteData.ts        # Site content and configuration
│   └── types/
│       └── index.ts           # TypeScript type definitions
└── README.md
```

## Customization Guide

### 1. Site Settings

Edit `src/data/siteData.ts`:

```typescript
export const siteSettings: SiteSettings = {
  siteName: 'Your Photography',
  photographerName: 'Your Name',
  tagline: 'Your tagline',
  description: 'Your description',
  email: 'your@email.com',
  social: {
    instagram: 'https://instagram.com/yourhandle',
    // Add more social links
  },
};
```

### 2. Adding Photos

1. **Add images to the gallery folder:**
   Place your photos in `public/images/gallery/`

2. **Update the photos array in `src/data/siteData.ts`:**

```typescript
export const photos: Photo[] = [
  {
    id: 'unique-id',
    src: '/images/gallery/your-photo.jpg',
    alt: 'Descriptive alt text',
    title: 'Photo Title',
    category: 'street', // Must match a category slug
    width: 1600,
    height: 1200,
    featured: true, // Optional: shows on homepage
  },
  // Add more photos...
];
```

### 3. Managing Categories

Edit categories in `src/data/siteData.ts`:

```typescript
export const categories: Category[] = [
  {
    id: '1',
    name: 'Street',
    slug: 'street',
    description: 'Urban life and candid moments',
    count: 24, // Update count as you add photos
  },
  // Add more categories...
];
```

### 4. Creating Project Series

For featured projects/photo series:

1. Create a project folder in `public/images/projects/your-project-name/`
2. Add project to `src/data/siteData.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'project-id',
    title: 'Project Title',
    slug: 'project-slug',
    description: 'Project description...',
    category: 'street',
    coverImage: '/images/projects/your-project/cover.jpg',
    date: '2024',
    location: 'Location',
    images: [
      // Add project images here
    ],
  },
];
```

### 5. About Page Content

Update your bio, philosophy, and gear in `src/data/siteData.ts`:

```typescript
export const aboutContent: AboutContent = {
  bio: `Your biography...`,
  philosophy: `Your photography philosophy...`,
  portraitImage: '/images/about/portrait.jpg',
  gear: [
    'Camera body',
    'Lens 1',
    'Lens 2',
    // List your gear
  ],
};
```

### 6. Hero Image

Replace the hero image by adding your image to:
`public/images/hero/hero-main.jpg`

## Image Guidelines

### Recommended Image Specs:

- **Hero images:** 2400×1600px (3:2 ratio)
- **Gallery images:** 1600×1200px or larger
- **Portrait images:** 1200×1600px (3:4 ratio)
- **Format:** JPEG for photos
- **Quality:** 80-90% compression
- **File size:** Aim for under 500KB per image

### Image Naming Convention:

```
category-number.jpg
street-1.jpg
portrait-1.jpg
landscape-1.jpg
```

## Deploying

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository at [vercel.com](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Environment Variables

If you add form submission services (like Formspree, SendGrid), add your API keys to `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

## Extending the Site

### Adding a Services Page

1. Create `src/app/services/page.tsx`
2. Add services content
3. Add link to Navbar component

### Adding a Shop/Prints Page

1. Create `src/app/shop/page.tsx`
2. Integrate with print-on-demand service (Printful, Fine Art America)
3. Or add your own e-commerce logic

### Form Submission

The contact form is currently a placeholder. To make it functional:

**Option 1: Formspree** (easiest)
```typescript
// In ContactForm.tsx
const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
  method: 'POST',
  body: JSON.stringify(formData),
  headers: { 'Content-Type': 'application/json' },
});
```

**Option 2: Next.js API Route**
Create `src/app/api/contact/route.ts` and handle form submission server-side.

## Performance Tips

1. **Optimize images before upload:** Use tools like ImageOptim or Squoosh
2. **Lazy load images:** Next.js Image component handles this automatically
3. **Use WebP format:** Supports better compression (update next.config.js)
4. **Enable caching:** Configure proper cache headers in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Images not showing?
- Check that image paths match exactly (case-sensitive)
- Verify images are in the `public` folder
- Images must use `/images/...` path (not `public/images/...`)

### Build errors?
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Types errors?
```bash
# Regenerate TypeScript config
npx tsc --noEmit
```

## Support

For Next.js questions: [Next.js Documentation](https://nextjs.org/docs)
For Tailwind: [Tailwind Documentation](https://tailwindcss.com/docs)

## License

MIT License - feel free to use this template for your portfolio.

---

Built with Next.js 14, TypeScript, and Tailwind CSS
