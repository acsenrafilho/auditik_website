# Deployment Guide - Auditik Website

Complete guide for deploying the Auditik website to AWS using GitHub Actions, S3, and CloudFront.

## 📋 Prerequisites

Before you can deploy, you need:

1. **AWS Account** with permissions to:
   - Create/manage S3 buckets
   - Create/manage CloudFront distributions
   - Use Route53 for DNS
   - Access CloudWatch for monitoring

2. **GitHub Account** with repository access

3. **Domain**: auditik.com.br (already owned)

## 🔧 AWS Infrastructure Setup

### Step 1: Create S3 Bucket

```bash
# Create S3 bucket for static website
aws s3api create-bucket \
  --bucket auditik-website-prod \
  --region us-east-1

# Enable versioning for rollback capability
aws s3api put-bucket-versioning \
  --bucket auditik-website-prod \
  --versioning-configuration Status=Enabled

# Block public access (CloudFront will access via OAI)
aws s3api put-public-access-block \
  --bucket auditik-website-prod \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Set bucket policy to allow CloudFront only
# (See CloudFront section below)
```

### Step 2: Create CloudFront Distribution

1. Go to AWS CloudFront Console
2. Click "Create distribution"
3. Configure:
   - **Origin domain**: `auditik-website-prod.s3.us-east-1.amazonaws.com`
   - **Origin access identity**: Create new (OAI)
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP methods**: GET, HEAD, OPTIONS
   - **Cache policy**:
     - HTML: 24 hours (86400 seconds)
     - Static assets (.js, .css, .woff): 365 days (31536000 seconds)
     - Images: 365 days
   - **Compress objects**: Yes (gzip + brotli)
   - **HTTP/2**: Enabled
   - **TLS 1.2+**: Yes

4. **Add Custom Domain**:
   - Alternative domain name: `auditik.com.br`
   - SSL certificate: Use AWS Certificate Manager (or request new)
   - Minimum SSL/TLS version: TLSv1.2_2021

5. **Copy Distribution ID** (you'll need this for GitHub Actions)

### Step 3: Configure Route53 DNS

1. Go to Route53 Console
2. Select Hosted Zone for `auditik.com.br`
3. Create A record:
   - Name: `auditik.com.br`
   - Type: A (IPv4 address)
   - Alias: Yes
   - Alias target: Your CloudFront distribution
   - Routing policy: Simple
   - Evaluate target health: No

Wait ~15 minutes for DNS propagation.

### Step 4: Update S3 Bucket Policy

Allow CloudFront OAI to read S3:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "CloudFrontAccess",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity [YOUR_OAI]"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::auditik-website-prod/*"
        }
    ]
}
```

Replace `[YOUR_OAI]` with your CloudFront OAI ID.

## 🔐 GitHub Secrets Configuration

Add these to your repository secrets (Settings → Secrets → Actions):

| Secret Name | Value | Example |
|-------------|-------|---------|
| AWS_ACCESS_KEY_ID | Your AWS access key | AKIA2XXXXXXXXXXXX |
| AWS_SECRET_ACCESS_KEY | Your AWS secret key | wJal0SECRET... |
| AWS_REGION | AWS region | us-east-1 |
| AWS_S3_BUCKET | S3 bucket name | auditik-website-prod |
| CLOUDFRONT_DISTRIBUTION_ID | CloudFront ID | E1XXXXXXXXXXXXX |
| NEXT_PUBLIC_GA_ID | Google Analytics ID | G-XXXXXXXXXXXX |

### How to Add GitHub Secrets

1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with the name and value
5. Click "Add secret"

## 🚀 Deployment Process

### Automatic Deployment (Recommended)

Every push to `main` branch triggers automatic deployment:

```bash
# Make changes locally
git add .
git commit -m "Update website content"
git push origin main

# GitHub Actions automatically:
# 1. Checks out code
# 2. Installs npm dependencies
# 3. Builds Next.js project
# 4. Exports static files to ./out/
# 5. Syncs /out/ to S3
# 6. Invalidates CloudFront cache
# 7. Updates live site
```

**Deployment time**: ~3-5 minutes

### Manual Deployment

If needed to deploy without committing:

```bash
# Set AWS credentials
export AWS_ACCESS_KEY_ID="your_key"
export AWS_SECRET_ACCESS_KEY="your_secret"
export AWS_REGION="us-east-1"

# Build the site
npm run build
npm run export

# Deploy to S3
aws s3 sync ./out s3://auditik-website-prod --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 📊 Monitoring Deployment

### GitHub Actions

1. Go to repository → Actions tab
2. Select "Deploy to AWS S3 + CloudFront" workflow
3. Monitor the current/latest run:
   - Green ✅ = Success
   - Red ❌ = Failed

