# Auditik Website - Next.js + TinaCMS + AWS

Modern website for Auditik hearing aid clinic (Philips HearLink distributor) with integrated content management system for non-technical users.

## 🚀 Features

- **Next.js 14** - React framework optimized for SEO and performance
- **TinaCMS** - Headless CMS with Git-backed content management
- **Tailwind CSS** - Utility-first CSS framework with custom Auditik branding
- **Schema Markup** - JSON-LD structured data for search engines and LLM indexing
- **AWS Deployment** - S3 + CloudFront with automatic GitHub Actions workflow
- **TypeScript** - Type-safe development
- **Mobile-First** - Responsive design optimized for all devices

## 📋 Project Structure

```
auditik_website/
├── pages/                    # Next.js pages (routing)
│   ├── _app.tsx             # Global app wrapper
│   ├── _document.tsx        # HTML document setup
│   ├── index.tsx            # Home page
│   ├── blog/                # Blog pages (TinaCMS managed)
│   └── convenios/           # Insurance partners (TinaCMS managed)
├── components/              # Reusable React components
│   ├── Header/
│   ├── Footer/
│   └── Common/
├── lib/                     # Utility functions
│   ├── schema.ts           # JSON-LD schema generation
│   └── seo.ts              # SEO helpers
├── content/                 # Content managed by TinaCMS
│   ├── blog/               # Blog posts (Markdown)
│   └── convenios/          # Insurance partners data
├── public/                  # Static assets
│   ├── images/
│   ├── fonts/
│   └── robots.txt
├── styles/                  # CSS files
│   └── globals.css         # Global Tailwind CSS
├── .tina/                   # TinaCMS configuration
│   └── config.ts           # Schema definitions
├── .github/                 # GitHub Actions
│   └── workflows/
│       └── deploy.yml      # AWS deployment pipeline
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🛠 Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- GitHub account (for TinaCMS and source control)
- AWS account (for deployment)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/acsenrafilho/auditik_website.git
   cd auditik_website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env.local` file** (copy from `.env.example`)

   ```bash
   cp .env.example .env.local
   ```

   Fill in the values with your credentials.

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

5. **Access TinaCMS Admin**
   ```bash
   npm run tina:dev
   ```
   Admin interface available at [http://localhost:3000/admin](http://localhost:3000/admin)

## 🎯 VS Code Development Setup

This project is optimized for **Visual Studio Code** with preconfigured debugging, tasks, and extensions.

### Quick Start in VS Code

All VS Code configuration is in `.vscode/` folder:

- **settings.json** - Workspace settings (formatting, linting, extensions)
- **launch.json** - Debug configurations
- **tasks.json** - Quick tasks to run
- **extensions.json** - Recommended extensions

### Running in VS Code

#### Option 1: Simple Dev Server

Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac) and select `npm: dev`

- Starts Next.js dev server on http://localhost:3000
- Hot reload on file changes
- View output in integrated terminal

#### Option 2: Debug with Breakpoints (F5)

1. Press `F5` or go to **Run → Start Debugging**
2. Choose debug configuration:
   - **Next.js: Local Debug** - Debug Node.js process directly
   - **Next.js: Chrome Debugger** - Debug in Chrome with sourcemaps
   - **Next.js: Full Debug** - Both simultaneously
3. Set breakpoints by clicking line numbers
4. Reload browser to hit breakpoints
5. Use Debug Console to inspect variables

#### Option 3: Run Other Tasks

Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac) to see available tasks:

- `npm: dev` - Start development server
- `npm: build` - Build for production
- `npm: lint` - Run ESLint checks
- `npm: tina:dev` - Start TinaCMS admin
- `npm: start` - Run production build
- `Open localhost:3000` - Open browser preview

### Recommended VS Code Extensions

All extensions are in `.vscode/extensions.json` recommendations:

| Extension                     | Purpose                                       |
| ----------------------------- | --------------------------------------------- |
| **Prettier**                  | Auto-formatting (JS, TS, CSS, JSON, Markdown) |
| **ESLint**                    | Code quality and linting                      |
| **Tailwind CSS IntelliSense** | Tailwind class autocomplete                   |
| **TypeScript**                | Enhanced TypeScript support                   |
| **Live Server**               | Static file server (port 5500)                |
| **Chrome Debugger**           | Debug in Chrome/Edge                          |
| **GitLens**                   | Git blame, history, and timelines             |
| **GitHub Copilot**            | AI code assistance                            |
| **Docker**                    | Container management                          |

To install all recommended extensions:

1. Go to **Extensions** (`Ctrl+Shift+X`)
2. Search for `@recommended`
3. Click **Install All Recommended Extensions**

### Development Workflow

**Edit Code:**

- Make changes to files in `pages/`, `lib/`, `components/`, etc.
- Auto-formatting runs on save (Prettier)
- ESLint fixes common issues automatically

**Debug Issues:**

1. Press `F5` to start debugging
2. Set breakpoints in your code
3. Refresh browser or trigger actions
4. Inspect variables in Debug Console

**View Terminal Output:**

- `npm run dev` shows compilation status
- `npm run tina:dev` shows TinaCMS events
- Watch for any errors or warnings

**Format Code:**

- Press `Shift+Alt+F` (or `Shift+Option+F` on Mac) to format current file
- Formatting runs automatically on save

### Environment Setup

Development server binding:

