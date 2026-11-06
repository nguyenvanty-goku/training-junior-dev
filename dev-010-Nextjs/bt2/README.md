# Bài Tập Về Nhà Buổi 2: Data Fetching, Metadata SEO, `next/image` & `next/font` (`dev-010-Nextjs/bt2`)

Dự án thực hiện các yêu cầu trong slide bài tập về nhà Buổi 2:

1. **Dự án 4 trang, chọn đúng SSG / ISR / SSR + Fetch API trong Server Component**:
   - **`/` (`src/app/page.tsx`) — ISR (`revalidate = 3600`)**: Fetch danh sách sản phẩm nổi bật từ API với `{ next: { revalidate: 3600 } }`.
   - **`/products` (`src/app/products/page.tsx`) — SSR (`dynamic = 'force-dynamic'`)**: Fetch danh sách sản phẩm thời gian thực với `{ cache: 'no-store' }` kết hợp `loading.tsx`.
   - **`/products/[id]` (`src/app/products/[id]/page.tsx`) — SSG + ISR (`generateStaticParams` + `revalidate = 60`)**: Tạo sẵn trang tĩnh lúc build cho các sản phẩm chính và tự động cập nhật dữ liệu mỗi 60 giây.
   - **`/about` (`src/app/about/page.tsx`) — SSG (`dynamic = 'force-static'`)**: Trang giới thiệu tĩnh hoàn toàn.

2. **Metadata SEO (`title` / `description` / `OpenGraph`)**:
   - Cấu hình `metadataBase`, `title` (`default` + `template`), `description` và `openGraph` tại `src/app/layout.tsx` và từng trang tĩnh.
   - Sử dụng `generateMetadata` tại `src/app/products/[id]/page.tsx` để sinh động `title`, `description` và ảnh `openGraph.images` theo đúng sản phẩm đang xem.

3. **Tối ưu hình ảnh và phông chữ (`next/image` + `next/font`)**:
   - `next/font/google`: Tích hợp phông chữ `Be_Vietnam_Pro` (`subsets: ['latin', 'vietnamese']`, `display: 'swap'`) trong `src/app/layout.tsx` giúp loại bỏ hiện tượng nhảy chữ (CLS).
   - `next/image`: Toàn bộ hình ảnh sản phẩm và banner sử dụng component `<Image>` với `width`, `height`, `sizes` và `priority` cho các ảnh đầu trang, cấu hình `remotePatterns` trong `next.config.mjs`.

---

## Hướng dẫn chạy và kiểm tra

1. Cài đặt và chạy môi trường Development:
   ```bash
   cd dev-010-Nextjs/bt2
   npm install
   npm run dev
   ```

2. Build Production và kiểm tra điểm Lighthouse:
   ```bash
   npm run build
   npm run start
   ```
   Mở `http://localhost:3000` trong Chrome ẩn danh (Incognito) -> mở DevTools -> tab **Lighthouse** -> nhấn **Analyze page load** để chụp điểm Performance, Accessibility, Best Practices và SEO.

