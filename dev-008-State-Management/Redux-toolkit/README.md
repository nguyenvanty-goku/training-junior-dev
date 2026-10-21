# Bài Tập Về Nhà: Redux Toolkit (RTK) - Slice Hoàn Chỉnh & Kiến Trúc Store Theo Module

Dự án này thực hiện trọn vẹn 3 yêu cầu của **Bài tập về nhà** trong slide:
1. **Viết 1 slice RTK hoàn chỉnh** (`bookingSlice.js` với `initialState`, sync `reducers`, `createAsyncThunk`, `extraReducers`, và `selectors`).
2. **Giải thích lý do chọn công cụ cho 1 dự án giả định** (So sánh phân tích chọn Redux Toolkit vs Zustand cho hệ thống đặt phòng doanh nghiệp).
3. **Phác kiến trúc store theo module** (Cấu trúc thư mục theo tính năng / Feature-based pattern và sơ đồ luồng dữ liệu).

---

## 📁 1. Cấu trúc thư mục dự án

```text
dev-008-state-management/Redux-toolkit/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── app/
    │   └── store.js                   # Cấu hình Root Redux Store (configureStore)
    ├── data/
    │   └── hotelData.js               # Dữ liệu khách sạn, phòng, voucher, dịch vụ
    ├── features/
    │   └── booking/                   # Module Booking hoàn chỉnh
    │       ├── bookingSlice.js        # RTK Slice: Reducers + AsyncThunk + Selectors
    │       ├── RoomSelector.jsx       # Chọn phòng lưu trú
    │       ├── BookingOptions.jsx     # Số đêm, khách, dịch vụ, voucher
    │       ├── CustomerForm.jsx       # Thông tin khách đặt phòng
    │       └── BookingSummary.jsx     # Tính tổng tiền, dispatch submitBooking
    ├── components/
    │   ├── Header.jsx                 # Thanh tiêu đề, thông tin phòng đang chọn
    │   └── ArchitectureView.jsx       # Trực quan hóa lý thuyết & kiến trúc module
    └── utils/
        └── format.js                  # Định dạng tiền tệ VND
```

---

## ⚙️ 2. Yêu cầu 1: Viết 1 Slice RTK hoàn chỉnh (`bookingSlice.js`)

File chi tiết tại: [`src/features/booking/bookingSlice.js`](./src/features/booking/bookingSlice.js)

### Thành phần cấu tạo:
1. **Initial State**:
   ```javascript
   const initialState = {
     selectedRoom: AVAILABLE_ROOMS[0],
     nights: 2,
     guests: { adults: 2, children: 0 },
     selectedServices: [],
     promo: { code: '', discountPercent: 0, isApplied: false, errorMessage: '' },
     customer: { fullName: 'Trần Minh Quân', phone: '0912345678', email: '', specialRequest: '' },
     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
     bookingId: null,
     error: null,
   };
   ```

2. **Synchronous Reducers** (Tận dụng Immer tích hợp sẵn trong RTK để viết mutating syntax nhưng vẫn an toàn immutable):
   - `selectRoom(state, action)`: Chọn loại phòng.
   - `setNights(state, action)`: Tăng/giảm số đêm lưu trú.
   - `updateGuests(state, action)`: Cập nhật số người lớn / trẻ em.
   - `toggleService(state, action)`: Bật/tắt dịch vụ bổ trợ.
   - `applyPromoCode(state, action)`: Kiểm tra và áp dụng mã voucher giảm giá (`GIAMGIA10`, `RESORT20`).
   - `removePromoCode(state)`: Hủy mã giảm giá.
   - `updateCustomer(state, action)`: Đồng bộ thông tin người liên hệ.
   - `resetBooking()`: Đưa state trở về giá trị mặc định ban đầu.

3. **Async Thunk (`submitBooking`) & `extraReducers`**:
   - Sử dụng `createAsyncThunk` mô phỏng gửi đơn đặt phòng lên Backend API có kiểm tra validate và network delay 1.2s.
   - Quản lý đầy đủ 3 trạng thái bất đồng bộ qua `extraReducers`:
     - `.addCase(submitBooking.pending)`: Chuyển `status = 'loading'`, hiển thị spinner trên nút submit.
     - `.addCase(submitBooking.fulfilled)`: Lưu `bookingId` sinh ngẫu nhiên, chuyển màn hình sang phiếu xác nhận.
     - `.addCase(submitBooking.rejected)`: Bắt lỗi nếu thiếu thông tin bắt buộc.

4. **Selectors**:
   - `selectBooking`: Trả về toàn bộ state của slice booking.
   - `selectBookingTotal`: Tính toán tự động tổng tiền phòng, tiền dịch vụ phụ trợ và chiết khấu mã giảm giá.

---

## 🎯 3. Yêu cầu 2: Giải thích lý do chọn công cụ cho 1 dự án giả định

### Bối cảnh dự án giả định:
> **"Hệ thống Quản lý Chuỗi Khách sạn & Đặt phòng Doanh nghiệp (Enterprise Hotel Chain & Booking PMS)"**
> - **Quy mô:** Hơn 50 chi nhánh resort/khách sạn, hàng ngàn lượt đặt phòng mỗi ngày.
> - **Phân hệ người dùng:** Khách hàng công cộng đặt phòng, Lễ tân check-in/out tại quầy, Bộ phận Kế toán hóa đơn, Quản trị viên cập nhật giá và tồn phòng (Inventory).
> - **Team phát triển:** 15+ Frontend Developers cùng làm việc trên một codebase lớn.

