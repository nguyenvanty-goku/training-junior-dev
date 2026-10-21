# Phân Trang Danh Sách Lớn Với TanStack Query

Dự án thực hiện bài tập xây dựng trang danh sách lớn có phân trang, chuyển trang mượt mà không bị load lại (giữ dữ liệu cũ bằng `placeholderData: keepPreviousData`) và kiểm chứng triệt tiêu request trùng lặp qua bộ nhớ đệm cache.

---

## 1. Kiến trúc phân trang (`productsApi.js` & `useQuery`)

- **Nguồn dữ liệu:** DummyJSON Products API (~194 sản phẩm thực tế kèm hình ảnh, giá, đánh giá).
- **Phân trang:** Mỗi trang 8 sản phẩm (`limit=8&skip=(page - 1) * 8`).
- **Query Key động theo trang:**
  ```javascript
  useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page, LIMIT),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 phút
    gcTime: 1000 * 60 * 10,   // 10 phút
  })
  ```

---

## 2. Kỹ thuật chuyển trang không load lại (`placeholderData: keepPreviousData`)

1. **Khắc phục hiện tượng giật màn hình (Flickering):**
   - Mặc định khi đổi `page` từ `1` sang `2`, TanStack Query sẽ coi `['products', 2]` là một query mới và đưa component về trạng thái `isLoading: true` (gây chớp trắng màn hình).
   - Với `placeholderData: keepPreviousData`, TanStack Query tiếp tục hiển thị sản phẩm của trang 1 trong lúc tải trang 2 ở chế độ nền. Khi trang 2 tải xong, giao diện chuyển đổi mượt mà.
2. **Tức thì khi chuyển về trang đã xem:**
   - Dữ liệu mỗi trang được lưu cache độc lập theo `['products', page]` trong 5 phút.
   - Khi người dùng bấm quay lại các trang trước (ví dụ từ trang 3 về trang 2 rồi trang 1), dữ liệu xuất hiện ngay lập tức mà không có bất kỳ độ trễ hay hiệu ứng tải lại nào.

---

## 3. Kiểm tra Network không request trùng

Ứng dụng tích hợp bộ đếm `Network Requests` thực tế gửi qua Axios:

| Thao tác người dùng | Số request phát sinh | Tổng Network Requests | Trạng thái hiển thị |
| :--- | :---: | :---: | :--- |
| Mở ứng dụng (Trang 1) | +1 | **1** | Tải mới trang 1 |
| Bấm sang Trang 2 | +1 | **2** | Giữ trang 1, tải ngầm trang 2 |
| Bấm sang Trang 3 | +1 | **3** | Giữ trang 2, tải ngầm trang 3 |
| **Bấm quay về Trang 1** | **0** | **3** | **Lấy tức thì từ Cache (0s delay)** |
| **Bấm sang lại Trang 2** | **0** | **3** | **Lấy tức thì từ Cache (0s delay)** |

> Hoàn toàn không phát sinh request trùng lặp cho các trang đã nạp vào bộ nhớ đệm trong thời gian `staleTime`.

---

## 4. Hướng dẫn chạy thử dự án

```bash
cd dev-009-TanStack-Query/BT2
npm install
npm run dev
```

Mở trình duyệt tại đường dẫn `http://localhost:5173` để:
- Chuyển đổi qua lại giữa các trang bằng thanh phân trang hoặc danh sách `#1, #2, #3...` trên thanh trạng thái.
- Quan sát chỉ số `Network Requests` ở góc trên bên phải để kiểm chứng không có request trùng.
