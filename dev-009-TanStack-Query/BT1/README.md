# Chuyển Đổi Component Sang TanStack Query (useQuery)

Dự án thực hiện bài tập chuyển đổi một component fetch dữ liệu thủ công sang `useQuery` với cấu hình cache hợp lý và kiểm chứng không còn request trùng lặp.

---

## 1. So sánh: Fetch thủ công vs useQuery

### Fetch thủ công (`ManualUserList.jsx`):
```javascript
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  let isMounted = true;
  setIsLoading(true);

  fetchUsers()
    .then((data) => {
      if (isMounted) setUsers(data);
    })
    .catch((err) => {
      if (isMounted) setError(err.message);
    })
    .finally(() => {
      if (isMounted) setIsLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, []);
```
**Nhược điểm:**
- Mỗi khi component bị unmount rồi mount lại (chuyển trang, ẩn/hiện, re-render cha), `useEffect` chạy lại từ đầu và gửi một HTTP request mới dù dữ liệu người dùng không thay đổi.
- Không có cơ chế cache, người dùng phải thấy màn hình loading mỗi lần vào lại.

---

### Sau khi chuyển sang `useQuery` (`QueryUserList.jsx`):
```javascript
const {
  data: users = [],
  isLoading,
  isError,
  error,
  isFetching,
} = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 1000 * 60 * 5, // 5 phút
  gcTime: 1000 * 60 * 10,   // 10 phút
});
```

**Ưu điểm:**
- Code ngắn gọn hơn, không cần khai báo `useState` + `useEffect` thủ công.
- Tự động quản lý các trạng thái `isLoading`, `isError`, `isFetching`.
- Dữ liệu được cache tự động theo `queryKey: ['users']`.

---

## 2. Cấu hình staleTime hợp lý

```javascript
staleTime: 1000 * 60 * 5, // 5 phút
gcTime: 1000 * 60 * 10,   // 10 phút
```

- **Lý do chọn 5 phút**: Danh sách người dùng/nhân viên công ty là dạng dữ liệu ít biến động liên tục trong phiên làm việc.
- **Cơ chế hoạt động**:
  - Trong vòng 5 phút (fresh), bất kỳ component nào gọi `useQuery({ queryKey: ['users'] })` hoặc khi user rời trang rồi quay lại, dữ liệu được lấy ngay từ bộ nhớ đệm (cache hit), không phát sinh request qua mạng.
  - Sau 5 phút (stale), nếu component mount lại hoặc focus lại cửa sổ, TanStack Query sẽ trả về dữ liệu cache trước để UI không bị giật, đồng thời fetch ngầm trong background (`isFetching`) để cập nhật dữ liệu mới nhất.

---

## 3. Kiểm tra triệt tiêu request trùng lặp

Dự án tích hợp bộ đếm `Network Requests` để kiểm chứng trực tiếp:

1. **Với Fetch thủ công (`useEffect`)**:
   - Nhấn "Ẩn component" rồi nhấn "Hiện component" 5 lần.
   - Kết quả: Bộ đếm Network Requests tăng liên tục từ 1 lên 6. Mỗi lần mount là một request trùng lặp.
2. **Với TanStack Query (`useQuery`)**:
   - Nhấn "Ẩn component" rồi nhấn "Hiện component" nhiều lần.
   - Kết quả: Bộ đếm Network Requests **giữ nguyên ở mức 1**. Dữ liệu hiển thị tức thì từ cache, hoàn toàn triệt tiêu request trùng.

---

## 4. Hướng dẫn chạy thử dự án

```bash
cd dev-009-TanStack-Query/BT1
npm install
npm run dev
```

Mở trình duyệt tại đường dẫn được hiển thị (`http://localhost:5173`) để thử nghiệm chuyển đổi qua lại giữa 2 chế độ và bật/tắt component.