### Lý do lựa chọn **Redux Toolkit** (thay vì Zustand):

| Tiêu chí | Redux Toolkit (Được chọn) | Zustand |
| :--- | :--- | :--- |
| **Tính chuẩn hóa (Convention & Structure)** | **Rất cao (Opinionated):** Bắt buộc chia tách theo Slice, Reducers, Actions, và Store tập trung. Giúp toàn bộ 15+ dev code theo một quy chuẩn thống nhất, giảm thiểu code spaghetti. | **Tự do (Un-opinionated):** Rất linh hoạt, nhưng khi team đông dev, mỗi người có thể tổ chức store theo một kiểu khác nhau, gây khó khăn khi scale. |
| **Khả năng Debug & Time-travel** | **Redux DevTools xuất sắc:** Có thể xem chi tiết từng action dispatch, diff trước/sau của state, tua lại thời gian (time-travel), xuất/nhập action log để reproduce lỗi nghiệp vụ đặt phòng/tiền bạc. | Có hỗ trợ Redux DevTools qua middleware nhưng không sâu và chi tiết bằng luồng action chuẩn của Redux. |
| **Quản lý Server-State & Caching** | **Tích hợp sẵn RTK Query:** Tự động cache danh sách phòng, tự động invalidate cache khi đặt phòng hoàn tất, hỗ trợ polling tình trạng phòng trống thời gian thực. | Cần cài thêm thư viện ngoài như `@tanstack/react-query` hoặc tự viết logic fetch bằng tay. |
| **Luồng Async phức tạp** | **createAsyncThunk & Listener Middleware:** Quản lý vòng đời gọi API chuẩn chỉnh (`pending`, `fulfilled`, `rejected`), dễ dàng bắt lỗi và retry. | Đơn giản chỉ là hàm async thông thường, phù hợp với các tác vụ vừa phải. |

> **Kết luận:** Với ứng dụng lớn, yêu cầu tính toàn vẹn dữ liệu cao, luồng đặt phòng và thanh toán phức tạp cùng team đông người, **Redux Toolkit** là sự lựa chọn tối ưu nhờ tính quy chuẩn cao và công cụ debug mạnh mẽ. Ngược lại, **Zustand** sẽ là lựa chọn tuyệt vời cho các dự án vừa & nhỏ, MVP, landing page hoặc ứng dụng cần tinh gọn bundle size.

---

## 🏗️ 4. Yêu cầu 3: Phác kiến trúc Store theo Module (Feature-Based Architecture)

Kiến trúc chia theo **Feature/Module** (thay vì chia theo kiểu file type như `actions/`, `reducers/` truyền thống) giúp các thành viên trong team làm việc độc lập trên từng module mà không bị conflict code:

```text
src/
├── app/
│   ├── store.js                   # Root Store: configureStore({ reducer: { ... } })
│   └── rootReducer.js             # Kết hợp reducers từ các modules
└── features/                      # Mỗi module là 1 miền nghiệp vụ độc lập
    ├── auth/                      # [Module 1]: Xác thực & Phân quyền
    │   ├── authSlice.js           # State: user, accessToken, roles, permissions
    │   └── authAPI.js             # API login, logout, refreshToken
    │
    ├── rooms/                     # [Module 2]: Quản lý Danh mục Phòng
    │   ├── roomsSlice.js          # State: roomsList, filter, selectedCategory, sort
    │   └── roomsAPI.js            # API fetchRooms, checkAvailability
    │
    ├── booking/                   # [Module 3]: Đặt phòng (Đã hoàn thiện trong bài)
    │   ├── bookingSlice.js        # State: selectedRoom, nights, guests, promo, status
    │   └── components/            # UI components riêng cho module booking
    │
    ├── payment/                   # [Module 4]: Thanh toán & Hóa đơn
    │   ├── paymentSlice.js        # State: paymentMethod (VNPay/Momo), transactionStatus
    │   └── paymentThunk.js        # Async xử lý giao dịch thanh toán
    │
    └── notification/              # [Module 5]: Thông báo Toasts & Cảnh báo
        └── notificationSlice.js   # State: toastList, alerts
```

### Sơ đồ luồng dữ liệu (Data Flow):

```text
  [ UI Component ] 
         │  dispatch(action)
         ▼
  [ Redux Store (Root) ]
         │  chuyển tiếp action đến đúng Slice
         ▼
  [ Feature Slices: bookingSlice / authSlice / roomsSlice ]
         │  reducers cập nhật state (thông qua Immer)
         ▼
  [ New State Tree ]
         │  useSelector() re-renders UI
         ▼
  [ Updated Component UI ]
```

---

## 🚀 5. Hướng dẫn chạy thử dự án

1. Di chuyển vào thư mục:
   ```bash
   cd dev-008-State-Management/Redux-toolkit
   ```

2. Cài đặt thư viện:
   ```bash
   npm install
   ```

3. Khởi chạy dev server:
   ```bash
   npm run dev
   ```

4. Mở trình duyệt tại địa chỉ hiển thị (mặc định: `http://localhost:5173`). Bạn có thể thử nghiệm chọn phòng, đổi số đêm, thêm dịch vụ, nhập mã `GIAMGIA10` và bấm "Xác nhận & Hoàn tất đặt phòng" để xem Async Thunk hoạt động.
