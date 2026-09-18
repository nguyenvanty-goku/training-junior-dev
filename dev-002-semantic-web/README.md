# DEV-FE-002: Semantic Web & Tailwind CSS - Task Manager (TaskFlow Pro)

Ứng dụng quản lý công việc và tiến độ dự án được phát triển bằng React 19, Vite và Tailwind CSS v4, áp dụng thẻ HTML ngữ nghĩa (Semantic HTML) và thiết kế giao diện responsive.

---

## Cấu trúc thư mục dự án

```text
dev-002-semantic-web/
├── index.html               # Cấu trúc HTML ngữ nghĩa chính của ứng dụng
└── src/
    ├── main.jsx             # Entry point ứng dụng React
    ├── App.jsx              # Root component
    ├── index.css            # Cấu hình Tailwind CSS v4 (@import "tailwindcss";)
    ├── pages/
    │   └── TaskManagerPage.jsx  # Trang quản lý công việc chính (Logic, State, Filter)
    ├── components/
    │   ├── WelcomeBanner.jsx    # Banner chào mừng và phím tắt tạo công việc
    │   └── TaskModals.jsx       # Modal chi tiết, thêm/sửa công việc và xác nhận xóa
    └── data/
        └── initialTasks.js      # Dữ liệu mẫu ban đầu và danh mục công việc
```

---

## Tính năng ứng dụng

### 1. Quản lý công việc (CRUD)
- **Tạo mới:** Thêm công việc với đầy đủ thông tin: Mã công việc (Code), Tên, Danh mục, Mức độ ưu tiên (Khẩn cấp, Cao, Trung bình, Thấp), Trạng thái (Cần làm, Đang thực hiện, Kiểm thử, Hoàn thành), Tiến độ (%), Hạn chót và Người thực hiện.
- **Chỉnh sửa:** Cập nhật thông tin chi tiết cho từng công việc hiện có.
- **Xóa:** Xóa công việc khỏi danh sách với modal xác nhận an toàn.
- **Xem chi tiết:** Hiển thị thông tin mô tả đầy đủ, người thực hiện, hạn chót và lịch sử khởi tạo.

### 2. Tìm kiếm, Lọc & Sắp xếp
- **Tìm kiếm:** Tìm theo tên công việc, mã TSK, người thực hiện hoặc từ khóa mô tả.
- **Bộ lọc:** Lọc danh sách theo Danh mục chuyên môn, Mức độ ưu tiên và Trạng thái thực hiện.
- **Sắp xếp:** Sắp xếp theo Hạn chót gần nhất, Độ ưu tiên cao nhất, Tiến độ cao nhất, Ngày tạo mới nhất hoặc Tên (A-Z).

### 3. Chế độ hiển thị
- **Dạng thẻ (Card View):** Lưới thẻ trực quan, tiện quan sát tiến độ công việc.
- **Dạng bảng (List View):** Bảng dữ liệu chi tiết, tiện theo dõi danh sách dài.

### 4. Lưu trữ dữ liệu
- Tự động lưu trữ và đồng bộ danh sách công việc vào `localStorage` của trình duyệt.
- Hỗ trợ nút "Đặt lại mẫu" để khôi phục danh sách dữ liệu mặc định ban đầu.

### 5. Chuẩn thiết kế & Giao diện
- Sử dụng các thẻ HTML5 ngữ nghĩa (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Xây dựng giao diện responsive tương thích với màn hình Mobile, Tablet và Desktop bằng Tailwind CSS v4.
