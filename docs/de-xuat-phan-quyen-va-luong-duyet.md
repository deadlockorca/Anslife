# ĐỀ XUẤT PHÂN QUYỀN VÀ LUỒNG DUYỆT (BẢN ĐỂ ANH DUYỆT NHANH)

Ngày tạo: 27/04/2026

Tài liệu này em chủ động dựng trước để anh duyệt nhanh khi chưa chốt hết yêu cầu chi tiết.

## 1. Cách dùng tài liệu này
- Anh xem từng mục và phản hồi theo dạng: `Giữ nguyên` hoặc `Chỉnh`.
- Nếu `Chỉnh`, anh chỉ cần ghi ngắn: role nào, quyền nào, sửa thành gì.
- Sau vòng duyệt đầu, em cập nhật thành bản chốt để đưa vào code.

## 2. Danh sách role đề xuất
| Role | Mô tả ngắn | Scope mặc định |
| --- | --- | --- |
| `super_admin` | Chủ hệ thống, toàn quyền | Toàn hệ thống |
| `system_admin` | Quản trị vận hành, quản lý user và cấu hình | Toàn hệ thống |
| `data_controller` | Điều phối dữ liệu, duyệt nội bộ | Theo vùng phụ trách hoặc toàn hệ thống |
| `qc` | Kiểm soát chất lượng, xử lý dữ liệu QC | Theo scope được gán |
| `factory_collector` | Thu thập dữ liệu từ nhà máy | Theo scope được gán |
| `sale_trading` | Theo dõi dữ liệu đã duyệt cho sale | Theo scope được gán |
| `factory_partner` | Cộng tác viên nhà máy, nhập/cập nhật dữ liệu liên quan | Theo scope được gán |
| `buyer` | Khách mua, chỉ xem dữ liệu đã public cho buyer | Chỉ dữ liệu được chia sẻ |

## 3. Khung phân quyền nghiệp vụ (đề xuất)

Viết tắt role:
- `SA`: `super_admin`
- `SYS`: `system_admin`
- `DC`: `data_controller`
- `QC`: `qc`
- `FC`: `factory_collector`
- `ST`: `sale_trading`
- `FP`: `factory_partner`
- `BY`: `buyer`

```text
+-----------------------------------------------------------------------+
| KHUNG 1 - QUAN TRI HE THONG                                           |
| Module: User / Role / Scope                                           |
| - Quan ly user: SA, SYS                                               |
| - Quan ly role + scope: SA                                            |
+-----------------------------------------------------------------------+
| KHUNG 2 - DASHBOARD                                                   |
| - Tat ca role duoc xem dashboard theo scope:                          |
|   SA, SYS, DC, QC, FC, ST, FP, BY                                     |
+-----------------------------------------------------------------------+
| KHUNG 3 - CUSTOMERS / FACTORIES / PROJECTS                            |
| - Tao / Sua / Xoa: SA, SYS                                            |
| - Xem: SA, SYS, DC, QC, FC, ST, FP, BY (theo scope)                  |
+-----------------------------------------------------------------------+
| KHUNG 4 - ORDERS                                                      |
| - Tao / Sua: SA, SYS, DC, ST, FP (FP chi trong scope)                |
| - Doi trang thai: SA, SYS, DC, ST                                     |
+-----------------------------------------------------------------------+
| KHUNG 5 - DATA / QC / CAPA ITEM                                       |
| - Tao / Sua noi bo: SA, SYS, DC, QC, FC, FP                          |
| - Duyet noi bo + duyet sales: SA, SYS, DC                            |
| - Publish cho buyer: SA, SYS                                          |
+-----------------------------------------------------------------------+
| KHUNG 6 - SALE DATA CENTER                                            |
| - Xem du lieu da duyet sales/buyer: ST (theo scope)                  |
+-----------------------------------------------------------------------+
| KHUNG 7 - BUYER PORTAL                                                |
| - Xem du lieu approved_buyer: BY (du lieu duoc chia se)              |
+-----------------------------------------------------------------------+
| KHUNG 8 - AUDIT LOGS                                                  |
| - Xem log: SA, SYS, DC                                                |
| - Export log: SA, SYS                                                 |
+-----------------------------------------------------------------------+
```

## 4. Khung luồng duyệt dữ liệu (đề xuất)

```text
+---------+     +----------------+     +------------------+
|  draft  | --> | pending_review | --> | approved_internal|
+---------+     +----------------+     +------------------+
                                              |
                                              v
                                   +------------------+
                                   | approved_sales   |
                                   +------------------+
                                              |
                                              v
                                   +------------------+
                                   | approved_buyer   |
                                   +------------------+
                                              |
                                              v
                                   +------------------+
                                   | archived         |
                                   +------------------+
```

Ý nghĩa trạng thái:
- `draft`: Dữ liệu mới tạo/chưa gửi duyệt.
- `pending_review`: Đã gửi, chờ duyệt nội bộ.
- `approved_internal`: Đã duyệt nội bộ.
- `approved_sales`: Đã duyệt cho sale sử dụng.
- `approved_buyer`: Đã duyệt để buyer xem.
- `archived`: Đóng lưu trữ, không xử lý tiếp.

## 5. Khung quyền chuyển trạng thái (đề xuất)

```text
+----------------------------------------------------------------------------------+
| draft -> pending_review        : SA, SYS, DC, QC, FC, FP                        |
| pending_review -> approved_internal: SA, SYS, DC                                 |
| pending_review -> draft        : SA, SYS, DC                                     |
| approved_internal -> approved_sales: SA, SYS, DC                                 |
| approved_sales -> approved_buyer: SA, SYS                                        |
| * -> archived                  : SA, SYS                                          |
+----------------------------------------------------------------------------------+
```

## 6. Quy tắc bảo vệ dữ liệu
- `Deny by default`: mặc định không có quyền nếu chưa được cấp.
- Quyền chỉ có hiệu lực khi đúng `role + scope + state`.
- Tất cả hành động quan trọng phải ghi `audit log`.
- Role legacy chỉ để tương thích dữ liệu cũ, không dùng làm chuẩn nghiệp vụ mới.

## 7. Các điểm anh cần chốt
- Có giữ đủ 8 role như đề xuất hay gộp bớt role.
- `factory_partner` có được sửa đơn hàng hay chỉ được tạo mới.
- `sale_trading` có quyền đổi trạng thái đơn hàng tới mức nào.
- Có cho `data_controller` quyền export audit log hay không.
- Mốc nào cần bắt buộc 2 người duyệt thay vì 1 người duyệt.
