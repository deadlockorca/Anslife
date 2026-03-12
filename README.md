# ANSLIFE V1 Frontend (Next.js Fullstack) + WordPress CMS Blueprint

This repository implements the agreed V1 blueprint:
1. `muagi.vn` as Next.js frontend/fullstack app
2. `cms.muagi.vn` as WordPress CMS/API backend
3. Vietnamese-first launch with reserved language paths `/en`, `/jp`, `/kr`

## Stack
1. Next.js (App Router) + React 19 + TypeScript
2. Legacy React Router UI bridge (for fast migration without feature loss)
3. React Helmet Async (legacy SEO tags, will be migrated to Next Metadata)
4. WordPress REST API integration (`/wp-json/...`)
5. Next API routes for backend expansion (`/api/...`)

## Main routes
1. `/`
2. `/about-anslife`
3. `/manufacturing-ecosystem`
4. `/quality-control`
5. `/products`
6. `/commercial-process`
7. `/projects`
8. `/global-network`
9. `/scholarship-community`
10. `/news`
11. `/contact`

Detail routes:
1. `/products/:category/:slug`
2. `/projects/:slug`
3. `/news/:slug`

Language placeholders (noindex):
1. `/en`
2. `/jp`
3. `/kr`

## Local development
```bash
cp .env.example .env
npm install
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Environment variables
1. `NEXT_PUBLIC_SITE_URL`
2. `NEXT_PUBLIC_API_BASE_URL`
3. `NEXT_PUBLIC_CF7_QUOTE_FORM_ID`
4. `NEXT_PUBLIC_CF7_MEETING_FORM_ID`
5. `NEXT_PUBLIC_SOCIAL_FACEBOOK_URL`
6. `NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL`
7. `NEXT_PUBLIC_SOCIAL_YOUTUBE_URL`
8. `NEXT_PUBLIC_SOCIAL_TIKTOK_URL`

## WordPress backend package
Custom plugin: `wordpress/muagi-cms-core/muagi-cms-core.php`

It provides:
1. CPT: `product`, `project`
2. Taxonomies: `product_category`, `project_type`
3. REST CORS whitelist for frontend origins

## Deployment docs
1. cPanel deploy: `docs/deploy-cpanel.md`
2. WordPress setup: `docs/wordpress-setup.md`
3. Domain cutover checklist: `docs/cutover-checklist.md`
