# Bài Tập Về Nhà Buổi 2: Form Nhiều Bước & Zod Schema (`dev-011-form/bt2`)

Dự án thực hiện đầy đủ các yêu cầu trong slide bài tập về nhà:

1. **Form Booking/Đăng ký nhiều bước + Zod đầy đủ**:
   - [`src/schema/bookingSchema.js`](./src/schema/bookingSchema.js): Định nghĩa `bookingSchema` bằng `zod` kết hợp `.superRefine()` để kiểm tra chéo các trường (`confirmPassword` khớp `password`, `checkOutDate` phải sau `checkInDate`).
   - [`src/components/MultiStepBookingForm.jsx`](./src/components/MultiStepBookingForm.jsx): Chia thành 3 bước (Bước 1: Tài khoản & Liên hệ, Bước 2: Chi tiết đặt phòng, Bước 3: Xác nhận & Thanh toán).

2. **Lỗi inline tiếng Việt; `mode: 'onBlur'`**:
   - Khởi tạo `useForm({ resolver: zodResolver(bookingSchema), mode: 'onBlur' })`.
   - Toàn bộ thông báo lỗi hiển thị inline bằng tiếng Việt ngay dưới từng trường khi người dùng rời khỏi ô nhập liệu (`onBlur`) hoặc khi nhấn chuyển bước (`trigger()`).

3. **Giữ dữ liệu khi quay lại; submit ở bước cuối**:
   - Khi chuyển từ Bước 2 hoặc Bước 3 về các bước trước qua nút **Quay lại**, toàn bộ dữ liệu đã nhập được giữ nguyên.
   - Chỉ thực hiện `handleSubmit(onSubmit)` ở Bước 3 (bước cuối cùng) kèm khoá nút khi `isSubmitting`.

4. **Danh sách 6 Edge Cases đã liệt kê và tích hợp nút thử nhanh**:
   - **Edge Case 1**: Họ và tên chỉ nhập khoảng trắng (`"   "`) hoặc chứa chữ số (`"Nguyễn Văn 123"`).
   - **Edge Case 2**: Mật khẩu đủ 8 ký tự nhưng thiếu chữ in hoa (`"matkhau123"`) và mật khẩu xác nhận không khớp.
   - **Edge Case 3**: Số điện thoại không bắt đầu bằng số 0 hoặc không đủ 10 chữ số (`"8490123456"`).
   - **Edge Case 4**: Ngày trả phòng (`checkOutDate`) nhỏ hơn hoặc bằng ngày nhận phòng (`checkInDate`).
   - **Edge Case 5**: Số lượng khách (`guests`) vượt quá giới hạn tối đa 6 người/phòng (`9`).
   - **Edge Case 6**: Ghi chú yêu cầu đặc biệt (`specialRequests`) dài quá 200 ký tự.

---

## Hướng dẫn cài đặt và chạy dự án

```bash
cd dev-011-form/bt2
npm install
npm run dev
```