```env
NODE_ENV=development
HOST=0.0.0.0          # Listen on all interfaces for VS Code preview
PORT=3000             # Next.js dev server port
```

The server is configured to be accessible from:

- `http://localhost:3000` - Local development
- `http://127.0.0.1:3000` - VS Code integrated terminal
- Network IP - Remote VS Code/WSL access
- VS Code preview - Built-in browser

## 📝 Content Management (TinaCMS)

### For Non-Technical Users

1. **Access the CMS**: Go to `yourdomain.com/admin`
2. **Create Blog Post**: Click "Blog Posts" → "New Post"

   - Fill in title, description, author, date
   - Select one or more fixed Topics
   - Upload featured image
   - Write content in markdown editor
   - Click "Save & Publish"

3. **Manage Insurance Partners**: Click "Insurance Partners"
   - Add new partners with name, benefits, coverage details
   - Upload partner logos
   - Changes auto-saved

### Content Files Location

- **Blog posts** saved in: `content/blog/*.md`
- **Insurance Partners** saved in: `content/convenios/index.md`

### Blog Discovery Model

- Blog listing supports full-text search (title, description, author, content)
- Posts can belong to multiple fixed topics
- Topic filters are URL-driven (`/blog?topic=...&q=...`) for shareable links

All content is tracked in Git, providing version history and backup.

## 🔐 Environment Variables

See `.env.example` for all required variables:

- `NEXT_PUBLIC_TINA_CLIENT_ID` - TinaCMS client ID
- `TINA_TOKEN` - TinaCMS token
- `GITHUB_PERSONAL_ACCESS_TOKEN` - Optional PAT for local legacy git workflows
- `AWS_ACCESS_KEY_ID` - AWS credentials
- `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `AWS_REGION` - AWS region (default: us-east-1)
- `AWS_S3_BUCKET` - S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID
- `NEXT_PUBLIC_GOOGLE_ADS_ID` - Google Ads ID (AW-XXXXXXXXX)
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT` - Google Ads conversion label for contact
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_APPOINTMENT` - Google Ads conversion label for appointment
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP` - Google Ads conversion label for WhatsApp
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE` - Google Ads conversion label for phone call

## 🚀 Deployment

### To AWS (Automatic via GitHub Actions)

1. **Set GitHub Secrets** (in repository settings)

   - Add AWS credentials
   - Add CloudFront distribution ID
   - These are used by `.github/workflows/deploy.yml`

2. **Push to main branch**

   ```bash
   git add .
   git commit -m "Deploy changes"
   git push origin main
   ```

3. **Monitor deployment**
   - GitHub Actions automatically builds and deploys
   - Check Actions tab for build status
   - CloudFront cache invalidated automatically

### Manual Deployment

```bash
# Build the site
npm run build
npm run export

# Deploy to S3
aws s3 sync ./out s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 🔍 SEO & LLM Optimization

### Implemented Features

- ✅ JSON-LD schema markup (LocalBusiness, Product, Article, FAQPage)
- ✅ Meta tags and OpenGraph for social sharing
- ✅ Dynamic sitemap generation
- ✅ robots.txt with LLM crawler permissions
- ✅ Image optimization and lazy loading
- ✅ Mobile-first responsive design
- ✅ Core Web Vitals optimized

### Monitoring

- Use [Google Search Console](https://search.google.com/search-console) to monitor indexing
- Check [Schema.org Validator](https://validator.schema.org/) for structured data
- Use [PageSpeed Insights](https://pagespeed.web.dev/) to monitor performance

## 📊 Analytics

Your site automatically tracks:

- Page views
- User interactions
- Form submissions
- Conversion events

Configure Google Analytics ID in `.env.local` with `NEXT_PUBLIC_GA_ID`.

For paid media tracking, also configure Meta and Google Ads variables in `.env.local`:

- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT`
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_APPOINTMENT`
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP`
- `NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE`

## 🎨 Customization

### Colors & Branding

Edit `tailwind.config.js`:

```javascript
colors: {
  'auditik-blue': '#2269a8',      // Primary blue
  'auditik-yellow': '#f6c954',    // CTA yellow
  'auditik-dark-blue': '#1a5488', // Secondary blue
  'bg-cream': '#fffcf0',          // Background cream
  'bg-light-blue': '#f4f9ff',     // Light background
}
```

### Global Styles

Edit `styles/globals.css` to modify:

- Fonts and typography
- Component-level classes
- Custom animations

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### TinaCMS Issues

- Ensure `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are set correctly
- Check repository permissions for the editor account
- Verify file paths in `.tina/config.ts`

### Deployment Issues

- Verify AWS credentials in GitHub Secrets
- Check S3 bucket permissions and CloudFront distribution
- Confirm `CLOUDFRONT_DISTRIBUTION_ID` is correct
- Look at GitHub Actions logs for error details

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TinaCMS Docs](https://tina.io/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3/)
- [CloudFront Docs](https://docs.aws.amazon.com/cloudfront/)

## 🤝 Contributing

For changes to the codebase:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit
3. Push and create a Pull Request
4. Changes are reviewed before merging to main

## 📧 Support

For questions or issues:

- Email: atendimento@auditik.com.br
- WhatsApp: (19) 3377-6941
- GitHub Issues: Create an issue in this repository

## 📄 License

This project is proprietary to Auditik. All rights reserved.

---

**Last Updated**: April 2026  
**Maintained By**: Auditik Development Team
