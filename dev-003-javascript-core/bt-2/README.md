# JavaScript Core - Bài Tập 2: Fetch Tuần Tự vs Song Song, Event Loop & Modules

Thư mục này chứa phần giải Bài tập về nhà thuộc bài `dev-003-javascript-core/bt-2`, bao gồm:
1. **So sánh Fetch dữ liệu Tuần tự vs Song song** (`Promise.all` & `Promise.allSettled`).
2. **Q&A và Demo về Event Loop & Closure**.
3. **Refactor cấu trúc mã nguồn thành các module ES Modules (`import` / `export`)**.

---

## Hướng dẫn chạy dự án

Dự án được cấu hình dạng ES Module (`"type": "module"` trong `package.json`).

```bash
# Chuyển vào thư mục bài tập
cd dev-003-javascript-core/bt-2

# Chạy tệp chính
node index.js
# hoặc
npm start
```

---

## 1. Cấu trúc Module (`modules/`)

Mã nguồn được tách thành các module có chức năng riêng biệt:

```text
dev-003-javascript-core/bt-2/
├── package.json                   # Cấu hình ES Module ("type": "module")
├── index.js                       # Tệp chính import và thực thi kiểm thử
├── modules/
│   ├── api.js                     # Module giả lập API bất đồng bộ có độ trễ
│   ├── fetchSequential.js         # Module xử lý fetch dữ liệu tuần tự
│   ├── fetchParallel.js           # Module xử lý fetch dữ liệu song song
│   └── eventLoopExamples.js       # Module demo và minh họa Event Loop / Closure
└── README.md                      # Tài liệu hướng dẫn & Q&A
```

---

## 2. So sánh Fetch Tuần Tự vs Song Song

### Fetch Tuần Tự (Sequential Fetching)
- **Cơ chế:** Dùng vòng lặp `for...of` kết hợp `await` từng request một. Request tiếp theo chỉ bắt đầu sau khi request trước đó hoàn thành.
- **Thời gian thực thi:** Tổng thời gian = $T_1 + T_2 + T_3 + ... + T_n$. Với 4 request có độ trễ ~300ms, tổng thời gian tốn khoảng **1200ms**.
- **Khi nào nên dùng:** Khi các request có tính phụ thuộc lẫn nhau (ví dụ: cần lấy `userId` từ API 1 rồi mới dùng `userId` đó để gọi API 2).

### Fetch Song Song (Parallel Fetching - `Promise.all`)
- **Cơ chế:** Gửi tất cả các request cùng một lúc và dùng `Promise.all()` để chờ tất cả phản hồi.
- **Thời gian thực thi:** Tổng thời gian = $\max(T_1, T_2, T_3, ..., T_n)$. Với 4 request chạy song song, tổng thời gian chỉ tốn khoảng **300ms** (gấp 4 lần so với tuần tự).
- **Khi nào nên dùng:** Khi các request độc lập với nhau (ví dụ: tải danh sách danh mục, tải banner, tải danh sách bài viết cùng lúc).

### Xử lý lỗi an toàn với `Promise.allSettled`
- `Promise.all` sẽ bị từ chối ngay lập tức nếu có **bất kỳ một request nào bị lỗi** (Short-circuiting).
- `Promise.allSettled` sẽ chờ **tất cả request hoàn tất** (dù thành công hay thất bại), trả về mảng kết quả chứa trạng thái `{ status: 'fulfilled', value }` hoặc `{ status: 'rejected', reason }`, giúp ứng dụng không bị crash khi có request lỗi lẻ tẻ.

---

## 3. Q&A về Event Loop & Closure

### Q1: Event Loop hoạt động như thế nào trong JavaScript?
**Trả lời:**
JavaScript là ngôn ngữ đơn luồng (Single-threaded). Event Loop chịu trách nhiệm điều phối việc thực thi mã nguồn giữa 3 thành phần chính:
1. **Call Stack (Hàng đợi tiếng gọi):** Nơi thực thi các hàm đồng bộ (Synchronous code).
2. **Microtask Queue:** Nơi chứa các callback bất đồng bộ có độ ưu tiên cao (`Promise.then/catch/finally`, `queueMicrotask`, `process.nextTick`).
3. **Macrotask Queue (Task Queue):** Nơi chứa các callback như `setTimeout`, `setInterval`, `setImmediate`, I/O events.

**Quy tắc ưu tiên thực thi:**
1. Thực thi toàn bộ mã đồng bộ trong **Call Stack** cho tới khi rỗng.
2. Kiểm tra **Microtask Queue**: Thực thi **tất cả** các microtask đang có trong hàng đợi cho đến khi rỗng hoàn toàn.
3. Lấy **1 macrotask** duy nhất từ **Macrotask Queue** đưa vào Call Stack để thực thi.
4. Lặp lại chu trình trên.

---

### Q2: Thứ tự in ra console của đoạn mã sau là gì và tại sao?

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');
```

**Kết quả in ra:** `1 -> 4 -> 3 -> 2`

**Giải thích chi tiết:**
- `console.log('1')` là mã đồng bộ -> Thực thi ngay lập tức -> In ra `1`.
- `setTimeout` được gửi tới Web APIs, sau đó đẩy callback `console.log('2')` vào **Macrotask Queue**.
- `Promise.resolve().then()` đẩy callback `console.log('3')` vào **Microtask Queue**.
- `console.log('4')` là mã đồng bộ -> Thực thi ngay lập tức -> In ra `4`.
- Call Stack rỗng -> Event Loop kiểm tra **Microtask Queue** trước -> Thực thi `console.log('3')` -> In ra `3`.
- Microtask Queue rỗng -> Event Loop kiểm tra **Macrotask Queue** -> Thực thi `console.log('2')` -> In ra `2`.

---

### Q3: Tại sao vòng lặp `for (var i = 0; i < 3; i++)` kết hợp `setTimeout` lại in ra 3 lần số 3, còn `let` lại in ra 0, 1, 2?

```javascript
// Dùng var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 10);
}
// In ra: var: 3, var: 3, var: 3

// Dùng let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 10);
}
// In ra: let: 0, let: 1, let: 2
```

**Giải thích:**
- **Với `var`:** Biến `var` có phạm vi hàm (Function scope). Cả 3 lần lặp đều chia sẻ chung **một biến `i` duy nhất**. Khi các callback `setTimeout` thực thi (sau khi vòng lặp đã chạy xong), giá trị của `i` lúc này đã tăng lên `3`.
- **Với `let`:** Biến `let` có phạm vi khối (Block scope). Mỗi lần lặp, JavaScript tạo ra một **binding biến `j` mới độc lập** cho phạm vi khối đó. Closure của từng callback `setTimeout` sẽ ghi nhớ đúng giá trị `j` của lượt lặp tương ứng.
