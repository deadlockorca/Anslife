# Deploy Next.js App to cPanel (`muagi.vn`)

## 1) Prepare environment
```bash
npm install
cp .env.example .env
```

Set:
1. `NEXT_PUBLIC_SITE_URL=https://muagi.vn`
2. `NEXT_PUBLIC_API_BASE_URL=https://cms.muagi.vn/wp-json`
3. `NEXT_PUBLIC_CF7_QUOTE_FORM_ID=<quote_form_id>`
4. `NEXT_PUBLIC_CF7_MEETING_FORM_ID=<meeting_form_id>`

## 2) Build for production
```bash
npm run build
```

## 3) Run on cPanel Node.js App
1. Open `Setup Node.js App` in cPanel.
2. Create app for domain/subdomain frontend.
3. Node startup file: use Next start command in app settings.
4. Run:
```bash
npm install --production
npm run start
```

## 4) Smoke checks
1. Open all top routes and refresh each route to verify no 404.
2. Open one detail route:
- `/products/<category>/<slug>`
- `/projects/<slug>`
- `/news/<slug>`
3. Submit both contact forms and check email + Flamingo inbox.
