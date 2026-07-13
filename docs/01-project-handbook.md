# 01. Project Handbook - ANSLIFE Website

Cập nhật: 13/07/2026

## 1. Tổng quan dự án

ANSLIFE Website là hệ thống website giới thiệu năng lực sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam. Website phục vụ ba nhóm nhu cầu chính:

1. Giới thiệu năng lực với buyer, đối tác và khách hàng quốc tế.
2. Tổ chức nội dung theo các nhóm: về ANSLIFE, sản phẩm & giải pháp, nguyên liệu, sản xuất, Supply Hub Việt Nam, chất lượng & tiêu chuẩn, tài nguyên, liên hệ và tuyển dụng.
3. Cung cấp các API nội bộ cho form liên hệ, tuyển dụng, admin và dữ liệu vận hành.

Tên miền định hướng sử dụng: `anslife.com`.

## 2. Phạm vi hiện tại

### Website public

Các nhóm trang chính:

1. Trang chủ.
2. Về ANSLIFE: triết lý, tổng quan công ty, lịch sử phát triển, phụng sự xã hội, thông tin công ty.
3. Sản phẩm & giải pháp: nội thất hoàn thiện, cấu kiện nội thất, hoàn thiện bề mặt, giải pháp vận hành & cung ứng.
4. Nguyên liệu: gỗ tự nhiên, gỗ kỹ thuật, vật liệu tự nhiên, vật liệu bọc nệm, vật liệu đóng gói.
5. Sản xuất: tổng quan nhà máy, máy móc & thiết bị, năng lực hoàn thiện, dây chuyền lắp ráp, khu vực đóng gói, xếp container, quy trình sản xuất.
6. Supply Hub Việt Nam: lưu kho, gom hàng, điều phối xuất hàng, chứng từ xuất khẩu, phòng mẫu chuẩn đối tác.
7. Chất lượng & tiêu chuẩn: tổng quan QC, quy trình QC, kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối, mẫu duyệt, độ ẩm, đóng gói, báo cáo, tiêu chuẩn riêng của buyer.
8. Tài nguyên: ghi chú sản xuất, kiến thức xuất khẩu, case study, cập nhật công ty, FAQ.
9. Liên hệ: form gửi yêu cầu làm việc.
10. Tuyển dụng: bản đồ cơ hội nghề nghiệp, danh sách vị trí, popup ứng tuyển.

### Admin / vận hành nội bộ

Các module admin hiện có:

1. Đăng nhập, dashboard, người dùng.
2. Khách hàng, nhà máy, đơn hàng, logistics, work logs.
3. Data upload, data review, share link.
4. QC portal, CAPA portal, factory surveys, supplier portal, buyer portal.
5. Attendance, audit logs.
6. Tuyển dụng: quản lý vị trí tuyển dụng và hồ sơ ứng tuyển.

Ghi chú: website hiện không cần đăng sản phẩm bằng database như một site thương mại điện tử. Các bảng/catalog sản phẩm cũ không phải phạm vi bắt buộc của ANSLIFE Website.

## 3. Stack kỹ thuật

1. Frontend: Next.js, React, TypeScript.
2. Routing UI: React Router bridge để giữ cấu trúc UI hiện tại trong Next.js.
3. Styling: CSS tập trung tại `src/index.css`.
4. Backend API: Next.js App Router API routes trong `src/app/api`.
5. Database: MySQL, Prisma schema.
6. Email: Nodemailer qua SMTP.
7. File/object storage: Cloudflare R2 hoặc S3-compatible storage.

## 4. Cấu trúc thư mục quan trọng

1. `src/App.tsx`: khai báo route chính của website và admin.
2. `src/config/site.ts`: menu, cấu hình section, route tĩnh.
3. `src/views/`: các màn hình public/admin.
4. `src/components/`: component dùng chung.
5. `src/app/api/public/`: API public cho website.
6. `src/app/api/internal/`: API nội bộ/admin.
7. `src/lib/repositories/`: tầng đọc/ghi database.
8. `src/lib/email/`: xử lý email thông báo.
9. `prisma/schema.prisma`: schema database.
10. `prisma/sql/anslife-schema.sql`: SQL schema tham chiếu.
11. `public/`: asset tĩnh.
12. `docs/`: tài liệu dự án và bàn giao.

