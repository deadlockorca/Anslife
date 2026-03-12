# Cutover Checklist (`muagi.vn` -> `anslife.vn`)

## T-1 day
1. Export full backup of `cms.muagi.vn` database and uploads.
2. Prepare `cms.anslife.vn` and import data.
3. Update WordPress URLs in database to new domain.
4. Update CORS whitelist in plugin for `https://anslife.vn`.

## T-1 hour
1. Update local `.env` for frontend build:
- `NEXT_PUBLIC_SITE_URL=https://anslife.vn`
- `NEXT_PUBLIC_API_BASE_URL=https://cms.anslife.vn/wp-json`
2. Build and deploy Next.js app to `anslife.vn` Node.js runtime.
3. Verify SSL and HTTPS redirect are enabled.

## Go-live
1. Switch DNS to production target.
2. Restart Next.js app process in hosting panel.
3. Run smoke tests on all 11 top-level menus.
4. Test product/project/news detail pages.
5. Test both forms and SMTP delivery.

## Post-go-live
1. Add 301 redirects for all legacy URLs.
2. Submit sitemap to Google Search Console.
3. Check indexing and 404 reports daily in week 1.
