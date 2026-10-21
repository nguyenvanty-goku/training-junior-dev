# Bài Tập Về Nhà: Quản Lý State Với Zustand (Slice Pattern + Persist)

Dự án thực hiện theo yêu cầu trong slide bài học:
- **Xây store quản lý 1 phần dữ liệu thật**: Ứng dụng E-Commerce Mini quản lý Giỏ hàng (Cart) và Thông tin người đặt hàng (Customer/Order Info) với dữ liệu sản phẩm công nghệ thực tế.
- **Có persist**: Tích hợp middleware `persist` của Zustand, tự động đồng bộ giỏ hàng và thông tin khách hàng vào `localStorage` (`junior-ecommerce-storage`). Dữ liệu giữ nguyên khi F5 reload trang.
- **Tách slice hợp lý**: Tách thành các slice độc lập theo đúng Zustand Slice Pattern:
  - `cartSlice.js`: Quản lý danh sách sản phẩm trong giỏ, thêm, cập nhật số lượng, xóa món hàng, làm trống giỏ.
  - `customerSlice.js`: Quản lý thông tin người đặt hàng (họ tên, điện thoại, địa chỉ, phương thức thanh toán, ghi chú).
- **Tránh phức tạp hóa**: Code gọn gàng, rõ ràng, dễ bảo trì và có giao diện kiểm tra realtime dữ liệu lưu trữ.

---

## 📁 Cấu trúc thư mục

```text
dev-008-state-management/Zustand/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── products.js            # Dữ liệu sản phẩm thực tế
    ├── store/
    │   ├── slices/
    │   │   ├── cartSlice.js       # Slice 1: Quản lý giỏ hàng & hành động thêm/sửa/xóa
    │   │   └── customerSlice.js   # Slice 2: Quản lý thông tin khách hàng & thanh toán
    │   └── useAppStore.js         # Store tổng hợp các slice + persist middleware
    ├── components/
    │   ├── Header.jsx             # Thanh điều hướng, hiển thị badge giỏ hàng
    │   ├── ProductList.jsx        # Danh sách sản phẩm, nút thêm vào giỏ
    │   ├── Cart.jsx               # Giỏ hàng, nút tăng/giảm số lượng, tổng tiền
    │   ├── CheckoutForm.jsx       # Form đặt hàng gắn liền với customerSlice
    │   └── PersistIndicator.jsx   # Khung kiểm tra & xem trực tiếp dữ liệu LocalStorage
    └── utils/
        └── format.js              # Định dạng tiền tệ VND
```

---

## 🧠 Phân tích giải pháp kỹ thuật

### 1. Tách Slice hợp lý (Zustand Slice Pattern)

Mỗi slice nhận `(set, get)` và quản lý phần state cùng actions riêng:

```javascript
// src/store/slices/cartSlice.js
export const createCartSlice = (set, get) => ({
  cart: [],
  addToCart: (product) => set((state) => { /* ... */ }),
  updateQuantity: (productId, quantity) => set((state) => { /* ... */ }),
  removeFromCart: (productId) => set((state) => { /* ... */ }),
  clearCart: () => set({ cart: [] }),
});
```

```javascript
// src/store/slices/customerSlice.js
export const createCustomerSlice = (set) => ({
  customer: initialCustomerState,
  updateCustomer: (fields) => set((state) => ({
    customer: { ...state.customer, ...fields },
  })),
  resetCustomer: () => set({ customer: initialCustomerState }),
});
```

### 2. Gộp Slice và tích hợp Middleware `persist`

Trong `src/store/useAppStore.js`, các slice được gộp thông qua `(...a) => ({ ...createCartSlice(...a), ...createCustomerSlice(...a) })` và bọc trong `persist`:

```javascript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createCartSlice } from './slices/cartSlice';
import { createCustomerSlice } from './slices/customerSlice';

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createCustomerSlice(...a),
    }),
    {
      name: 'junior-ecommerce-storage',
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu trữ dữ liệu state (cart, customer), tránh lưu actions thừa
      partialize: (state) => ({
        cart: state.cart,
        customer: state.customer,
      }),
    }
  )
);
```

### 3. Tối ưu Selector tránh re-render thừa

Component chỉ subscribe đúng phần dữ liệu cần:

```javascript
// Thay vì lấy cả store gây re-render: const state = useAppStore();
// Chỉ lấy phần state hoặc selector cần thiết:
const totalItems = useAppStore(selectCartTotalItems);
const customerName = useAppStore((state) => state.customer.fullName);
const addToCart = useAppStore((state) => state.addToCart);
```

---

## 🚀 Hướng dẫn chạy dự án

1. Di chuyển vào thư mục:
   ```bash
   cd dev-008-State-Management/Zustand
   ```

2. Cài đặt thư viện:
   ```bash
   npm install
   ```

3. Khởi chạy dev server:
   ```bash
   npm run dev
   ```

4. Mở trình duyệt tại đường dẫn `http://localhost:5173` (hoặc cổng mà Vite thông báo).

---

## 🧪 Cách kiểm tra các tính năng

1. **Thêm sản phẩm**: Bấm "Thêm vào giỏ" ở bất kỳ sản phẩm nào. Giỏ hàng và badge ở Header sẽ cập nhật ngay lập tức.
2. **Kiểm tra Persist**:
   - Thêm một vài sản phẩm và nhập thông tin người nhận hàng vào form.
   - Bấm nút **"F5 Tải lại trang"** hoặc nhấn phím `F5` trên trình duyệt: Dữ liệu giỏ hàng và form vẫn giữ nguyên 100%.
   - Bấm nút **"Xem JSON LocalStorage"** trên thanh Persist Indicator để xem trực tiếp cấu trúc dữ liệu lưu trong trình duyệt.
3. **Thử xóa hoặc reset**: Bấm **"Xóa LocalStorage"** hoặc **"Xóa giỏ"** để kiểm tra hành vi làm mới state.
