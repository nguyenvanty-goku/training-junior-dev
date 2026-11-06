export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
}

interface DummyJsonResponse {
  products: Product[];
  total: number;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'MacBook Pro 14 inch M4 Pro',
    description:
      'Máy tính xách tay hiệu năng cao trang bị vi xử lý M4 Pro, màn hình Liquid Retina XDR 120Hz và thời lượng pin lên đến 22 giờ.',
    category: 'laptops',
    price: 1999,
    discountPercentage: 8.5,
    rating: 4.9,
    stock: 15,
    brand: 'Apple',
    thumbnail: '/images/store-banner.svg',
    images: ['/images/store-banner.svg'],
    warrantyInformation: 'Bảo hành chính hãng 12 tháng',
    shippingInformation: 'Giao hàng tiêu chuẩn 1-2 ngày',
    availabilityStatus: 'In Stock',
  },
  {
    id: 2,
    title: 'Tai nghe chống ồn Sony WH-1000XM5',
    description:
      'Tai nghe không dây chống ồn chủ động thế hệ mới với 8 micro, âm thanh Hi-Res Audio LDAC và thời lượng pin 30 giờ.',
    category: 'mobile-accessories',
    price: 349,
    discountPercentage: 12.0,
    rating: 4.8,
    stock: 32,
    brand: 'Sony',
    thumbnail: '/images/store-banner.svg',
    images: ['/images/store-banner.svg'],
    warrantyInformation: 'Bảo hành chính hãng 12 tháng',
    shippingInformation: 'Giao nhanh trong ngày',
    availabilityStatus: 'In Stock',
  },
  {
    id: 3,
    title: 'iPad Air M2 11 inch Wi-Fi',
    description:
      'Máy tính bảng mỏng nhẹ với chip Apple M2 mạnh mẽ, màn hình Liquid Retina sắc nét, hỗ trợ Apple Pencil Pro.',
    category: 'tablets',
    price: 599,
    discountPercentage: 6.5,
    rating: 4.8,
    stock: 20,
    brand: 'Apple',
    thumbnail: '/images/store-banner.svg',
    images: ['/images/store-banner.svg'],
    warrantyInformation: 'Bảo hành chính hãng 12 tháng',
    shippingInformation: 'Giao hàng tiêu chuẩn 1-2 ngày',
    availabilityStatus: 'In Stock',
  },
];

export function formatUSD(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Fetch danh sách sản phẩm theo chiến lược ISR (tái tạo tĩnh định kỳ)
export async function fetchFeaturedProductsISR(limit = 6): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/laptops?limit=${limit}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error('Failed to fetch featured products');
    const data: DummyJsonResponse = await res.json();
    return data.products.length > 0 ? data.products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

// Fetch danh sách sản phẩm theo chiến lược SSR (luôn lấy dữ liệu mới ở mỗi request)
export async function fetchAllProductsSSR(limit = 12): Promise<Product[]> {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch products list');
    const data: DummyJsonResponse = await res.json();
    return data.products.length > 0 ? data.products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

// Fetch chi tiết 1 sản phẩm theo chiến lược ISR (revalidate = 60s)
export async function fetchProductByIdISR(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const product: Product = await res.json();
    return product;
  } catch {
    return FALLBACK_PRODUCTS.find((item) => String(item.id) === id) ?? null;
  }
}

