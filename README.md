# ANSLIFE V1 (Next.js + Internal Database)

Kiến trúc hiện tại:
1. `anslife.net` chạy Next.js (frontend + API nội bộ).
2. Dữ liệu đọc/ghi qua MySQL (`content_items`, `taxonomies`, `contact_leads`).
3. Không còn phụ thuộc WordPress.

## Stack
1. Next.js App Router + React 19 + TypeScript.
2. Legacy React Router bridge để giữ UI hiện có.
3. API nội bộ tại `/api/public/*`.
4. MySQL + Prisma schema (`prisma/schema.prisma`).

## API nội bộ
1. `GET /api/public/pages?slug=...`
2. `GET /api/public/products?per_page=...` hoặc `?slug=...`
3. `GET /api/public/projects?per_page=...` hoặc `?slug=...`
4. `GET /api/public/news?per_page=...` hoặc `?slug=...`
5. `GET /api/public/categories?taxonomy=category|product_category|project_type|product_finish|product_seat_option`
6. `POST /api/public/contact`

## API internal IAM (V1)
1. `POST /api/internal/auth/login`
2. `POST /api/internal/auth/logout`
3. `GET /api/internal/auth/me`
4. `POST /api/internal/authorization/check`
5. `GET /api/internal/users`
6. `POST /api/internal/users`
7. `PATCH /api/internal/users/:id`

## Chạy local
```bash
# Tạo/cập nhật file .env trực tiếp trong thư mục project
npm install
npm run dev
# mở https://localhost:3000 (chấp nhận cert self-signed lần đầu nếu trình duyệt hỏi)
```

## Build production
```bash
npm run build
npm run start
```

## Kiểm tra nhanh + vận hành
```bash
npm run lint:src
npm run typecheck
npm run preflight:prod
```

## Prisma workflow
```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
```

Import phần sản phẩm từ dump `toamhoanhao-3.sql`:
```bash
npm run db:build-products-sql
npx prisma db execute --file ./prisma/sql/toamhoanhao-products-only.sql --schema ./prisma/schema.prisma
```

Reset cứng database (xoá toàn bộ object):
```bash
npx prisma migrate reset
```

Production migrate:
```bash
npm run prisma:deploy
npm run db:seed
```

## Environment variables
1. `NEXT_PUBLIC_SITE_URL`
2. `NEXT_PUBLIC_INTERNAL_API_BASE` (mặc định `/api/public`)
3. `NEXT_PUBLIC_CF7_QUOTE_FORM_ID` (mặc định `1`, dùng để phân loại lead)
4. `NEXT_PUBLIC_CF7_MEETING_FORM_ID` (mặc định `2`)
5. `NEXT_PUBLIC_SOCIAL_FACEBOOK_URL`
6. `NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL`
7. `NEXT_PUBLIC_SOCIAL_YOUTUBE_URL`
8. `NEXT_PUBLIC_SOCIAL_TIKTOK_URL`
9. `DATABASE_URL` (bắt buộc cho Prisma workflow)
10. `ADMIN_USERNAME` hoặc `ADMIN_EMAIL` (bootstrap admin đầu tiên)
11. `ADMIN_PASSWORD`
12. `ADMIN_FULL_NAME`
13. `ADMIN_ROTATE_PASSWORD` (`1` để rotate password admin mỗi lần start)
14. `ADMIN_SYNC_NAME` (`1` để đồng bộ tên admin từ ENV)
15. Legacy compatibility: vẫn hỗ trợ `APP_BOOTSTRAP_ADMIN_*` nếu cần chuyển tiếp.
16. `R2_ACCOUNT_ID` hoặc `R2_ENDPOINT`
17. `R2_ACCESS_KEY_ID`
18. `R2_SECRET_ACCESS_KEY`
19. `R2_BUCKET`
20. `R2_PUBLIC_BASE_URL`
21. `R2_REGION` (mặc định `auto`)
22. `R2_MAX_FILE_SIZE_BYTES` (mặc định `8388608`)

## Notes
1. Schema DB được quản lý bằng Prisma (`prisma/schema.prisma`).
2. Hệ thống đang ở chế độ `single-admin` (RBAC tạm tắt để làm mới sau).
3. Nếu DB chưa cấu hình, dữ liệu động (sản phẩm/dự án/tin tức) sẽ rỗng và form liên hệ sẽ báo lỗi lưu dữ liệu.
4. SQL mẫu để nhập dữ liệu nhanh: `docs/database-quickstart.md`.
5. Permission matrix V1: `docs/permission-matrix-v1.md`.
6. Baseline case cuối (nghiệp vụ portal): `docs/portal-case-final.md`.
