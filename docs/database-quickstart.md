# Database Quickstart (MySQL)

## 0) Khởi tạo schema bằng Prisma
Chạy một trong 2 cách:

```bash
# Cách chuẩn có migration
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
```

hoặc

```bash
# Cách nhanh không tạo migration file mới
npm run prisma:generate
npm run prisma:push
npm run db:seed
```

## Import SQL chỉ phần sản phẩm từ `toamhoanhao-3.sql`
Mục tiêu của Anslife là chỉ dùng phần sản phẩm (không kéo theo bảng phân quyền/ecommerce khác).

### Bước 1: Tạo file import products-only từ dump gốc
Mặc định script đọc file:
`/Users/bowthoois/Downloads/toamhoanhao-3.sql`

```bash
npm run db:build-products-sql
```

Nếu bạn muốn chỉ định file nguồn khác:

```bash
node scripts/build-products-only-sql.mjs \
  --source /duong-dan/toamhoanhao-3.sql \
  --output prisma/sql/toamhoanhao-products-only.sql
```

### Bước 2: Import vào database Anslife

```bash
npx prisma db execute --file ./prisma/sql/toamhoanhao-products-only.sql --schema ./prisma/schema.prisma
```

Lưu ý:
1. File import này chỉ tạo + nạp dữ liệu cho 4 bảng: `category`, `product`, `productimage`, `productspec`.
2. Không import các bảng phân quyền/user/session của hệ thống `toamhoanhao`.

Sau khi import xong, module quản trị sản phẩm dùng trực tiếp các bảng trên:
1. URL admin: `/vn/admin/products`
2. API nội bộ: `GET/POST /api/internal/catalog-products`
3. API nội bộ: `PATCH/DELETE /api/internal/catalog-products/:id`
4. API upload ảnh R2: `POST /api/internal/catalog-products/upload`

## Cấu hình R2 dùng chung với Toamhoanhao
Khai báo cùng bộ biến môi trường R2 như dự án `Toamhoanhao`:

```env
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=...
R2_PUBLIC_BASE_URL=...
R2_REGION=auto
R2_MAX_FILE_SIZE_BYTES=8388608
```

Gợi ý:
1. Có thể dùng `R2_ENDPOINT` thay cho `R2_ACCOUNT_ID` nếu cần endpoint custom.
2. Trang admin sản phẩm hỗ trợ upload ảnh trực tiếp từ máy lên R2 và tự điền URL vào form.

## Cách thêm/sửa/xóa sản phẩm
1. Đăng nhập admin và vào `/vn/admin/products`.
2. Thêm mới:
- Điền thông tin sản phẩm.
- Upload ảnh từ máy hoặc dán URL ảnh.
- Bấm `Thêm sản phẩm`.
3. Sửa:
- Bấm `Sửa` ở dòng sản phẩm.
- Cập nhật dữ liệu.
- Bấm `Cập nhật sản phẩm`.
4. Xóa:
- Bấm `Xóa` và xác nhận.

Ghi chú:
1. Luồng upload ảnh chỉ upload lên R2, không xóa file trên R2 khi xóa bản ghi sản phẩm.
2. Đây là chủ ý để tránh ảnh hưởng dữ liệu đang dùng chung với hệ thống `Toamhoanhao`.

Sau khi chạy xong (bao gồm bước Prisma + import products-only), DB sẽ có các bảng chính:
1. `content_items`
2. `taxonomies`
3. `content_item_taxonomies`
4. `contact_leads`
5. `app_users`
6. `customers`
7. `factories`
8. `trade_orders`
9. `trade_order_assignments`
10. `order_data_items`
11. `data_share_links`
12. `audit_logs`
13. `app_user_sessions`
14. `category`
15. `product`
16. `productimage`
17. `productspec`

## Bootstrap tài khoản admin đầu tiên
Thêm các biến sau vào `.env` trước khi chạy production:

```env
ADMIN_USERNAME=admin@anslife.net
ADMIN_PASSWORD=ChangeThisStrongPassword123!
ADMIN_FULL_NAME=ANSLIFE Super Admin
ADMIN_ROTATE_PASSWORD=0
ADMIN_SYNC_NAME=0
APP_ALLOW_SALE_ORDER_WRITE=0
```