### S3 Console

Verify files uploaded:
1. AWS Console → S3
2. Select `auditik-website-prod` bucket
3. Look for `index.html`, `_next/`, etc.
4. Check "Objects" → "Last modified" timestamp

### CloudFront

Check cache status:
1. AWS Console → CloudFront
2. Select distribution
3. Check "Last modified" and "Status" (Deployed = live)

## 🔄 Rollback Procedures

### Quick Rollback to Previous Version

If something breaks after deployment:

```bash
# Version 1: Revert to previous commit
git revert HEAD
git push origin main
# GitHub Actions will auto-redeploy previous version

# Version 2: Redeploy previous S3 version
aws s3 sync s3://auditik-website-prod ./out \
  --sse AES256 \
  --storage-class STANDARD_IA \
  --restore "Days=1"
```

### S3 Version Recovery

Since versioning is enabled:

1. AWS Console → S3 → `auditik-website-prod`
2. Click "Show" next to "Versions"
3. Select file and restore previous version
4. Invalidate CloudFront (`/*`)

## 🧪 Pre-Deployment Testing

Before pushing to `main`, test locally:

```bash
# Build locally
npm run build

# Test exported site
npm run export

# Serve locally to test
npx http-server ./out

# Visit http://localhost:8080 and check:
# - [ ] All pages load
# - [ ] Links work
# - [ ] Images display
# - [ ] Responsive on mobile (DevTools)
# - [ ] No console errors (F12)
```

## 📈 Performance Optimization

### Cache Headers

The deployment automatically sets:

- **HTML files** (index.html, etc.):
  - Cache-Control: public, max-age=3600 (1 hour)
  - Reason: Frequent updates

- **Static assets** (.js, .css, .woff, .ttf):
  - Cache-Control: public, max-age=31536000, immutable (1 year)
  - Reason: Hashed filenames change with every build

- **Images**:
  - Cache-Control: public, max-age=31536000 (1 year)
  - Reason: Optimized by Next.js

### Monitoring Performance

Check site speed:
1. [PageSpeed Insights](https://pagespeed.web.dev/) → Enter auditik.com.br
2. [WebPageTest](https://www.webpagetest.org/) → Detailed analysis
3. CloudWatch → Monitor CDN metrics

Target scores:
- ✅ Performance: 90+
- ✅ Accessibility: 90+
- ✅ Best Practices: 90+
- ✅ SEO: 95+

## 🔍 SEO & Indexing

### Google Search Console

1. Sign in to [Google Search Console](https://search.google.com/search-console)
2. Add property: `auditik.com.br`
3. Verify domain (DNS method recommended)
4. Submit sitemap: `https://auditik.com.br/sitemap.xml`
5. Check for crawl errors

### Bing Webmaster Tools

1. Sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `auditik.com.br`
3. Submit sitemap

## 🆘 Troubleshooting

### Issue: Deployment fails in GitHub Actions

**Check**:
1. GitHub Secrets are set correctly (❌ typos common)
2. AWS credentials are valid (not expired)
3. S3 bucket exists
4. CloudFront distribution ID is correct

**Fix**:
```bash
# Test AWS credentials locally
aws s3 ls s3://auditik-website-prod --region us-east-1

# If fails, update GitHub Secrets
```

### Issue: Site shows old content after deploy

**Cause**: CloudFront cache not invalidated  
**Fix**:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_ID \
  --paths "/*"
```

### Issue: CloudFront says "Access Denied"

**Cause**: S3 bucket policy not configured correctly  
**Fix**:
1. Verify OAI is correct in bucket policy
2. Ensure S3 block public access is enabled
3. Check CloudFront origin access setting

### Issue: Domain doesn't resolve

**Check**:
1. Route53 A record points to CloudFront (not S3 directly)
2. DNS propagation (can take 15 min - 48 hours)
3. CloudFront distribution status is "Deployed"

```bash
# Check DNS (should resolve to CloudFront)
dig auditik.com.br
nslookup auditik.com.br
```

## 📞 Support

- **AWS Support**: https://support.aws.amazon.com/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **CloudFront Docs**: https://docs.aws.amazon.com/cloudfront/

---

**Deployment Checklist**:
- [ ] AWS infrastructure (S3, CloudFront, Route53) configured
- [ ] GitHub Secrets added to repository
- [ ] DNS pointing to CloudFront
- [ ] GitHub Actions workflow passing
- [ ] Site accessible at auditik.com.br
- [ ] CloudFront showing as "Deployed"
- [ ] Sitemap submitted to Google Search Console

**Ready to deploy!** 🚀
