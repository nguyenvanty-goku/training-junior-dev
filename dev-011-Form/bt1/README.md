# Bài Tập Về Nhà Buổi 1: React Hook Form (`dev-011-form/bt1`)

Dự án thực hiện đầy đủ các yêu cầu trong slide bài tập về nhà:

1. **Chuyển 1 form controlled thủ công sang React Hook Form (RHF)**:
   - [`src/components/ControlledForm.jsx`](./src/components/ControlledForm.jsx): Phiên bản form ban đầu dùng `useState`, `onChange` và hàm `validate()` thủ công (gây re-render toàn form mỗi khi gõ phím).
   - [`src/components/RHFRegistrationForm.jsx`](./src/components/RHFRegistrationForm.jsx): Phiên bản đã chuyển sang `useForm` của `react-hook-form`, quản lý input theo cơ chế uncontrolled để tránh re-render thừa khi người dùng nhập liệu.

2. **`register` + `handleSubmit`; lỗi `required` inline**:
   - Đăng ký từng trường bằng `register('<field>', { required: '...', pattern: ..., minLength: ... })`.
   - Hiển thị thông báo lỗi `errors.<field>?.message` trực tiếp ngay bên dưới từng trường dữ liệu.

3. **Khoá nút khi `isSubmitting`; đặt `defaultValues`**:
   - Khai báo `defaultValues` ngay trong `useForm({ defaultValues: INITIAL_VALUES })` và hỗ trợ khôi phục lại giá trị mặc định qua `reset(INITIAL_VALUES)`.
   - Sử dụng `formState.isSubmitting` để vô hiệu hóa (`disabled={isSubmitting}`) nút gửi và nút khôi phục trong suốt thời gian xử lý bất đồng bộ (1.5 giây).

---

## Hướng dẫn cài đặt và chạy dự án

```bash
cd dev-011-form/bt1
npm install
npm run dev
```