## 5. Cách chạy local

Cài package:

```bash
npm install
```

Chạy local bằng HTTPS:

```bash
npm run dev
```

Chạy local bằng HTTP:

```bash
npm run dev:http
```

URL thường dùng:

1. Website: `http://localhost:3000/vn`
2. Admin login: `http://localhost:3000/vn/admin/login`
3. Admin tuyển dụng: `http://localhost:3000/vn/admin/recruitment`
4. Form liên hệ: `http://localhost:3000/vn/contact/request-quotation`
5. API health check: `http://localhost:3000/api/health`

## 6. Script quan trọng

```bash
npm run dev
npm run dev:http
npm run build
npm run start
npm run lint:src
npm run typecheck
npm run preflight:prod
npm run prisma:generate
npm run prisma:push
npm run prisma:deploy
npm run prisma:studio
npm run db:seed
```

## 7. Biến môi trường

Không commit secret thật lên repository. Các giá trị thật chỉ đặt trong `.env` local hoặc biến môi trường trên VPS.

Nhóm website:

1. `NODE_ENV`
2. `PORT`
3. `NEXT_PUBLIC_SITE_URL`
4. `NEXT_PUBLIC_INTERNAL_API_BASE`

Nhóm SMTP/contact:

1. `SMTP_HOST`
2. `SMTP_PORT`
3. `SMTP_SECURE`
4. `SMTP_USER`
5. `SMTP_PASS`
6. `CONTACT_NOTIFICATION_TO`
7. `CONTACT_NOTIFICATION_FROM`

Nhóm database/admin:

1. `DATABASE_URL`
2. `DB_POOL_LIMIT`
3. `ADMIN_USERNAME`
4. `ADMIN_PASSWORD`
5. `ADMIN_FULL_NAME`
6. `ADMIN_ROTATE_PASSWORD`
7. `ADMIN_SYNC_NAME`
8. `APP_SESSION_COOKIE_SECURE`

Nhóm bảo mật/rate limit:

1. `CORS_ALLOW_ORIGINS`
2. `APP_ENABLE_CSP`
3. `APP_RATE_LIMIT_LOGIN_MAX`
4. `APP_RATE_LIMIT_LOGIN_WINDOW_SECONDS`
5. `APP_RATE_LIMIT_AUDIT_MAX`
6. `APP_RATE_LIMIT_AUDIT_WINDOW_SECONDS`
7. `APP_RATE_LIMIT_DOWNLOAD_MAX`
8. `APP_RATE_LIMIT_DOWNLOAD_WINDOW_SECONDS`
9. `APP_RATE_LIMIT_EXPORT_MAX`
10. `APP_RATE_LIMIT_EXPORT_WINDOW_SECONDS`
11. `APP_RATE_LIMIT_SHARE_CREATE_MAX`
12. `APP_RATE_LIMIT_SHARE_CREATE_WINDOW_SECONDS`
13. `APP_RATE_LIMIT_SHARE_REVOKE_MAX`
14. `APP_RATE_LIMIT_SHARE_REVOKE_WINDOW_SECONDS`
15. `APP_RATE_LIMIT_PUBLIC_SHARE_MAX`
16. `APP_RATE_LIMIT_PUBLIC_SHARE_WINDOW_SECONDS`

Nhóm R2/storage:

1. `R2_ACCOUNT_ID`
2. `R2_ENDPOINT`
3. `R2_ACCESS_KEY_ID`
4. `R2_SECRET_ACCESS_KEY`
5. `R2_BUCKET`
6. `R2_PUBLIC_BASE_URL`
7. `R2_REGION`
8. `R2_MAX_FILE_SIZE_BYTES`

## 8. Database

Schema chính nằm ở `prisma/schema.prisma`. Các bảng quan trọng:

