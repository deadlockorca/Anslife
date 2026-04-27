# TIMELINE THỰC TẾ DỰ ÁN HIỆN TẠI - ANSLIFE V1

Cập nhật ngày: **27/04/2026**  
Ngày bắt đầu thực tế: **06/04/2026**  
Trạng thái hiện tại: **Đã đi qua 3 tuần, đang vào tuần 4**

## 1. Scope đang triển khai
- Website public đa ngôn ngữ theo 10 nhóm nội dung chính.
- API public (`/api/public/*`) cho phần hiển thị.
- API internal (`/api/internal/*`) cho đăng nhập, phân quyền và vận hành admin.
- Dữ liệu vận hành với MySQL + Prisma.

## 2. Tiến độ thực tế 3 tuần đã làm

### Tuần 1 (06/04/2026 - 12/04/2026) - Chốt khung kỹ thuật và phạm vi
- Chốt phạm vi V1 theo mục tiêu website public + API + dữ liệu vận hành.
- Khóa các trục kỹ thuật chính trong code: config site, nguồn content, trang section/sub-section, API route.
- Chốt baseline nghiệp vụ V1 ở mức tài liệu (role, permission, state).
- Đầu ra: có khung triển khai rõ để team bám thống nhất.

### Tuần 2 (13/04/2026 - 19/04/2026) - Đẩy mạnh nội dung nhóm manufacturing
- Bổ sung nội dung chi tiết cho các trang con nhóm `manufacturing-ecosystem`.
- Làm sâu trang `ecosystem-operating-model` theo hướng vận hành thực tế.
- Nâng cấp `product-development-capability` với `stage-gate`, deliverables và KPI.
- Đầu ra: nhóm trang manufacturing có độ chi tiết tốt hơn và dễ dùng cho trình bày năng lực.

### Tuần 3 (20/04/2026 - 26/04/2026) - Chuẩn hóa chất lượng nội dung và tài liệu vận hành
- Chuẩn hóa nguyên tắc ảnh để tránh trùng lặp trong block `manufacturing-ecosystem`.
- Chuẩn hóa quy tắc map `section.id` giữa config và content để giảm lệch dữ liệu.
- Xác nhận nhóm API public chính đang dùng cho trang public.
- Hoàn thiện bộ tài liệu vận hành để duyệt nhanh: quy trình triển khai, đề xuất phân quyền/luồng duyệt, timeline mẫu.
- Đầu ra: nền tài liệu + content rõ hơn, thuận lợi cho giai đoạn chốt và mở rộng.

## 3. Kế hoạch từ tuần hiện tại đến go-live

### Tuần 4 (27/04/2026 - 03/05/2026) - Hoàn thiện public site theo chuẩn xuất bản
- Rà toàn bộ 10 nhóm trang public về độ đồng đều nội dung.
- Rà ảnh, alt text, liên kết và bố cục hiển thị trên desktop/tablet/mobile.
- Chốt checklist review trước publish (SEO cơ bản, ngôn ngữ, media, link).
- Đầu ra: bản public ổn định để duyệt vòng cuối.

### Tuần 5 (04/05/2026 - 10/05/2026) - Củng cố admin và nghiệp vụ trọng yếu
- Chốt quyền theo `role + scope + state` cho luồng nội bộ ưu tiên.
- Rà nhóm API internal đang phục vụ đăng nhập/vận hành admin.
- Bổ sung phần còn thiếu cho dashboard và các luồng duyệt quan trọng theo baseline V1.
- Đầu ra: bản nghiệp vụ nội bộ đủ dùng cho V1.

### Tuần 6 (11/05/2026 - 17/05/2026) - Kiểm thử tổng thể, deploy và ổn định
- Test tổng thể các luồng chính (public + admin).
- Fix bug theo mức độ ưu tiên.
- Deploy môi trường thật, smoke test sau deploy.
- Xử lý lỗi phát sinh và ổn định vận hành.
- Đầu ra: bản go-live.

## 4. Mốc tổng kết hiện tại
- Tiến độ theo khung 6 tuần: **đã đi 3/6 tuần (50%)**.
- Mốc go-live mục tiêu hiện tại: **tuần 6 (11/05/2026 - 17/05/2026)**.
- Nếu phát sinh thay đổi lớn ở UI hoặc nghiệp vụ sau khi đã chốt: cần cộng thêm **1 tuần buffer**.
