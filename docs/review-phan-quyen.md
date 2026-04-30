# Review: `docs/de-xuat-phan-quyen-va-luong-duyet.md`

Tài liệu phụ trợ. Các nội dung chính của bản review đã được áp dụng trực tiếp vào file đề xuất. File này lưu lại bảng phân tích đầy đủ để tham chiếu.

Hình ảnh kèm theo (nằm tại `docs/images/`):

![Sơ đồ nhóm role theo phạm vi](./images/phan-quyen-role-groups.png)

![Ma trận phân quyền theo Module × Role](./images/phan-quyen-permission-matrix.png)

![Sơ đồ trạng thái dữ liệu (kèm các nhánh GAP)](./images/phan-quyen-state-machine.png)

---

## A. Mâu thuẫn / chưa khớp với baseline `permission-matrix-v1.md`

Đề xuất hiện tại có một số chỗ KHÔNG khớp với file baseline đã chốt (`docs/permission-matrix-v1.md`). Cần thống nhất trước khi đưa vào code.

| # | Hạng mục | Đề xuất (md đang review) | Baseline V1 | Khuyến nghị |
|---|---|---|---|---|
| A1 | **Orders – Tạo** | "Tạo / Sửa: SA, SYS, DC, ST, **FP** (FP chỉ trong scope)" → ngầm cho FP TẠO | "create/update: SA, SYS, DC, ST; **FP chỉ update trong scope**" → FP **không** được tạo | Sửa đề xuất: tách rõ Tạo (SA/SYS/DC/ST) vs Sửa (thêm FP, scope-bound). |
| A2 | **Orders – Xem** | Không nhắc đến (chỉ liệt kê Tạo/Sửa và Đổi trạng thái) | "view: tất cả 8 role theo scope" | Bổ sung dòng "Xem orders: tất cả role theo scope" trong KHUNG 4. |
| A3 | **Module legacy `supplier_material`** | Không có | Có khoá riêng: chỉ SA/SYS, non-admin trả 403 | Thêm KHUNG 9 hoặc một mục "Legacy module lock" để khớp. |
| A4 | **Customers/Factories/Projects – BY view** | "Xem: ... BY (theo scope)" → BY thấy cả 3 module | Baseline cho phép "role khác view theo scope" nhưng scope của BY là "chỉ dữ liệu được chia sẻ" (Section 2 của chính đề xuất) | BY không nên thấy danh mục Customers/Factories. Khuyến nghị giới hạn BY xem **Projects được share** + dữ liệu approved_buyer; loại BY khỏi list "Customers/Factories". |

## B. Lỗ hổng logic trong State Machine (Section 4 + 5)

Sơ đồ trạng thái hiện tại chỉ có 1 chiều forward + 1 nhánh reject `pending_review → draft` + archive bất kỳ. Còn thiếu các chiều rollback / restore quan trọng (xem các đường nét đứt **GAP** trong sơ đồ state machine kèm theo).

| # | Tình huống thực tế | Trạng thái hiện tại | Đề xuất bổ sung |
|---|---|---|---|
| B1 | Sau khi `approved_internal` phát hiện sai sót, cần đưa lại creator | Không có cách nào ngoài `archived` | Thêm `approved_internal → draft` (hoặc `→ pending_review`), quyền: SA, SYS, DC. |
| B2 | Đã `approved_sales` nhưng cần thu hồi, ko cho ST dùng nữa | Chỉ có archive | Thêm `approved_sales → approved_internal`, quyền: SA, SYS, DC. |
| B3 | Đã `approved_buyer` nhưng cần gỡ khỏi buyer mà chưa muốn đóng vĩnh viễn | Chỉ có archive | Thêm `approved_buyer → approved_sales`, quyền: SA, SYS. |
| B4 | Archive nhầm | Không có restore | Thêm `archived → draft`, quyền: SA, SYS (giới hạn hẹp). |
| B5 | Order lifecycle | Chỉ nói "đổi trạng thái: SA, SYS, DC, ST" | Định nghĩa danh sách trạng thái order rõ ràng (vd: `new → confirmed → in_progress → completed / cancelled`) và quy tắc chuyển. State machine của Data ≠ state machine của Order, cần tách riêng. |