Khi gọi `POST /api/internal/auth/login` lần đầu, hệ thống sẽ tự tạo user admin nếu chưa tồn tại.

## API internal IAM v1
1. `POST /api/internal/auth/login`
2. `POST /api/internal/auth/logout`
3. `GET /api/internal/auth/me`
4. `GET /api/internal/users`
5. `POST /api/internal/users`
6. `PATCH /api/internal/users/:id`

## API internal Operations v1
1. `GET /api/internal/customers?per_page=100`
2. `POST /api/internal/customers`
3. `PATCH /api/internal/customers/:id`
4. `GET /api/internal/factories?per_page=100`
5. `POST /api/internal/factories`
6. `PATCH /api/internal/factories/:id`
7. `GET /api/internal/orders?per_page=100&status=&customer_code=&factory_code=&order_no=`
8. `POST /api/internal/orders`
9. `GET /api/internal/orders/:id`
10. `PATCH /api/internal/orders/:id`

`APP_ALLOW_SALE_ORDER_WRITE=1` nếu muốn role `sale_trading` được phép tạo/sửa đơn hàng.

## 1) Tạo taxonomy mẫu
```sql
INSERT INTO taxonomies (taxonomy, slug, name) VALUES
('product_category', 'ghe-an', 'Ghế ăn'),
('product_category', 'ban-an', 'Bàn ăn'),
('project_type', 'du-an-xuat-khau', 'Dự án xuất khẩu'),
('category', 'tin-doanh-nghiep', 'Tin doanh nghiệp');
```

## 2) Tạo sản phẩm mẫu
```sql
INSERT INTO content_items (
  kind, slug, title, excerpt_html, content_html, featured_image, published_at
) VALUES (
  'product',
  'adna-chair',
  'Adna Chair',
  '<p>Ghế ăn gỗ xuất khẩu, thiết kế tinh gọn.</p>',
  '<h2>Thông tin sản phẩm</h2><p>Khung gỗ tự nhiên, hoàn thiện sơn mờ.</p>',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
  NOW()
);
```

## 3) Gán taxonomy cho sản phẩm
```sql
INSERT INTO content_item_taxonomies (item_id, taxonomy_id)
SELECT ci.id, tx.id
FROM content_items ci
JOIN taxonomies tx ON tx.taxonomy = 'product_category' AND tx.slug = 'ghe-an'
WHERE ci.kind = 'product' AND ci.slug = 'adna-chair';
```

## 4) Tạo dự án mẫu
```sql
INSERT INTO content_items (
  kind, slug, title, excerpt_html, content_html, published_at
) VALUES (
  'project',
  'du-an-noi-that-nhat-ban',
  'Dự án nội thất Nhật Bản',
  '<p>Chuỗi đơn hàng xuất khẩu cho thị trường Nhật.</p>',
  '<p>ANSLIFE triển khai từ phát triển mẫu tới giao hàng theo chuẩn kiểm soát chất lượng nhiều lớp.</p>',
  NOW()
);
```

## 5) Tạo tin tức mẫu
```sql
INSERT INTO content_items (
  kind, slug, title, excerpt_html, content_html, published_at
) VALUES (
  'news',
  'anslife-mo-rong-nang-luc-san-xuat',
  'ANSLIFE mở rộng năng lực sản xuất',
  '<p>Cập nhật năng lực hệ sinh thái sản xuất liên kết.</p>',
  '<p>Hệ thống nhà máy trung tâm và mạng lưới liên kết tiếp tục được mở rộng để đáp ứng đơn hàng quốc tế.</p>',
  NOW()
);
```

## 6) Kiểm tra API
1. `GET /api/public/products?per_page=20`
2. `GET /api/public/projects?per_page=20`
3. `GET /api/public/news?per_page=20`
4. `GET /api/public/categories?taxonomy=product_category`

## 7) Smoke test API internal (thủ công)
1. `POST /api/internal/auth/login` với tài khoản admin bootstrap.
2. `GET /api/internal/auth/me` để xác nhận session hoạt động.
3. `GET /api/internal/users` để xác nhận quyền đọc user list.
