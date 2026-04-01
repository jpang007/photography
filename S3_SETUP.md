# AWS S3 Setup Guide

Your site is now configured to use AWS S3 for hosting photos. Follow these steps to set up your bucket.

## Step 1: Create S3 Bucket

1. **Go to AWS Console:** [https://console.aws.amazon.com/s3](https://console.aws.amazon.com/s3)
2. **Click "Create bucket"**
3. **Bucket name:** Choose something like `jeremy-pang-photos` (must be globally unique)
4. **Region:** Choose closest to you (e.g., `us-west-2` for Seattle)
5. **Block Public Access:** UNCHECK "Block all public access"
   - ⚠️ Your photos need to be publicly accessible for the website
   - Check the acknowledgment box
6. **Click "Create bucket"**

## Step 2: Configure Bucket for Public Access

1. **Go to your bucket** → **Permissions** tab
2. **Bucket Policy** → Click "Edit"
3. **Paste this policy** (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

4. **Click "Save changes"**

## Step 3: Enable CORS (if needed)

1. **Go to your bucket** → **Permissions** tab
2. **Cross-origin resource sharing (CORS)** → Click "Edit"
3. **Paste this configuration:**

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

4. **Click "Save changes"**

## Step 4: Upload Photos

Create this folder structure in your S3 bucket:

```
YOUR-BUCKET-NAME/
├── hero/
│   └── hero-main.jpg          # Your hero image (2400×1600px)
├── gallery/
│   ├── street-1.jpg
│   ├── street-2.jpg
│   ├── travel-1.jpg
│   ├── landscape-1.jpg
│   ├── architecture-1.jpg
│   └── ... (more photos)
└── about/
    └── portrait.jpg            # Your portrait (1200×1600px)
```

### Upload via AWS Console:

1. Click on your bucket
2. Click "Create folder" for each folder (hero, gallery, about)
3. Click "Upload" to add photos to each folder
4. Make sure files are named exactly as shown above

### Upload via AWS CLI (faster):

```bash
# Install AWS CLI if needed
brew install awscli

# Configure credentials
aws configure

# Upload photos
aws s3 cp hero-main.jpg s3://YOUR-BUCKET-NAME/hero/hero-main.jpg
aws s3 cp street-1.jpg s3://YOUR-BUCKET-NAME/gallery/street-1.jpg
# etc...
```

## Step 5: Update Your Code

1. **Open `src/data/siteData.ts`**
2. **Replace `YOUR-BUCKET-NAME`** at the top:

```typescript
const S3_BASE_URL = 'https://jeremy-pang-photos.s3.amazonaws.com';
```

3. **Open `src/components/Hero.tsx`**
4. **Replace `YOUR-BUCKET-NAME`** in the HERO_IMAGE constant:

```typescript
const HERO_IMAGE = 'https://jeremy-pang-photos.s3.amazonaws.com/hero/hero-main.jpg';
```

5. **Save both files** - the site will automatically reload

## Step 6: Test Your URLs

Try accessing your images directly in a browser:

```
https://YOUR-BUCKET-NAME.s3.amazonaws.com/hero/hero-main.jpg
https://YOUR-BUCKET-NAME.s3.amazonaws.com/gallery/street-1.jpg
```

If you can see the images, you're all set! ✅

---

## Optional: CloudFront CDN (Recommended)

For faster loading and custom domain support:

### 1. Create CloudFront Distribution

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront)
2. Click "Create Distribution"
3. **Origin domain:** Select your S3 bucket
4. **Viewer protocol policy:** Redirect HTTP to HTTPS
5. Click "Create Distribution"
6. Wait 10-15 minutes for deployment

### 2. Update Your URLs

Replace S3_BASE_URL in `siteData.ts` with CloudFront URL:

```typescript
const S3_BASE_URL = 'https://d111111abcdef8.cloudfront.net';
```

### Benefits:
- ✅ Faster loading worldwide
- ✅ Free SSL certificate
- ✅ Can use custom domain (photos.jeremypang.com)
- ✅ Lower costs at scale

---

## Adding New Photos

### Method 1: AWS Console
1. Go to S3 bucket → gallery folder
2. Click "Upload"
3. Add new photo (e.g., `street-4.jpg`)
4. Update `siteData.ts` with new photo entry

### Method 2: AWS CLI
```bash
aws s3 cp new-photo.jpg s3://YOUR-BUCKET-NAME/gallery/street-4.jpg
```

Then add to `siteData.ts`:

```typescript
{
  id: 'street-4',
  src: `${S3_BASE_URL}/gallery/street-4.jpg`,
  alt: 'Description',
  title: 'Photo Title',
  category: 'street',
  width: 1600,
  height: 1200,
}
```

Update the category count in `categories` array.

---

## Cost Estimate

AWS S3 pricing (US West):
- **Storage:** ~$0.023 per GB/month
- **Data Transfer:** First 100 GB/month free, then $0.09/GB
- **Requests:** ~$0.0004 per 1,000 GET requests

Example for personal photography site:
- 100 photos (~50 GB) = ~$1.15/month
- 1,000 visitors/month = negligible cost

Very affordable for personal use! 💰

---

## Troubleshooting

### Images not loading?
- ✅ Check bucket policy is applied
- ✅ Verify files are uploaded to correct folders
- ✅ Test direct URL in browser
- ✅ Check bucket name is correct in code

### CORS errors?
- ✅ Add CORS configuration from Step 3
- ✅ Wait a few minutes for changes to propagate

### 403 Forbidden errors?
- ✅ Bucket must allow public access
- ✅ Bucket policy must be correct
- ✅ Files must be in the right folders

---

## Your S3 URL Pattern

Once set up, your photos will be at:

```
https://YOUR-BUCKET-NAME.s3.amazonaws.com/gallery/PHOTO-NAME.jpg
```

Replace `YOUR-BUCKET-NAME` with your actual bucket name and you're ready to go! 📸