1. `content_items`, `taxonomies`, `content_item_taxonomies`: nội dung động/fallback cho CMS.
2. `contact_leads`: lưu yêu cầu gửi từ form liên hệ.
3. `app_users`, `app_user_sessions`: tài khoản admin và phiên đăng nhập.
4. `customers`, `factories`, `trade_orders`: dữ liệu vận hành.
5. `order_logistics`, `order_work_logs`, `trade_order_assignments`: theo dõi đơn hàng và vận hành.
6. `order_data_items`, `data_share_links`: tài liệu, upload, chia sẻ dữ liệu.
7. `qc_items`, `capa_items`, `factory_surveys`, `supplier_material_items`: QC, CAPA, khảo sát nhà máy, dữ liệu nhà cung ứng.
8. `attendance_logs`, `audit_logs`: chấm công và nhật ký hệ thống.
9. `recruitment_jobs`, `recruitment_applications`: vị trí tuyển dụng và hồ sơ ứng tuyển.

Lệnh đồng bộ schema nhanh:

```bash
npm run prisma:generate
npm run prisma:push
```

Production nên dùng:

```bash
npm run prisma:deploy
```

## 9. API quan trọng

Public API:

1. `GET /api/health`
2. `GET /api/public/pages?slug=...`
3. `GET /api/public/products`
4. `GET /api/public/projects`
5. `GET /api/public/news`
6. `GET /api/public/categories?taxonomy=...`
7. `POST /api/public/contact`
8. `GET /api/public/recruitment/jobs`

Internal API:

1. `POST /api/internal/auth/login`
2. `POST /api/internal/auth/logout`
3. `GET /api/internal/auth/me`
4. `GET /api/internal/users`
5. `GET/POST /api/internal/recruitment/jobs`
6. `PATCH /api/internal/recruitment/jobs/:id`
7. `GET /api/internal/recruitment/applications`
8. Các API vận hành trong `/api/internal/*` cho customers, factories, orders, logistics, QC, CAPA, data và audit logs.

## 10. Quy trình triển khai production

1. Pull code mới lên VPS.
2. Cài package nếu `package.json` hoặc `package-lock.json` thay đổi:

```bash
npm install
```

3. Kiểm tra `.env` production đã đủ biến cần thiết.
4. Đồng bộ database:

```bash
npm run prisma:generate
npm run prisma:deploy
```

5. Build:

```bash
npm run build
```

6. Restart process đang chạy website.
7. Kiểm tra nhanh:

```bash
curl -I https://anslife.com
curl https://anslife.com/api/health
```

## 11. Quy trình test nhanh trước khi gửi sếp

1. Mở trang chủ và kiểm tra menu desktop/mobile.
2. Kiểm tra các nhóm trang chính: `about-anslife`, `products-solutions`, `materials`, `manufacturing`, `vietnam-supply-hub`, `quality-control`, `resources`.
3. Gửi thử form liên hệ tại `/vn/contact/request-quotation`.
4. Đăng nhập admin và kiểm tra `/vn/admin/recruitment`.
5. Tạo thử một vị trí tuyển dụng ở admin, kiểm tra vị trí có hiện ở `/vn/recruitment`.
6. Gửi thử hồ sơ ứng tuyển bằng popup.
7. Kiểm tra email thông báo có nhận được đầy đủ tên, email, quốc gia/khu vực, loại yêu cầu hoặc vị trí ứng tuyển.
8. Chạy:

```bash
npm run typecheck
npm run lint:src
```

## 12. Quy ước vận hành

1. Không lưu mật khẩu, app password, R2 secret hoặc database password trong tài liệu bàn giao public.
2. Khi sửa `.env` trên VPS phải restart app để biến môi trường mới có hiệu lực.
3. Trước khi sửa database production cần backup.
4. Trước khi xóa dữ liệu cần xác định rõ bảng và phạm vi xóa.
5. Nội dung public ưu tiên sửa trong component/page hiện tại nếu đang là nội dung tĩnh.
6. Với dữ liệu tuyển dụng, ưu tiên quản lý qua admin để team không cần sửa code.
7. Khi thêm trang mới cần kiểm tra đủ desktop, mobile, đa ngôn ngữ và CTA.
