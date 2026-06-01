# Thông tin dự án ANSLIFE V1

Cập nhật: **21/04/2026**

## 1. Mục tiêu dự án
ANSLIFE V1 là website giới thiệu năng lực sản xuất nội thất xuất khẩu, kết hợp cổng API nội bộ và hệ thống dữ liệu MySQL để quản lý nội dung cho hệ menu chính và form liên hệ.

## 2. Phạm vi chính
1. Website public đa ngôn ngữ theo 10 mục chính:
   - Giới thiệu về Anslife
   - Hệ sinh thái sản xuất
   - Năng lực sản xuất
   - Hệ thống kiểm soát chất lượng
   - Sản phẩm
   - Quy trình thương mại
   - Dự án & Case Study
   - Hệ thống toàn cầu
   - Phụng sự xã hội
   - Liên hệ
2. API public cho frontend đọc dữ liệu (`/api/public/*`).
3. API internal cho đăng nhập, phân quyền và vận hành admin (`/api/internal/*`).
4. Dữ liệu vận hành lưu qua MySQL + Prisma.

## 3. Stack kỹ thuật
1. Next.js 16 (App Router).
2. React 19 + TypeScript.
3. Legacy bridge React Router để giữ UI hiện tại.
4. Prisma + MySQL (`prisma/schema.prisma`).
5. ESLint + Typecheck để kiểm tra chất lượng mã.

## 4. Cấu trúc quan trọng trong code
1. `src/config/site.ts`: cấu hình menu, section, route tĩnh.
2. `src/content/aiGeneratedContent.ts`: nội dung fallback cho các trang CMS/section.
3. `src/views/CmsSectionPage.tsx`: render trang section cấp 1.
4. `src/views/CmsSubSectionPage.tsx`: render trang con theo `section.id`.
5. `src/app/api/public/*`: API public cho dữ liệu hiển thị.
6. `src/app/api/internal/*`: API vận hành nội bộ.

## 5. Trạng thái triển khai hiện tại
### 5.1 Hoàn thành
1. Đã bổ sung nội dung chi tiết cho các trang con thuộc nhóm `manufacturing-ecosystem`.
2. Đã làm chi tiết trang `ecosystem-operating-model` theo hướng vận hành thực tế.
3. Đã nâng cấp trang `product-development-capability` với quy trình `stage-gate`, deliverables và KPI.
4. Đã chuẩn hóa nguyên tắc ảnh: tránh lặp ảnh trong block `manufacturing-ecosystem`.

### 5.2 Quy ước nội dung nhóm manufacturing
1. Mỗi `section.id` trong `src/config/site.ts` phải có `<section id="...">` tương ứng trong `src/content/aiGeneratedContent.ts`.
2. Nội dung ưu tiên format dễ quét:
- Mở đầu ngắn (bối cảnh + mục tiêu).
- Quy trình/khung vận hành (list rõ bước).
- Điểm nổi bật hoặc KPI.
- Kết luận/giá trị mang lại.
3. Hình ảnh ưu tiên đúng ngữ cảnh website, hạn chế ảnh lệch tông.

## 6. API public đang dùng chính
1. `GET /api/public/pages?slug=...`
2. `GET /api/public/products`
3. `GET /api/public/projects`
4. `GET /api/public/news`
5. `GET /api/public/categories?taxonomy=...`
6. `POST /api/public/contact`

## 7. Chạy dự án local
```bash
npm install
npm run dev
```

Build production:
```bash
npm run build
npm run start
```

Kiểm tra chất lượng nhanh:
```bash
npm run lint:src
npm run typecheck
```

## 8. Biến môi trường quan trọng
1. `DATABASE_URL`
2. `NEXT_PUBLIC_SITE_URL`
3. `NEXT_PUBLIC_INTERNAL_API_BASE`
4. `ADMIN_USERNAME` hoặc `ADMIN_EMAIL`
5. `ADMIN_PASSWORD`
6. `ADMIN_FULL_NAME`
7. `R2_ACCOUNT_ID` hoặc `R2_ENDPOINT`
8. `R2_ACCESS_KEY_ID`
9. `R2_SECRET_ACCESS_KEY`
10. `R2_BUCKET`
11. `R2_PUBLIC_BASE_URL`
12. `R2_REGION`
13. `R2_MAX_FILE_SIZE_BYTES`

## 9. Tài liệu liên quan
1. `README.md`
2. `docs/database-quickstart.md`
3. `docs/permission-matrix-v1.md`
4. `docs/portal-case-final.md`
5. `docs/deploy-cpanel.md`

## 10. Việc nên làm tiếp
1. Rà chất lượng ảnh và alt text toàn bộ các trang con để khớp 100% ngữ cảnh.
2. Chuẩn hóa mức chi tiết nội dung giữa các section để đồng đều trải nghiệm.
3. Bổ sung checklist review trước khi publish nội dung (SEO, ngôn ngữ, hình ảnh, liên kết).