## C. Vấn đề về role và phạm vi (scope)

| # | Vấn đề | Khuyến nghị |
|---|---|---|
| C1 | **Scope chưa định nghĩa**. "Theo scope được gán" lặp lại nhưng không nói scope là gì (region? factory? customer? project?). | Thêm 1 mục "Mô hình scope" liệt kê các chiều scope hợp lệ và quy tắc kết hợp. |
| C2 | **SA và SYS gần như trùng nhau** trong mọi module nghiệp vụ; chỉ khác ở "quản lý role + scope". | Xác nhận có thực sự cần 2 role tách biệt, hay gộp lại làm `system_admin` + một flag `super` cho SA. |
| C3 | **DC vừa "điều phối" vừa "duyệt"** (KHUNG 5 + state machine). Có rủi ro xung đột lợi ích nếu cùng người vừa nhập, vừa duyệt. | Giữ DC duyệt nhưng quy định "không duyệt dữ liệu do chính mình tạo" ở mức nghiệp vụ, hoặc tách Reviewer ra. |
| C4 | **QC không có quyền duyệt nội bộ** dù tên gọi gợi ý vai trò QC. | Có chủ ý (QC chỉ submit, DC approve). Cần ghi rõ ý đồ này trong Section 6 (quy tắc bảo vệ). |
| C5 | **ST (sale_trading) không submit dữ liệu** nhưng được Tạo/Sửa Orders + Đổi trạng thái. | Cần kiểm tra: Order có theo state machine giống Data không, hay flow khác hẳn? Hiện không rõ. |

## D. Các điểm thiếu/không đề cập

- **D1. Notification flow**: không có quy định ai nhận thông báo khi state đổi (creator/reviewer). Nếu có, phải ghi rõ.
- **D2. Hard delete vs Archive**: chỉ có archive (soft). Nếu cần hard delete (vd: yêu cầu pháp lý) → ai có quyền? Hiện không nói.
- **D3. Audit log retention**: không nói thời hạn lưu, ai có quyền xoá log, log có immutable không.
- **D4. Reject reason / comment**: `pending_review → draft` (reject) không nói có bắt buộc lý do hay không.
- **D5. Bulk operations**: nhập/xuất hàng loạt có theo cùng matrix không? Đặc biệt với Audit Logs export.
- **D6. Service accounts / API key**: hệ thống tự động (cron, integration) thuộc role nào? Hiện chỉ liệt kê role người dùng.

## E. Sửa nhỏ về cách trình bày (không quan trọng nhưng tốt cho người duyệt)

- **E1.** Section 3 KHUNG 4 không có dòng "Xem orders" → khó đọc nhanh.
- **E2.** Section 3 KHUNG 5 viết "Duyệt nội bộ + duyệt sales" gộp 2 hành động vào 1 dòng. Tách 2 dòng riêng để khớp 1-1 với state transition (B-1 + B-2).
- **E3.** Section 5 nên được vẽ thành state diagram (đã làm trong file `phan-quyen-state-machine.png`). File text ASCII art không nói lên được nhánh rollback/archive.
- **E4.** Section 7 (các điểm cần chốt) không có phần để anh điền đáp án. Đề nghị thêm 1 cột "Chốt" hoặc mỗi điểm có dòng `> Đáp án:` để feedback gọn.

## F. Tóm tắt khuyến nghị (theo độ ưu tiên)

1. **Phải đồng bộ với baseline** — sửa A1, A2, A3, A4 trước, vì baseline V1 đã được lock và đang dùng làm chuẩn nghiệp vụ.
2. **Bổ sung rollback/restore trong state machine** — B1–B4. Không có những nhánh này, mọi sai sót sau duyệt sẽ phải archive → mất audit trail dữ liệu live.
3. **Định nghĩa rõ scope** (C1) và **lifecycle của Order** (B5).
4. **Quyết định SA vs SYS** (C2) — giữ 8 hay gộp còn 7 role.
5. Còn lại (D1–D6) có thể đẩy sang vòng chốt thứ 2.
