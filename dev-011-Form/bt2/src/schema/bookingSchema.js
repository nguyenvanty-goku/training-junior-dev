import { z } from 'zod';

export const ROOM_OPTIONS = [
  { value: 'standard', label: 'Phòng Standard (1.200.000đ / đêm)', price: 1200000 },
  { value: 'deluxe', label: 'Phòng Deluxe hướng biển (2.100.000đ / đêm)', price: 2100000 },
  { value: 'suite', label: 'Phòng Executive Suite (3.500.000đ / đêm)', price: 3500000 },
];

export const STEP_FIELDS = {
  1: ['fullName', 'email', 'phone', 'password', 'confirmPassword'],
  2: ['roomType', 'guests', 'checkInDate', 'checkOutDate', 'specialRequests'],
  3: ['paymentMethod', 'acceptTerms'],
};

export const bookingSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, 'Vui lòng nhập họ và tên')
      .min(3, 'Họ và tên phải có ít nhất 3 ký tự')
      .max(60, 'Họ và tên không được vượt quá 60 ký tự')
      .regex(
        /^[\p{L}\s]+$/u,
        'Họ và tên chỉ được chứa chữ cái và khoảng trắng, không chứa số hoặc ký tự đặc biệt'
      ),

    email: z
      .string()
      .trim()
      .min(1, 'Vui lòng nhập địa chỉ email')
      .email('Địa chỉ email không đúng định dạng (ví dụ: ten@domain.com)'),

    phone: z
      .string()
      .trim()
      .min(1, 'Vui lòng nhập số điện thoại')
      .regex(
        /^0\d{9}$/,
        'Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0'
      ),

    password: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
      .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa')
      .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số'),

    confirmPassword: z
      .string()
      .min(1, 'Vui lòng nhập lại mật khẩu xác nhận'),

    roomType: z
      .string()
      .min(1, 'Vui lòng chọn hạng phòng muốn đặt'),

    guests: z.coerce
      .number({
        invalid_type_error: 'Số lượng khách phải là một con số hợp lệ',
      })
      .int('Số lượng khách phải là số nguyên')
      .min(1, 'Số lượng khách tối thiểu là 1 người')
      .max(6, 'Số lượng khách tối đa cho 1 phòng là 6 người'),

    checkInDate: z
      .string()
      .min(1, 'Vui lòng chọn ngày nhận phòng'),

    checkOutDate: z
      .string()
      .min(1, 'Vui lòng chọn ngày trả phòng'),

    specialRequests: z
      .string()
      .max(200, 'Yêu cầu đặc biệt không được vượt quá 200 ký tự')
      .optional()
      .or(z.literal('')),

    paymentMethod: z
      .string()
      .min(1, 'Vui lòng chọn phương thức thanh toán'),

    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Bạn phải đồng ý với quy định đặt phòng trước khi hoàn tất',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Mật khẩu xác nhận không khớp với mật khẩu đã nhập',
      });
    }

    if (data.checkInDate && data.checkOutDate) {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);

      if (checkOut <= checkIn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['checkOutDate'],
          message: 'Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày',
        });
      }
    }
  });

export const EDGE_CASES = [
  {
    id: 'whitespace-name',
    step: 1,
    title: 'Edge Case 1: Họ tên toàn khoảng trắng hoặc chứa chữ số',
    description: 'Nhập "   " hoặc "Nguyễn Văn 123" — Zod tự động trim và báo lỗi chỉ cho phép chữ cái.',
    patch: {
      fullName: 'Nguyễn Văn 123',
    },
    fieldsToTrigger: ['fullName'],
  },
  {
    id: 'weak-password-mismatch',
    step: 1,
    title: 'Edge Case 2: Mật khẩu thiếu chữ hoa & xác nhận mật khẩu lệch nhau',
    description: 'Mật khẩu đủ 8 ký tự ("matkhau123") nhưng thiếu chữ in hoa và confirmPassword không khớp.',
    patch: {
      password: 'matkhau123',
      confirmPassword: 'matkhau456',
    },
    fieldsToTrigger: ['password', 'confirmPassword'],
  },
  {
    id: 'invalid-phone',
    step: 1,
    title: 'Edge Case 3: Số điện thoại sai độ dài hoặc không bắt đầu bằng số 0',
    description: 'Nhập "8490123456" (không bắt đầu bằng 0) hoặc "090123" (thiếu số).',
    patch: {
      phone: '8490123456',
    },
    fieldsToTrigger: ['phone'],
  },
  {
    id: 'checkout-before-checkin',
    step: 2,
    title: 'Edge Case 4: Ngày trả phòng nhỏ hơn hoặc trùng ngày nhận phòng',
    description: 'Nhận phòng ngày 2026-12-15 nhưng trả phòng ngày 2026-12-12.',
    patch: {
      checkInDate: '2026-12-15',
      checkOutDate: '2026-12-12',
    },
    fieldsToTrigger: ['checkInDate', 'checkOutDate'],
  },
  {
    id: 'guests-out-of-range',
    step: 2,
    title: 'Edge Case 5: Số lượng khách bằng 0, số âm hoặc vượt quá 6 người',
    description: 'Nhập 0 hoặc 9 người — vượt quá giới hạn tối đa 6 khách/phòng.',
    patch: {
      guests: 9,
    },
    fieldsToTrigger: ['guests'],
  },
  {
    id: 'long-special-request',
    step: 2,
    title: 'Edge Case 6: Ghi chú yêu cầu đặc biệt vượt quá 200 ký tự',
    description: 'Nhập đoạn văn bản dài hơn 200 ký tự vào ô yêu cầu đặc biệt.',
    patch: {
      specialRequests:
        'Tôi muốn đặt thêm giường phụ, chuẩn bị sẵn bàn làm việc rộng kèm màn hình rời, phòng ở tầng cao yên tĩnh cách xa thang máy, có chuẩn bị sẵn trái cây tươi và nước khoáng mỗi sáng cùng dịch vụ đưa đón sân bay hai chiều.',
    },
    fieldsToTrigger: ['specialRequests'],
  },
];

