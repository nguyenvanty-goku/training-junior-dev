# JavaScript Core - Closure, Array Methods & `this`

Thư mục này chứa các bài tập thực hành JavaScript Core bao gồm:
1. **Closure** (Đóng gói dữ liệu & phạm vi biến)
2. **Array Methods** (Thay thế vòng lặp `for` bằng các phương thức xử lý mảng)
3. **Từ khóa `this`** (Ràng buộc ngữ cảnh thực thi trong JavaScript)

---

## Hướng dẫn chạy bài tập

Chạy trực tiếp các tệp bằng Node.js:

```bash
cd dev-003-javascript-core/bt-1

node 01-closure.js
node 02-array-methods.js
node 03-this-keyword.js
```

---

## 1. Closure trong JavaScript (`01-closure.js`)

### Khái niệm
Closure là tính chất một hàm ghi nhớ và truy cập các biến trong phạm vi từ vựng (Lexical Scope) nơi nó được định nghĩa, kể cả khi hàm được thực thi ngoài phạm vi đó.

### Ứng dụng
- Đóng gói dữ liệu (Encapsulation) và bảo vệ biến private.
- Duy trì trạng thái qua nhiều lần gọi hàm.
- Tối ưu hiệu năng với kỹ thuật Memoization.

### Các bài tập đã triển khai
1. `createCounter(initialValue)`: Đóng gói biến `count`, cung cấp các phương thức `increment`, `decrement`, `getValue`, `reset`.
2. `createCart()`: Quản lý giỏ hàng private với `addItem`, `removeItem`, `getTotal`, `getItems`.
3. `memoize(fn)`: Ghi nhớ kết quả tính toán dựa trên tham số đầu vào.
4. `createIdGenerator(prefix)`: Sinh ID tự động tăng theo tiền tố.

---

## 2. Array Methods vs Vòng lặp `for` (`02-array-methods.js`)

### Ưu điểm của Array Methods
- Mức độ khai báo (Declarative) cao hơn, code rõ ràng và ngắn gọn.
- Hạn chế đột biến mảng gốc (Immutability).
- Tránh các lỗi liên quan đến biến đếm vòng lặp.

### Các bài tập đã triển khai
- `filter` & `map`: Lọc danh sách theo điều kiện và trích xuất dữ liệu mong muốn.
- `reduce`: Tính tổng doanh thu, gom nhóm dữ liệu theo thuộc tính, tính trung bình cộng.
- `find`, `some`, `every`: Kiểm tra và tìm kiếm phần tử trong mảng.
- `flatMap` & `Set`: Trích xuất mảng con lồng nhau và loại bỏ phần tử trùng lặp.

---

## 3. Từ khóa `this` trong JavaScript (`03-this-keyword.js`)

### Quy tắc xác định `this`
Giá trị của `this` phụ thuộc vào cách hàm được gọi tại thời điểm runtime (trừ Arrow Function):

1. **Default Binding**: Gọi hàm tự do, `this` trỏ về `global`/`window` hoặc `undefined` trong strict mode.
2. **Implicit Binding**: Gọi phương thức của object (`obj.method()`), `this` trỏ về object đó.
3. **Explicit Binding**: Dùng `call`, `apply`, `bind` để chủ động gán `this`.
4. **New Binding**: Dùng từ khóa `new` với constructor function.

### Arrow Function vs Regular Function
- Regular Function xác định `this` theo cách gọi hàm.
- Arrow Function không có `this` riêng mà kế thừa `this` từ ngữ cảnh chứa nó (Lexical `this`).

### Xử lý mất context `this` trong Callback
- Dùng Arrow Function để kế thừa `this` từ hàm bao ngoài.
- Dùng `.bind(this)` để cố định context cho hàm callback.
