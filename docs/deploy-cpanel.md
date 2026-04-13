# Deploy Next.js + MySQL on cPanel (`anslife.net`)

## 1) Environment
Tạo `.env` trong thư mục app:
1. `NEXT_PUBLIC_SITE_URL=https://anslife.net`
2. `NEXT_PUBLIC_INTERNAL_API_BASE=/api/public`
3. `NEXT_PUBLIC_CF7_QUOTE_FORM_ID=1`
4. `NEXT_PUBLIC_CF7_MEETING_FORM_ID=2`
5. `DATABASE_URL=mysql://USER:PASSWORD@HOST:3306/DB_NAME`

## 2) Install + build
```bash
npm install --include=dev
npm run build
```

Nếu host thiếu RAM để build, build local rồi upload cả thư mục `.next`.

## 3) Run on cPanel Node App
```bash
npm install --omit=dev
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
node server.js
```

Sau đó bấm `Restart App` trong cPanel.

## 4) Apply Prisma schema
```bash
npm run prisma:generate
npm run prisma:deploy
npm run db:seed
```

Sau khi migrate xong, mở thử:
1. `https://anslife.net/api/public/products?per_page=1`
2. `https://anslife.net/api/public/categories?taxonomy=product_category`

## 5) Smoke checks
1. Vào trang sản phẩm/dự án/tin tức, xác nhận không còn request tới legacy CMS domain.
2. Gửi thử 2 form ở trang liên hệ.
3. Kiểm tra DB có dòng mới trong bảng `contact_leads`.
