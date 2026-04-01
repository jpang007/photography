# Deployment Guide

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications. It's free for personal projects.

### Steps:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live at: `your-project.vercel.app`

### Custom Domain (Optional):
- Go to Project Settings → Domains
- Add your custom domain (e.g., `yourphotography.com`)
- Follow DNS configuration instructions

---

## Alternative: Deploy to Netlify

### Steps:

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repo
   - Set build command and directory
   - Deploy

---

## Alternative: Self-Hosting (VPS/Docker)

### Requirements:
- Node.js 18+ installed
- PM2 or similar process manager

### Steps:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Use PM2 for production:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

4. **Set up nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourphotography.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Pre-Deployment Checklist

Before deploying to production:

### Content:
- [ ] Replace all placeholder text in `src/data/siteData.ts`
- [ ] Add your real images (hero, gallery, about portrait)
- [ ] Update photographer name and contact info
- [ ] Set correct social media links
- [ ] Write your bio and philosophy

### Configuration:
- [ ] Update `package.json` name field
- [ ] Check `next.config.js` settings
- [ ] Add `.env.local` if using environment variables
- [ ] Test build locally: `npm run build && npm start`

### Testing:
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Test contact form
- [ ] Verify images load
- [ ] Check lightbox navigation
- [ ] Test category filtering
- [ ] Check SEO meta tags

### Performance:
- [ ] Optimize images (under 500KB each)
- [ ] Test page load speed
- [ ] Run Lighthouse audit
- [ ] Check mobile performance

---

## Post-Deployment

### 1. Set up Analytics (Optional)

**Google Analytics:**
```typescript
// Add to src/app/layout.tsx in <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

**Plausible Analytics:**
```typescript
<Script
  defer
  data-domain="yourphotography.com"
  src="https://plausible.io/js/script.js"
/>
```

### 2. Set up Custom Domain

**On Vercel:**
- Project Settings → Domains → Add Domain
- Update DNS records at your domain registrar
- Wait for DNS propagation (can take 24-48 hours)

**DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Enable HTTPS
- Vercel automatically provides SSL certificates
- Force HTTPS redirect in settings

### 4. SEO Setup

**Add to `layout.tsx`:**
```typescript
export const metadata = {
  title: 'Your Name - Photography',
  description: 'Your description',
  openGraph: {
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

**Create `robots.txt`:**
```txt
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**Create `public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/portfolio</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add more pages -->
</urlset>
```

### 5. Submit to Search Engines
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Submit your sitemap

---

## Continuous Deployment

Once connected to Vercel/Netlify:
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Instant rollback if needed

### Workflow:
```bash
# Make changes locally
git add .
git commit -m "Update gallery images"
git push

# Automatic deployment happens
# Check deployment status on Vercel dashboard
```

---

## Troubleshooting

### Build fails on Vercel:
- Check build logs in Vercel dashboard
- Test build locally: `npm run build`
- Verify all dependencies are in `package.json`

### Images not loading:
- Check image paths (must start with `/images/...`)
- Verify images are in `public/` folder
- Check image file extensions match code

### 404 errors:
- Verify page files exist in `src/app/`
- Check that `page.tsx` files are present
- Clear Next.js cache: `rm -rf .next`

### Slow performance:
- Optimize images before upload
- Enable image optimization in `next.config.js`
- Use Next.js Image component (already implemented)
- Check Lighthouse report for suggestions

---

## Updating Your Live Site

```bash
# 1. Make changes locally
npm run dev  # Test changes

# 2. Commit changes
git add .
git commit -m "Description of changes"

# 3. Push to deploy
git push

# 4. Verify deployment on Vercel dashboard
```

---

## Backup Strategy

1. **Code:** Already backed up on GitHub
2. **Images:** Keep originals in cloud storage (Dropbox, Google Drive)
3. **Content:** Export `siteData.ts` regularly
4. **Database:** (If you add one later) Set up automated backups

---

## Support & Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**Ready to deploy?** Follow the Vercel quick deploy steps above!
