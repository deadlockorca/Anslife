# Permission Matrix V1 (Baseline Lock)

## 1) Role canonical
1. `super_admin`
2. `system_admin`
3. `data_controller`
4. `qc`
5. `factory_collector`
6. `sale_trading`
7. `factory_partner`
8. `buyer`

Ghi chú: role legacy vẫn được backend map về canonical để tương thích ngược, không dùng làm baseline nghiệp vụ.

## 2) State chuẩn
1. `draft`
2. `pending_review`
3. `approved_internal`
4. `approved_sales`
5. `approved_buyer`
6. `archived`

## 3) Quy tắc lõi
1. Deny by default.
2. Quyền hiệu lực khi đúng `role + scope + state`.
3. `super_admin`/`system_admin` là admin-level bypass cho các tác vụ quản trị.

## 4) Ma trận quyền chính
1. `user/role/scope manage`: `super_admin` (full), `system_admin` chỉ quản lý user.
2. `customers/factories/projects`: admin-level create/update, role khác view theo scope.
3. `orders`:
- view: tất cả 8 role theo scope.
- create/update: `super_admin`, `system_admin`, `data_controller`, `sale_trading`; `factory_partner` chỉ update trong scope.
- change_status: `super_admin`, `system_admin`, `data_controller`, `sale_trading`.
4. `data_item/qc_item/capa_item`:
- create/update nội bộ: `super_admin`, `system_admin`, `data_controller`, `qc`, `factory_collector`, `factory_partner`.
- approve/publish_sales: `super_admin`, `system_admin`, `data_controller`.
- publish_buyer: `super_admin`, `system_admin`.
- sale chỉ xem dữ liệu đã duyệt cho sales/buyer; buyer chỉ xem dữ liệu approved_buyer.
5. `audit_log`:
- view: `super_admin`, `system_admin`, `data_controller`.
- export: `super_admin`, `system_admin`.

## 5) Legacy module lock
1. `supplier_material` là module legacy.
2. Chỉ `super_admin` và `system_admin` được truy cập.
3. Non-admin luôn `403` cho endpoint legacy.

## 6) State transition
1. `draft -> pending_review`: `qc`, `factory_collector`, `factory_partner`, `data_controller`, `system_admin`, `super_admin`.
2. `pending_review -> approved_internal|draft`: `data_controller`, `system_admin`, `super_admin`.
3. `approved_internal -> approved_sales`: `data_controller`, `system_admin`, `super_admin`.
4. `approved_sales -> approved_buyer`: `system_admin`, `super_admin`.
5. `* -> archived`: `system_admin`, `super_admin`.
