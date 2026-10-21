export const AVAILABLE_ROOMS = [
  {
    id: 'room-deluxe-ocean',
    name: 'Phòng Deluxe Hướng Biển',
    pricePerNight: 1850000,
    capacity: '2 người lớn, 1 trẻ em',
    badge: 'Được yêu thích nhất',
    image: '🌊',
    description: 'Ban công ngắm trọn bình minh biển, giường King-size êm ái, bồn tắm nằm cao cấp.',
  },
  {
    id: 'room-suite-family',
    name: 'Phòng Suite Gia Đình',
    pricePerNight: 3200000,
    capacity: '4 người lớn, 2 trẻ em',
    badge: 'Không gian rộng rãi',
    image: '🏡',
    description: '2 phòng ngủ riêng biệt, phòng khách sang trọng, bếp mini tiện nghi cho gia đình.',
  },
  {
    id: 'room-villa-pool',
    name: 'Biệt Thự Hồ Bơi Riêng (Private Pool Villa)',
    pricePerNight: 5600000,
    capacity: '2 - 4 người',
    badge: 'Sang trọng bậc nhất',
    image: '🏊‍♂️',
    description: 'Khuôn viên biệt lập có hồ bơi riêng, sân vườn nhiệt đới, dịch vụ quản gia 24/7.',
  },
];

export const EXTRA_SERVICES = [
  {
    id: 'srv-breakfast',
    name: 'Buffet sáng quốc tế cao cấp',
    price: 250000,
    per: 'người / ngày',
    icon: '🍳',
  },
  {
    id: 'srv-airport',
    name: 'Xe đưa đón sân bay 2 chiều',
    price: 450000,
    per: 'chuyến',
    icon: '🚗',
  },
  {
    id: 'srv-spa',
    name: 'Gói trị liệu Spa toàn thân 60 phút',
    price: 600000,
    per: 'suất',
    icon: '💆‍♀️',
  },
];

export const VALID_PROMO_CODES = {
  GIAMGIA10: 10, // 10%
  RESORT20: 20,  // 20%
};
