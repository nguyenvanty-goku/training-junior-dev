# Bảng Giá Dịch Vụ - Pricing Section (BEM & Responsive)

Thư mục này chứa bài tập thiết kế giao diện **Pricing Section** (Bảng giá dịch vụ) sử dụng CSS Grid / Flexbox, áp dụng phương pháp đặt tên class chuẩn BEM và hiệu ứng hover mượt mà cho từng card.

---

## 1. Cấu trúc mã nguồn & Quy tắc đặt tên Class BEM

Mã nguồn tuân thủ nghiêm ngặt phương pháp đặt tên **BEM** (Block - Element - Modifier):

### Block
- `.pricing-section`: Khối chính chứa toàn bộ phần bảng giá.
- `.pricing-card`: Khối thẻ thông tin giá dịch vụ độc lập.

### Element
- `.pricing-section__header`: Phần đầu của khu vực bảng giá (chứa tiêu đề và mô tả).
- `.pricing-section__title`: Tiêu đề chính của khu vực bảng giá.
- `.pricing-section__subtitle`: Mô tả phụ của khu vực bảng giá.
- `.pricing-section__container`: Khối chứa danh sách các card bảng giá.
- `.pricing-card__badge`: Nhãn dán nổi bật trên card.
- `.pricing-card__header`: Phần đầu của từng card (tiêu đề, giá tiền).
- `.pricing-card__title`: Tên gói dịch vụ.
- `.pricing-card__description`: Mô tả ngắn của gói dịch vụ.
- `.pricing-card__price`: Khối chứa giá tiền và chu kỳ.
- `.pricing-card__amount`: Số tiền giá dịch vụ.
- `.pricing-card__period`: Đơn vị thời gian/chu kỳ.
- `.pricing-card__features`: Danh sách tính năng của gói dịch vụ.
- `.pricing-card__feature-item`: Từng dòng tính năng.
- `.pricing-card__footer`: Phần chân của card chứa nút đăng ký.
- `.pricing-card__button`: Nút đăng ký dịch vụ.

### Modifier
- `.pricing-card--featured`: Biến thể dành cho gói dịch vụ nổi bật (viền xanh, có badge).
- `.pricing-card__button--primary`: Biến thể nút nổi bật có màu nền chủ đạo.
- `.pricing-card__feature-item--disabled`: Biến thể cho dòng tính năng chưa được hỗ trợ.

---

## 2. Thiết kế Responsive (Flexbox / CSS Grid)

Layout sử dụng **CSS Grid** linh hoạt tự động điều chỉnh theo kích thước màn hình:

- **Màn hình Desktop (>= 992px):** Hiển thị dạng mảng 3 cột thẳng hàng (`grid-template-columns: repeat(3, 1fr)`).
- **Màn hình Tablet (641px - 991px):** Tự động chuyển thành 2 cột (`grid-template-columns: repeat(2, 1fr)`).
- **Màn hình Mobile (<= 640px):** Co về 1 cột duy nhất (`grid-template-columns: 1fr`).

---

## 3. Hiệu ứng Hover mượt mà

Các card bảng giá được thêm hiệu ứng mượt mà khi di chuột (`:hover`):

- **`transition`**: Thiết lập thời gian chuyển động 0.3s kết hợp cùng hàm timing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **`transform: translateY(-8px)`**: Đẩy nhẹ card nâng cao lên trên tạo hiệu ứng 3D.
- **`box-shadow`**: Thêm đổ bóng mượt làm nổi bật card đang được hover.
- **`border-color`**: Đổi màu viền thẻ khi rê chuột.
