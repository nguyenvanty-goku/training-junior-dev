// Chiến lược render: SSR (Server-Side Rendering - dynamic = 'force-dynamic' & fetch cache: 'no-store')

import type { Metadata } from 'next';
import { fetchAllProductsSSR } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description:
    'Danh mục đầy đủ các sản phẩm công nghệ, cập nhật giá bán và số lượng tồn kho theo thời gian thực.',
  openGraph: {
    title: 'Danh sách sản phẩm | NextGear Store',
    description:
      'Danh mục đầy đủ các sản phẩm công nghệ, cập nhật giá bán và số lượng tồn kho theo thời gian thực.',
    url: '/products',
    type: 'website',
    images: [
      {
        url: '/images/store-banner.svg',
        width: 800,
        height: 420,
        alt: 'Danh sách sản phẩm NextGear Store',
      },
    ],
  },
};

export default async function ProductsPage() {
  const products = await fetchAllProductsSSR(12);

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Tất cả sản phẩm ({products.length})</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Giá bán và tình trạng kho hàng luôn được cập nhật trực tiếp từ hệ thống.
          </p>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}

