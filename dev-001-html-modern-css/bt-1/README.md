# HTML Ngữ Nghĩa & Thiết Kế Trang Giới Thiệu Bản Thân

Thư mục này chứa bài tập thực hành thiết kế trang giới thiệu bản thân bằng HTML5 Ngữ nghĩa (Semantic HTML) cho lập trình viên **Nguyễn Văn Tý**.

---

## 1. Khung HTML ngữ nghĩa trang giới thiệu bản thân (Nguyễn Văn Tý)

Dưới đây là cấu trúc mã nguồn HTML5 ngữ nghĩa được triển khai trong tệp `index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Giới thiệu bản thân - Nguyễn Văn Tý</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Header điều hướng chính -->
  <header class="header">
    <a href="#" class="logo">Nguyễn Văn Tý</a>
    <nav class="nav">
      <ul>
        <li><a href="#about">Giới thiệu</a></li>
        <li><a href="#skills">Kỹ năng</a></li>
        <li><a href="#contact">Liên hệ</a></li>
      </ul>
    </nav>
  </header>

  <!-- Nội dung chính của trang -->
  <main class="main-content">
    
    <!-- Section: Giới thiệu chung -->
    <section id="hero" class="hero-section">
      <figure class="avatar-wrapper">
        <img src="https://via.placeholder.com/150" alt="Chân dung Nguyễn Văn Tý">
        <figcaption>Lập trình viên Frontend Junior</figcaption>
      </figure>
      <div class="hero-text">
        <h1>Xin chào, tôi là Nguyễn Văn Tý</h1>
        <p class="subtitle">Lập trình viên Frontend</p>
        <p>
          Tôi đang học tập và phát triển kỹ năng lập trình web với HTML5, CSS3, JavaScript và React.
          Mục tiêu của tôi là xây dựng các giao diện tối ưu trải nghiệm người dùng, sử dụng HTML ngữ nghĩa và mã nguồn dễ bảo trì.
        </p>
      </div>
    </section>

    <!-- Section: Về bản thân -->
    <section id="about" class="about-section">
      <h2>Về tôi</h2>
      <div class="about-grid">
        <article class="bio-article">
          <h3>Mục tiêu phát triển</h3>
          <p>
            Tôi tập trung nắm vững nền tảng HTML/CSS ngữ nghĩa và JavaScript thuần trước khi áp dụng vào các thư viện hiện đại.
            Tôi yêu thích việc tạo ra các sản phẩm chỉn chu, có độ hoàn thiện cao và tương thích trên nhiều thiết bị.
          </p>
        </article>

        <aside class="info-aside">
          <h3>Thông tin cá nhân</h3>
          <ul>
            <li><strong>Họ tên:</strong> Nguyễn Văn Tý</li>
            <li><strong>Vị trí:</strong> Junior Frontend Developer</li>
            <li><strong>Trạng thái:</strong> Đang tìm kiếm cơ hội công việc</li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- Section: Kỹ năng chuyên môn -->
    <section id="skills" class="skills-section">
      <h2>Kỹ năng chuyên môn</h2>
      <div class="skills-grid">
        <article class="skill-card">
          <h3>HTML5 & CSS3</h3>
          <p>Sử dụng thẻ ngữ nghĩa (Semantic HTML), Flexbox, CSS Grid và thiết kế Responsive.</p>
        </article>

        <article class="skill-card">
          <h3>JavaScript</h3>
          <p>Hiểu về ES6+, xử lý sự kiện DOM, Async/Await, Closure và Array Methods.</p>
        </article>

        <article class="skill-card">
          <h3>React & Tailwind CSS</h3>
          <p>Xây dựng giao diện dạng Component, quản lý state và style nhanh với Tailwind CSS.</p>
        </article>
      </div>
    </section>

  </main>

  <!-- Chân trang -->
  <footer class="footer">
    <p>&copy; 2026 Nguyễn Văn Tý. Tất cả quyền được bảo lưu.</p>
  </footer>

</body>
</html>
```

---

## 2. Nguyên tắc hạn chế sử dụng thẻ `<div>`

Thẻ `<div>` là một **Non-semantic Element** (thẻ phi ngữ nghĩa), chỉ đóng vai trò làm một khối chứa rỗng mà không truyền tải ý nghĩa hay vai trò của nội dung bên trong cho trình duyệt hay công cụ tìm kiếm.

Việc hạn chế sử dụng thẻ `<div>` và ưu tiên các thẻ ngữ nghĩa mang lại 3 lợi ích quan trọng:

1. **Hỗ trợ truy cập (Accessibility - a11y):** Các công cụ đọc màn hình (Screen Readers) dành cho người khiếm thị có thể nhận biết và điều hướng trang web dựa trên cấu trúc ngữ nghĩa (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
2. **Tối ưu hóa cấu trúc:** Giúp trình duyệt và bộ máy tìm kiếm (SEO) hiểu rõ thứ tự ưu tiên và mối quan hệ giữa các thành phần nội dung.
3. **Mã nguồn sạch và dễ bảo trì:** Giúp các lập trình viên làm việc chung nhanh chóng hiểu rõ cấu trúc giao diện mà không bị rối bởi quá nhiều thẻ `<div>` lồng nhau.

---

## 3. Liệt kê 5 thẻ ngữ nghĩa và trường hợp sử dụng

| STT | Thẻ Ngữ Nghĩa | Trường hợp sử dụng (When to use) |
|---|---|---|
| **1** | `<header>` | Dùng cho phần đầu của trang web hoặc phần mở đầu của một khu vực nội dung độc lập. Thường chứa logo, tiêu đề trang hoặc thanh điều hướng. |
| **2** | `<nav>` | Bao bọc các liên kết điều hướng chính của trang web (như Menu điều hướng ở header, sidebar navigation). |
| **3** | `<main>` | Chứa nội dung chính, độc nhất của trang web. Mỗi trang HTML chỉ được phép có duy nhất **1 thẻ `<main>`**. |
| **4** | `<section>` | Nhóm các nội dung có cùng chủ đề hoặc ngữ cảnh lại với nhau (như Section "Giới thiệu", Section "Kỹ năng", Section "Dự án"). |
| **5** | `<article>` | Dùng cho khối nội dung tự hoàn chỉnh, độc lập và có thể tái sử dụng (như Bài viết blog, bài báo tin tức, thẻ thông tin sản phẩm). |
