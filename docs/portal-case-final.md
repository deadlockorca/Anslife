# Portal Case Final (Baseline V1)

Ngày chốt: 16/03/2026

Tài liệu này là baseline nghiệp vụ cuối cùng cho V1.

## 1) Nhóm người dùng chuẩn (8 role canonical)
1. `super_admin`
2. `system_admin`
3. `data_controller`
4. `qc`
5. `factory_collector`
6. `sale_trading`
7. `factory_partner`
8. `buyer`

## 2) Nguyên tắc role
1. UI/API response chỉ dùng 8 role canonical.
2. Backend vẫn nhận role legacy để tương thích dữ liệu cũ, nhưng luôn normalize về canonical trước khi quyết định quyền.
3. Role/module legacy không dùng làm baseline nghiệp vụ V1.

## 3) Module nghiệp vụ V1
1. Dashboard tổng quan
2. Quản lý khách hàng
3. Quản lý đơn hàng
4. Portal nhà máy
5. Cổng QC
6. Trung tâm duyệt dữ liệu
7. Trung tâm dữ liệu Sale
8. Buyer portal
9. Logistics
10. Nhật ký làm việc
11. Audit logs

## 4) Luồng dữ liệu chuẩn
1. `draft`
2. `pending_review`
3. `approved_internal`
4. `approved_sales`
5. `approved_buyer`
6. `archived`

## 5) Scope và permission
1. Mỗi tài khoản bắt buộc có `role + scope + permission`.
2. Deny by default.
3. Chỉ truy cập khi đúng role + đúng scope + đúng state.
4. Toàn bộ thao tác phải có audit log.

## 6) Legacy policy (soft-deprecate)
1. Legacy module `Supplier Portal` bị ẩn khỏi menu admin.
2. Endpoint/route legacy chỉ cho `super_admin` và `system_admin`; role khác trả `403`.
3. Không xóa dữ liệu legacy ở V1.

## 7) Identity và bảo mật
1. V1 hiện tại: đăng nhập email/password + session + audit log.
2. Phone-first login + OTP là phase kế tiếp, không nằm trong V1 lock.
