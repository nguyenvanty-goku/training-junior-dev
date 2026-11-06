export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'macbook-pro-m4',
    name: 'MacBook Pro 14" M4 Pro 24GB/512GB',
    category: 'Laptop & Mac',
    price: 49990000,
    originalPrice: 52990000,
    rating: 4.9,
    reviewsCount: 128,
    stock: 15,
    badge: 'Bán chạy',
    shortDescription:
      'Hiệu năng vượt trội với chip Apple M4 Pro, màn hình Liquid Retina XDR 120Hz siêu nét.',
    description:
      'MacBook Pro 14 inch trang bị vi xử lý M4 Pro mang lại tốc độ biên dịch code, xử lý đồ họa và chạy mô hình AI cục bộ nhanh vượt trội. Thời lượng pin lên đến 22 giờ cùng hệ thống tản nhiệt tối ưu cho lập trình viên chuyên nghiệp.',
    specs: [
      { label: 'Vi xử lý', value: 'Apple M4 Pro (12-core CPU, 16-core GPU)' },
      { label: 'RAM', value: '24GB Unified Memory' },
      { label: 'Ổ cứng', value: '512GB SSD PCIe NVMe' },
      { label: 'Màn hình', value: '14.2" Liquid Retina XDR (3024 x 1964), 120Hz' },
    ],
  },
  {
    id: 'sony-wh-1000xm5',
    name: 'Tai nghe chống ồn Sony WH-1000XM5',
    category: 'Âm thanh',
    price: 6890000,
    originalPrice: 8490000,
    rating: 4.8,
    reviewsCount: 256,
    stock: 42,
    badge: 'Giảm 19%',
    shortDescription:
      'Chống ồn chủ động ANC hàng đầu thế giới với 8 micro và bộ xử lý V1 + QN1.',
    description:
      'Sony WH-1000XM5 thiết lập chuẩn mực mới cho tai nghe không dây chống ồn. Thiết kế siêu nhẹ bọc da mềm mại, hỗ trợ LDAC Hi-Res Audio, kết nối đa điểm 2 thiết bị cùng lúc và thời lượng pin 30 giờ liên tục.',
    specs: [
      { label: 'Công nghệ chống ồn', value: 'Dual Noise Sensor + Auto NC Optimizer' },
      { label: 'Driver', value: '30mm sợi carbon độ nhạy cao' },
      { label: 'Thời lượng pin', value: 'Lên tới 30 giờ (Sạc nhanh 3 phút nghe 3 giờ)' },
      { label: 'Kết nối', value: 'Bluetooth 5.2, Multipoint, chuẩn LDAC / AAC' },
    ],
  },
  {
    id: 'keychron-q1-pro',
    name: 'Bàn phím cơ Custom Keychron Q1 Pro QMK/VIA',
    category: 'Gaming Gear',
    price: 4650000,
    originalPrice: 5190000,
    rating: 4.9,
    reviewsCount: 94,
    stock: 9,
    badge: 'Lập trình viên yêu thích',
    shortDescription:
      'Khung nhôm CNC nguyên khối, mạch Hotswap, kết nối Bluetooth & Type-C, hỗ trợ QMK/VIA.',
    description:
      'Keychron Q1 Pro sở hữu thân nhôm 6063 gia công CNC toàn phần cùng cấu trúc Double-Gasket Mount cho âm gõ đằm và êm ái. Dễ dàng remap mọi phím trên macOS/Windows trực tiếp qua trình duyệt với VIA.',
    specs: [
      { label: 'Layout', value: '75% (82 phím + Núm xoay nhôm CNC)' },
      { label: 'Chất liệu khung', value: 'Nhôm nguyên khối CNC 6063' },
      { label: 'Switch', value: 'Keychron K Pro Banana / Red (Hotswap 5-pin)' },
      { label: 'Pin', value: '4000mAh - Kết nối 3 thiết bị không dây' },
    ],
  },
  {
    id: 'lg-ultrafine-4k-27',
    name: 'Màn hình đồ họa LG UltraFine 27" 4K IPS USB-C',
    category: 'Màn hình',
    price: 9490000,
    originalPrice: 11290000,
    rating: 4.7,
    reviewsCount: 73,
    stock: 21,
    badge: 'Chuẩn màu 99% sRGB',
    shortDescription:
      'Độ phân giải 4K UHD sắc nét, cổng USB-C sạc ngược 90W chỉ với 1 sợi cáp duy nhất.',
    description:
      'Màn hình LG UltraFine 27 inch 4K là người bạn đồng hành lý tưởng cho MacBook và PC hiện đại. Tấm nền IPS độ phủ màu DCI-P3 95%, chân đế công thái học nâng hạ - xoay dọc linh hoạt cho việc đọc code.',
    specs: [
      { label: 'Kích thước & Tấm nền', value: '27 inch IPS 4K UHD (3840 x 2160)' },
      { label: 'Độ phủ màu', value: '95% DCI-P3, VESA DisplayHDR 400' },
      { label: 'Cổng kết nối', value: 'USB-C (PD 90W), 2x HDMI, DisplayPort, USB Hub' },
      { label: 'Chân đế', value: 'Nâng hạ độ cao, Nghiêng, Xoay dọc 90° (Pivot)' },
    ],
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Chuột công thái học Logitech MX Master 3S',
    category: 'Phụ kiện',
    price: 2390000,
    originalPrice: 2790000,
    rating: 4.9,
    reviewsCount: 312,
    stock: 35,
    badge: 'Best Seller',
    shortDescription:
      'Cảm biến 8000 DPI dùng trên cả mặt kính, cuộn vô cực MagSpeed và nút bấm Quiet Click.',
    description:
      'MX Master 3S là mẫu chuột năng suất nổi tiếng nhất dành cho developer và designer. Con lăn điện từ MagSpeed cuộn 1.000 dòng code trong 1 giây, giảm 90% tiếng ồn click so với thế hệ trước.',
    specs: [
      { label: 'Cảm biến', value: 'Darkfield 8000 DPI (Hoạt động trên kính)' },
      { label: 'Con lăn', value: 'MagSpeed SmartShift + Cuộn ngang' },
      { label: 'Kết nối', value: 'Logi Bolt USB Receiver & Bluetooth Low Energy' },
      { label: 'Pin', value: 'Dùng tới 70 ngày cho 1 lần sạc đầy USB-C' },
    ],
  },
  {
    id: 'ipad-air-m2-11',
    name: 'iPad Air 11 inch M2 Wi-Fi 128GB',
    category: 'Máy tính bảng',
    price: 15990000,
    originalPrice: 16990000,
    rating: 4.8,
    reviewsCount: 64,
    stock: 18,
    shortDescription:
      'Sức mạnh chip Apple M2 trong thiết kế mỏng nhẹ, tương thích Apple Pencil Pro mới.',
    description:
      'iPad Air M2 giúp bạn ghi chú kiến trúc hệ thống, vẽ sơ đồ luồng dữ liệu và đa nhiệm Stage Manager mượt mà. Camera trước Ultra Wide 12MP đặt ở cạnh ngang tiện lợi cho các buổi họp trực tuyến.',
    specs: [
      { label: 'Chipset', value: 'Apple M2 (8-core CPU, 9-core GPU)' },
      { label: 'Màn hình', value: '11" Liquid Retina True Tone, phủ chống phản chiếu' },
      { label: 'Bộ nhớ trong', value: '128GB' },
      { label: 'Phụ kiện hỗ trợ', value: 'Apple Pencil Pro, Magic Keyboard' },
    ],
  },
];

export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export async function getProductsWithDelay(delayMs = 800): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return PRODUCTS.find((item) => item.id === id);
}
