# Bài Tập Về Nhà Buổi 1: Next.js App Router & Chiến Lược Render (`dev-010-Nextjs/bt1`)

Dự án thực hiện các yêu cầu trong slide **Tóm tắt Buổi 1 & Bài tập về nhà**:
- **Dựng 4 route theo chuẩn App Router**: `/`, `/products`, `/products/[id]`, `/about`.
- **Layout chung + `loading.tsx` cho danh sách**:
  - [`src/app/layout.tsx`](./src/app/layout.tsx): Layout chung (Header điều hướng + Footer).
  - [`src/app/products/loading.tsx`](./src/app/products/loading.tsx): Hiển thị Skeleton UI tự động qua React Suspense trong lúc Server Component đang tải danh sách sản phẩm.
- **1 Client Component nhỏ ở 'phần lá' (`'use client'`)**:
  - [`src/components/ProductActionLeaf.tsx`](./src/components/ProductActionLeaf.tsx): Tách phần nút tương tác (**Yêu thích**, **Tăng/giảm số lượng**, **Thêm vào giỏ hàng**) ra Client Component ở phần lá, giữ toàn bộ trang và thông tin sản phẩm là **Server Component**.
- **Ghi chú chiến lược render cho mỗi trang**:
  - Hiển thị trên giao diện mỗi trang và tổng hợp ở bảng bên dưới.

---

## Cấu trúc thư mục

```text
dev-010-Nextjs/bt1/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── README.md
└── src/
    ├── data/
    │   └── products.ts
    ├── components/
    │   └── ProductActionLeaf.tsx
    └── app/
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
        ├── about/
        │   └── page.tsx
        └── products/
            ├── loading.tsx
            ├── page.tsx
            └── [id]/
                └── page.tsx
```

---

## Ghi chú Chiến lược Render cho mỗi trang

| Route | File | Chiến lược Render | Cấu hình trong code | Lý do lựa chọn |
| :--- | :--- | :--- | :--- | :--- |
| **`/`** (Trang chủ) | `src/app/page.tsx` | **ISR** *(Incremental Static Regeneration)* | `export const revalidate = 3600;` | Trang đích cần tốc độ tải tức thì từ cache tĩnh và tối ưu SEO, đồng thời tự động cập nhật danh sách sản phẩm nổi bật mỗi 1 giờ mà không cần build lại. |
| **`/products`** (Danh sách SP) | `src/app/products/page.tsx` + `loading.tsx` | **SSR + Streaming** *(Server-Side Rendering)* | `export const dynamic = 'force-dynamic';` | Danh sách sản phẩm cần phản ánh chính xác số lượng tồn kho (stock) và giá bán theo từng request. Khi kết hợp `loading.tsx`, Next.js stream ngay giao diện Skeleton trong lúc chờ Server trả dữ liệu (800ms). |
| **`/products/[id]`** (Chi tiết SP) | `src/app/products/[id]/page.tsx` | **SSG + ISR** *(Static Params + Revalidate)* | `generateStaticParams()` + `export const revalidate = 60;` | Pre-render sẵn HTML tĩnh cho các trang sản phẩm lúc build để đạt điểm SEO cao nhất; kết hợp ISR làm mới nền sau mỗi 60 giây khi giá/đánh giá thay đổi. |
| **`/about`** (Giới thiệu) | `src/app/about/page.tsx` | **SSG** *(Static Site Generation)* | `export const dynamic = 'force-static';` | Nội dung giới thiệu dự án và lý thuyết cố định, không thay đổi theo user nên chỉ cần tạo HTML tĩnh 1 lần duy nhất lúc `next build`. |
| **Phần lá tương tác** | `src/components/ProductActionLeaf.tsx` | **CSR ở phần lá** *(Client Component)* | `'use client'` | Chỉ phần nút bấm cần `useState` và `onClick` (Yêu thích, Chọn số lượng, Thêm vào giỏ) mới chạy ở Client, không kéo cả trang thành Client Component. |

---

## Hướng dẫn cài đặt và chạy dự án

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd dev-010-Nextjs/bt1
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Chạy môi trường Development:
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại `http://localhost:3000`.
