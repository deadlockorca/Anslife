# TIMELINE TRIỂN KHAI WEB NGHIỆP VỤ

## 1. Loại dự án
Web có nghiệp vụ nặng (giống case hiện tại), gồm:
- Có phân quyền rõ ràng.
- Có luồng duyệt dữ liệu.
- Có dashboard theo vai trò.
- Có logic nghiệp vụ nhiều tầng.

👉 Tổng quan: Dự án nặng, cần triển khai theo giai đoạn chặt chẽ.

## 2. Timeline theo tuần

### Tuần 1 - Phân tích sâu
- Chốt danh sách chức năng và role.
- Vẽ flow nghiệp vụ (ai làm gì, duyệt ở bước nào).
- Dựng UI khung (wireframe) cho các màn chính.

👉 Giai đoạn quan trọng nhất. Nếu sai ở bước này có thể ảnh hưởng toàn bộ dự án.

### Tuần 2 - UI + Frontend
- Code full UI theo wireframe đã duyệt.
- Dựng responsive cho desktop/tablet/mobile.
- Hoàn thiện các màn quản trị (admin).

### Tuần 3 - Backend Core
- Làm auth: đăng nhập, phân vai trò (role).
- Dựng các CRUD chính.
- Thiết kế cấu trúc database.

### Tuần 4 - Logic nghiệp vụ
- Áp dụng phân quyền chi tiết theo role + trạng thái dữ liệu.
- Làm luồng duyệt: approve/reject.
- Validate dữ liệu theo rule nghiệp vụ.

### Tuần 5 - Hoàn thiện
- Nối frontend và backend.
- Test tổng thể toàn hệ thống.
- Fix bug theo mức độ ưu tiên.

### Tuần 6 (Buffer)
- Sửa theo feedback thực tế.
- Deploy môi trường chính thức.
- Xử lý lỗi phát sinh sau triển khai.

## 3. Kết luận timeline
👉 Thực tế dự án web nghiệp vụ dạng này thường rơi vào khoảng 4-6 tuần,
phụ thuộc mức độ rõ ràng của yêu cầu và tốc độ duyệt từng vòng.
